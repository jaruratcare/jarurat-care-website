import { redirect, fail } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/supabaseAdmin';
import { createAdminNotification } from '$lib/server/notifications';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, '/cms/login');
	}

	const { data: profile, error: profileError } = await locals.supabase
		.from('profiles')
		.select('*')
		.eq('id', session.user.id)
		.single();

	if (profileError || !profile) {
		throw redirect(303, '/cms/login');
	}

	if (profile.role !== 'Doctor' || profile.is_reviewer !== true) {
		throw redirect(303, '/cms/doctor-dashboard');
	}

	const { data: research, error: researchError } = await supabaseAdmin
		.from('research_articles')
		.select('*')
		.eq('id', params.id)
		.single();

	if (researchError || !research) {
		throw redirect(303, '/cms/doctor-dashboard/review-research');
	}

	// Fetch author name if possible
	let authorName = research.authors_and_affiliations;
	if (!authorName && research.user_id) {
		const { data: authorProfile } = await supabaseAdmin
			.from('profiles')
			.select('full_name')
			.eq('id', research.user_id)
			.single();
		if (authorProfile) {
			authorName = authorProfile.full_name;
		}
	}

	return {
		profile,
		research: {
			...research,
			author_name: authorName || 'Unknown Researcher'
		}
	};
};

export const actions: Actions = {
	approveResearch: async ({ request, locals, params }) => {
		const session = await locals.getSession();
		if (!session) return fail(401, { message: 'Unauthorized' });

		const { data: userProfile } = await locals.supabase
			.from('profiles')
			.select('is_reviewer, role')
			.eq('id', session.user.id)
			.single();

		if (!userProfile || userProfile.role !== 'Doctor' || userProfile.is_reviewer !== true) {
			return fail(403, { message: 'Forbidden' });
		}

		const { data: updatedResearch, error } = await supabaseAdmin
			.from('research_articles')
			.update({
				status: 'approved',
				admin_feedback: 'APPROVED_BY_REVIEWER'
			})
			.eq('id', params.id)
			.eq('status', 'under_review')
			.select('title, user_id')
			.single();

		if (error || !updatedResearch) {
			console.error('Approve research error:', error);
			return fail(500, { message: 'Could not approve research paper' });
		}

		try {
			// Notify author
			await createAdminNotification(
				'Research Paper Approved',
				`Your research paper "${updatedResearch.title}" has been approved by the reviewer and is awaiting final publishing.`,
				'success',
				updatedResearch.user_id,
				'/cms/doctor-dashboard/research'
			);

			// Notify super admin
			await createAdminNotification(
				'Research Ready for Publishing',
				`The research paper "${updatedResearch.title}" has been approved and is ready to be published.`,
				'info',
				undefined,
				'/cms/super-admin?tab=research',
				'super_admin_only'
			);
		} catch (err) {
			console.error('Notification error:', err);
		}

		throw redirect(303, '/cms/doctor-dashboard/review-research');
	},

	rejectResearch: async ({ request, locals, params }) => {
		const session = await locals.getSession();
		if (!session) return fail(401, { message: 'Unauthorized' });

		const { data: userProfile } = await locals.supabase
			.from('profiles')
			.select('is_reviewer, role')
			.eq('id', session.user.id)
			.single();

		if (!userProfile || userProfile.role !== 'Doctor' || userProfile.is_reviewer !== true) {
			return fail(403, { message: 'Forbidden' });
		}

		const formData = await request.formData();
		const feedback = formData.get('feedback') as string;

		if (!feedback?.trim()) {
			return fail(400, { message: 'Feedback is required' });
		}

		const { data: updatedResearch, error } = await supabaseAdmin
			.from('research_articles')
			.update({
				status: 'changes_requested',
				admin_feedback: feedback.trim()
			})
			.eq('id', params.id)
			.eq('status', 'under_review')
			.select('title, user_id')
			.single();

		if (error || !updatedResearch) {
			console.error('Reject research error:', error);
			return fail(500, { message: 'Could not request changes' });
		}

		try {
			await createAdminNotification(
				'Changes Requested',
				`A reviewer has requested changes on your research paper "${updatedResearch.title}".`,
				'warning',
				updatedResearch.user_id,
				'/cms/doctor-dashboard/research'
			);
		} catch (err) {
			console.error('Notification error:', err);
		}

		throw redirect(303, '/cms/doctor-dashboard/review-research');
	}
};

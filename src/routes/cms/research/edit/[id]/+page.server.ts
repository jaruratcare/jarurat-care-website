import { fail, redirect } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/supabaseAdmin';
import { createAdminNotification } from '$lib/server/notifications';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const session = await locals.getSession();
	if (!session) {
		throw redirect(303, '/cms/login');
	}

	const { data: profile } = await locals.supabase
		.from('profiles')
		.select('*')
		.eq('id', session.user.id)
		.single();

	if (!profile) {
		throw redirect(303, '/cms/login');
	}

	const { data: research, error } = await supabaseAdmin
		.from('research_articles')
		.select('*')
		.eq('id', params.id)
		.single();

	if (error || !research) {
		throw redirect(303, '/cms/doctor-dashboard');
	}

	// Only allow the original author to edit their draft
	if (research.user_id !== session.user.id) {
		throw redirect(303, '/cms/doctor-dashboard');
	}

	return {
		profile,
		research
	};
};

export const actions: Actions = {
	submitResearchPaper: async ({ request, locals, params }) => {
		const session = await locals.getSession();

		if (!session) {
			return fail(401, { message: 'Unauthorized' });
		}

		const formData = await request.formData();

		const actionType = formData.get('actionType') as string;
		const status = actionType === 'draft' ? 'draft' : 'under_review';

		const title = formData.get('title') as string;
		const authors_and_affiliations = formData.get('authors_and_affiliations') as string;
		const corresponding_author_details = formData.get('corresponding_author_details') as string;
		const abstract = formData.get('abstract') as string;
		const keywords = formData.get('keywords') as string;
		const introduction = formData.get('introduction') as string;
		const literature_review = formData.get('literature_review') as string;
		const methods = formData.get('methods') as string;
		const results = formData.get('results') as string;
		const discussion = formData.get('discussion') as string;
		const conclusion = formData.get('conclusion') as string;
		const funding = formData.get('funding') as string;
		const ethics_statement = formData.get('ethics_statement') as string;
		const acknowledgements = formData.get('acknowledgements') as string;
		const conflict_of_interest = formData.get('conflict_of_interest') as string;
		const author_contributions = formData.get('author_contributions') as string;
		const data_availability = formData.get('data_availability') as string;
		const references_text = formData.get('references_text') as string;
		const appendix = formData.get('appendix') as string;
		const featured_image = formData.get('featured_image') as string;

		if (!title) {
			return fail(400, { message: 'Title is required' });
		}

		const { error } = await supabaseAdmin
			.from('research_articles')
			.update({
				title,
				subtitle: null,
				authors_and_affiliations,
				corresponding_author_details,
				abstract,
				keywords,
				introduction,
				literature_review,
				methods,
				results,
				discussion,
				conclusion,
				funding,
				ethics_statement,
				acknowledgements,
				conflict_of_interest,
				author_contributions,
				data_availability,
				references_text,
				appendix,
				featured_image,
				status
			})
			.eq('id', params.id);

		if (error) {
			console.error(error);
			return fail(500, {
				message: error.message
			});
		}

		if (status === 'under_review') {
			await createAdminNotification(
				'New Research Paper Submitted',
				`Doctor has submitted a research paper "${title}" for review.`,
				'info',
				undefined,
				'/cms/super-admin?tab=research'
			);
		}

		throw redirect(303, '/cms/doctor-dashboard');
	}
};

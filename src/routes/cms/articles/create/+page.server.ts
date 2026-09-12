import { fail, redirect } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/supabaseAdmin';
import { createAdminNotification } from '$lib/server/notifications';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
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

	return {
		profile
	};
};

export const actions: Actions = {
	submitArticle: async ({ request, locals }) => {
		const session = await locals.getSession();
		if (!session) return fail(401, { message: 'Unauthorized' });

		const formData = await request.formData();
		const actionType = formData.get('actionType') as string; // 'draft' or 'under_review'

		if (!actionType) {
			return fail(400, { message: 'Missing submission parameters' });
		}

		const status = actionType === 'draft' ? 'draft' : 'under_review';
			// Extract Regular Article Fields
			const title = formData.get('title') as string;
			const author_name_credentials = formData.get('author_name_credentials') as string;
			const category = formData.get('category') as string;
			const tagsStr = formData.get('tags') as string;
			const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()) : [];
			const cover_image_url = formData.get('cover_image_url') as string;
			const abstract = formData.get('abstract') as string;
			
			// Extract Structured Content Fields
			const introduction = formData.get('introduction') as string;
			const background = formData.get('background') as string;
			const purpose = formData.get('purpose') as string;
			const scope = formData.get('scope') as string;
			
			const explanation = formData.get('explanation') as string;
			const evidence = formData.get('evidence') as string;
			const examples = formData.get('examples') as string;
			
			const interpretation = formData.get('interpretation') as string;
			const implications = formData.get('implications') as string;
			const recommendations = formData.get('recommendations') as string;
			
			const conclusion_summary = formData.get('conclusion_summary') as string;
			const takeaways = formData.get('takeaways') as string;
			
			const references_text = formData.get('references_text') as string;
			const acknowledgements = formData.get('acknowledgements') as string;
			const appendix = formData.get('appendix') as string;

			if (!title) return fail(400, { message: 'Title is required' });

			const insertData = {
				author_id: session.user.id,
				title,
				author_name_credentials,
				category,
				tags,
				cover_image_url,
				abstract,
				introduction,
				background,
				purpose,
				scope,
				explanation,
				evidence,
				examples,
				interpretation,
				implications,
				recommendations,
				conclusion_summary,
				takeaways,
				references_text,
				acknowledgements,
				appendix,
				status,
			};

			const { data: newArticle, error } = await supabaseAdmin
				.from('articles')
				.insert([insertData])
				.select('id')
				.single();

			if (error) {
				console.error("Insert article error:", error);
				return fail(500, { message: 'Failed to save regular article' });
			}

			// NOTIFICATION TRIGGER
			if (status === 'under_review' && newArticle?.id) {
				const { data: userProfile } = await supabaseAdmin.from('profiles').select('name').eq('id', session.user.id).single();
				await createAdminNotification(
					'New Article Submission',
					`Dr. ${userProfile?.name || 'A user'} has submitted a new article: "${title}".`,
					'info',
					undefined,
					`/cms/review/article/${newArticle.id}`
				);
			}

		// Redirect to dashboard on success
		throw redirect(303, '/cms/doctor-dashboard');
	}
};

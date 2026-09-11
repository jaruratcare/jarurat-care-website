import { redirect } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/supabaseAdmin';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, '/cms/login');
	}

	const [ { data: savedArticlesRows }, { data: savedResearchRows } ] = await Promise.all([
		supabaseAdmin
			.from('saved_articles')
			.select('article_id, created_at')
			.eq('user_id', session.user.id)
			.order('created_at', { ascending: false }),
		supabaseAdmin
			.from('saved_research_articles')
			.select('research_article_id, created_at')
			.eq('user_id', session.user.id)
			.order('created_at', { ascending: false })
	]);

	const articleIds = (savedArticlesRows ?? []).map(r => r.article_id).filter(Boolean);
	const researchIds = (savedResearchRows ?? []).map(r => r.research_article_id).filter(Boolean);

	let savedArticlesAndResearch: any[] = [];

	if (articleIds.length > 0 || researchIds.length > 0) {
		const [ { data: savedArticlesData }, { data: savedResearchData } ] = await Promise.all([
			articleIds.length > 0 ? supabaseAdmin.from('articles').select('id, title, category, author_id, author_name_credentials').in('id', articleIds) : Promise.resolve({ data: [] }),
			researchIds.length > 0 ? supabaseAdmin.from('research_articles').select('id, title, user_id, authors_and_affiliations').in('id', researchIds) : Promise.resolve({ data: [] })
		]);

		const allAuthorIds = [
			...(savedArticlesData || []).map(a => a.author_id),
			...(savedResearchData || []).map(r => r.user_id)
		].filter(Boolean);

		const authorMap = new Map<string, string>();
		if (allAuthorIds.length > 0) {
			const { data: authors } = await supabaseAdmin
				.from('profiles')
				.select('id, full_name')
				.in('id', allAuthorIds);
			authors?.forEach(a => authorMap.set(a.id, a.full_name || 'Unknown'));
		}

		const articleMap = new Map((savedArticlesData || []).map(a => [a.id, a]));
		const researchMap = new Map((savedResearchData || []).map(r => [r.id, r]));

		const mappedArticles = (savedArticlesRows ?? []).map(row => {
			const article = articleMap.get(row.article_id);
			if (article) {
				return {
					id: article.id,
					title: article.title,
					category: article.category || 'Article',
					authorName: article.author_name_credentials || authorMap.get(article.author_id) || 'Unknown Author',
					savedAt: row.created_at,
					type: 'article'
				};
			}
			return null;
		}).filter(Boolean);

		const mappedResearch = (savedResearchRows ?? []).map(row => {
			const research = researchMap.get(row.research_article_id);
			if (research) {
				return {
					id: research.id,
					title: research.title,
					category: 'Research',
					authorName: research.authors_and_affiliations || authorMap.get(research.user_id) || 'Unknown Researcher',
					savedAt: row.created_at,
					type: 'research'
				};
			}
			return null;
		}).filter(Boolean);

		savedArticlesAndResearch = [...mappedArticles, ...mappedResearch].sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
	}

	return {
		savedArticlesAndResearch
	};
};

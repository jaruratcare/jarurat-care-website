import { cmsSupabase } from '$lib/cmsSupabase';
import { supabase } from '$lib/supabase';
import { supabaseAdmin } from '$lib/supabaseAdmin';
import type { PageServerLoad } from './$types';

function stripHtml(html: string) {
	return (html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function makeExcerpt(text: string, max = 160) {
	const plain = stripHtml(text);
	return plain.length > max ? plain.slice(0, max) + '…' : plain;
}

function formatDate(d: string) {
	if (!d) return '';
	return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(d));
}

const DEFAULT_IMAGE_COUNTS: Record<string, number> = {
	article: 8,
	research: 8,
	blog: 2,
	campaign: 3,
	event: 3,
	faq: 3,
	news: 3,
	testimonials: 3
};

const FOLDER_MAP: Record<string, string> = {
	article: 'Articles',
	research: 'Articles',
	blog: 'Blogs',
	campaign: 'Campaign',
	event: 'Events',
	faq: 'FAQs',
	news: 'News',
	testimonials: 'Testimonials'
};

function getDefaultThumbnail(type: string, id: string | number) {
	const safeType = type || 'article';
	const count = DEFAULT_IMAGE_COUNTS[safeType] || 1;
	const folder = FOLDER_MAP[safeType] || 'Articles';
	
	let numId = 0;
	if (typeof id === 'number') {
		numId = id;
	} else if (typeof id === 'string') {
		for (let i = 0; i < id.length; i++) {
			numId = (numId << 5) - numId + id.charCodeAt(i);
			numId |= 0;
		}
		numId = Math.abs(numId);
	}
	
	const index = (numId % count) + 1;
	const filePrefix = safeType === 'research' ? 'article' : safeType;
	return `/defaults/${folder}/${filePrefix}-${index}.jpeg`;
}

import { fail } from '@sveltejs/kit';

export const actions = {
	toggleSave: async ({ request, locals }) => {
		const session = await locals.getSession();
		if (!session) return fail(401, { message: 'Unauthorized' });

		const formData = await request.formData();
		const articleId = formData.get('articleId') as string;
		const isSaved = formData.get('isSaved') === 'true';

		if (!articleId) return fail(400, { message: 'Missing articleId' });

		if (isSaved) {
			const { error } = await supabaseAdmin
				.from('saved_articles')
				.delete()
				.match({ user_id: session.user.id, article_id: articleId });
			if (error) {
				console.error('Delete save error:', error);
				return fail(500, { message: 'Database error' });
			}
		} else {
			const { error } = await supabaseAdmin
				.from('saved_articles')
				.insert({ user_id: session.user.id, article_id: articleId });
			if (error) {
				console.error('Insert save error:', error);
				return fail(500, { message: 'Database error' });
			}
		}
		
		return { success: true };
	},

	toggleLike: async ({ request, locals }) => {
		const session = await locals.getSession();
		if (!session) return fail(401, { message: 'Unauthorized' });

		const formData = await request.formData();
		const articleId = formData.get('articleId') as string;
		const isLiked = formData.get('isLiked') === 'true';

		if (!articleId) return fail(400, { message: 'Missing articleId' });

		if (isLiked) {
			const { error } = await supabaseAdmin
				.from('article_likes')
				.delete()
				.match({ user_id: session.user.id, article_id: articleId });
			if (error) {
				console.error('Delete like error:', error);
				return fail(500, { message: 'Database error' });
			}
		} else {
			const { error } = await supabaseAdmin
				.from('article_likes')
				.insert({ user_id: session.user.id, article_id: articleId });
			if (error) {
				console.error('Insert like error:', error);
				return fail(500, { message: 'Database error' });
			}
		}
		
		return { success: true };
	}
};

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	// Run all DB calls in parallel
	const [
		savedRows,
		likedRows,
		researchData,
		cmsData,
		articlesData
	] = await Promise.all([
		session
			? supabaseAdmin.from('saved_articles').select('article_id').eq('user_id', session.user.id)
			: Promise.resolve({ data: [] }),
		session
			? supabaseAdmin.from('article_likes').select('article_id').eq('user_id', session.user.id)
			: Promise.resolve({ data: [] }),
		supabaseAdmin
			.from('research_articles')
			.select('*')
			.eq('status', 'published')
			.order('created_at', { ascending: false }),
		supabaseAdmin
			.from('cms_content')
			.select('*')
			.eq('status', 'published')
			.order('created_at', { ascending: false }),
		supabaseAdmin
			.from('articles')
			.select('*')
			.eq('status', 'published')
			.order('created_at', { ascending: false })
	]);

	const savedArticleIds = (savedRows.data || []).map((r: any) => String(r.article_id));
	const likedArticleIds = (likedRows.data || []).map((r: any) => String(r.article_id));

	const researchItems = (researchData.data || []).map((r: any) => ({
		id: r.id,
		slug: r.slug || r.id,
		title: r.title || 'Untitled Research',
		excerpt: makeExcerpt(r.abstract || ''),
		thumbnail: r.featured_image || getDefaultThumbnail('research', r.id),
		category: 'Research Paper',
		type: 'research',
		date: formatDate(r.created_at),
		date_raw: new Date(r.created_at).getTime(),
		author: r.author_name_credentials || r.author || 'Research Team',
		likes_count: Number(r.likes_count || 0),
		saves_count: Number(r.saves_count || 0),
		views_count: Number(r.views_count || 0)
	}));

	const cmsItems = (cmsData.data || []).map((c: any) => ({
		id: c.id,
		slug: c.slug || c.id,
		title: c.title || 'Untitled',
		excerpt: makeExcerpt(c.content || ''),
		thumbnail: c.featured_image || getDefaultThumbnail(c.content_type, c.id),
		category: c.category || c.content_type.charAt(0).toUpperCase() + c.content_type.slice(1),
		type: c.content_type,
		date: formatDate(c.created_at),
		date_raw: new Date(c.created_at).getTime(),
		author: c.author_name_credentials || c.author || 'Editorial Team',
		likes_count: Number(c.likes_count || 0),
		saves_count: Number(c.saves_count || 0),
		views_count: Number(c.views_count || 0)
	}));

	const legacyItems = (articlesData.data || []).map((a: any) => ({
		id: a.id,
		slug: a.slug || a.id.toString(),
		title: a.title || 'Untitled Article',
		excerpt: makeExcerpt(a.abstract || a.content || a.excerpt || ''),
		thumbnail: a.cover_image_url || a.image || getDefaultThumbnail('article', a.id.toString()),
		category: a.category || 'General Article',
		type: 'article',
		date: formatDate(a.created_at),
		date_raw: new Date(a.created_at).getTime(),
		author: a.author_name_credentials || a.author || 'JCF Team',
		likes_count: Number(a.likes_count || 0),
		saves_count: Number(a.saves_count || 0),
		views_count: Number(a.views_count || a.views || 0)
	}));

	const publications = [...researchItems, ...cmsItems, ...legacyItems].sort(
		(a, b) => b.date_raw - a.date_raw
	);

	return {
		publications,
		savedArticleIds,
		likedArticleIds,
		session
	};
};

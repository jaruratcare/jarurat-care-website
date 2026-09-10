import { cmsSupabase } from '$lib/cmsSupabase';
import { supabaseAdmin } from '$lib/supabaseAdmin';
import { fail, error as svelteError } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

type ContentType = 'article' | 'research' | string;

export const load: PageServerLoad = async ({
	params,
	locals,
	cookies
}) => {
	const { type, slug } = params;

	let articleData: any = null;

	// =========================================================
	// 1. LOAD CONTENT
	// =========================================================

	if (type === 'research') {
		const { data, error: dbError } = await cmsSupabase
			.from('research_articles')
			.select('*')
			.eq('id', slug)
			.eq('status', 'published')
			.maybeSingle();

		if (dbError) {
			console.error('Research article error:', dbError);
			throw svelteError(500, 'Unable to load research paper');
		}

		if (!data) {
			throw svelteError(404, 'Research paper not found');
		}

		articleData = {
			...data,
			featured_image: data.featured_image || null,
			source_table: 'research_articles',
			abstract: data.abstract || '',
			author_name_credentials:
				data.authors_and_affiliations || ''
		};
	} else if (type === 'article') {
		const { data, error: dbError } = await supabaseAdmin
			.from('articles')
			.select('*')
			.eq('id', slug)
			.eq('status', 'published')
			.maybeSingle();

		if (dbError) {
			console.error('Article database error:', dbError);
			throw svelteError(500, 'Unable to load article');
		}

		if (!data) {
			throw svelteError(404, 'Article not found');
		}

		articleData = {
			...data,
			featured_image:
				data.cover_image_url || data.image || null,
			source_table: 'articles',
			abstract: data.abstract || data.content || '',
			views_count: data.views || 0
		};
	} else {
		let { data, error: dbError } = await cmsSupabase
			.from('cms_content')
			.select('*')
			.eq('slug', slug)
			.eq('content_type', type)
			.eq('status', 'published')
			.maybeSingle();

		const uuidRegex =
			/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

		if (!data && uuidRegex.test(slug)) {
			const result = await cmsSupabase
				.from('cms_content')
				.select('*')
				.eq('id', slug)
				.eq('content_type', type)
				.eq('status', 'published')
				.maybeSingle();

			data = result.data;
			dbError = result.error;
		}

		if (dbError) {
			console.error('CMS content error:', dbError);
			throw svelteError(500, 'Unable to load content');
		}

		if (!data) {
			throw svelteError(404, 'Content not found');
		}

		articleData = {
			...data,
			source_table: 'cms_content'
		};
	}

	if (!articleData?.id) {
		throw svelteError(500, 'Content ID is missing');
	}

	// =========================================================
	// 2. GET CURRENT USER
	// =========================================================

	let userId: string | null = null;

	try {
		const {
			data: { user }
		} = await locals.supabase.auth.getUser();

		userId = user?.id ?? null;
	} catch (authError) {
		console.error('Auth lookup failed:', authError);
	}

	// =========================================================
	// 3. SESSION FOR VIEW ANALYTICS
	// =========================================================

	let sessionId = cookies.get('analytics_session_id');

	if (!sessionId) {
		sessionId = crypto.randomUUID();

		cookies.set('analytics_session_id', sessionId, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 365
		});
	}

	// =========================================================
	// 4. RECORD ANALYTICS VIEW
	// =========================================================

	try {
		const { error: analyticsError } = await supabaseAdmin
			.from('analytics_events')
			.insert({
				user_id: userId,
				event_type: 'view',
				content_id: articleData.id,
				content_type: type,
				session_id: sessionId
			});

		if (analyticsError) {
			console.error(
				'Analytics event insert error:',
				analyticsError
			);
		}
	} catch (analyticsError) {
		console.error(
			'View analytics failed:',
			analyticsError
		);
	}

	// =========================================================
	// 5. INCREMENT CONTENT VIEW COUNTER
	// =========================================================

	/*
	 * analytics_events and the actual content counter
	 * are two separate things.
	 *
	 * analytics_events = detailed tracking
	 * views/views_count = displayed content counter
	 */

	try {
		if (type === 'research') {
			const { error } = await supabaseAdmin.rpc(
				'increment_research_article_views',
				{
					p_research_article_id: articleData.id
				}
			);

			if (error) {
				console.error(
					'Research view counter RPC error:',
					error
				);

				// Fallback
				const currentViews =
					Number(articleData.views_count || 0);

				await supabaseAdmin
					.from('research_articles')
					.update({
						views_count: currentViews + 1
					})
					.eq('id', articleData.id);
			}
		} else if (type === 'article') {
			const currentViews = Number(
				articleData.views_count || 0
			);

			await supabaseAdmin
				.from('articles')
				.update({
					views: currentViews + 1
				})
				.eq('id', articleData.id);
		}
	} catch (viewError) {
		console.error(
			'Content view counter failed:',
			viewError
		);
	}

	// =========================================================
	// 6. GET LIKE / SAVE STATE
	// =========================================================

	let isLiked = false;
	let isSaved = false;

	if (userId) {
		try {
			if (type === 'research') {
				const { data: likeData } =
					await supabaseAdmin
						.from('research_article_likes')
						.select('id')
						.eq(
							'research_article_id',
							articleData.id
						)
						.eq('user_id', userId)
						.maybeSingle();

				const { data: saveData } =
					await supabaseAdmin
						.from('saved_research_articles')
						.select('id')
						.eq(
							'research_article_id',
							articleData.id
						)
						.eq('user_id', userId)
						.maybeSingle();

				isLiked = !!likeData;
				isSaved = !!saveData;
			} else if (type === 'article') {
				const { data: likeData } =
					await supabaseAdmin
						.from('article_likes')
						.select('id')
						.eq('article_id', articleData.id)
						.eq('user_id', userId)
						.maybeSingle();

				const { data: saveData } =
					await supabaseAdmin
						.from('saved_articles')
						.select('id')
						.eq('article_id', articleData.id)
						.eq('user_id', userId)
						.maybeSingle();

				isLiked = !!likeData;
				isSaved = !!saveData;
			}
		} catch (stateError) {
			console.error(
				'Like/save state error:',
				stateError
			);
		}
	}

	// =========================================================
	// 7. NORMALIZE COUNTS
	// =========================================================

	const likesCount = Number(
		articleData.likes_count || 0
	);

	const savesCount = Number(
		articleData.saves_count || 0
	);

	const viewsCount = Number(
		type === 'research'
			? articleData.views_count || 0
			: articleData.views || 0
	);

	// =========================================================
	// 8. COMMENTS
	// =========================================================

	let comments: any[] = [];

	try {
		const tableName = type === 'research' ? 'research_article_comments' : 'article_comments';
		const idColumn = type === 'research' ? 'research_article_id' : 'article_id';

		const { data: commentsData, error: commentsError } =
			await supabaseAdmin
				.from(tableName)
				.select(
					'id, content, created_at, user_id'
				)
				.eq(idColumn, articleData.id)
				.order('created_at', {
					ascending: true
				});

		if (commentsError) {
			throw commentsError;
		}

		if (commentsData?.length) {
			const userIds = [
				...new Set(
					commentsData.map(
						(comment) => comment.user_id
					)
				)
			];

			const { data: profilesData } =
				await supabaseAdmin
					.from('profiles')
					.select('id, full_name')
					.in('id', userIds);

			const profilesMap = new Map(
				(profilesData || []).map(
					(profile) => [
						profile.id,
						profile
					]
				)
			);

			comments = commentsData.map(
				(comment) => ({
					...comment,
					profiles:
						profilesMap.get(
							comment.user_id
						) || {
							full_name:
								'Anonymous'
						}
				})
			);
		}
	} catch (commentsError) {
		console.error(
			'Error fetching comments:',
			commentsError
		);
	}

	
	// RETURN

	return {
		article: {
			...articleData,
			likes_count: likesCount,
			saves_count: savesCount,
			views_count: viewsCount
		},
		type,
		comments,
		isLiked,
		isSaved,
		isLoggedIn: !!userId
	};
};

// ACTIONS

export const actions: Actions = {
	// LIKE / UNLIKE

	toggleLike: async ({ request, locals }) => {
		const {
			data: { user }
		} = await locals.supabase.auth.getUser();

		if (!user) {
			return fail(401, {
				message: 'Please login to like this content'
			});
		}

		const formData = await request.formData();

		const contentId = String(
			formData.get('contentId') || ''
		);

		const contentType = String(
			formData.get('contentType') || ''
		);

		if (!contentId || !contentType) {
			return fail(400, {
				message: 'Missing content information'
			});
		}

		// RESEARCH

		if (contentType === 'research') {
			const { data: existing } =
				await supabaseAdmin
					.from('research_article_likes')
					.select('id')
					.eq(
						'research_article_id',
						contentId
					)
					.eq('user_id', user.id)
					.maybeSingle();

			if (existing) {
				const { error } =
					await supabaseAdmin
						.from(
							'research_article_likes'
						)
						.delete()
						.eq('id', existing.id);

				if (error) {
					console.error(
						'Research unlike error:',
						error
					);

					return fail(500, {
						message:
							'Could not unlike research paper'
					});
				}

				const { data: paper } =
					await supabaseAdmin
						.from('research_articles')
						.select('likes_count')
						.eq('id', contentId)
						.single();

				const newCount = Math.max(
					0,
					Number(
						paper?.likes_count || 0
					) - 1
				);

				await supabaseAdmin
					.from('research_articles')
					.update({
						likes_count: newCount
					})
					.eq('id', contentId);

				return {
					success: true,
					liked: false,
					likesCount: newCount
				};
			}

			const { error: insertError } =
				await supabaseAdmin
					.from('research_article_likes')
					.insert({
						research_article_id:
							contentId,
						user_id: user.id
					});

			if (insertError) {
				console.error(
					'Research like error:',
					insertError
				);

				return fail(500, {
					message:
						'Could not like research paper'
				});
			}

			const { data: paper } =
				await supabaseAdmin
					.from('research_articles')
					.select('likes_count')
					.eq('id', contentId)
					.single();

			const newCount =
				Number(
					paper?.likes_count || 0
				) + 1;

			await supabaseAdmin
				.from('research_articles')
				.update({
					likes_count: newCount
				})
				.eq('id', contentId);

			return {
				success: true,
				liked: true,
				likesCount: newCount
			};
		}
		// -----------------------------------------------------
		// NORMAL ARTICLE OR CMS CONTENT
		// -----------------------------------------------------

		if (contentType !== 'research') {
			const targetTable = contentType === 'article' ? 'articles' : 'cms_content';

			const { data: existing } =
				await supabaseAdmin
					.from('article_likes')
					.select('id')
					.eq('article_id', contentId)
					.eq('user_id', user.id)
					.maybeSingle();

			if (existing) {
				await supabaseAdmin
					.from('article_likes')
					.delete()
					.eq('id', existing.id);

				const { data: article } =
					await supabaseAdmin
						.from(targetTable)
						.select('likes_count')
						.eq('id', contentId)
						.single();

				const newCount = Math.max(
					0,
					Number(
						article?.likes_count || 0
					) - 1
				);

				await supabaseAdmin
					.from(targetTable)
					.update({
						likes_count: newCount
					})
					.eq('id', contentId);

				return {
					success: true,
					liked: false,
					likesCount: newCount
				};
			}

			const { error } =
				await supabaseAdmin
					.from('article_likes')
					.insert({
						article_id: contentId,
						user_id: user.id
					});

			if (error) {
				console.error(
					'Article like error:',
					error
				);

				return fail(500, {
					message:
						'Could not like article'
				});
			}

			const { data: article } =
				await supabaseAdmin
					.from(targetTable)
					.select('likes_count')
					.eq('id', contentId)
					.single();

			const newCount =
				Number(
					article?.likes_count || 0
				) + 1;

			await supabaseAdmin
				.from(targetTable)
				.update({
					likes_count: newCount
				})
				.eq('id', contentId);

			return {
				success: true,
				liked: true,
				likesCount: newCount
			};
		}

		return fail(400, {
			message:
				'Likes are not supported for this content type'
		});
	},

	// =========================================================
	// SAVE / UNSAVE
	// =========================================================

	toggleSave: async ({ request, locals }) => {
		const {
			data: { user }
		} = await locals.supabase.auth.getUser();

		if (!user) {
			return fail(401, {
				message: 'Please login to save this content'
			});
		}

		const formData = await request.formData();

		const contentId = String(
			formData.get('contentId') || ''
		);

		const contentType = String(
			formData.get('contentType') || ''
		);

		if (!contentId || !contentType) {
			return fail(400, {
				message: 'Missing content information'
			});
		}

		// -----------------------------------------------------
		// RESEARCH
		// -----------------------------------------------------

		if (contentType === 'research') {
			const { data: existing } =
				await supabaseAdmin
					.from('saved_research_articles')
					.select('id')
					.eq(
						'research_article_id',
						contentId
					)
					.eq('user_id', user.id)
					.maybeSingle();

			if (existing) {
				const { error } =
					await supabaseAdmin
						.from(
							'saved_research_articles'
						)
						.delete()
						.eq('id', existing.id);

				if (error) {
					console.error(
						'Research unsave error:',
						error
					);

					return fail(500, {
						message:
							'Could not remove saved research paper'
					});
				}

				const { data: paper } =
					await supabaseAdmin
						.from('research_articles')
						.select('saves_count')
						.eq('id', contentId)
						.single();

				const newCount = Math.max(
					0,
					Number(
						paper?.saves_count || 0
					) - 1
				);

				await supabaseAdmin
					.from('research_articles')
					.update({
						saves_count: newCount
					})
					.eq('id', contentId);

				return {
					success: true,
					saved: false,
					savesCount: newCount
				};
			}

			const { error: insertError } =
				await supabaseAdmin
					.from('saved_research_articles')
					.insert({
						research_article_id:
							contentId,
						user_id: user.id
					});

			if (insertError) {
				console.error(
					'Research save error:',
					insertError
				);

				return fail(500, {
					message:
						'Could not save research paper'
				});
			}

			const { data: paper } =
				await supabaseAdmin
					.from('research_articles')
					.select('saves_count')
					.eq('id', contentId)
					.single();

			const newCount =
				Number(
					paper?.saves_count || 0
				) + 1;

			await supabaseAdmin
				.from('research_articles')
				.update({
					saves_count: newCount
				})
				.eq('id', contentId);

			return {
				success: true,
				saved: true,
				savesCount: newCount
			};
		}

		// -----------------------------------------------------
		// NORMAL ARTICLE OR CMS CONTENT
		// -----------------------------------------------------

		if (contentType !== 'research') {
			const targetTable = contentType === 'article' ? 'articles' : 'cms_content';

			const { data: existing } =
				await supabaseAdmin
					.from('saved_articles')
					.select('id')
					.eq('article_id', contentId)
					.eq('user_id', user.id)
					.maybeSingle();

			if (existing) {
				await supabaseAdmin
					.from('saved_articles')
					.delete()
					.eq('id', existing.id);

				const { data: article } =
					await supabaseAdmin
						.from(targetTable)
						.select('saves_count')
						.eq('id', contentId)
						.single();

				const newCount = Math.max(
					0,
					Number(
						article?.saves_count || 0
					) - 1
				);

				await supabaseAdmin
					.from(targetTable)
					.update({
						saves_count: newCount
					})
					.eq('id', contentId);

				return {
					success: true,
					saved: false,
					savesCount: newCount
				};
			}

			const { error } =
				await supabaseAdmin
					.from('saved_articles')
					.insert({
						article_id: contentId,
						user_id: user.id
					});

			if (error) {
				console.error(
					'Article save error:',
					error
				);

				return fail(500, {
					message:
						'Could not save article'
				});
			}

			const { data: article } =
				await supabaseAdmin
					.from(targetTable)
					.select('saves_count')
					.eq('id', contentId)
					.single();

			const newCount =
				Number(
					article?.saves_count || 0
				) + 1;

			await supabaseAdmin
				.from(targetTable)
				.update({
					saves_count: newCount
				})
				.eq('id', contentId);

			return {
				success: true,
				saved: true,
				savesCount: newCount
			};
		}

		return fail(400, {
			message:
				'Saves are not supported for this content type'
		});
	},

	// =========================================================
	// COMMENTS
	// =========================================================

	submitComment: async ({
		request,
		locals
	}) => {
		const {
			data: { user }
		} = await locals.supabase.auth.getUser();

		if (!user) {
			return fail(401, {
				message: 'Unauthorized'
			});
		}

		const formData =
			await request.formData();

		const content =
			String(
				formData.get('content') || ''
			).trim();

		const articleId =
			String(
				formData.get('articleId') || ''
			);

		const contentType = String(formData.get('contentType') || '');

		if (!content || !articleId) {
			return fail(400, {
				message: 'Missing data'
			});
		}

		const tableName = contentType === 'research' ? 'research_article_comments' : 'article_comments';
		const insertData: any = {
			user_id: user.id,
			content
		};
		
		if (contentType === 'research') {
			insertData.research_article_id = articleId;
		} else {
			insertData.article_id = articleId;
		}

		const { error: insertError } =
			await supabaseAdmin
				.from(tableName)
				.insert(insertData);

		if (insertError) {
			console.error(
				'Insert comment error:',
				insertError
			);

			return fail(500, {
				message:
					'Failed to insert comment'
			});
		}

		return {
			success: true
		};
	}
};
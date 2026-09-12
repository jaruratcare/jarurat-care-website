import { fail, redirect } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/supabaseAdmin';
import { cmsSupabase } from '$lib/cmsSupabase';
import { createGlobalNotification } from '$lib/server/notifications';
import type { PageServerLoad, Actions } from './$types';

/* =========================================================
   TYPES
========================================================= */

type AdminRole = 'Admin' | 'Super_Admin';

type CommunityDoctor = {
	id: string;
	name: string;
	email: string | null;
	specialization: string | null;
	organization: string | null;
	avatar: string | null;
	verification_status: string | null;
	is_author: boolean;
	is_reviewer: boolean;
	followersCount: number;
	followingCount: number;
	articlesCount: number;
	researchCount: number;
};

type AnalyticsData = {
	totalUsers: number;
	totalDoctors: number;
	totalReaders: number;
	totalAdmins: number;

	totalArticles: number;
	totalResearchPapers: number;
	totalCMSContent: number;

	totalViews: number;
	uniqueVisitors: number;

	totalLikes: number;
	totalSaves: number;
	totalShares: number;
	totalComments: number;

	totalEngagement: number;

	dailyActiveUsers: any[];
	mostPopularContent: any[];
	engagementTrend: any[];
};

/* =========================================================
   HELPERS
========================================================= */

async function getCurrentProfile(locals: any, userId: string) {
	const { data, error } = await locals.supabase
		.from('profiles')
		.select('*')
		.eq('id', userId)
		.maybeSingle();

	return {
		profile: data,
		error
	};
}

function isAdminRole(role: string | null | undefined): role is AdminRole {
	return role === 'Admin' || role === 'Super_Admin';
}

async function requireAdmin(locals: any) {
	const session = await locals.getSession();

	if (!session) {
		return {
			ok: false,
			status: 401,
			message: 'Unauthorized',
			session: null,
			profile: null
		};
	}

	const { profile, error } = await getCurrentProfile(
		locals,
		session.user.id
	);

	if (error || !profile || !isAdminRole(profile.role)) {
		return {
			ok: false,
			status: 403,
			message: 'Forbidden',
			session,
			profile
		};
	}

	return {
		ok: true,
		status: 200,
		message: '',
		session,
		profile
	};
}

async function requireSuperAdmin(locals: any) {
	const result = await requireAdmin(locals);

	if (!result.ok) {
		return result;
	}

	if (result.profile?.role !== 'Super_Admin') {
		return {
			...result,
			ok: false,
			status: 403,
			message: 'Super Admin access required'
		};
	}

	return result;
}

/* =========================================================
   LOAD
========================================================= */

export const load: PageServerLoad = async ({ locals }) => {
	/* =======================================================
	   SESSION
	======================================================= */

	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, '/cms/login');
	}

	/* =======================================================
	   CURRENT USER
	======================================================= */

	const { profile: userProfile, error: profileError } =
		await getCurrentProfile(locals, session.user.id);

	if (profileError || !userProfile) {
		console.error(
			'Super admin profile error:',
			profileError
		);

		throw redirect(303, '/cms/login');
	}

	if (!isAdminRole(userProfile.role)) {
		throw redirect(303, '/');
	}

	/* =======================================================
	   FETCH ALL USERS
	======================================================= */

	const {
		data: usersData,
		error: usersError
	} = await supabaseAdmin
		.from('profiles')
		.select('*')
		.order('created_at', {
			ascending: false
		});

	if (usersError) {
		console.error(
			'Error fetching users:',
			usersError
		);
	}

	const users = usersData ?? [];

	/* =======================================================
	   DOCTORS
	======================================================= */

	const doctors = users.filter(
		(user: any) => user.role === 'Doctor'
	);

	const verifiedDoctors = doctors.filter(
		(doctor: any) =>
			doctor.verification_status === 'approved'
	);

	/* =======================================================
	   PENDING / REGISTERED DOCTORS
	======================================================= */

	const pendingDoctors = doctors.filter(
	(doctor: any) =>
		doctor.verification_status === 'pending'
);

	/* =======================================================
	   PUBLISHED ARTICLES
	======================================================= */

	const {
		data: allArticlesData,
		error: articlesError
	} = await supabaseAdmin
		.from('articles')
		.select(`
			id,
			title,
			excerpt,
			category,
			author_id,
			status,
			views,
			likes_count,
			saves_count,
			cover_image_url,
			created_at,
			updated_at
		`)
		.order('created_at', {
			ascending: false
		});

	if (articlesError) {
		console.error(
			'Error loading articles:',
			articlesError
		);
	}

	const allArticles = allArticlesData ?? [];

	const publishedArticles = allArticles.filter(
		(article: any) =>
			article.status === 'published'
	);

	/* =======================================================
	   RESEARCH PAPERS
	======================================================= */

	const {
		data: allResearchData,
		error: researchError
	} = await supabaseAdmin
		.from('research_articles')
		.select(`
			id,
			user_id,
			title,
			subtitle,
			abstract,
			keywords,
			status,
			featured_image,
			views_count,
			likes_count,
			saves_count,
			created_at,
			updated_at
		`)
		.order('created_at', {
			ascending: false
		});

	if (researchError) {
		console.error(
			'Error loading research papers:',
			researchError
		);
	}

	const allResearch = allResearchData ?? [];

	const publishedResearch = allResearch.filter(
		(research: any) =>
			research.status === 'published'
	);

	/* =======================================================
	   APPROVED / PENDING CONTENT
	======================================================= */

	const approvedArticles = allArticles.filter(
		(article: any) =>
			article.status === 'approved' ||
			article.status === 'under_review'
	);

	const approvedResearch = allResearch.filter(
		(research: any) =>
			research.status === 'approved' ||
			research.status === 'under_review'
	);

	/* =======================================================
	   CMS CONTENT
	======================================================= */

	const {
		data: cmsContentsData,
		error: cmsError
	} = await supabaseAdmin
		.from('cms_content')
		.select('*')
		.order('created_at', {
			ascending: false
		});

	if (cmsError) {
		console.error(
			'Error loading CMS content:',
			cmsError
		);
	}

	const cmsContents = cmsContentsData ?? [];

	/* =======================================================
	   PUBLISHED CONTENT COMBINED
	======================================================= */

	const publishedContent = [
		...publishedArticles.map(
			(article: any) => ({
				...article,
				type: 'Article',
				content_type: 'article',
				display_views:
					Number(article.views ?? 0),
				display_likes:
					Number(article.likes_count ?? 0),
				display_saves:
					Number(article.saves_count ?? 0)
			})
		),

		...publishedResearch.map(
			(research: any) => ({
				...research,
				type: 'Research',
				content_type: 'research',
				display_views:
					Number(research.views_count ?? 0),
				display_likes:
					Number(research.likes_count ?? 0),
				display_saves:
					Number(research.saves_count ?? 0)
			})
		),

		...cmsContents
			.filter(
				(content: any) =>
					content.status === 'published'
			)
			.map(
				(content: any) => ({
					...content,
					type: 'CMS',
					content_type:
						content.content_type,
					display_views:
						Number(content.views_count ?? 0),
					display_likes:
						Number(content.likes_count ?? 0),
					display_saves:
						Number(content.saves_count ?? 0)
				})
			)
	].sort(
		(a: any, b: any) =>
			new Date(
				b.created_at
			).getTime() -
			new Date(
				a.created_at
			).getTime()
	);

	/* =======================================================
	   ARTICLE COUNTS PER DOCTOR
	======================================================= */

	const articleCounts: Record<string, number> = {};
	const researchCounts: Record<string, number> = {};

	for (const article of publishedArticles) {
		if (article.author_id) {
			articleCounts[article.author_id] =
				(articleCounts[article.author_id] ?? 0) + 1;
		}
	}

	for (const research of publishedResearch) {
		if (research.user_id) {
			researchCounts[research.user_id] =
				(researchCounts[research.user_id] ?? 0) + 1;
		}
	}

	/* =======================================================
	   FOLLOWER / FOLLOWING COUNTS
	   
	   doctor_follows:
	   follower_id -> person following
	   doctor_id   -> doctor being followed
	======================================================= */

	const {
		data: followRows,
		error: followError
	} = await supabaseAdmin
		.from('doctor_followers')
		.select('id, follower_id, doctor_id');

	if (followError) {
		console.error(
			'Error loading doctor follows:',
			followError
		);
	}

	const follows = followRows ?? [];

	const followersCountMap: Record<string, number> = {};
	const followingCountMap: Record<string, number> = {};

	for (const row of follows) {
		if (row.doctor_id) {
			followersCountMap[row.doctor_id] =
				(followersCountMap[row.doctor_id] ?? 0) + 1;
		}

		if (row.follower_id) {
			followingCountMap[row.follower_id] =
				(followingCountMap[row.follower_id] ?? 0) + 1;
		}
	}

	/* =======================================================
	   COMMUNITY — ALL DOCTORS
	======================================================= */

	const communityDoctors: CommunityDoctor[] =
		doctors.map((doctor: any) => ({
			id: doctor.id,

			name:
				doctor.full_name ||
				'Unnamed Doctor',

			email:
				doctor.email ||
				null,

			specialization:
				doctor.specialization ||
				null,

			organization:
				doctor.organization ||
				null,

			avatar:
				doctor.avatar_url ||
				doctor.profile_image ||
				null,

			verification_status:
				doctor.verification_status ||
				null,

			is_author:
				doctor.is_author === true,

			is_reviewer:
				doctor.is_reviewer === true,

			followersCount:
				followersCountMap[doctor.id] ?? 0,

			followingCount:
				followingCountMap[doctor.id] ?? 0,

			articlesCount:
				articleCounts[doctor.id] ?? 0,

			researchCount:
				researchCounts[doctor.id] ?? 0
		}));

	/* =======================================================
	   PUBLISHING DOCTORS
	======================================================= */

	const publishingDoctors =
		verifiedDoctors.map(
			(doctor: any) => ({
				id: doctor.id,

				name:
					doctor.full_name ||
					'Unnamed Doctor',

				email:
					doctor.email || 'No email',

				specialization:
					doctor.specialization ||
					'General',

				organization:
					doctor.organization || '—',

				articles:
					(articleCounts[doctor.id] ?? 0) +
					(researchCounts[doctor.id] ?? 0),

				status:
					doctor.is_author !== false
						? 'granted'
						: 'revoked'
			})
		);

	/* =======================================================
	   CONTENT IDs
	======================================================= */

	const articleIds =
		publishedArticles
			.map((article: any) => article.id)
			.filter(Boolean);

	const researchIds =
		publishedResearch
			.map((research: any) => research.id)
			.filter(Boolean);

	const allPublishedIds = [
		...articleIds,
		...researchIds
	];

	/* =======================================================
	   LIKES
	   
	   article_likes is currently used for both articles
	   and research papers.
	======================================================= */

	let totalLikes = 0;

	if (allPublishedIds.length > 0) {
		const {
			count,
			error
		} = await supabaseAdmin
			.from('article_likes')
			.select('id', {
				count: 'exact',
				head: true
			})
			.in(
				'article_id',
				allPublishedIds
			);

		if (error) {
			console.error(
				'Super admin likes count error:',
				error
			);
		} else {
			totalLikes = count ?? 0;
		}
	}

	/* =======================================================
	   SAVES
	======================================================= */

	let totalSaves = 0;

	if (allPublishedIds.length > 0) {
		const {
			count,
			error
		} = await supabaseAdmin
			.from('saved_articles')
			.select('id', {
				count: 'exact',
				head: true
			})
			.in(
				'article_id',
				allPublishedIds
			);

		if (error) {
			console.error(
				'Super admin saves count error:',
				error
			);
		} else {
			totalSaves = count ?? 0;
		}
	}

	/* =======================================================
	   COMMENTS
	   
	   article_comments uses article_id for content.
	======================================================= */

	let totalComments = 0;

	if (allPublishedIds.length > 0) {
		const {
			count,
			error
		} = await supabaseAdmin
			.from('article_comments')
			.select('id', {
				count: 'exact',
				head: true
			})
			.in(
				'article_id',
				allPublishedIds
			);

		if (error) {
			console.error(
				'Super admin comments count error:',
				error
			);
		} else {
			totalComments = count ?? 0;
		}
	}

	/* =======================================================
	   SHARES
	   
	   Shares are tracked in analytics_events.
	======================================================= */

	let totalShares = 0;

	{
		const {
			count,
			error
		} = await supabaseAdmin
			.from('analytics_events')
			.select('id', {
				count: 'exact',
				head: true
			})
			.eq(
				'event_type',
				'share'
			);

		if (error) {
			console.error(
				'Super admin shares count error:',
				error
			);
		} else {
			totalShares = count ?? 0;
		}
	}

	/* =======================================================
	   VIEWS
	   
	   Use the actual counters from both tables.
	======================================================= */

	const articleViews =
		publishedArticles.reduce(
			(sum: number, article: any) =>
				sum +
				Number(
					article.views ?? 0
				),
			0
		);

	const researchViews =
		publishedResearch.reduce(
			(sum: number, research: any) =>
				sum +
				Number(
					research.views_count ?? 0
				),
			0
		);

	const totalViews =
		articleViews +
		researchViews;

	/* =======================================================
	   UNIQUE VISITORS
	======================================================= */

	let uniqueVisitors = 0;

	{
		const {
			data,
			error
		} = await supabaseAdmin
			.from('analytics_events')
			.select('session_id')
			.eq(
				'event_type',
				'view'
			);

		if (error) {
			console.error(
				'Unique visitor query error:',
				error
			);
		} else {
			uniqueVisitors =
				new Set(
					(data ?? [])
						.map(
							(row: any) =>
								row.session_id
						)
						.filter(Boolean)
				).size;
		}
	}

	/* =======================================================
	   TOTAL ENGAGEMENT
	======================================================= */

	const totalEngagement =
		totalLikes +
		totalSaves +
		totalShares +
		totalComments;

	/* =======================================================
	   DAILY ACTIVE USERS
	======================================================= */

	let dailyActiveUsers: any[] = [];

	{
		const {
			data,
			error
		} = await supabaseAdmin
			.from('analytics_events')
			.select(
				'user_id, created_at'
			)
			.order(
				'created_at',
				{
					ascending: false
				}
			)
			.limit(5000);

		if (error) {
			console.error(
				'DAU query error:',
				error
			);
		} else {
			const grouped =
				new Map<
					string,
					Set<string>
				>();

			for (const row of data ?? []) {
				if (!row.created_at) continue;

				const day =
					new Date(
						row.created_at
					)
						.toISOString()
						.slice(
							0,
							10
						);

				if (!grouped.has(day)) {
					grouped.set(
						day,
						new Set()
					);
				}

				if (row.user_id) {
					grouped
						.get(day)!
						.add(
							row.user_id
						);
				}
			}

			dailyActiveUsers =
				Array.from(
					grouped.entries()
				)
					.sort(
						(a, b) =>
							a[0].localeCompare(
								b[0]
							)
					)
					.slice(-30)
					.map(
						([
							date,
							users
						]) => ({
							date,
							users:
								users.size
						})
					);
		}
	}

	/* =======================================================
	   POPULAR CONTENT

	   IMPORTANT: interaction tables are the source of truth.
	   Do not depend on likes_count/saves_count being synchronized.
	======================================================= */

	const likeCountMap: Record<string, number> = {};
	const saveCountMap: Record<string, number> = {};

	if (allPublishedIds.length > 0) {
		const [{ data: likeRows, error: likeRowsError }, { data: saveRows, error: saveRowsError }] =
			await Promise.all([
				supabaseAdmin
					.from('article_likes')
					.select('article_id')
					.in('article_id', allPublishedIds),
				supabaseAdmin
					.from('saved_articles')
					.select('article_id')
					.in('article_id', allPublishedIds)
			]);

		if (likeRowsError) console.error('Popular content likes query error:', likeRowsError);
	if (saveRowsError) console.error('Popular content saves query error:', saveRowsError);

		for (const row of likeRows ?? []) {
			if (row.article_id) likeCountMap[row.article_id] = (likeCountMap[row.article_id] ?? 0) + 1;
		}

		for (const row of saveRows ?? []) {
			if (row.article_id) saveCountMap[row.article_id] = (saveCountMap[row.article_id] ?? 0) + 1;
		}
	}

	const popularContent = [
		...publishedArticles.map((article: any) => ({
			id: article.id,
			title: article.title,
			type: 'Article',
			category: article.category ?? null,
			created_at: article.created_at,
			views: Number(article.views ?? 0),
			likes: likeCountMap[article.id] ?? 0,
			saves: saveCountMap[article.id] ?? 0,
			image: article.cover_image_url ?? null
		})),
		...publishedResearch.map((research: any) => ({
			id: research.id,
			title: research.title,
			type: 'Research',
			category: 'Research',
			created_at: research.created_at,
			views: Number(research.views_count ?? 0),
			likes: likeCountMap[research.id] ?? 0,
			saves: saveCountMap[research.id] ?? 0,
			image: research.featured_image ?? null
		}))
	]
		.sort((a, b) => b.views - a.views)
		.slice(0, 25);

	/* =======================================================
	   ENGAGEMENT TREND
	======================================================= */

	let engagementTrend: any[] = [];

	{
		const {
			data,
			error
		} = await supabaseAdmin
			.from('analytics_events')
			.select(
				'event_type, created_at'
			)
			.order(
				'created_at',
				{
					ascending: false
				}
			)
			.limit(5000);

		if (error) {
			console.error(
				'Engagement trend error:',
				error
			);
		} else {
			const grouped =
				new Map<
					string,
					{
						views: number;
						likes: number;
						saves: number;
						shares: number;
						comments: number;
					}
				>();

			for (const row of data ?? []) {
				if (!row.created_at) continue;

				const date =
					new Date(
						row.created_at
					)
						.toISOString()
						.slice(
							0,
							10
						);

				if (!grouped.has(date)) {
					grouped.set(
						date,
						{
							views: 0,
							likes: 0,
							saves: 0,
							shares: 0,
							comments: 0
						}
					);
				}

				const item =
					grouped.get(
						date
					)!;

				switch (
					row.event_type
				) {
					case 'view':
						item.views++;
						break;

					case 'like':
						item.likes++;
						break;

					case 'save':
						item.saves++;
						break;

					case 'share':
						item.shares++;
						break;

					case 'comment':
						item.comments++;
						break;
				}
			}

			engagementTrend =
				Array.from(
					grouped.entries()
				)
					.sort(
						(a, b) =>
							a[0].localeCompare(
								b[0]
							)
					)
					.slice(-30)
					.map(
						([
							date,
							values
						]) => ({
							date,
							...values
						})
					);
		}
	}

	/* =======================================================
	   ANALYTICS OBJECT
	   
	   NOTE:
	   totalDownloads intentionally removed.
	======================================================= */

	const analytics: AnalyticsData = {
		totalUsers:
			users.length,

		totalDoctors:
			doctors.length,

		totalReaders:
			users.filter(
				(u: any) =>
					u.role === 'Reader'
			).length,

		totalAdmins:
			users.filter(
				(u: any) =>
					u.role === 'Admin' ||
					u.role === 'Super_Admin'
			).length,

		totalArticles:
			publishedArticles.length,

		totalResearchPapers:
			publishedResearch.length,

		totalCMSContent:
			cmsContents.filter(
				(c: any) =>
					c.status === 'published'
			).length,

		totalViews,

		uniqueVisitors,

		totalLikes,

		totalSaves,

		totalShares,

		totalComments,

		totalEngagement,

		dailyActiveUsers,

		mostPopularContent:
			popularContent,

		engagementTrend
	};

	/* =======================================================
	   CURRENT USER
	======================================================= */

	const currentUser = {
		id: session.user.id,
		name:
			userProfile.full_name ||
			session.user.user_metadata
				?.name ||
			session.user.email?.split(
				'@'
			)[0] ||
			'Super Admin',

		email:
			userProfile.email ||
			session.user.email ||
			'admin@jarurat.care',

		role:
			userProfile.role ||
			'Super_Admin',

		avatar:
			userProfile.avatar_url ||
			''
	};

	/* =======================================================
	   RETURN
	======================================================= */

	return {
		pendingDoctors,
		verifiedDoctors,
		users,

		approvedArticles,
		approvedResearch,
		publishedArticles,
		publishedResearch,

		cmsContents,

		publishedContent,

		publishingDoctors,

		communityDoctors,

		currentUser,

		analytics
	};
};

/* =============================================================
   ACTIONS
============================================================= */

export const actions: Actions = {
	/* =========================================================
	   UPDATE ROLE
	========================================================= */
	updateRole: async ({ request, locals }) => {
		const auth = await requireSuperAdmin(locals);

		if (!auth.ok) {
			return fail(auth.status, { message: auth.message });
		}

		const formData = await request.formData();
		const userId = String(formData.get('userId') ?? '').trim();
		const newRole = String(formData.get('newRole') ?? '').trim();

		if (!userId || !newRole) {
			return fail(400, { message: 'Missing user ID or role' });
		}

		const { error } = await supabaseAdmin
			.from('profiles')
			.update({ role: newRole })
			.eq('id', userId);

		if (error) {
			console.error('Error updating role:', error);
			return fail(500, { message: 'Could not update role' });
		}

		return { success: true };
	},

	/* =========================================================
	   APPROVE DOCTOR
	========================================================= */

	/* =========================================================
   APPROVE DOCTOR
   Super Admin only.
========================================================= */

approve: async ({ request, locals }) => {
	const auth = await requireSuperAdmin(locals);

	if (!auth.ok) {
		return fail(auth.status, {
			message: auth.message
		});
	}

	const formData = await request.formData();

	const doctorId = String(
		formData.get('doctorId') ?? ''
	).trim();

	const assignedRole = String(
		formData.get('assignedRole') ?? ''
	).trim().toLowerCase();

	if (!doctorId) {
		return fail(400, {
			message: 'Missing doctor ID'
		});
	}

	if (
		assignedRole !== 'author' &&
		assignedRole !== 'reviewer'
	) {
		return fail(400, {
			message: 'Please select Author or Reviewer'
		});
	}

	/*
	 * Author:
	 * - Can publish/write content
	 * - Is NOT a reviewer
	 *
	 * Reviewer:
	 * - Can publish/write content
	 * - Can also review content
	 */
	const updateData = {
		role: 'Doctor',
		verification_status: 'approved',
		is_author: true,
		is_reviewer: assignedRole === 'reviewer'
	};

	const { data: updatedDoctor, error } =
		await supabaseAdmin
			.from('profiles')
			.update(updateData)
			.eq('id', doctorId)
			.select('id, full_name, email')
			.maybeSingle();

	if (error) {
		console.error(
			'Approve doctor error:',
			error
		);

		return fail(500, {
			message: 'Could not approve doctor'
		});
	}

	if (!updatedDoctor) {
		return fail(404, {
			message:
				'Doctor not found or has already been processed'
		});
	}

	return {
		success: true,
		action: 'doctor_approved',
		doctorId,
		assignedRole
	};
},
	/* =========================================================
   REJECT DOCTOR
   Super Admin only.
========================================================= */

reject: async ({ request, locals }) => {
	const auth = await requireSuperAdmin(locals);

	if (!auth.ok) {
		return fail(auth.status, {
			message: auth.message
		});
	}

	const formData = await request.formData();

	const doctorId = String(
		formData.get('doctorId') ?? ''
	).trim();

	if (!doctorId) {
		return fail(400, {
			message: 'Missing doctor ID'
		});
	}

	const { data: rejectedDoctor, error } =
		await supabaseAdmin
			.from('profiles')
			.update({
				verification_status: 'rejected',
				is_author: false,
				is_reviewer: false
			})
			.eq('id', doctorId)
			.select('id, full_name, email')
			.maybeSingle();

	if (error) {
		console.error(
			'Reject doctor error:',
			error
		);

		return fail(500, {
			message: 'Could not reject doctor'
		});
	}

	if (!rejectedDoctor) {
		return fail(404, {
			message:
				'Doctor not found or has already been processed'
		});
	}

	return {
		success: true,
		action: 'doctor_rejected',
		doctorId
	};
},

	/* =========================================================
	   UPDATE DOCTOR PERMISSIONS
	   
	   Super Admin only.
	========================================================= */

	updateDoctorPermissions:
		async ({
			request,
			locals
		}) => {
			const auth =
				await requireSuperAdmin(
					locals
				);

			if (!auth.ok) {
				return fail(
					auth.status,
					{
						message:
							auth.message
					}
				);
			}

			const formData =
				await request.formData();

			const doctorId =
				String(
					formData.get(
						'doctorId'
					) ?? ''
				);

			const isAuthor =
				formData.get(
					'isAuthor'
				) === 'true';

			const isReviewer =
				formData.get(
					'isReviewer'
				) === 'true';

			if (!doctorId) {
				return fail(400, {
					message:
						'Missing doctor ID'
				});
			}

			const { error } =
				await supabaseAdmin
					.from('profiles')
					.update({
						is_author:
							isAuthor,
						is_reviewer:
							isReviewer
					})
					.eq(
						'id',
						doctorId
					)
					.eq(
						'role',
						'Doctor'
					);

			if (error) {
				console.error(
					'Update doctor permissions error:',
					error
				);

				return fail(500, {
					message:
						'Could not update doctor permissions'
				});
			}

			return {
				success: true,
				action:
					'doctor_permissions_updated'
			};
		},

	/* =========================================================
	   PUBLISH ARTICLE / RESEARCH
	========================================================= */

	publishContent: async ({
		request,
		locals
	}) => {
		const auth =
			await requireAdmin(
				locals
			);

		if (!auth.ok) {
			return fail(
				auth.status,
				{
					message:
						auth.message
				}
			);
		}

		const formData =
			await request.formData();

		const articleId =
			String(
				formData.get(
					'articleId'
				) ?? ''
			);

		const articleType =
			String(
				formData.get(
					'articleType'
				) ?? ''
			);

		if (
			!articleId ||
			!articleType
		) {
			return fail(400, {
				message:
					'Missing parameters'
			});
		}

		const table =
			articleType ===
			'research'
				? 'research_articles'
				: 'articles';

		const { error } =
			await supabaseAdmin
				.from(table)
				.update({
					status:
						'published',
					published_at:
						new Date().toISOString()
				})
				.eq(
					'id',
					articleId
				);

		if (error) {
			console.error(
				'Publish content error:',
				error
			);

			return fail(500, {
				message:
					'Could not publish content'
			});
		}

		return {
			success: true,
			action:
				'content_published'
		};
	},

	/* =========================================================
	   CREATE CMS CONTENT
	   
	   Supports:
	   blog
	   news
	   events
	   faq
	   etc.
	========================================================= */

	createCMSContent:
		async ({
			request,
			locals
		}) => {
			const auth =
				await requireSuperAdmin(
					locals
				);

			if (!auth.ok) {
				return fail(
					auth.status,
					{
						message:
							auth.message
					}
				);
			}

			const formData =
				await request.formData();

			const contentType =
				String(
					formData.get(
						'contentType'
					) ?? 'blog'
				).trim();

			const title =
				String(
					formData.get(
						'title'
					) ?? ''
				).trim();

			const slug =
				String(
					formData.get(
						'slug'
					) ?? ''
				).trim();

			const excerpt =
				String(
					formData.get(
						'excerpt'
					) ?? ''
				).trim();

			const content =
				String(
					formData.get(
						'content'
					) ?? ''
				).trim();

			const category =
				String(
					formData.get(
						'category'
					) ?? ''
				).trim();

			const tagsString =
				String(
					formData.get(
						'tags'
					) ?? ''
				).trim();

			const featuredImage =
				String(
					formData.get(
						'featuredImage'
					) ?? ''
				).trim();

			const seoTitle =
				String(
					formData.get(
						'seoTitle'
					) ?? ''
				).trim();

			const seoDescription =
				String(
					formData.get(
						'seoDescription'
					) ?? ''
				).trim();

			const publishedAtRaw =
				String(
					formData.get(
						'publishedAt'
					) ?? ''
				).trim();

			const status =
				String(
					formData.get(
						'status'
					) ?? 'draft'
				).trim();

			if (
				!title ||
				!content
			) {
				return fail(400, {
					message:
						'Title and content are required'
				});
			}

			const finalSlug =
				slug ||
				title
					.toLowerCase()
					.trim()
					.replace(
						/[^a-z0-9]+/g,
						'-'
					)
					.replace(
						/^-+|-+$/g,
						''
					);

			const tags =
				tagsString
					? tagsString
							.split(',')
							.map(
								(tag) =>
									tag.trim()
							)
							.filter(
								Boolean
							)
					: [];

			const publishedAt =
				publishedAtRaw ||
				(status ===
				'published'
					? new Date().toISOString()
					: null);

			const { data, error } =
				await supabaseAdmin
					.from(
						'cms_content'
					)
					.insert({
						content_type:
							contentType,

						title,

						slug:
							finalSlug,

						excerpt:
							excerpt ||
							null,

						content,

						category:
							category ||
							null,

						tags,

						featured_image:
							featuredImage ||
							null,

						seo_title:
							seoTitle ||
							null,

						seo_description:
							seoDescription ||
							null,

						published_at:

							publishedAt,

						status
					})
					.select()
					.single();

			if (error) {
				console.error(
					'Create CMS content error:',
					error
				);

				return fail(500, {
					message:
						error.message ||
						'Could not create CMS content'
				});
			}

			// Broadcast event notification if the content is an event and is published immediately
			if (contentType === 'event' && status === 'published') {
				try {
					await createGlobalNotification(
						'New Event Announced',
						`A new event "${title}" has been announced. Click to view details.`,
						'info',
						`/cms/events/${finalSlug}`
					);
				} catch (err) {
					console.error('Failed to create global notification for event:', err);
				}
			}

			return {
				success: true,
				action:
					'cms_created',
				content: data
			};
		},

	/* =========================================================
	   UPDATE CMS CONTENT
	========================================================= */

	updateCMSContent:
		async ({
			request,
			locals
		}) => {
			const auth =
				await requireSuperAdmin(
					locals
				);

			if (!auth.ok) {
				return fail(
					auth.status,
					{
						message:
							auth.message
					}
				);
			}

			const formData =
				await request.formData();

			const id =
				String(
					formData.get(
						'id'
					) ?? ''
				);

			const contentType =
				String(
					formData.get(
						'contentType'
					) ?? ''
				).trim();

			const title =
				String(
					formData.get(
						'title'
					) ?? ''
				).trim();

			const slug =
				String(
					formData.get(
						'slug'
					) ?? ''
				).trim();

			const excerpt =
				String(
					formData.get(
						'excerpt'
					) ?? ''
				).trim();

			const content =
				String(
					formData.get(
						'content'
					) ?? ''
				).trim();

			const category =
				String(
					formData.get(
						'category'
					) ?? ''
				).trim();

			const tagsString =
				String(
					formData.get(
						'tags'
					) ?? ''
				).trim();

			const featuredImage =
				String(
					formData.get(
						'featuredImage'
					) ?? ''
				).trim();

			const seoTitle =
				String(
					formData.get(
						'seoTitle'
					) ?? ''
				).trim();

			const seoDescription =
				String(
					formData.get(
						'seoDescription'
					) ?? ''
				).trim();

			const publishedAt =
				String(
					formData.get(
						'publishedAt'
					) ?? ''
				).trim();

			const status =
				String(
					formData.get(
						'status'
					) ?? 'draft'
				).trim();

			if (
				!id ||
				!title ||
				!content
			) {
				return fail(400, {
					message:
						'ID, title and content are required'
				});
			}

			const tags =
				tagsString
					? tagsString
							.split(',')
							.map(
								(tag) =>
									tag.trim()
							)
							.filter(
								Boolean
							)
					: [];

			const updateData: any = {
				content_type:
					contentType,

				title,

				slug:
					slug ||
					title
						.toLowerCase()
						.trim()
						.replace(
							/[^a-z0-9]+/g,
							'-'
						)
						.replace(
							/^-+|-+$/g,
							''
						),

				excerpt:
					excerpt ||
					null,

				content,

				category:
					category ||
					null,

				tags,

				seo_title:
					seoTitle ||
					null,

				seo_description:
					seoDescription ||
					null,

				status,

				updated_at:
					new Date().toISOString()
			};

			if (featuredImage) {
				updateData.featured_image =
					featuredImage;
			}

			if (publishedAt) {
				updateData.published_at =
					publishedAt;
			} else if (
				status ===
				'published'
			) {
				updateData.published_at =
					new Date().toISOString();
			}

			const {
				data,
				error
			} = await supabaseAdmin
				.from(
					'cms_content'
				)
				.update(updateData)
				.eq(
					'id',
					id
				)
				.select()
				.single();

			if (error) {
				console.error(
					'Update CMS content error:',
					error
				);

				return fail(500, {
					message:
						error.message ||
						'Could not update CMS content'
				});
			}

			return {
				success: true,
				action:
					'cms_updated',
				content: data
			};
		},

	/* =========================================================
	   TOGGLE CMS PUBLISH
	========================================================= */

	toggleCMSPublish:
		async ({
			request,
			locals
		}) => {
			const auth =
				await requireSuperAdmin(
					locals
				);

			if (!auth.ok) {
				return fail(
					auth.status,
					{
						message:
							auth.message
					}
				);
			}

			const formData =
				await request.formData();

			const id =
				String(
					formData.get(
						'id'
					) ?? ''
				);

			const currentStatus =
				String(
					formData.get(
						'status'
					) ?? 'draft'
				);

			if (!id) {
				return fail(400, {
					message:
						'Missing content ID'
				});
			}

			const newStatus =
				currentStatus ===
				'published'
					? 'draft'
					: 'published';

			const updateData: any = {
				status:
					newStatus,

				updated_at:
					new Date().toISOString()
			};

			if (
				newStatus ===
				'published'
			) {
				updateData.published_at =
					new Date().toISOString();
			}

			const { error } =
				await supabaseAdmin
					.from(
						'cms_content'
					)
					.update(
						updateData
					)
					.eq(
						'id',
						id
					);

			if (error) {
				console.error(
					'Toggle CMS publish error:',
					error
				);

				return fail(500, {
					message:
						'Could not change CMS content status'
				});
			}

			return {
				success: true,
				action:
					newStatus ===
					'published'
						? 'cms_published'
						: 'cms_unpublished'
			};
		},

	/* =========================================================
	   DELETE CMS CONTENT
	========================================================= */

	deleteCMSContent:
		async ({
			request,
			locals
		}) => {
			const auth =
				await requireSuperAdmin(
					locals
				);

			if (!auth.ok) {
				return fail(
					auth.status,
					{
						message:
							auth.message
					}
				);
			}

			const formData =
				await request.formData();

			const id =
				String(
					formData.get(
						'id'
					) ?? ''
				);

			if (!id) {
				return fail(400, {
					message:
						'Missing content ID'
				});
			}

			const { error } =
				await supabaseAdmin
					.from(
						'cms_content'
					)
					.delete()
					.eq(
						'id',
						id
					);

			if (error) {
				console.error(
					'Delete CMS content error:',
					error
				);

				return fail(500, {
					message:
						'Could not delete CMS content'
				});
			}

			return {
				success: true,
				action:
					'cms_deleted'
			};
		},

	/* =========================================================
	   TOGGLE PUBLISHING POWER
	========================================================= */

	togglePublishingPower:
		async ({
			request,
			locals
		}) => {
			const auth =
				await requireAdmin(
					locals
				);

			if (!auth.ok) {
				return fail(
					auth.status,
					{
						message:
							auth.message
					}
				);
			}

			const formData =
				await request.formData();

			const doctorId =
				String(
					formData.get(
						'doctorId'
					) ?? ''
				);

			const newStatus =
				String(
					formData.get(
						'status'
					) ?? ''
				);

			if (!doctorId) {
				return fail(400, {
					message:
						'Missing doctor ID'
				});
			}

			const is_author =
				newStatus ===
				'granted';

			const { error } =
				await supabaseAdmin
					.from('profiles')
					.update({
						is_author
					})
					.eq(
						'id',
						doctorId
					)
					.eq(
						'role',
						'Doctor'
					);

			if (error) {
				console.error(
					'Publishing power error:',
					error
				);

				return fail(500, {
					message:
						'Could not update publishing power'
				});
			}

			return {
				success: true,
				action:
					'publishing_power_updated'
			};
		}
}
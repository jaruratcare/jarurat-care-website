import { supabaseAdmin } from '$lib/supabaseAdmin';

export async function createAdminNotification(
	title: string, 
	message: string, 
	type: 'info' | 'success' | 'warning' | 'error' = 'info',
	userId?: string, 
	link?: string,
	targetGroup: 'content' | 'testimonial' | 'super_admin_only' = 'content'
) {
	if (userId) {
		const { error } = await supabaseAdmin
			.from('notifications')
			.insert({
				user_id: userId,
				title,
				message,
				type,
				link,
				is_read: false
			});

		if (error) {
			console.error('Error creating direct notification:', error);
		}
	} else {
		// Determine which roles receive this notification
		let roleFilter = 'role.eq.Super_Admin,is_reviewer.eq.true'; // Default for content
		
		if (targetGroup === 'testimonial') {
			roleFilter = 'role.eq.Super_Admin,role.eq.Admin';
		} else if (targetGroup === 'super_admin_only') {
			roleFilter = 'role.eq.Super_Admin';
		}

		const { data: adminsAndReviewers } = await supabaseAdmin
			.from('profiles')
			.select('id, role, is_reviewer')
			.or(roleFilter);

		if (adminsAndReviewers && adminsAndReviewers.length > 0) {
			const notifications = adminsAndReviewers.map(user => {
				let actualLink = link;
				// If user is not Super Admin but is a reviewer, give them reviewer-specific links
				if (user.role !== 'Super_Admin' && user.is_reviewer) {
					if (link === '/cms/super-admin?tab=articles') {
						actualLink = '/cms/doctor-dashboard/review-articles';
					} else if (link === '/cms/super-admin?tab=research') {
						actualLink = '/cms/doctor-dashboard/review-research';
					}
				}

				return {
					user_id: user.id,
					title,
					message,
					type,
					link: actualLink,
					is_read: false
				};
			});

			const { error } = await supabaseAdmin
				.from('notifications')
				.insert(notifications);

			if (error) {
				console.error('Error creating global notifications:', error);
			}
		}
	}
}

export async function createGlobalNotification(
	title: string, 
	message: string, 
	type: 'info' | 'success' | 'warning' | 'error' = 'info',
	link?: string
) {
	// Send to ALL users (Readers, Doctors, etc.)
	const { data: allUsers } = await supabaseAdmin
		.from('profiles')
		.select('id');

	if (allUsers && allUsers.length > 0) {
		const notifications = allUsers.map(user => ({
			user_id: user.id,
			title,
			message,
			type,
			link,
			is_read: false
		}));

		const { error } = await supabaseAdmin
			.from('notifications')
			.insert(notifications);

		if (error) {
			console.error('Error creating global event notifications:', error);
		}
	}
}
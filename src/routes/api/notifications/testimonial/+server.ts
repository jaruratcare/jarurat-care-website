import { json } from '@sveltejs/kit';
import { createAdminNotification } from '$lib/server/notifications';

export async function POST({ request, locals }) {
	const session = await locals.getSession();
	if (!session) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { name } = await request.json();

		await createAdminNotification(
			'New Testimonial Submitted',
			`A new testimonial from ${name || 'a user'} has been submitted for review.`,
			'info',
			undefined,
			'/cms/admin-dashboard/testimonials',
			'testimonial'
		);

		return json({ success: true });
	} catch (error) {
		console.error('Failed to create testimonial notification:', error);
		return json({ error: 'Failed to create notification' }, { status: 500 });
	}
}

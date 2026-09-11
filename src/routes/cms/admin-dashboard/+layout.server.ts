import { redirect } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/supabaseAdmin';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	if (!session) {
		throw redirect(303, '/cms/login');
	}

	const { data: userProfile } = await supabaseAdmin
		.from('profiles')
		.select('*')
		.eq('id', session.user.id)
		.maybeSingle();

	if (!userProfile || (userProfile.role !== 'Admin' && userProfile.role !== 'Super_Admin')) {
		throw redirect(303, '/');
	}

	const { data: cmsContents } = await supabaseAdmin
		.from('cms_content')
		.select('*')
		.order('created_at', { ascending: false });

	const currentUser = {
		name: userProfile.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Admin User',
		email: userProfile.email || session.user.email || 'admin@jarurat.care',
		role: userProfile.role || 'Admin',
		avatar: userProfile.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
	};

	return { 
		cmsContents: cmsContents || [],
		currentUser
	};
};

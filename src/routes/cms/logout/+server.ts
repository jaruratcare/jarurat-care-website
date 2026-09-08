import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	// Sign out from Supabase which will clear the server-side cookies
	// configured in hooks.server.ts
	await locals.supabase.auth.signOut();

	// Redirect the user back to the login page after successful logout
	throw redirect(303, '/cms/login');
};

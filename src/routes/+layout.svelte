<script>
	import Footer from '$lib/components/footer.svelte';
	import { page, navigating } from '$app/stores';
	import '../app.css';
	import '@fontsource/manrope'; // weight 400
	import '@fontsource/manrope/500.css';
	import '@fontsource/manrope/600.css';
	import '@fontsource/manrope/700.css';
	import '@fontsource/manrope/800.css';
	import '@fontsource/playfair-display/600.css';
	import '@fontsource/rubik/500.css';
	import { Toaster } from 'svelte-french-toast';
	import { browser } from '$app/environment';
	import '@splidejs/svelte-splide/css/core';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import { cmsSupabase } from '$lib/cmsSupabase';
	import PageLoader from '$lib/components/PageLoader.svelte';

	onMount(() => {
		const {
			data: { subscription }
		} = cmsSupabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
				invalidateAll();
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<main class="font-manrope min-h-screen flex flex-col">
	{#if browser}
		<Toaster />
	{/if}

	{#if $navigating}
		<PageLoader />
	{/if}

	<div class="flex-grow">
		<slot />
	</div>
	{#if !$page.url.pathname.startsWith('/cms')}
		<div class="mt-auto">
			<Footer />
		</div>
	{/if}
</main>

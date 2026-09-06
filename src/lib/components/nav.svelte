<script>
	import Logo from '$lib/svg/logo-figma.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { MenuIcon, X } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';

	let isMenuOpen = false;
	let isLoggedIn = false;

	$: pathname = $page.url.pathname;

	const navItems = [
		{ title: 'Home', href: '/' },
		{ title: 'About Us', href: '/about-us' },
		{ title: 'Get Involved', href: '/get-involved' },
		{ title: 'Doctor Registration', href: '/doctor-form' },
		{ title: 'Contact Us', href: '/contact-us' }
	];

	onMount(async () => {
		const { cmsSupabase } = await import('$lib/cmsSupabase');

		const { data: { user } } = await cmsSupabase.auth.getUser();
		if (user) isLoggedIn = true;

		cmsSupabase.auth.onAuthStateChange((event, session) => {
			isLoggedIn = !!session?.user;
		});

		window.__cmsLogout = async () => {
			isLoggedIn = false;
			toast.success('Logged out successfully');
			goto('/knowledge-hub');
			cmsSupabase.auth.signOut();
		};
	});

	function logout() {
		if (typeof window !== 'undefined' && window.__cmsLogout) {
			window.__cmsLogout();
		}
	}
</script>

<header class="fixed inset-x-0 top-0 z-50 bg-white shadow-sm">
	<!-- Updated padding from px-4 md:px-8 to px-6 lg:px-12 to align with page content sections -->
	<nav class="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-12 py-3">

		<a href="/">
			<Logo class="h-8 md:h-10 w-auto" />
		</a>

		<!-- Show nav links on md (768px+) and up so mobile in Desktop mode sees them -->
		<ul class="hidden md:flex items-center gap-4 lg:gap-8 font-rubik text-[#0D2561] text-xs lg:text-[0.95rem]">
			{#each navItems as item}
				<li>
					<a href={item.href} class={cn("transition-all duration-200 hover:text-[#1E4ED8] whitespace-nowrap", pathname === item.href ? "font-semibold border-b-2 border-[#1E4ED8] pb-1" : "")}>{item.title}</a>
				</li>
			{/each}
		</ul>

		<div class="flex items-center gap-4">
			<a href="/donate" class="hidden sm:flex items-center justify-center h-[62px] w-[154px] bg-[#1E4ED8] text-white rounded-full text-sm lg:text-base font-semibold shadow-md hover:shadow-lg transition whitespace-nowrap">Donate Now</a>

			<!-- Hamburger toggle visible only when header links are hidden (< md) -->
			<button class="md:hidden p-2 text-[#0D2561]" on:click={() => (isMenuOpen = !isMenuOpen)}>
				{#if isMenuOpen}<X size={26} />{:else}<MenuIcon size={26} />{/if}
			</button>
		</div>
	</nav>

	<!-- Mobile Dropdown Menu (Only opens on screens < md where hamburger button is visible) -->
	{#if isMenuOpen}
		<div class="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t">
			<div class="flex flex-col px-6 py-6 space-y-5 text-[#0D2561]">
				{#each navItems as item}
					<a href={item.href} class="text-base font-medium py-2 border-b" on:click={() => (isMenuOpen = false)}>{item.title}</a>
				{/each}

				<a href="/donate" class="w-full text-center bg-[#1E4ED8] text-white py-3 rounded-full font-medium block mt-2" on:click={() => (isMenuOpen = false)}>Donate Now</a>
			</div>
		</div>
	{/if}
</header>
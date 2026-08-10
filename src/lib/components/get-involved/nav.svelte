<script>
    import Logo from '$lib/svg/logo.svelte';
    import { page } from '$app/stores';
    import Button from '../ui/button.svelte';
    import { MenuIcon } from 'lucide-svelte';
    import { cn } from '$lib/utils';
    import { onMount } from 'svelte';

    export let isMenuOpen = false;
    let isMobileScreen = false;

    onMount(() => {
        const listener = () => {
            isMobileScreen = window.innerWidth <= 768;
        };

        listener(); // Run on initial load
        window.addEventListener('resize', listener);

        return () => window.removeEventListener('resize', listener); // Cleanup event listener on component destroy
    });

    const pathname = $page.url.pathname;
    const navItems = [
        { title: 'Home', href: '/' },
        { title: 'About Us', href: '/#about' },
        { title: 'Get Involved', href: '/get-involved' },
        { title: 'Cancer Info', href: '/' },
        { title: 'News & Blogs', href: '/#news' },
        { title: 'Contact Us', href: 'mailto:Priyanka.joshi@jarurat.care' }
    ];
</script>

<!-- Navigation -->
<div class="inset-x-0 z-50 text-[0.9em] bg-white flex items-center justify-between">
    <nav class="flex items-center text-[#0D2561] px-1 md:px-4 py-2 grow">
        <span class="inline-block w-[6rem] sm:w-[8rem]">
            <Logo />
        </span>

        <!-- Responsive Navigation -->
        <ul
            class={cn(
                `gap-8 grow items-center justify-center fixed md:static inset-0 bg-white flex flex-col md:flex-row h-full`,
                'translate-x-full md:translate-x-0',
                isMobileScreen
                    ? isMenuOpen
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-full opacity-0'
                    : 'translate-x-0',
                'transition-all duration-300'
            )}
        >
            {#each navItems as item}
                <li class:font-bold={pathname === item.href}>
                    <a href={item.href} on:click={() => { isMenuOpen = false; }}>
                        {item.title}
                    </a>
                </li>
            {/each}
        </ul>

        <button class="mx-5 border border-solid border-gray-300 hover:text-white py-3 px-6 rounded-full hidden lg:block">
            <!-- Language switcher -->
            <p class='flex justify-center items-center text-[#0155BD]'>
                English<span class="material-symbols-outlined">keyboard_arrow_down</span>
            </p>
        </button>

        <a href="/donate" class="text-[0.8em] hidden lg:block z-50">
            <Button>Donate Now</Button>
        </a>
    </nav>

    <!-- Mobile Menu Toggle Button -->
    <button class="block md:hidden z-50 px-4" on:click={() => { isMenuOpen = !isMenuOpen; }}>
        <MenuIcon />
    </button>
</div>
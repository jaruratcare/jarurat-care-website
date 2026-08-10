<script>
    import AboutHeroSection from "$lib/components/about-hero-section.svelte";
    import WhatDrivesUs from "$lib/components/what-drives-us.svelte";
    import Nav from '$lib/components/nav.svelte';
    import NewletterCollabrate from "$lib/components/newletter-collabrate.svelte";
    import OurJounery from "$lib/components/our-jounery.svelte";
    import CaregivingSolution from "$lib/components/caregiving-solution.svelte";
    import Faq from "$lib/components/faqs/faq.svelte";
    import OurValue from "$lib/components/our-value.svelte";
    import OurVision from "$lib/components/our-vision.svelte";
</script>

<Nav />

<main class="w-full overflow-x-hidden">

    <AboutHeroSection />

    <section class="px-4 md:px-8 lg:px-16">
        <WhatDrivesUs />
    </section>

    <section class="px-4 md:px-8 lg:px-16">
        <OurValue />
    </section>

    <section class="px-4 md:px-8 lg:px-16">
        <OurJounery />
    </section>

    <section class="px-4 md:px-8 lg:px-16">
        <CaregivingSolution />
    </section>

    <section class="px-4 md:px-8 lg:px-16">
        <NewletterCollabrate />
    </section>

    <section class="px-4 md:px-8 lg:px-16">
        <Faq />
    </section>

</main>

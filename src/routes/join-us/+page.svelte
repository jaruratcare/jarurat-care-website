<script>
    import Nav from "$lib/components/nav.svelte";
    import JoinUsHero from "$lib/components/join-us/join-us-hero.svelte";
    import WhyWeExist from "$lib/components/join-us/why-we-exist.svelte";
    import InternshipsSection from "$lib/components/join-us/internships-section.svelte";
    import SpokeDiagram from "$lib/components/join-us/SpokeDiagram.svelte";
    import VolunteerSection from "$lib/components/join-us/volunteer-section.svelte";
</script>

<Nav />

<JoinUsHero />

<WhyWeExist />

<InternshipsSection />

<SpokeDiagram center="Jarurat Care" />

<VolunteerSection />

<svelte:head>
    <title>Join Us | Jarurat Care</title>

    <meta
        name="description"
        content="Join Jarurat Care through internships or volunteer opportunities. Contribute to cancer awareness, research support, and patient assistance programs."
    />
</svelte:head>
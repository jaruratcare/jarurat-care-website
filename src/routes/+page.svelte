<script>
    import Blogs from '$lib/components/blogs.svelte';
    import CancerResearch from '$lib/components/cancer-research.svelte';
    import Faq from '$lib/components/faqs/faq.svelte';
    import Hero from '$lib/components/hero.svelte';
    import HowWeSupportYou from '$lib/components/how-we-support-you.svelte';
    import Impact from '$lib/components/impact.svelte';
    import MapOfHospitals from '$lib/components/map-of-hospitals.svelte';
    import MonthlyUpdates from '$lib/components/monthly-updates.svelte';
    import Nav from '$lib/components/nav.svelte';
    import Newsletter from '$lib/components/newsletter.svelte';
    import OurTeam from '$lib/components/our-team.svelte';
    import SupportDonateMember from '$lib/components/support-donate-member.svelte';
    import VoiceOfHope from '$lib/components/voice-of-hope.svelte';
    import WhoWeAre from '$lib/components/who-we-are.svelte';
    import Popup from '$lib/components/Popup.svelte';
    import TestimonialsSection from '$lib/components/testimonials-section.svelte';
    
    // Import your home page FAQ data file using the correct faq.json filename
    import homeFaqsData from '$lib/data/faq.json';

    // Google Analytics initialization
    if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'G-SR1C89YNC3');
    }
</script>

<Popup 
	title="Get Help via WhatsApp"
    message="Chat with our dedicated WhatsApp bot for guidance on cancer support, treatment options, and related queries. Quick, easy, and confidential assistance at your fingertips."
    gotoLink="https://wa.me/919389529263?text=Hi"
/>
<Nav />
<Hero />

<SupportDonateMember />
<Impact />
<TestimonialsSection />

<!-- Pass the faqs data prop here -->
<Faq faqs={homeFaqsData} />

<svelte:head>
    <title>Gastro Intestinal Cancer & Biliary Tract Support | Jarurat Care</title>
    <meta name="description" content="Jarurat Care provides export support for Gastro Intestinal Cancer, biliary tract cancer, and cholangiocarcinoma. Get medical assistance, awareness, and caregiving support today." />
    <meta name="google-site-verification" content="xDv73z-GY61YZvbewsGFO9UqbnMbPTKLy7UGfcMe_D0" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-SR1C89YNC3"></script>
</svelte:head>
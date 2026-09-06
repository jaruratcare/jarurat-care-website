<script>
	import DonateHeader from '$lib/components/donate/donate-header.svelte';
	import DonationImpact from '$lib/components/donate/donation-impact.svelte';
	import PayComponent from '$lib/components/donate/pay/pay-component.svelte';
	import YourContribution from '$lib/components/donate/your-contribution.svelte';
	import Faq from '$lib/components/donate/faq.svelte';
	import Nav from '$lib/components/nav.svelte';
</script>

<Nav />
<DonateHeader />
<PayComponent />
<DonationImpact />
<YourContribution />
<Faq />
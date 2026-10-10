<script>
	import DonateHeader from '$lib/components/donate/donate-header.svelte';
	import DonationImpact from '$lib/components/donate/donation-impact.svelte';
	import PayComponent from '$lib/components/donate/pay/pay-component.svelte';
	import YourContribution from '$lib/components/donate/your-contribution.svelte';
	import Nav from '$lib/components/nav.svelte';
	import { ChevronDown } from 'lucide-svelte';

	const donateFaqs = [
		{
			question: "How will my donation be used?",
			answer: "100% of non-administrative donations directly fund patient screening, treatment, essential medicines, and family support programs."
		},
		{
			question: "Will I receive a receipt and tax certificate?",
			answer: "Yes, an automated digital tax receipt will be sent to your registered email immediately after your payment is processed."
		},
		{
			question: "What payment methods are accepted?",
			answer: "We accept Credit/Debit cards, Net Banking, UPI, and major digital wallets."
		},
		{
			question: "Can I volunteer instead of donating?",
			answer: "Yes! Visit our volunteer page to sign up for community outreach and awareness programs."
		},
		{
			question: "Can I make a recurring monthly donation?",
			answer: "Yes, you can choose the recurring monthly contribution option using the billing options at the top of the donation form."
		}
	];

	let openIndex = null;
	const toggle = (index) => {
		openIndex = openIndex === index ? null : index;
	};
</script>

<Nav />
<DonateHeader />
<PayComponent />
<DonationImpact />
<YourContribution />

<div class="py-12 md:py-16 px-4 relative">
	<div class="max-w-[591px] mx-auto flex flex-col gap-4 my-8">
		<h2 class="text-2xl sm:text-3xl font-extrabold text-center text-[#1E293B] mb-2 tracking-tight">FAQ</h2>
		
		{#each donateFaqs as faq, index}
			<div class="w-full max-w-[590px] mx-auto bg-[#F3F6FD] px-5 py-3.5 rounded-2xl border border-[#AFC6FF] transition-all duration-300">
				<button type="button" class="flex items-center justify-between w-full text-left gap-4 cursor-pointer group focus:outline-none" on:click={() => toggle(index)}>
					<span class="text-[#60A52A] font-semibold text-[15px] sm:text-[18px] leading-normal sm:leading-snug group-hover:text-[#589223] transition-colors">
						{faq.question}
					</span>
					<ChevronDown class="text-[#5D9829] w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 transition-transform duration-300 {openIndex === index ? 'rotate-180' : ''}" />
				</button>

				{#if openIndex === index}
					<div>
						<div class="border-b border-[#6BAA2E] mt-3 mb-2.5 w-full"></div>
						<div class="text-[#667085] text-[15.5px] leading-relaxed">
							{faq.answer}
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
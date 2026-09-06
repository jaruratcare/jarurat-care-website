<script>
	import Header from '../ui/header.svelte';
	import FaqCard from './faq-card.svelte';
	import AnimatedGradientMesh from '$lib/svg/animated-gradient-mesh.svelte';

	const faqs = [
		{
			question: 'Why is Jarurat Care Foundation started?',
			points: [
				'JCF was founded in 2024 after Priyanka Joshi lost her mother to Cholangiocarcinoma',
				'The experience inspired the creation of JCF to support cancer patients and caregivers',
				'It ensures no one has to face the cancer journey alone'
			],
			linkText: 'Our Story',
			linkHref: '/about-us'
		},
		{
			question: 'Who are the people behind JCF?',
			points: [
				'JCF is led by Founder Priyanka Joshi.',
				'It is supported by doctors, advisors, volunteers, and community members dedicated to helping cancer patients and caregivers'
			],
			linkText: 'Meet Our Team',
			linkHref: '/about-us'
		},
		{
			question: 'How does JCF work with doctors, advisors, and volunteers?',
			points: [
				'JCF works with oncologists, advisors, volunteers, and interns',
				'It provides expert guidance, caregiver support, community outreach, and cancer awareness initiatives'
			],
			linkText: '',
			linkHref: ''
		},
		{
			question: 'How can I contribute to JCF’s mission?',
			points: [
				'Support JCF by volunteering, mentoring, caregiving, joining the team, or donating to strengthen our mission',
				'Opportunities are shared via website and social media channels'
			],
			linkText: 'Apply as Volunteer',
			linkHref: '/get-involved'
		}
	];
</script>

<div class="py-12 md:py-16 px-4 relative">
	<div class="absolute inset-0 overflow-hidden -z-10">
		<AnimatedGradientMesh />
	</div>

	<Header title="FAQ" subtitle="" />

	<div class="max-w-[360px] mx-auto flex flex-col gap-4 my-8">
		{#each faqs as faq}
			<FaqCard
				question={faq.question}
				points={faq.points}
				linkText={faq.linkText}
				linkHref={faq.linkHref}
			/>
		{/each}
	</div>
</div>
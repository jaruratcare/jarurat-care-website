<script>
	import Header from '../ui/header.svelte';
	import FaqCard from './faq-card.svelte';
	import AnimatedGradientMesh from '$lib/svg/animated-gradient-mesh.svelte';

	// Accepts the FAQ array passed from your page component
	export let faqs = [];
</script>

<div class="py-12 md:py-16 px-4 relative">
	<div class="absolute inset-0 overflow-hidden -z-10">
		<AnimatedGradientMesh />
	</div>

	<Header title="FAQ" subtitle="" />

	<div class="max-w-[591px] mx-auto flex flex-col gap-4 my-8">
		{#each faqs as faq}
			<FaqCard
				question={faq.question}
				answer={faq.answer}
			/>
		{/each}
	</div>
</div>
<script>
	import Header from '../ui/header.svelte';
	import FaqCard from './faq-card.svelte';
	import faqs from '$lib/data/faq.json';
	import AnimatedGradientMesh from '$lib/svg/animated-gradient-mesh.svelte';
</script>

<div class="py-16 sm:py-32 px-4 relative">
	<div class="absolute inset-0 overflow-hidden -z-10">
		<AnimatedGradientMesh />
	</div>

	<Header
		title="FAQ"
		subtitle=""
	/>

	<div class="max-w-[48rem] mx-auto flex flex-col gap-4 my-8">
		{#each faqs as faq}
            <FaqCard
                question={faq.question}
                answer={faq.answer}
            />
        {/each}
	</div>
</div>
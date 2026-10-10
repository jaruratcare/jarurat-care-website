<script>
	import { onMount, onDestroy } from 'svelte';
	import Button from '../ui/button.svelte';
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-svelte';

	import careImg from '$lib/assets/donate/care.png';
	import medicineImg from '$lib/assets/donate/Imagemedicine.png';
	import familyImg from '$lib/assets/donate/family support.png';
	import awarenessImg from '$lib/assets/donate/awareness.png';
	import knowledgeImg from '$lib/assets/donate/knowledge.png';
	import hopeImg from '$lib/assets/donate/hope.png';

	const impactData = [
		{
			title: 'Patient Care & Support',
			content:
				'Providing emotional support, counseling, and guidance throughout the cancer journey.',
			imgSrc: careImg
		},
		{
			title: 'Medicines & Medical Supplies',
			content:
				'Ensuring patients receive essential medicines, nutritional support, and healthcare resources.',
			imgSrc: medicineImg
		},
		{
			title: 'Family Assistance',
			content:
				'Supporting families facing financial and emotional challenges during the cancer treatment.',
			imgSrc: familyImg
		},
		{
			title: 'Awareness Programs',
			content:
				'Early diagnosis can save lives. Through community outreach, awareness campaigns & educational workshops.',
			imgSrc: awarenessImg
		},
		{
			title: 'Education & Knowledge',
			content:
				'Making complex medical information easier to understand through education and guidance.',
			imgSrc: knowledgeImg
		},
		{
			title: 'Long Term Hope & Recovery',
			content:
				'Our mission extends beyond treatment. We focus on survivorship, rehabilitation and helping.',
			imgSrc: hopeImg
		}
	];

	let sliderRoot;
	let autoplayTimer;

	onMount(() => {
		const startAutoplay = () => {
			autoplayTimer = setInterval(() => {
				const nextButton = sliderRoot?.querySelector('.splide__arrow--next');
				if (nextButton) nextButton.click();
			}, 2500);
		};

		const stopAutoplay = () => {
			if (autoplayTimer) clearInterval(autoplayTimer);
		};

		startAutoplay();
		sliderRoot?.addEventListener('mouseenter', stopAutoplay);
		sliderRoot?.addEventListener('mouseleave', startAutoplay);
	});

	onDestroy(() => {
		if (autoplayTimer) clearInterval(autoplayTimer);
	});

	const splideOptions = {
		type: 'loop',
		perPage: 3,
		perMove: 1,
		speed: 700,
		pauseOnHover: true,
		pauseOnFocus: true,
		drag: true,
		pagination: true,
		arrows: true,
		breakpoints: {
			1024: { perPage: 2 },
			640: { perPage: 1 }
		}
	};
</script>

<div bind:this={sliderRoot} class="py-8 sm:py-24">
	<div class="max-w-[70rem] mx-auto px-5 sm:px-10">
		<h2 class="text-[1.5em] sm:text-[2em] font-bold text-[#0155BD] leading-tight">
			Impact Of Your Donation
		</h2>

		<p class="text-[#676E77] leading-snug text-[0.9em] sm:text-[1em]">
			Supporting the physical and emotional needs of a cancer patient empowers them to contribute
			positively to society, turning them into a source of strength rather than burden.
		</p>
	</div>

	<Splide
		hasTrack={false}
		aria-label="Impact Of Your Donation"
		class="max-w-[70rem] mx-auto mt-8 z-10"
		options={splideOptions}
	>
		<div class="custom-wrapper">
			<SplideTrack>
				{#each impactData as item}
					<SplideSlide class="p-3 w-full">
						<div
							class="h-full flex flex-col text-left bg-white rounded-2xl p-4 border border-gray-200 shadow-sm"
						>
							<img
								src={item.imgSrc}
								alt={item.title}
								class="w-full aspect-[4/3] object-cover rounded-xl mb-4"
							/>

							<h3 class="text-base sm:text-lg font-bold text-[#2D3142] mb-2 leading-tight">
								{item.title}
							</h3>

							<p class="text-xs sm:text-sm text-[#676E77] leading-relaxed">
								{item.content}
							</p>
						</div>
					</SplideSlide>
				{/each}
			</SplideTrack>
		</div>

		<div class="splide__arrows flex items-center justify-center gap-2 mt-6">
			<Button type="button" class="splide__arrow splide__arrow--prev size-8 p-0 flex items-center">
				<ChevronLeft class="w-full" />
			</Button>

			<Button type="button" class="splide__arrow splide__arrow--next size-8 p-0 flex items-center">
				<ChevronRight class="w-full" />
			</Button>
		</div>
	</Splide>

	<a href="#donate">
		<Button type="button" class="flex gap-2 mx-auto mt-8 sm:mt-12">
			Make a Donation
			<ArrowRight />
		</Button>
	</a>
</div>

<style>
	:global(.splide__arrow--prev) {
		transform: none !important;
	}

	:global(.splide__arrow--prev svg) {
		transform: none !important;
	}
</style>
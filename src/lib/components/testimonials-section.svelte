<script>
	import { onMount } from 'svelte';

	const testimonials = [
		{
			content: "There were days when treatment felt emotionally harder than physically. The support and encouragement I received through Jarurat Care helped me regain hope and stay positive during recovery.",
			name: "Rakesh Kumar",
			description: "Cancer Survivor"
		},
		{
			content: "My sister, a Stage IV gallbladder cancer patient, could access treatment and begin chemotherapy thanks to Jarurat Care Foundation's timely support. We are deeply grateful.",
			name: "Aravind",
			description: "Brother & Caregiver"
		},
		{
			content: "After months of hospital visits and uncertainty, we were mentally exhausted. The conversations, support groups, and kindness we received helped us slowly heal from the emotional trauma.",
			name: "Sowmya Patil",
			description: "Caregiver"
		},
		{
			content: "Medical treatment is only one part of the cancer journey. Emotional reassurance, awareness, and community support are equally important, and initiatives like Jarurat Care help bridge that gap.",
			name: "Sowmya Patil",
			description: "Oncology Specialist"
		},
		{
			content: "Every interaction with patients and families reminds us why this mission matters. Being part of Jarurat Care has shown me how small acts of support can bring comfort during difficult times.",
			name: "Akhil Varma",
			description: "Volunteer Co-ordinator"
		},
		{
			content: "I chose to support Jarurat Care because of its commitment to patient care and awareness. It's inspiring to see how even small contributions can impact lives.",
			name: "Lakshmi Devi",
			description: "Doner"
		},
		{
			content: "Watching my mother go through cancer was overwhelming for our family. Jarurat Care gave us emotional support, practical guidance, and a community that truly understood our pain.",
			name: "Neha Reddy",
			description: "Daughter & Caregiver"
		}
	];

	let perPage = 3;

	// Adjust items per page depending on screen width to match Figma layouts (Mobile: 1, Tablet: 2, Desktop: 3)
	function updatePerPage() {
		if (typeof window !== 'undefined') {
			if (window.innerWidth < 640) {
				perPage = 1;
			} else if (window.innerWidth < 768) {
				perPage = 2;
			} else {
				perPage = 3;
			}
		}
	}

	onMount(() => {
		updatePerPage();
		window.addEventListener('resize', updatePerPage);
		return () => window.removeEventListener('resize', updatePerPage);
	});

	$: pageCount = Math.ceil(testimonials.length / perPage);
	let currentPage = 0;

	// Reset page if bounds change
	$: if (currentPage >= pageCount) {
		currentPage = Math.max(0, pageCount - 1);
	}

	$: visible = testimonials.slice(currentPage * perPage, currentPage * perPage + perPage);

	function goTo(page) {
		currentPage = Math.max(0, Math.min(page, pageCount - 1));
	}

	function initials(name) {
		return name
			.split(' ')
			.map((n) => n[0])
			.slice(0, 2)
			.join('')
			.toUpperCase();
	}
</script>

<section class="py-12 md:py-16 bg-white">
	<div class="max-w-6xl mx-auto px-4 md:px-6">
		<h2 class="text-2xl md:text-4xl font-bold text-[#0D2561] text-center mb-12 md:mb-16">
			Testimonials
		</h2>

		<!-- Responsive Grid: 1 card on mobile, 2 on tablet (sm), 3 on desktop (md+) -->
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
			{#each visible as t}
				<div class="rounded-2xl shadow-[0_12px_30px_-8px_rgba(0,0,0,0.1)] flex flex-col h-[390px] bg-white border border-[#EEF2F9]">
					<div class="p-6 md:p-8 flex-1 flex flex-col">
						<span class="text-[#93B4FF] text-3xl font-serif leading-none">&ldquo;</span>
						<p class="text-[#475569] text-sm md:text-base leading-relaxed mt-2 overflow-y-auto">
							{t.content}
						</p>
					</div>
					<div class="bg-[#EAF1FF] px-6 py-4 flex items-center gap-3 mt-auto shrink-0 rounded-b-2xl">
						<div class="w-10 h-10 rounded-full bg-[#C9D9FF] text-[#0D2561] text-xs font-semibold flex items-center justify-center shrink-0">
							{initials(t.name)}
						</div>
						<div class="leading-tight">
							<p class="font-semibold text-[#0D2561] text-sm">{t.name}</p>
							<p class="text-[#64748B] text-xs">{t.description}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Pagination Buttons -->
		<div class="flex items-center justify-center gap-2 mt-8">
			<button
				class="text-[#1E40AF] px-2 disabled:opacity-30"
				on:click={() => goTo(currentPage - 1)}
				disabled={currentPage === 0}
				aria-label="Previous"
			>
				&laquo;
			</button>

			{#each Array(pageCount) as _, i}
				<button
					class="w-7 h-7 rounded-full text-xs font-medium flex items-center justify-center transition-colors
						{currentPage === i ? 'bg-[#1E40AF] text-white' : 'bg-[#E5ECFF] text-[#1E40AF]'}"
					on:click={() => goTo(i)}
				>
					{i + 1}
				</button>
			{/each}

			<button
				class="text-[#1E40AF] px-2 disabled:opacity-30"
				on:click={() => goTo(currentPage + 1)}
				disabled={currentPage === pageCount - 1}
				aria-label="Next"
			>
				&raquo;
			</button>
		</div>
	</div>
</section>
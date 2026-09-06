<script>
	import { Heart } from 'lucide-svelte';

	const steps = [
		{
			num: '1',
			title: 'Your Donation',
			desc: "Every contribution funds screening, treatment, and care for cancer patients who can't afford it."
		},
		{
			num: '2',
			title: 'Diagnosis & Treatment',
			desc: 'Your funds support chemotherapy, radiation, surgery, and essential medicines.'
		},
		{
			num: '3',
			title: 'Patient & Family Support',
			desc: 'We provide counseling, nutrition support, and financial relief to patients and their families.'
		},
		{
			num: '4',
			title: 'Recovery & Rehabilitation',
			desc: 'Patients receive follow-up care, physiotherapy, and support to regain strength and normalcy.'
		},
		{
			num: '5',
			title: 'Hope for a Cancer-Free Life',
			desc: 'Survivors return to their lives—and inspire the next patient to keep fighting.'
		}
	];
</script>

<div class="py-16 bg-[#F8FAFC]">
	<div class="max-w-[62rem] mx-auto px-4 sm:px-6">
		<h2 class="text-2xl sm:text-3xl font-bold text-center text-[#2D3142] mb-8 tracking-tight">
			Your Contribution At Work
		</h2>

		<!-- Outer Container Card -->
		<div class="bg-[#EFF4F8] border border-[#DDE6ED] rounded-3xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
			
			<!-- Left White Card -->
			<div class="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-[#E2E8F0]/60 shadow-sm flex flex-col items-start">
				<div class="w-9 h-9 rounded-xl bg-[#EBF2FF] flex items-center justify-center mb-4">
					<Heart class="w-4 h-4 text-[#4A80ED]" />
				</div>
				
				<h3 class="text-lg sm:text-xl font-bold text-[#4A80ED] mb-2">Your Donation Journey</h3>
				
				<p class="text-gray-500 text-xs sm:text-sm leading-relaxed mb-5">
					Every donation you make becomes a lifeline for individuals and families battling cancer.
					Your generosity helps ensure that patients receive timely screenings, accurate diagnoses,
					life-saving treatments, and essential medications regardless of their financial circumstances.
				</p>
				
				<a href="#donate" class="w-full">
					<button class="w-full py-2.5 bg-[#4A80ED] hover:bg-[#3B70DC] text-white font-semibold text-sm rounded-full transition-colors shadow-sm">
						Donate Now
					</button>
				</a>
			</div>

			<!-- Right Timeline Section -->
			<div class="lg:col-span-7 pl-2 sm:pl-4 py-2">
				<div class="relative">
					<!-- Continuous Connecting Line -->
					<div class="absolute left-4 top-4 bottom-6 w-[2px] bg-[#4A80ED]/30 -translate-x-1/2 z-0"></div>

					<div class="space-y-6 sm:space-y-7 relative z-10">
						{#each steps as step}
							<div class="flex items-start gap-4 sm:gap-5">
								<!-- Number Badge -->
								<div class="w-8 h-8 rounded-full bg-white border-2 border-[#4A80ED] text-[#4A80ED] text-xs font-semibold flex items-center justify-center shrink-0 shadow-sm z-10">
									{step.num}
								</div>

								<!-- Step Text -->
								<div class="pt-0.5">
									<h4 class="text-sm sm:text-base font-semibold text-[#4A80ED] mb-1">{step.title}</h4>
									<p class="text-xs sm:text-sm text-gray-500 leading-relaxed">{step.desc}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

		</div>
	</div>
</div>
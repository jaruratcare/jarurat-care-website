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
	<div class="max-w-[78rem] mx-auto px-4 sm:px-6">
		<h2 class="text-2xl sm:text-3xl font-bold text-center text-[#1E293B] mb-8 tracking-tight">
			Your Contribution At Work
		</h2>

		<!-- Outer Container Card -->
		<div class="bg-[#F1F5F9] rounded-[2rem] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch shadow-sm">
			
			<!-- Left Card -->
			<div class="lg:col-span-5 bg-white p-8 sm:p-10 rounded-[2rem] shadow-sm flex flex-col justify-between h-full z-10">
				<div>
					<div class="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center mb-6">
						<Heart class="w-5 h-5 text-[#2563EB]" />
					</div>
					
					<h3 class="text-2xl sm:text-3xl font-bold text-[#2563EB] mb-4">Your Donation Journey</h3>
					
					<p class="text-[#64748B] text-sm sm:text-base leading-relaxed mb-8 font-normal">
						Every donation you make becomes a lifeline for individuals and families battling cancer.
						Your generosity helps ensure that patients receive timely screenings, accurate diagnoses,
						life-saving treatments, and essential medications regardless of their financial circumstances.
					</p>
				</div>
				
				<a href="#donate" class="w-full">
					<button class="w-full py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-base rounded-full transition-colors shadow-sm">
						Donate Now
					</button>
				</a>
			</div>

			<div class="lg:col-span-7 p-8 sm:p-12 flex items-center">
				<div class="relative w-full">
					<div class="absolute left-5 top-5 bottom-6 w-[2px] bg-[#2563EB] -translate-x-1/2 z-0"></div>

					<div class="space-y-8 relative z-10">
						{#each steps as step}
							<div class="flex items-start gap-5 sm:gap-6">
								<div class="w-10 h-10 rounded-full bg-white border-2 border-[#2563EB] text-[#2563EB] text-sm font-bold flex items-center justify-center shrink-0 shadow-sm z-10">
									{step.num}
								</div>

								<div class="pt-0.5">
									<h4 class="text-base sm:text-lg font-bold text-[#2563EB] mb-1">{step.title}</h4>
									<p class="text-xs sm:text-sm text-[#64748B] font-semibold leading-relaxed">{step.desc}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

		</div>
	</div>
</div>
<script>
	import heroImage from '$lib/assets/getinvolved.png';
	import qrCode from '$lib/assets/get-involved/qrcode.png';
</script>

<section class="relative w-full bg-[#EBF3FF] overflow-hidden min-h-[550px] lg:min-h-[620px] flex items-center">
	
	<div class="hidden lg:flex absolute right-0 bottom-0 top-0 w-[72%] items-end justify-start pointer-events-none z-0 overflow-hidden">
		<img
			src={heroImage}
			alt="Medical Advisory Board Doctors"
			class="h-[105%] w-auto max-w-none object-contain object-left-bottom -translate-x-16" 
		/>
	</div>

	<!-- LEFT SIDE CONTENT CONTAINER -->
	<div class="max-w-7xl mx-auto px-6 py-10 lg:py-16 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12">
		
		<!-- Content Column -->
		<div class="lg:col-span-6 space-y-6 text-left">
			
			<!-- Tag Badge -->
			<div class="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-200/60 rounded-full">
				<span class="relative flex h-2 w-2">
					<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-40"></span>
					<span class="relative inline-flex rounded-full h-2 w-2 bg-[#38BDF8]"></span>
				</span>
				<span class="text-[#061E5C] font-bold text-[10px] tracking-[0.2em] uppercase">
					Advocacy & Impact
				</span>
			</div>

			<!-- Title & Subtitle -->
			<div class="space-y-3">
				<h1 class="text-3xl md:text-5xl font-bold text-[#061E5C] leading-[1.1] tracking-tight">
					Join Our <br />
					<span class="text-[#2563EB]">Advisory Board</span>
				</h1>

				<p class="text-slate-600 text-sm font-medium leading-relaxed max-w-sm">
					Be Part of India’s most inclusive cancer support ecosystem. Collaborate with experts to shape patient-centered care.
				</p>
			</div>

			<!-- Avatars + Joined text -->
			<div class="flex items-center gap-3 pt-1">
				<div class="flex -space-x-2 shrink-0">
					<div class="w-7 h-7 rounded-full border-2 border-white bg-sky-100 flex items-center justify-center text-[9px] font-bold text-[#061E5C]">JS</div>
					<div class="w-7 h-7 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[9px] font-bold text-[#2563EB]">AK</div>
					<div class="w-7 h-7 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-slate-600 text-[10px] font-bold">+</div>
				</div>
				<span class="text-xs text-slate-600 font-semibold">
					Joined by 50+ Experts
				</span>
			</div>

			<!-- QR Card -->
			<div class="pt-2">
				<div class="bg-white/90 backdrop-blur-sm border border-slate-200/80 p-3 rounded-2xl flex items-center gap-4 shadow-sm w-fit">
					<div class="bg-slate-50 p-1.5 rounded-xl w-20 h-20 shrink-0 border border-slate-100">
						<img 
							src={qrCode}
							alt="QR Code"
							class="w-full h-full object-contain"
						/>
					</div>
					<div class="pr-3 text-left">
						<p class="font-bold text-base text-[#061E5C]">Scan to register</p>
						<p class="text-[10px] font-semibold uppercase tracking-wide text-[#2563EB] mt-1 flex items-center gap-1.5">
							<span class="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>
							Quick Onboarding
						</p>
					</div>
				</div>
			</div>

		</div>

		<!-- Mobile Image Fallback -->
		<div class="block lg:hidden mt-8">
			<img
				src={heroImage}
				alt="Medical Advisory Board Doctors"
				class="w-full object-contain" 
			/>
		</div>

	</div>
</section>
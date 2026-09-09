<script>
	import heroImage from '$lib/assets/getinvolved.png';
	import qrCode from '$lib/assets/get-involved/qrcode.png';
</script>

<section class="relative w-full bg-[#CDE3F7] pt-24 pb-8 lg:pt-28 lg:pb-10 overflow-hidden flex items-center font-sans antialiased">
	
	<!-- DESKTOP HERO IMAGE -->
	<div class="hidden lg:flex absolute right-0 bottom-0 h-[84%] w-[62%] items-end justify-end pointer-events-none z-0 pr-6">
		<img
			src={heroImage}
			alt="Medical Advisory Board Doctors"
			class="h-full w-auto max-w-full object-contain object-bottom" 
		/>
	</div>

	<!-- MAIN CONTENT CONTAINER -->
	<div class="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 mt-4 lg:mt-6">
		
		<div class="lg:col-span-6 space-y-3.5 text-left">
			
			<!-- WHITISH ADVOCACY & IMPACT OVAL BADGE -->
			<div class="inline-block px-3.5 py-1 bg-white/40 border border-white/60 rounded-full backdrop-blur-xs">
				<span class="text-[#1E40AF] font-medium text-[10px] tracking-wider uppercase">
					ADVOCACY & IMPACT
				</span>
			</div>

			<!-- TITLE & UNBOLDED PARAGRAPH -->
			<div class="space-y-2">
				<h1 class="text-3xl md:text-[44px] font-semibold text-[#0D2460] leading-[1.08] tracking-tight">
					Join Our <br />
					<span>Advisory Board</span>
				</h1>

				<p class="text-[#475569] text-sm md:text-[15px] font-normal leading-relaxed max-w-sm">
					Be Part of India's most inclusive cancer support ecosystem. Collaborate with experts to shape patient-centered care.
				</p>
			</div>

			<!-- TIGHTER WHITE JS, AK, + BADGES -->
			<div class="flex items-center gap-3 pt-1">
				<div class="flex -space-x-1.5 shrink-0">
					<div class="w-8 h-8 rounded-full bg-white/80 border border-slate-300/80 flex items-center justify-center text-xs font-semibold text-[#0D2460]">
						JS
					</div>
					<div class="w-8 h-8 rounded-full bg-white/80 border border-slate-300/80 flex items-center justify-center text-xs font-semibold text-[#0D2460]">
						AK
					</div>
					<div class="w-8 h-8 rounded-full bg-white/80 border border-slate-300/80 flex items-center justify-center text-xs font-semibold text-[#0D2460]">
						+
					</div>
				</div>
				<span class="text-xs md:text-sm text-slate-700 font-semibold ml-1">
					Joined by 50+ Experts
				</span>
			</div>

			<!-- BLUE-BORDERED QR SCANNER (NO WHITE OUTLINE) -->
			<div class="pt-2 flex items-center gap-4">
				<div class="p-2 rounded-2xl border-2 border-[#1E40AF] bg-white shadow-sm w-32 h-32 shrink-0 flex items-center justify-center">
					<img 
						src={qrCode}
						alt="QR Code"
						class="w-full h-full object-contain rounded-xl"
					/>
				</div>

				<div class="text-left space-y-1">
					<p class="font-normal text-xl md:text-[22px] text-[#0D2460] tracking-tight">
						Scan to register
					</p>
					<p class="text-xs font-medium uppercase tracking-wider text-[#2563EB] flex items-center gap-1.5">
						<span class="w-2 h-2 rounded-full bg-[#2563EB]"></span>
						QUICK ONBOARDING
					</p>
				</div>
			</div>

		</div>

		<!-- Mobile Fallback Image -->
		<div class="block lg:hidden mt-6">
			<img
				src={heroImage}
				alt="Medical Advisory Board Doctors"
				class="w-full h-auto max-h-[300px] object-contain mx-auto" 
			/>
		</div>

	</div>
</section>
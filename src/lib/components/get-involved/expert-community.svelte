<script>
	import qrCode from '$lib/assets/get-involved/qrcode.png';
	import communityImg from '$lib/assets/get-involved/doctors-community.png';
</script>


<section class="relative py-12 md:py-16 px-4 md:px-6 bg-white overflow-hidden font-sans antialiased" id="expert-community">
	<div class="max-w-6xl mx-auto relative z-10">
		
		<!-- TOP HEADER -->
		<div class="flex flex-col items-center text-center mb-8 md:mb-12">
			<!-- Badge -->
			<div class="inline-block px-4 py-1.5 bg-[#EEF5FF] border border-[#2563EB]/40 rounded-full mb-4">
				<span class="text-[#2563EB] font-medium text-[10px] md:text-[11px] tracking-widest uppercase">
					MEDICAL NETWORK
				</span>
			</div>

			<!-- Title & Subtitle -->
			<h2 class="text-3xl md:text-[42px] font-semibold text-[#0D2460] mb-3 tracking-tight">
				Join Our Expert Community
			</h2>
			<p class="max-w-xl mx-auto text-[#64748B] text-sm md:text-[15px] leading-relaxed font-normal">
				Your knowledge and guidance can make a meaningful difference in the lives of patients and their families.
			</p>
		</div>

		<!-- MAIN CARD CONTAINER -->
		<div class="bg-white border border-slate-100/80 rounded-[32px] p-6 md:p-10 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
			
			<!-- LEFT: TEAM IMAGE -->
			<div class="lg:col-span-6 overflow-hidden rounded-2xl border border-slate-100 shadow-xs h-full min-h-[260px] max-h-[340px]">
				<img 
					src={communityImg} 
					alt="Medical Network Community" 
					class="w-full h-full object-cover object-center rounded-2xl"
				/>
			</div>

			<!-- RIGHT: CALL TO ACTION & QR REGISTRATION -->
			<div class="lg:col-span-6 space-y-4 text-left pl-0 lg:pl-4">
				<h3 class="text-2xl md:text-[28px] font-semibold text-[#0D2460] tracking-tight">
					Ready to make a difference?
				</h3>

				<p class="text-[#64748B] text-sm leading-relaxed font-normal max-w-md">
					Scan the code to join our exclusive medical network and become a part of Jarurat Care's growing community.
				</p>

				<!-- QR CODE -->
				<div class="pt-4 flex items-center gap-5">
					<div class="w-24 h-24 md:w-28 md:h-28 shrink-0 flex items-center justify-center">
						<img 
							src={qrCode} 
							alt="QR Registration" 
							class="w-full h-full object-contain"
						/>
					</div>

					<!-- Labels -->
					<div class="text-left space-y-1">
						<p class="font-normal text-xl text-[#0D2460] tracking-tight">
							Scan to register
						</p>
						<p class="text-[11px] font-medium uppercase tracking-wider text-[#2563EB] flex items-center gap-1.5">
							<span class="w-2 h-2 rounded-full bg-[#2563EB]"></span>
							QUICK ONBOARDING
						</p>
					</div>
				</div>
			</div>

		</div>

	</div>
</section>
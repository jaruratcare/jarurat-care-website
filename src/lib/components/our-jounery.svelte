<script>
    import logo from "$lib/assets/our-journey-logo.png";
    import photo1 from "$lib/assets/journey-1.png"; // Mother photo (LEFT)
    import photo2 from "$lib/assets/journey-2.png"; // Priyanka photo (RIGHT)
    import photo3 from "$lib/assets/journey-3.png"; // Interview photo (LEFT)
</script>

<div class="w-full bg-[#0F52BA] py-16 px-4 md:px-8 text-white relative overflow-hidden">
    <div class="max-w-5xl mx-auto relative px-4">
        
        <!-- 1. HEADER & BIG LOGO -->
        <div class="flex flex-col items-center mb-12 relative z-10">
            <img src={logo} alt="Our Journey Logo" class="w-28 h-28 md:w-36 md:h-36 mb-4 object-contain" />
            <h2 class="text-4xl md:text-5xl font-extrabold text-white tracking-wide">Our Journey</h2>
            
            <!-- Line connecting from Header down to Item 1 -->
            <div class="hidden md:block w-full max-w-5xl h-20 relative">
                <svg class="w-full h-full text-white" viewBox="0 0 1000 80" fill="none">
                    <path d="M 500 0 L 500 30 C 500 60, 250 60, 250 80" stroke="white" stroke-width="4" fill="none" />
                </svg>
            </div>
        </div>

        <!-- 2. TIMELINE STEPS -->
        <div class="relative z-10 flex flex-col gap-12">
            
            <!-- STEP 1: LEFT ALIGNED -->
            <div class="w-full flex justify-start relative">
                <div class="w-full max-w-md flex flex-col items-center text-center relative z-10">
                    <div class="w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 mb-4 bg-white/10">
                        <img src={photo1} alt="December 2023" class="w-full h-72 object-cover rounded-3xl" />
                    </div>
                    <div class="w-28 h-1.5 bg-[#FFC107] mb-3 rounded-full"></div>
                    
                    <h3 class="text-xl font-black text-white mb-1 tracking-wide">2023, December</h3>
                    <h4 class="text-base font-bold text-white/90 mb-2">Our story began with a personal loss.</h4>
                    <p class="text-sm font-normal text-blue-100/80 leading-relaxed max-w-xs">
                        We lost our mother to cholangiocarcinoma after a seven-month battle.
                    </p>
                </div>
            </div>

            <!-- Snake Curve 1: From Left (Item 1) to Right (Item 2) -->
            <div class="hidden md:block w-full h-28 relative -my-6 z-0">
                <svg class="w-full h-full text-white" viewBox="0 0 1000 110" fill="none">
                    <path d="M 250 0 C 250 90, 750 20, 750 110" stroke="white" stroke-width="4" fill="none" />
                </svg>
            </div>

            <!-- STEP 2: RIGHT ALIGNED -->
            <div class="w-full flex justify-end relative">
                <div class="w-full max-w-md flex flex-col items-center text-center relative z-10">
                    <div class="w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 mb-4 bg-white/10">
                        <img src={photo2} alt="Priyanka Founder" class="w-full h-72 object-cover rounded-3xl" />
                    </div>
                    <div class="w-28 h-1.5 bg-[#FFC107] mb-3 rounded-full"></div>
                    
                    <h3 class="text-xl font-black text-white mb-1 tracking-wide">2024</h3>
                    <h4 class="text-base font-bold text-white/90 mb-2">Priyanka begins the journey.</h4>
                    <p class="text-sm font-normal text-blue-100/80 leading-relaxed max-w-xs">
                        As Founder of Jarurat Care Foundation, Priyanka's firsthand experience with cancer drove her to uncover what patients and families truly need.
                    </p>
                </div>
            </div>

            <!-- Snake Curve 2: From Right (Item 2) to Left (Item 3) -->
            <div class="hidden md:block w-full h-28 relative -my-6 z-0">
                <svg class="w-full h-full text-white" viewBox="0 0 1000 110" fill="none">
                    <path d="M 750 0 C 750 90, 250 20, 250 110" stroke="white" stroke-width="4" fill="none" />
                </svg>
            </div>

            <!-- STEP 3: LEFT ALIGNED -->
            <div class="w-full flex justify-start relative">
                <div class="w-full max-w-md flex flex-col items-center text-center relative z-10">
                    <div class="w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 mb-4 bg-white/10">
                        <img src={photo3} alt="Community Initiatives" class="w-full h-72 object-cover rounded-3xl" />
                    </div>
                    <div class="w-28 h-1.5 bg-[#FFC107] mb-3 rounded-full"></div>
                    
                    <h3 class="text-xl font-black text-white mb-1 tracking-wide">2024</h3>
                    <h4 class="text-base font-bold text-white/90 mb-2">From insight to action.</h4>
                    <p class="text-sm font-normal text-blue-100/80 leading-relaxed max-w-xs">
                        We shaped a clear vision for support initiatives and started building community-led programs.
                    </p>
                </div>
            </div>

            <!-- Snake Curve 3: From Left (Item 3) down to Center (2026) with Arrow -->
            <div class="hidden md:block w-full h-32 relative -my-4 z-0">
                <svg class="w-full h-full text-white" viewBox="0 0 1000 130" fill="none">
                    <path d="M 250 0 C 250 90, 500 30, 500 110" stroke="white" stroke-width="4" fill="none" />
                    <!-- Arrowhead pointing down to 2026 -->
                    <path d="M 488 98 L 500 115 L 512 98" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                </svg>
            </div>

            <!-- STEP 4: CENTERED 2026 -->
            <div class="w-full flex justify-center text-center relative z-10">
                <div class="flex flex-col items-center max-w-sm">
                    <div class="w-28 h-1.5 bg-[#FFC107] mb-3 rounded-full"></div>
                    <h3 class="text-2xl font-black text-white mb-1 tracking-wide">2026</h3>
                    <h4 class="text-base font-bold text-white/90 mb-2">Expanding</h4>
                    <p class="text-sm font-normal text-blue-100/80 leading-relaxed max-w-xs">
                        Reaching more lives through ongoing care and support.
                    </p>
                </div>
            </div>

        </div>
    </div>
</div>

<script>
    import logo from "$lib/assets/our-journey-logo.png";
    import photo1 from "$lib/assets/journey-1.png"; // Dec 2023 (LEFT)
    import photo2 from "$lib/assets/journey-2.png"; // 2024 Priyanka (RIGHT)
    import photo3 from "$lib/assets/journey-3.png"; // 2024 Action (LEFT)
</script>

<div class="w-full bg-[#0F52BA] py-16 px-4 md:px-10 text-white relative overflow-hidden">
    <div class="max-w-5xl mx-auto relative">

        <div class="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0">
            <svg class="w-full h-full" viewBox="0 0 1000 1620" fill="none" preserveAspectRatio="none">
                <path 
                    d="
                        M 500 135 
                        C 500 185, 480 185, 420 185 
                        H 120 
                        C 40 185, 30 215, 30 285 
                        V 410 
                        C 30 450, 40 480, 120 480 
                        H 880 
                        C 960 480, 970 510, 970 580 
                        V 810 
                        C 970 850, 960 880, 880 880 
                        H 120 
                        C 40 880, 30 910, 30 980 
                        V 1210 
                        C 30 1250, 40 1280, 120 1280 
                        H 440 
                        C 480 1280, 500 1300, 500 1330 
                        V 1400 
                        M 485 1385 
                        L 500 1405 
                        L 515 1385
                    " 
                    stroke="white" 
                    stroke-width="4" 
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="none" 
                    vector-effect="non-scaling-stroke"
                />
            </svg>
        </div>

        <!-- 1. HEADER & LOGO -->
        <div class="flex flex-col items-center mb-16 relative z-10">
            <img src={logo} alt="Our Journey Logo" class="w-24 h-24 md:w-30 md:h-30 mb-3 object-contain" />
            <h2 class="text-3xl md:text-5xl font-extrabold text-white tracking-wide">Our Journey</h2>
        </div>

        <!-- 2. TIMELINE CONTENT STACK -->
        <div class="relative z-10 flex flex-col gap-20 md:gap-28 pt-4">
            
            <!-- STEP 1: LEFT ALIGNED -->
            <div class="w-full flex justify-start md:pl-12">
                <div class="w-full max-w-[360px] flex flex-col items-center text-center">
                    <div class="w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 mb-4 bg-white/10">
                        <img src={photo1} alt="December 2023" class="w-full h-52 md:h-56 object-cover rounded-3xl" />
                    </div>
                    <!-- Yellow bar sits directly on the horizontal line -->
                    <div class="w-28 h-1.5 bg-[#FFC107] mb-4 rounded-full relative z-20"></div>
                    <h3 class="text-xl font-black text-white mb-1 tracking-wide">2023, December</h3>
                    <h4 class="text-base font-bold text-white/90 mb-1">Our story began with a personal loss.</h4>
                    <p class="text-sm font-normal text-blue-100/80 leading-relaxed max-w-xs">
                        We lost our mother to cholangiocarcinoma after a seven-month battle.
                    </p>
                </div>
            </div>

            <!-- STEP 2: RIGHT ALIGNED -->
            <div class="w-full flex justify-end md:pr-12">
                <div class="w-full max-w-[360px] flex flex-col items-center text-center">
                    <div class="w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 mb-4 bg-white/10">
                        <img src={photo2} alt="Priyanka Founder" class="w-full h-52 md:h-56 object-cover rounded-3xl" />
                    </div>
                    <div class="w-28 h-1.5 bg-[#FFC107] mb-4 rounded-full relative z-20"></div>
                    <h3 class="text-xl font-black text-white mb-1 tracking-wide">2024</h3>
                    <h4 class="text-base font-bold text-white/90 mb-1">Priyanka begins the journey.</h4>
                    <p class="text-sm font-normal text-blue-100/80 leading-relaxed max-w-xs">
                        As Founder of Jarurat Care Foundation, Priyanka's firsthand experience with cancer drove her to uncover what patients and families truly need.
                    </p>
                </div>
            </div>

            <!-- STEP 3: LEFT ALIGNED -->
            <div class="w-full flex justify-start md:pl-12">
                <div class="w-full max-w-[360px] flex flex-col items-center text-center">
                    <div class="w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 mb-4 bg-white/10">
                        <img src={photo3} alt="Community Initiatives" class="w-full h-52 md:h-56 object-cover rounded-3xl" />
                    </div>
                    <div class="w-28 h-1.5 bg-[#FFC107] mb-4 rounded-full relative z-20"></div>
                    <h3 class="text-xl font-black text-white mb-1 tracking-wide">2024</h3>
                    <h4 class="text-base font-bold text-white/90 mb-1">From insight to action.</h4>
                    <p class="text-sm font-normal text-blue-100/80 leading-relaxed max-w-xs">
                        We shaped a clear vision for support initiatives and started building community-led programs.
                    </p>
                </div>
            </div>

            <!-- STEP 4: CENTERED 2026 -->
            <div class="w-full flex justify-center text-center pt-8">
                <div class="flex flex-col items-center max-w-xs">
                    <div class="w-28 h-1.5 bg-[#FFC107] mb-4 rounded-full relative z-20"></div>
                    <h3 class="text-2xl font-black text-white mb-1 tracking-wide">2026</h3>
                    <h4 class="text-base font-bold text-white/90 mb-1">Expanding</h4>
                    <p class="text-sm font-normal text-blue-100/80 leading-relaxed max-w-xs">
                        Reaching more lives through ongoing care and support.
                    </p>
                </div>
            </div>

        </div>
    </div>
</div>
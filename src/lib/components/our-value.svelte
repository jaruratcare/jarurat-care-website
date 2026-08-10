<script>
    import perfectLayout from "$lib/assets/Our values section.png"; 
</script>

<!-- Changed from max-w-6xl to max-w-7xl to let it take up massive screen real estate -->
<div class="max-w-7xl mx-auto my-12 px-6">
    
    <!-- 
      DESKTOP & TABLET VIEW: 
      Removed the tight 'max-w-4xl' limit on the image so it scales naturally large.
      Added 'w-full lg:w-[115%]' to deliberately scale it larger than the regular grids if needed.
    -->
    <div class="hidden md:flex justify-center items-center mix-blend-multiply overflow-visible">
        <img 
            src={perfectLayout} 
            alt="Our Values Layout" 
            class="w-full md:max-w-5xl lg:max-w-6xl xl:max-w-7xl h-auto object-contain transition-transform duration-200"
        />
    </div>

    <!-- MOBILE VIEW FALLBACK: Only shows on tiny mobile screens -->
    <div class="flex flex-col gap-6 md:hidden items-center">
        <h2 class="text-center text-[#0F52BA] text-3xl font-extrabold mb-4">
            Our Values
        </h2>
        
        <!-- Evolve Card -->
        <div class="w-full bg-[#EBF4FA] border border-[#D0E6F5] rounded-2xl p-6 text-center">
            <h3 class="text-xl font-bold text-slate-800 mb-2">Evolve</h3>
            <p class="text-slate-600 text-sm">
                We adapt and grow to meet the changing needs of the cancer community.
            </p>
        </div>

        <!-- Reach Card -->
        <div class="w-full bg-[#EBF4FA] border border-[#D0E6F5] rounded-2xl p-6 text-center">
            <h3 class="text-xl font-bold text-slate-800 mb-2">Reach</h3>
            <p class="text-slate-600 text-sm">
                We actively connect with cancer patients, caregivers and communicates across India.
            </p>
        </div>

        <!-- Sustain Card -->
        <div class="w-full bg-[#EBF4FA] border border-[#D0E6F5] rounded-2xl p-6 text-center">
            <h3 class="text-xl font-bold text-slate-800 mb-2">Sustain</h3>
            <p class="text-slate-600 text-sm">
                We provide ongoing assistance and stability throughout the cancer journey.
            </p>
        </div>

        <!-- Impact Card -->
        <div class="w-full bg-[#EBF4FA] border border-[#D0E6F5] rounded-2xl p-6 text-center">
            <h3 class="text-xl font-bold text-slate-800 mb-2">Impact</h3>
            <p class="text-slate-600 text-sm">
                We focus on delivering meaningful interventions that make a real difference.
            </p>
        </div>
    </div>
</div>

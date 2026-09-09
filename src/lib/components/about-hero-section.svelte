<script>
    import background from "$lib/assets/about-hero-section.jpg";
</script>

<div class="relative">
    <div
        class="w-full h-[750px] md:h-[850px] bg-cover bg-center relative flex items-center justify-center p-4"
        style={`background-image: url(${background})`}
    >
        <div class="absolute inset-0 bg-black/10"></div>

        <!-- The White Card Design -->
        <div class="relative z-10 bg-white/90 backdrop-blur-sm rounded-[32px] shadow-xl max-w-[520px] w-full p-8 md:p-10 flex flex-col items-center text-center border border-white/40">
            
            <!-- Styled Header -->
            <h1 class="text-[#3E4A68] font-extrabold text-5xl md:text-[56px] tracking-tight mb-6">
                What we do
            </h1>

            <!-- Styled Paragraph -->
            <p class="text-slate-600 text-base md:text-[17px] font-medium leading-[1.8] tracking-wide">
                We support patients, caregivers, survivors, and healthcare professionals with trusted 
                resources, emotional support, practical guidance, and community connections 
                throughout the cancer journey.
            </p>
            
        </div>
    </div>
</div>
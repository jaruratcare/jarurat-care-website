<script>
    import background from "$lib/assets/about-hero-section.jpg";
</script>

<div class="relative">
    <!-- Image Wrapper with Flex layout to absolute center the card -->
    <div
        class="w-full h-[500px] md:h-[600px] bg-cover bg-center relative flex items-center justify-center p-4"
        style={`background-image: url(${background})`}
    >
        <!-- Soft dimming overlay to balance out contrast behind the white card -->
        <div class="absolute inset-0 bg-black/10"></div>

        <!-- The Figma White Card Design -->
        <div class="relative z-10 bg-white/90 backdrop-blur-sm rounded-[32px] shadow-xl max-w-[520px] w-full p-8 md:p-10 flex flex-col items-center text-center border border-white/40">
            
            <!-- Figma Styled Header -->
            <h1 class="text-primaryBlue font-extrabold text-4xl md:text-[44px] tracking-tight mb-6">
                What we do
            </h1>

            <!-- Figma Styled Paragraph -->
            <p class="text-slate-600 text-base md:text-[17px] font-medium leading-[1.8] tracking-wide">
                We support patients, caregivers, survivors, and healthcare professionals with trusted 
                resources, emotional support, practical guidance, and community connections 
                throughout the cancer journey.
            </p>
            
        </div>
    </div>
</div>

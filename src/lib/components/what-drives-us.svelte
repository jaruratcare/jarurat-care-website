<script>
    import background from "$lib/assets/scantojoin.png";
</script>

<div class="max-w-7xl mx-auto my-12 sm:my-16 px-4 space-y-8">

    <h2 class="text-center text-[#3E4A69] text-4xl sm:text-4xl font-extrabold tracking-tight">
        What Drives Us
    </h2>

    <div
        class="relative min-h-[500px] md:h-[580px] rounded-3xl overflow-hidden bg-cover bg-center shadow-lg p-6 md:p-12 flex items-center justify-center"
        style={`background-image:url(${background})`}
    >
        <div class="absolute inset-0 bg-black/15"></div>

        <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 w-full max-w-4xl my-auto justify-items-center">
            
            <!-- Mission Card -->
            <div class="relative w-full max-w-[380px] aspect-square">
                <!-- Blue Background Card -->
                <div class="absolute inset-0 bg-[#2B6ECB] rounded-3xl transform -rotate-3 scale-[1.03]"></div>
                
                <!-- White Foreground Card -->
                <div class="relative bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-3xl shadow-md flex flex-col justify-center items-center text-center w-full h-full border border-white/50">
                    <h3 class="text-xl sm:text-2xl font-bold text-[#0D2561] mb-3">
                        Mission
                    </h3>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        We support cancer patients through education, emotional well-being, research, and practical guidance with strong community backing. Our mission is to provide compassionate support, useful resources, and meaningful help to patients and families throughout their cancer journey.
                    </p>
                </div>
            </div>

            <!-- Vision Card -->
            <div class="relative w-full max-w-[380px] aspect-square">
                <!-- Blue Background Card -->
                <div class="absolute inset-0 bg-[#2B6ECB] rounded-3xl transform -rotate-3 scale-[1.03]"></div>
                
                <!-- White Foreground Card -->
                <div class="relative bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-3xl shadow-md flex flex-col justify-center items-center text-center w-full h-full border border-white/50">
                    <h3 class="text-xl sm:text-2xl font-bold text-[#0D2561] mb-3">
                        Vision
                    </h3>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Our vision is to build an inclusive community of cancer warriors, caregivers, and doctors across India. By encouraging knowledge sharing, solidarity, and collaboration, we aim to create a future where no one faces cancer alone. Together, we strive to build a future rooted in care, connection, and hope.
                    </p>
                </div>
            </div>

        </div>

    </div>

</div>
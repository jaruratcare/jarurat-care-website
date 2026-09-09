<script>
  import { Users, Stethoscope, MonitorPlay, HandHeart } from "lucide-svelte";

  let helpItems = [
    {
      title: "Join the Ecosystem",
      desc: "Be part of India's most inclusive cancer support network and connect with experts.",
      icon: Users
    },
    {
      title: "Medical Opinions",
      desc: "Provide critical secondary medical insights to strengthen patient treatment pathways.",
      icon: Stethoscope
    },
    {
      title: "Co-Host Webinars",
      desc: "Lead educational webinars and screening initiatives to spread awareness across India.",
      icon: MonitorPlay
    },
    {
      title: "Mentor & Guide",
      desc: "Empower caregivers and early-career oncologists through your clinical experience.",
      icon: HandHeart
    }
  ];
</script>

<!-- PURE WHITE SECTION BACKGROUND -->
<section class="relative py-12 md:py-16 px-4 md:px-6 bg-white overflow-hidden font-sans antialiased">
  
  <div class="max-w-7xl mx-auto relative z-10">

    <!-- TOP SECTION -->
    <div class="flex flex-col items-center text-center mb-10 md:mb-12">
      
      <!-- Impact Opportunities Badge with Exact Figma Blue Border -->
      <div class="inline-flex items-center px-4 py-1.5 bg-[#EEF5FF] border border-[#2563EB]/40 rounded-full mb-4">
        <span class="text-[#2563EB] font-medium text-[10px] md:text-[11px] tracking-widest uppercase">
          IMPACT OPPORTUNITIES
        </span>
      </div>
      
      <!-- Title -->
      <h2 class="text-3xl md:text-[42px] font-semibold text-[#0D2460] mb-3 tracking-tight">
        How You Can Get Involved
      </h2>
      
      <!-- Subtitle -->
      <p class="max-w-xl mx-auto text-[#64748B] text-sm md:text-[15px] leading-relaxed font-normal">
        Join a movement that's redefining cancer care in India. Your expertise can be the light for someone's journey.
      </p>
    </div>

    <!-- 4 CARDS GRID -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {#each helpItems as item}
        <div class="bg-white border border-slate-100/80 rounded-[28px] p-6 md:p-8 shadow-sm flex flex-col justify-between">
          
          <div>
            <!-- Bluish-White Icon Container -->
            <div class="w-11 h-11 rounded-xl bg-[#EEF5FF] flex items-center justify-center mb-6 border border-[#DCE8FB]">
              <svelte:component this={item.icon} size={22} class="text-[#2563EB]" />
            </div>

            <!-- Card Title -->
            <h3 class="text-[#0D2460] font-semibold text-xl md:text-[21px] mb-3 leading-snug tracking-tight">
              {item.title}
            </h3>

            <!-- Card Description -->
            <p class="text-[#64748B] text-sm md:text-[14px] leading-relaxed mb-6 font-normal tracking-wide">
              {item.desc}
            </p>
          </div>

          <!-- Learn More Link -->
          <div class="pt-2">
            <a 
              href="#learn-more" 
              class="inline-flex items-center text-[#2563EB] font-semibold text-base hover:underline transition-colors gap-1.5"
            >
              <span>Learn More</span>
              <span class="no-underline text-lg">→</span>
            </a>
          </div>

        </div>
      {/each}
    </div>

  </div>
</section>
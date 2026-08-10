<script>
  import { Users, Stethoscope, MonitorPlay, HandHeart, ArrowRight } from "lucide-svelte";

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

<section class="relative py-12 md:py-20 px-4 md:px-6 bg-[linear-gradient(180deg,#FFFFFF_0%,#F0F7FF_50%,#E6F0F5_100%)] font-bold overflow-hidden">
  
  <!-- Background Glow Accents -->
  <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
    <div class="absolute -top-24 -right-24 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
    <div class="absolute top-1/2 -left-48 w-80 h-80 bg-blue-100 rounded-full blur-3xl"></div>
  </div>

  <div class="max-w-7xl mx-auto relative">

    <!-- TOP SECTION: How You Can Get Involved -->
    <div class="flex flex-col items-center text-center mb-12 md:mb-16">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-blue-100 rounded-full shadow-sm mb-6">
        <span class="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
        <span class="text-blue-600 font-bold text-[10px] tracking-[0.2em] uppercase">Impact Opportunities</span>
      </div>
      
      <h2 class="text-3xl md:text-4xl font-black text-[#0D2561] mb-4 tracking-tight px-2">
        How You Can <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Get Involved</span>
      </h2>
      
      <p class="max-w-2xl mx-auto text-slate-500 text-sm md:text-base leading-relaxed font-medium opacity-80 px-4">
        Join a movement that's redefining cancer care in India. Your expertise can be the light for someone's journey.
      </p>
    </div>

    <!-- 4 Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each helpItems as item}
        <div class="group relative bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm transition-all duration-300 hover:border-blue-400 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] cursor-pointer">
          <div class="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-slate-50 flex items-center justify-center mb-6 border border-slate-100 transition-all duration-300 group-hover:bg-blue-600">
            <svelte:component this={item.icon} size={22} class="text-blue-600 transition-colors duration-300 group-hover:text-white" />
          </div>
          <h3 class="text-[#0D2561] font-bold text-lg mb-3 transition-colors duration-300 group-hover:text-blue-600">{item.title}</h3>
          <p class="text-slate-500 text-sm leading-relaxed mb-6 font-medium">{item.desc}</p>
          <div class="flex items-center text-blue-600 font-bold text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
            Learn More <ArrowRight size={14} class="ml-2" />
          </div>
        </div>
      {/each}
    </div>

  </div>
</section>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
</style>
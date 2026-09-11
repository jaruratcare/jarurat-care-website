<script>
    import { ChevronDown } from 'lucide-svelte';
    import { marked } from 'marked';
    
    // Import your reusable global FAQ component
    import Faq from "$lib/components/faqs/faq.svelte";
    
    // Import your newly created Get Involved FAQ dataset
    import getInvolvedFaqsData from '$lib/data/get-involved-faqs.json';
</script>

<section class="w-full bg-white flex flex-col items-center justify-center px-4 py-16 font-sans antialiased">
  <div class="max-w-6xl w-full space-y-20">

    <!-- Founder's Message Section Header -->
    <div class="text-center space-y-2">
      <h2 class="text-3xl md:text-4xl font-semibold text-[#0D2460] tracking-tight">
        Founder's Message
      </h2>
      <p class="text-[#64748B] text-xs md:text-sm font-normal">
        Rewriting the narrative, One life at a time
      </p>
    </div>

    <!-- CARD -->
    <div class="relative bg-[#EEF4FB] border border-[#D8E6F8] p-10 md:p-16 rounded-[2.5rem] shadow-xs max-w-4xl mx-auto overflow-hidden">
      
      <!-- TOP LEFT DOUBLE QUOTE -->
      <div class="absolute top-10 left-10 text-[#82ACF9] pointer-events-none">
        <svg class="w-12 h-12 md:w-16 md:h-16 fill-current" viewBox="0 0 100 100">
          <rect x="10" y="12" width="28" height="38" rx="3" />
          <path d="M10 50 Q 12 74, 34 78 Q 24 64, 26 50 Z" />
          <rect x="54" y="12" width="28" height="38" rx="3" />
          <path d="M54 50 Q 56 74, 78 78 Q 68 64, 70 50 Z" />
        </svg>
      </div>

      <!-- BOTTOM RIGHT DOUBLE QUOTE -->
      <div class="absolute bottom-10 right-10 text-[#82ACF9] pointer-events-none">
        <svg class="w-12 h-12 md:w-16 md:h-16 fill-current" viewBox="0 0 100 100">
          <rect x="10" y="12" width="28" height="38" rx="3" />
          <path d="M10 50 Q 12 74, 34 78 Q 24 64, 26 50 Z" />
          <rect x="54" y="12" width="28" height="38" rx="3" />
          <path d="M54 50 Q 56 74, 78 78 Q 68 64, 70 50 Z" />
        </svg>
      </div>

      <div class="relative z-10 text-center space-y-8">
        <!-- QUOTE TEXT -->
        <p class="text-2xl md:text-3xl font-semibold text-[#0D2460] max-w-2xl mx-auto leading-relaxed tracking-tight">
          Alone we can do so little, <br/>
          <span class="text-[#78C520] font-semibold">together</span> we can do so much.
        </p>

        <!-- AUTHOR & AFFILIATION LINES -->
        <div class="space-y-2 pt-2">
          <div class="flex items-center justify-center gap-3">
            <div class="w-10 h-[2px] bg-[#1E40AF]"></div>
            <p class="font-bold text-xs text-[#1E40AF] tracking-[0.2em] uppercase">
              PRIYANKA JOSHI
            </p>
            <div class="w-10 h-[2px] bg-[#1E40AF]"></div>
          </div>

          <div class="space-y-0.5 text-[#64748B] text-[10px] font-normal uppercase tracking-[0.18em]">
            <p>FOUNDER</p>
            <p>JARURAT CARE FOUNDATION</p>
          </div>
        </div>

      </div>

    </div>

    <!-- FAQ Section -->
    <div class="max-w-3xl mx-auto w-full space-y-8">
      <h2 class="text-3xl font-semibold text-[#0D2460] text-center tracking-tight">
        FAQ
      </h2>

      <!-- Passes the JSON array into your shared component -->
      <Faq faqs={getInvolvedFaqsData} />
    </div>

  </div>
</section>
<script>
  import { ChevronDown } from 'lucide-svelte';
  import { marked } from 'marked';

  let faqs = [
    {
      question: "Who can volunteer with JCF?",
      answer: "- Open to students, professionals, healthcare workers, survivors, caregivers, and supporters\n- Anyone passionate about helping cancer patients can get involved",
      linkText: "Apply As Volunteer",
      linkUrl: "#",
      open: true
    },
    {
      question: "Can I join the Advisory Board?",
      answer: "Healthcare professionals and subject-matter experts interested in supporting JCF's mission are welcome to express their interest in joining the Advisory Board.",
      linkText: "Apply",
      linkUrl: "#",
      open: true
    },
    {
      question: "Can cancer survivors or caregivers contribute?",
      answer: "Yes. Survivors and caregivers can share their experiences, mentor families, support community initiatives, and help others navigating similar journeys.",
      linkText: "Join The Community",
      linkUrl: "#",
      open: true
    }
  ];

  function toggleFaq(index) {
    faqs[index].open = !faqs[index].open;
    faqs = faqs;
  }
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

    <!-- FIGMA BLUISH CARD -->
    <div class="relative bg-[#EEF4FB] border border-[#D8E6F8] p-10 md:p-16 rounded-[2.5rem] shadow-xs max-w-4xl mx-auto overflow-hidden">
      
      <!-- TOP LEFT DOUBLE QUOTE (VERTICALLY ELONGATED HEAD & RIGHT TAIL) -->
      <div class="absolute top-10 left-10 text-[#82ACF9] pointer-events-none">
        <svg class="w-12 h-12 md:w-16 md:h-16 fill-current" viewBox="0 0 100 100">
          <!-- Left Vertically Elongated Block + Right Tail -->
          <rect x="10" y="12" width="28" height="38" rx="3" />
          <path d="M10 50 Q 12 74, 34 78 Q 24 64, 26 50 Z" />
          
          <!-- Right Vertically Elongated Block + Right Tail -->
          <rect x="54" y="12" width="28" height="38" rx="3" />
          <path d="M54 50 Q 56 74, 78 78 Q 68 64, 70 50 Z" />
        </svg>
      </div>

      <!-- BOTTOM RIGHT DOUBLE QUOTE (SAME GLYPH) -->
      <div class="absolute bottom-10 right-10 text-[#82ACF9] pointer-events-none">
        <svg class="w-12 h-12 md:w-16 md:h-16 fill-current" viewBox="0 0 100 100">
          <!-- Left Vertically Elongated Block + Right Tail -->
          <rect x="10" y="12" width="28" height="38" rx="3" />
          <path d="M10 50 Q 12 74, 34 78 Q 24 64, 26 50 Z" />
          
          <!-- Right Vertically Elongated Block + Right Tail -->
          <rect x="54" y="12" width="28" height="38" rx="3" />
          <path d="M54 50 Q 56 74, 78 78 Q 68 64, 70 50 Z" />
        </svg>
      </div>

      <div class="relative z-10 text-center space-y-8">
        <!-- QUOTE TEXT ("together" IS MEDIUM LIGHTER GREEN & SEMI-BOLD) -->
        <p class="text-2xl md:text-3xl font-semibold text-[#0D2460] max-w-2xl mx-auto leading-relaxed tracking-tight">
          Alone we can do so little, <br/>
          <span class="text-[#78C520] font-semibold">together</span> we can do so much.
        </p>

        <!-- AUTHOR & AFFILIATION LINES -->
        <div class="space-y-2 pt-2">
          <!-- PRIYANKA JOSHI WITH DARK BLUE ACCENT BARS -->
          <div class="flex items-center justify-center gap-3">
            <div class="w-10 h-[2px] bg-[#1E40AF]"></div>
            <p class="font-bold text-xs text-[#1E40AF] tracking-[0.2em] uppercase">
              PRIYANKA JOSHI
            </p>
            <div class="w-10 h-[2px] bg-[#1E40AF]"></div>
          </div>

          <!-- Non-Bold Founder & Foundation Text on Separate Lines -->
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

      <div class="space-y-4">
        {#each faqs as faq, i}
          <div class="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs transition-all">
            <button
              type="button"
              on:click={() => toggleFaq(i)}
              class="w-full text-left flex justify-between items-center gap-4 text-[#78C520] font-semibold text-sm md:text-base pb-3 border-b border-slate-100 cursor-pointer focus:outline-none"
            >
              <span>{faq.question}</span>
              <ChevronDown
                size={18}
                class="text-[#78C520] transition-transform duration-300 shrink-0 {faq.open ? 'rotate-180' : ''}"
              />
            </button>

            {#if faq.open}
              <div class="pt-3 text-slate-600 text-xs md:text-sm font-normal leading-relaxed">
                <div class="faq-content">
                  {@html marked(faq.answer)}
                </div>

                {#if faq.linkText}
                  <div class="flex justify-end mt-3">
                    <a
                      href={faq.linkUrl}
                      class="text-[#2563EB] hover:underline font-medium inline-flex items-center gap-1 text-xs md:text-sm"
                    >
                      {faq.linkText} &rarr;
                    </a>
                  </div>
                {/if}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>

  </div>
</section>

<style>
  :global(.faq-content ul) {
    list-style-type: disc;
    padding-left: 1.25rem;
    margin-bottom: 0.5rem;
  }
  :global(.faq-content li) {
    margin-bottom: 0.35rem;
    color: #475569;
  }
  :global(.faq-content p) {
    margin-bottom: 0.5rem;
    color: #475569;
  }
</style>
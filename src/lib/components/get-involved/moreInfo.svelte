<script>
  import { Quote, ChevronDown } from 'lucide-svelte';
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

<section class="w-full bg-[linear-gradient(180deg,#FFFFFF_0%,#F4F8FF_100%)] flex flex-col items-center justify-center px-4 py-16 border-t border-blue-50">
  
  <div class="max-w-6xl w-full space-y-20">

    <!-- Founder's Message Section -->
    <div class="text-center space-y-2">
      <h2 class="text-3xl md:text-4xl font-extrabold text-[#0D2561] tracking-tight">
        Founder's Message
      </h2>
      <p class="text-slate-500 text-xs md:text-sm font-medium tracking-wide">
        Rewriting the narrative, One life at a time
      </p>
    </div>

    <div class="relative bg-white/70 backdrop-blur-md p-10 md:p-16 rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden max-w-4xl mx-auto">
      
      <div class="absolute top-6 left-8 text-blue-200/60 pointer-events-none">
        <Quote size={60} class="rotate-180 fill-current" />
      </div>

      <div class="absolute bottom-6 right-8 text-blue-200/60 pointer-events-none">
        <Quote size={60} class="fill-current" />
      </div>

      <div class="relative z-10 text-center space-y-8">
        <p class="text-2xl md:text-3xl font-bold text-[#0D2561] max-w-2xl mx-auto leading-relaxed tracking-tight">
          Alone we can do so little, <br/>
          <span class="text-[#78C520] font-extrabold">together</span> we can do so much.
        </p>

        <div class="flex items-center justify-center gap-3 pt-2">
          <div class="w-12 h-[1.5px] bg-blue-300"></div>
          <div class="text-center">
            <p class="font-extrabold text-xs text-[#0D2561] uppercase tracking-[0.2em]">
              PRIYANKA JOSHI
            </p>
            <p class="text-slate-400 text-[9px] font-bold uppercase tracking-[0.2em] mt-0.5">
              FOUNDER, JARURAT CARE FOUNDATION
            </p>
          </div>
          <div class="w-12 h-[1.5px] bg-blue-300"></div>
        </div>
      </div>

    </div>

    <!-- FAQ Section (Matched to Figma) -->
    <div class="max-w-3xl mx-auto w-full space-y-8">
      <h2 class="text-3xl font-extrabold text-[#0D2561] text-center tracking-tight">
        FAQ
      </h2>

      <div class="space-y-4">
        {#each faqs as faq, i}
          <div class="bg-[#F4F6F8] border border-slate-200 rounded-2xl p-5 shadow-xs transition-all">
            <button
              type="button"
              on:click={() => toggleFaq(i)}
              class="w-full text-left flex justify-between items-center gap-4 text-[#78C520] font-bold text-sm md:text-base pb-3 border-b border-slate-200 cursor-pointer focus:outline-none"
            >
              <span>{faq.question}</span>
              <ChevronDown
                size={18}
                class="text-[#78C520] transition-transform duration-300 shrink-0 {faq.open ? 'rotate-180' : ''}"
              />
            </button>

            {#if faq.open}
              <div class="pt-3 text-slate-600 text-xs md:text-sm font-medium leading-relaxed">
                <div class="faq-content">
                  {@html marked(faq.answer)}
                </div>

                {#if faq.linkText}
                  <div class="flex justify-end mt-3">
                    <a
                      href={faq.linkUrl}
                      class="text-[#3B82F6] hover:text-[#1D4ED8] font-semibold inline-flex items-center gap-1 underline underline-offset-4 text-xs md:text-sm"
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
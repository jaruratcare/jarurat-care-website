<script>
  import {ChevronRight as NextIcon} from 'lucide-svelte';
</script>

<div
  class="relative h-[450px] w-full bg-[#F4F8FF] flex justify-center items-center overflow-hidden"
>
  <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:20px_20px]"></div>

  <div class="relative z-10 text-center px-6">
    <h3 class="font-bold text-4xl md:text-5xl text-[#0D2561] leading-tight">
      Alone we do <span class="text-[#2563EB] italic">little.</span><br />
      Together we achieve <span class="text-[#1E40AF]">more.</span>
    </h3>
    <div class="w-24 h-1.5 bg-[#2563EB] mx-auto mt-8 rounded-full"></div>
  </div>
</div>

<div class="flex flex-col lg:flex-row bg-white">
  
  <div
    class="bg-[#F4F8FF] w-full lg:w-1/2 md:px-24 px-8 py-20 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-blue-100"
  >
    <div class="max-w-md w-full border-l-4 border-[#2563EB] pl-8">
      <div class="mb-8">
        <h4 class="text-[#0D2561] font-bold text-2xl mb-2">
          Subscribe to our Newsletter
        </h4>
        <p class="text-slate-500 text-sm font-medium">
          Get expert oncology updates delivered to your inbox.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          class="flex-1 rounded-xl border border-blue-200 px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 shadow-sm"
          placeholder="Enter your email address"
        />
        <button class="bg-[#1E40AF] text-white font-bold px-8 py-4 rounded-xl shadow-md hover:bg-[#0D2561] transition-all duration-300">
          Subscribe
        </button>
      </div>
    </div>
  </div>

  <div class="lg:w-1/2 md:px-24 px-8 py-20 flex items-center justify-center bg-white">
    <div class="max-w-md w-full border-l-4 border-[#2563EB] pl-8">
      <div class="mb-10">
        <h4 class="text-[#0D2561] font-bold text-2xl mb-2">
          Collaborate <span class="text-[#2563EB]">With Us</span>
        </h4>
        <p class="text-slate-500 text-sm font-medium">
          Partner with us to make a real impact in cancer care.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
        {#each ['Join Our Team', 'Become a Caregiver', 'Become a Mentor', 'Donate Today'] as item}
          <div class="group flex gap-4 items-center cursor-pointer">
            <div class="flex gap-0.5 text-[#2563EB] group-hover:translate-x-1 transition-transform duration-300">
              <NextIcon size={14} /><NextIcon size={14} />
            </div>
            <span class="text-sm font-bold text-[#0D2460] group-hover:text-[#2563EB] transition-colors">{item}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
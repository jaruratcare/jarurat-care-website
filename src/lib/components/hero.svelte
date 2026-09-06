<script>
  import patient from '$lib/assets/hero-patient.png';
  import tabletHero from '$lib/assets/hero-tablet.png';
  import mobileHero from '$lib/assets/hero-mobile.png';
</script>

<section class="relative w-full pt-16 md:pt-20 lg:pt-20">

  <!-- MOBILE LAYOUT -->
  <div class="md:hidden bg-[#EEF5FF] flex flex-col items-center text-center gap-3 pt-8">
    <div class="flex flex-col items-center gap-4 px-4">
      <h1 class="text-[28px] leading-[36px] font-bold text-[#0D2561]">
        Jarurat Care Foundation
      </h1>
      <h2 class="text-[18px] leading-[26px] font-bold text-[#4B71E0]">
        Jaisi Jarurat, Vaisi Care
      </h2>
      <p class="text-[#6B7280] text-[16px] leading-[26px]">
        Providing support to cancer patients and their families.
        Ensuring no one faces the journey alone.
      </p>
      <div class="flex flex-wrap justify-center gap-3">
        <a href="/donate">
          <button class="bg-[#1E40AF] text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-md">
            Donate Now
          </button>
        </a>
        <a href="mailto:Priyanka.joshi@jarurat.care?subject=Seek%20Support%20For%20Cancer">
          <button class="border-2 border-[#1E40AF] bg-white text-[#1E40AF] px-5 py-2.5 rounded-full text-sm font-medium shadow-sm">
            Seek Cancer Support
          </button>
        </a>
      </div>
      <p class="text-[#64748B] text-xs italic">
        "Supporting patients across India since 2023"
      </p>
    </div>
    <img
      src={mobileHero}
      alt="Jarurat Care Foundation"
      class="w-full h-[240px] object-cover object-bottom -mt-1"
    />
  </div>

  <!-- TABLET LAYOUT -->
  <div class="hidden md:block lg:hidden relative w-full h-[1040px] overflow-hidden bg-[#EEF5FF]">
    <img src={tabletHero} alt="Jarurat Care Foundation" class="absolute inset-0 w-full h-full object-cover" />
    <div class="absolute inset-0 bg-[#1E4ED8]/5"></div>
    <div class="relative z-10 flex flex-col items-center text-center gap-6 px-8 pt-16">
      <h1 class="text-[48px] leading-[56px] font-bold text-[#0D2561]">
        Jarurat Care Foundation
      </h1>
      <h2 class="text-[32px] leading-[40px] font-bold text-[#4B71E0]">
        Jaisi Jarurat, Vaisi Care
      </h2>
      <p class="text-[#6B7280] text-[18px] leading-[30px] max-w-[420px]">
        Providing support to cancer patients and their families.
        Ensuring no one faces the journey alone.
      </p>
      <div class="flex flex-wrap justify-center gap-3">
        <a href="/donate">
          <button class="bg-[#1E40AF] text-white px-6 py-3 rounded-full text-sm font-medium shadow-md">
            Donate Now
          </button>
        </a>
        <a href="mailto:Priyanka.joshi@jarurat.care?subject=Seek%20Support%20For%20Cancer">
          <button class="border-2 border-[#1E40AF] bg-white text-[#1E40AF] px-6 py-3 rounded-full text-sm font-medium shadow-sm">
            Seek Cancer Support
          </button>
        </a>
      </div>
      <p class="text-[#64748B] text-[18px] leading-[30px] font-bold italic">
        "Supporting patients across India since 2023"
      </p>
    </div>
  </div>

  <!-- DESKTOP LAYOUT -->
  <div class="hidden lg:block relative w-full h-[806px] overflow-hidden">
    <img src={patient} alt="Jarurat Care Foundation" class="absolute inset-0 w-full h-full object-cover object-[70%_center]" />
    <div class="absolute inset-0 bg-[#1E4ED8]/3"></div>
    <div class="relative z-10 h-full flex flex-col justify-center
    md:gap-5 lg:gap-8
    md:w-[360px] lg:w-[430px]
    md:ml-8 lg:ml-12">
      <h1 class="md:text-[48px] md:leading-[56px] lg:text-[56px] lg:leading-[64px] tracking-[-1px] font-bold text-[#0C1F56]">
        Jarurat Care Foundation
      </h1>
      <h2 class="md:text-[24px] md:leading-[32px] lg:text-[32px] lg:leading-[40px] font-bold text-[#4B71E0]">
        Jaisi Jarurat, Vaisi Care
      </h2>
      <p class="text-[#6B7280] md:text-[16px] md:leading-[26px] lg:text-[18px] lg:leading-[30px]">
        Providing support to cancer patients and their families.
        Ensuring no one faces the journey alone.
      </p>
      <div class="flex flex-wrap gap-3">
        <a href="/donate">
          <button class="bg-[#1E40AF] text-white px-6 py-4 rounded-full text-[18px] font-bold shadow-md hover:bg-white hover:text-[#1E40AF] hover:border hover:border-[#1E40AF] transition-colors duration-300">
            Donate Now
          </button>
        </a>
        <a href="/contact-us">
          <button class="border-2 border-[#1E40AF] bg-white text-[#1E40AF] px-6 py-4 rounded-full text-[18px] font-bold shadow-sm hover:bg-[#1E40AF] hover:text-white transition-colors duration-300">
            Seek Cancer Support
          </button>
        </a>
      </div>
      <p class="text-[#6B7280] text-[18px] leading-[30px] font-bold italic">
        "Supporting patients across India since 2023"
      </p>
    </div>
  </div>

</section>
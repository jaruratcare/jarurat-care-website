<script>
  import album1 from "./album1.png";
  import album2 from "./album2.png";
  import album3 from "./album3.png";
</script>

<!-- Outer section -->
<div class="relative w-full overflow-hidden flex flex-col items-center justify-center pt-20 pb-20 bg-[#D7EDFF]">
 
  <!-- 1. Wave SVG -->
  <svg
    class="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen min-w-[100vw] h-[92%] pointer-events-none z-0"
    preserveAspectRatio="none"
    viewBox="0 0 1440 624"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 164.884C162.667 -8.48637 423.469 -53.7413 672.193 70.4545C920.917 194.65 1292.21 224.442 1440 194.649V624L0 535.106V164.884Z"
      fill="url(#paint0_linear_421_8826)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_421_8826"
        x1="720"
        y1="-65.2595"
        x2="720"
        y2="664.487"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#7BE2FA" />
        <stop offset="0.8" stop-color="#D7EDFF" />
      </linearGradient>
    </defs>
  </svg>

  <!-- 2. HEADING TEXT -->
  <h2 class="text-[32px] md:text-[38px] font-bold text-[#0C1F56] text-center mb-10 -translate-y-2 relative z-10 tracking-tight">
    The People Behind Our Mission
  </h2>

  <!-- 3. Image row with isolated dark Figma shadows & zero sub-pixel lines -->
  <div class="relative flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-[1360px] mx-auto z-10 px-4">
    
    <!-- Image 1 -->
    <div class="w-[23.5rem] h-[17.5rem] shrink-0 rounded-[1.4rem] shadow-[0_18px_30px_-5px_rgba(0,0,0,0.65),0_8px_15px_-6px_rgba(0,0,0,0.5)]">
      <div class="w-full h-full rounded-[1.4rem] overflow-hidden bg-[#0C1F56]">
        <img
          loading="lazy"
          src={album1}
          alt="Jarurat Care Team"
          class="w-full h-full object-cover object-[75%_center] block"
        />
      </div>
    </div>

    <!-- Image 2 -->
    <div class="w-[23.5rem] h-[17.5rem] shrink-0 rounded-[1.4rem] shadow-[0_18px_30px_-5px_rgba(0,0,0,0.65),0_8px_15px_-6px_rgba(0,0,0,0.5)]">
      <div class="w-full h-full rounded-[1.4rem] overflow-hidden bg-[#0C1F56]">
        <img
          loading="lazy"
          src={album2}
          alt="First Jarurat Care Podcast for cancer awareness"
          class="w-full h-full object-cover -rotate-[1.8deg] scale-110 block"
        />
      </div>
    </div>

    <!-- Image 3 -->
    <div class="w-[23.5rem] h-[17.5rem] shrink-0 rounded-[1.4rem] shadow-[0_18px_30px_-5px_rgba(0,0,0,0.65),0_8px_15px_-6px_rgba(0,0,0,0.5)]">
      <div class="w-full h-full rounded-[1.4rem] overflow-hidden bg-[#0C1F56]">
        <img
          loading="lazy"
          src={album3}
          alt="Helping the families by spreading awareness"
          class="w-full h-full object-cover block scale-[1.02]"
        />
      </div>
    </div>

  </div>
</div>
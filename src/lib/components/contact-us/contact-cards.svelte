<script>
  import EmailIcon from "$lib/assets/icons/email.svg?raw";
  import PhoneIcon from "$lib/assets/icons/phone.svg?raw";
  import LocationIcon from "$lib/assets/icons/location.svg?raw";
  import ClockIcon from "$lib/assets/icons/clock.svg?raw";
</script>

<div class="max-w-[1312px] mx-auto py-12 px-6">
  <!-- Section Heading -->
  <div class="text-center mb-6">
    <h2 class="text-[30px] md:text-[36px] font-bold text-[#0C1F56]">
      Contact Us
    </h2>
    <p class="mt-1.5 text-[15px] md:text-[16px] text-[#4B5563] font-medium">
      Every channel open for you
    </p>
  </div>

  <!-- 4-Column Card Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(4,304px)] gap-4 justify-center">
    
    <!-- 1. Email Us Card -->
    <div class="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#EBEBEB] w-[304px] h-[264px] flex flex-col">
      <div class="w-[52px] h-[52px] bg-[#E9EEFC] rounded-lg flex items-center justify-center text-[#2F5EFF]">
        {@html EmailIcon}
      </div>
      <h3 class="text-[18px] font-semibold text-[#0C1F56] mb-2 leading-[24px] mt-3">Email Us</h3>
      <p class="text-[16px] font-medium text-[#1E4ED8] leading-6 break-words mt-1">Priyanka.joshi@jarurat.care</p>
      <p class="text-[14px] font-medium text-[#4B5563] leading-5 mt-2.5">We reply within 48 business hours</p>
    </div>

    <!-- 2. Call Us Card -->
    <div class="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#EBEBEB] w-[304px] h-[264px] flex flex-col">
      <div class="w-[52px] h-[52px] bg-[#E9EEFC] rounded-lg flex items-center justify-center text-[#2F5EFF]">
        {@html PhoneIcon}
      </div>
      <h3 class="text-[18px] font-semibold text-[#0C1F56] mb-2 leading-[24px] mt-3">Call Us</h3>
      <p class="text-[16px] font-medium text-[#1E4ED8] leading-6 mt-1">+91 99402 63931</p>
      <p class="text-[14px] font-medium text-[#4B5563] leading-5 mt-2.5">Mon – Fri, 8 am – 5 pm</p>
    </div>

    <!-- 3. Visit Us Card -->
    <div class="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#EBEBEB] w-[304px] h-[264px] flex flex-col">
      <div class="w-[52px] h-[52px] bg-[#E9EEFC] rounded-lg flex items-center justify-center text-[#2F5EFF]">
        {@html LocationIcon}
      </div>
      <h3 class="text-[18px] font-semibold text-[#0C1F56] mb-2 leading-[24px] mt-3">Visit Us</h3>
      <p class="text-[14px] font-medium text-[#4B5563] leading-6 mt-1">C/O M.C. Joshi, Aastha Vihar, Polysheet, Haldwani, Amritpur, Nainital, Uttarakhand - 263126,    India</p>
    </div>

    <!-- 4. Office Hours Card -->
    <div class="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#EBEBEB] w-[304px] h-[264px] flex flex-col">
      <div class="w-[52px] h-[52px] bg-[#E9EEFC] rounded-lg flex items-center justify-center text-[#2F5EFF]">
        {@html ClockIcon}
      </div>
      <h3 class="text-[18px] font-semibold text-[#0C1F56] mb-2 leading-[24px] mt-3">Office Hours</h3>
      <p class="text-[14px] font-medium text-[#4B5563] leading-6 mt-1">Monday-Friday,<br/>9 AM–6 PM</p>
    </div>

  </div>
</div>
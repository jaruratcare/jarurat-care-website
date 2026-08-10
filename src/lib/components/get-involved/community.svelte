<script>
  import { onMount, onDestroy } from "svelte";
  import drMilindImg from "$lib/assets/get-involved/dr-milind-javle.png"
  import profUshaImg from "$lib/assets/get-involved/prof-usha-dutta.png"
  import drSangeetaImg from "$lib/assets/get-involved/dr-sangeeta-goswami.png"
  import drDarshitImg from "$lib/assets/get-involved/dr-darshit-shah.png"
  import drVikasImg from "$lib/assets/get-involved/dr-vikas-ostwal.png"
  import drSoumilImg from "$lib/assets/get-involved/dr-soumil-vyas.png"
  import drBhawnaImg from "$lib/assets/get-involved/dr-bhawna-sirohi.png"
  import drJillImg from "$lib/assets/get-involved/dr-jill-koshiol.png"
  import drVinayImg from "$lib/assets/get-involved/dr-vinay-kapoor.png"
  import stacieImg from "$lib/assets/get-involved/stacie-lindsey.png"
  import drSewantiImg from "$lib/assets/get-involved/dr-sewanti-limaye.png"
  import drRaviImg from "$lib/assets/get-involved/dr-ravi-kanan.png"
  import drShefaliImg from "$lib/assets/get-involved/dr-shefali-agrawal.png"
  import drRamanImg from "$lib/assets/get-involved/dr-raman-sood.png"
  import drMoushumiImg from "$lib/assets/get-involved/dr-moushumi-suryavanshi.png"
  import drVineetImg from "$lib/assets/get-involved/dr-vineet-gupta.png"
  import drChetanImg from "$lib/assets/get-involved/dr-chetan-arora.png"


  let advisoryBoard = [
    { name: "Dr. Milind Javle", role: "Department of Gastrointestinal Medical Oncology", image: drMilindImg },
    { name: "Prof. Usha Dutta", role: "Professor & HOD, Gastroenterology, PGIMER, Chandigarh", image: profUshaImg },
    { name: "Dr. Sangeeta Goswami", role: "Associate Professor, Genitourinary and Immunology, MD Anderson Cancer Center", image: drSangeetaImg },
    { name: "Dr. Darshit Shah", role: "Consultant Medical Oncology, Sir H. N. Reliance Foundation Hospital", image: drDarshitImg },
    { name: "Dr. Vikas Ostwal", role: "GI Oncology, Tata Memorial Cancer Center, Mumbai", image: drVikasImg },
    { name: "Dr. Soumil Vyas", role: "Consultant Surgical Oncology, Sir H N Reliance Foundation Hospital", image: drSoumilImg },
    { name: "Dr. Bhawna Sirohi", role: "Medical Director, Balco Medical Centre, Raipur", image: drBhawnaImg },
    { name: "Dr. Jill Koshiol", role: "Senior Investigator, National Cancer Institute (NCI)", image: drJillImg },
    { name: "Dr. Vinay Kapoor", role: "Pro Vice Chancellor, MGUMST", image: drVinayImg },
    { name: "Stacie C. Lindsey", role: "Founder & CEO, Cholangiocarcinoma Foundation", image: stacieImg },
    { name: "Dr. Sewanti Limaye", role: "Director Medical & Precision Oncology, Sir HN Reliance Hospital", image: drSewantiImg },
    { name: "Dr. Ravi Kanan", role: "Surgical Oncologist & Director, Cachar Cancer Hospital & Research", image: drRaviImg },
    { name: "Dr. Shefali Agarwal", role: "Professor of Surgery, Senior Consultant, Indraprastha Apollo Hospitals", image: drShefaliImg },
    { name: "Dr. Raman Sood", role: "Hematology and Oncology Care Provider, Brooks TLC", image: drRamanImg },
    { name: "Dr. Moushumi Suryavanshi", role: "HOD, Molecular Biology, Amrita Institute of Medical Sciences", image: drMoushumiImg },
    { name: "Dr. Vineet Gupta", role: "Oncologist, Fortis Hospital, New Delhi", image: drVineetImg },
    { name: "Dr. Chetan Arora", role: "Professor and Scientist, IIT Delhi", image: drChetanImg }
  ];

  function getInitials(name) {
    let cleanName = name.replace("Dr. ", "").replace("Prof. ", "").replace("Ms. ", "");
    let parts = cleanName.split(" ");
    return parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : parts[0][0].toUpperCase();
  }

  let scrollContainer;
  let autoScroll;

  const scroll = (direction) => {
    if (!scrollContainer) return;
    const cardWidth = scrollContainer.offsetWidth;
    scrollContainer.scrollBy({
      left: direction === "next" ? cardWidth : -cardWidth,
      behavior: "smooth"
    });
  };

  onMount(() => {
    autoScroll = setInterval(() => {
      if (scrollContainer) {
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10) {
          scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollContainer.scrollBy({ left: scrollContainer.clientWidth, behavior: "smooth" });
        }
      }
    }, 5000);
  });

  onDestroy(() => {
    clearInterval(autoScroll);
  });
</script>

<section class="py-12 md:py-20 px-0 md:px-6 bg-[#F8FAFF] overflow-hidden">
  <div class="max-w-7xl mx-auto flex flex-col items-center text-center">
    
    <div class="mb-8 md:mb-12 px-6">
      <div class="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
        Expert Network
      </div>
      <h2 class="text-3xl md:text-5xl font-black text-[#0D2561] tracking-tight">
        Advisory <span class="text-blue-600">Board</span>
      </h2>
      <p class="text-slate-500 text-sm md:text-base mt-4 font-medium opacity-80 max-w-2xl mx-auto">
        World-class medical leaders guiding our mission to transform cancer care pathways.
      </p>
    </div>

    <div class="flex gap-5 mb-10">
      <button on:click={() => scroll("prev")} aria-label="Previous" class="p-3 border border-blue-200 rounded-full bg-white text-[#0D2561] active:scale-90 hover:bg-[#0D2561] hover:text-white transition-all shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button on:click={() => scroll("next")} aria-label="Next" class="p-3 border border-blue-200 rounded-full bg-white text-[#0D2561] active:scale-90 hover:bg-[#0D2561] hover:text-white transition-all shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>

    <div
      bind:this={scrollContainer}
      class="flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth w-full"
      style="-webkit-overflow-scrolling: touch; scroll-behavior: smooth;"
    >
      {#each advisoryBoard as doctor}
        <div class="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 flex justify-center px-6 md:px-4 snap-center">
    
          <!-- Outer Card Frame -->
          <div class="w-full max-w-[360px] bg-[#2563EB]/10 p-2.5 rounded-[2.5rem] transition-all duration-300 hover:-translate-y-1">
      
          <!-- Inner White Card -->
          <div class="bg-white rounded-[2rem] p-6 text-center flex flex-col items-center justify-between min-h-[380px] border border-slate-100 shadow-sm">
        
          <!-- Image / Avatar Box -->
          <div class="w-full h-48 rounded-2xl overflow-hidden bg-slate-100 mb-4 flex items-center justify-center">
            {#if doctor.image}
            <img 
              src={doctor.image} 
              alt={doctor.name} 
              class="w-full h-full object-cover object-top"
            />
            {:else}
            <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-2xl shadow-md">
              {getInitials(doctor.name)}
            </div>
          {/if}
        </div>

        <!-- Name -->
        <h3 class="text-[#0D2561] font-extrabold text-lg md:text-xl mb-1 text-center">
          {doctor.name}
        </h3>

        <!-- Role & Affiliation -->
        <div class="w-full pt-3 border-t border-slate-100 text-center">
          <p class="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em] mb-1">Affiliation & Role</p>
          <p class="text-xs md:text-sm text-slate-600 font-medium leading-relaxed line-clamp-2">
            {doctor.role}
          </p>
        </div>

      </div>

    </div>

  </div>
 {/each}
    </div>

    <div class="flex gap-2 mt-8">
        <div class="w-8 h-1.5 bg-blue-600 rounded-full"></div>
        <div class="w-2 h-1.5 bg-blue-200 rounded-full"></div>
        <div class="w-2 h-1.5 bg-blue-200 rounded-full"></div>
    </div>

  </div>
</section>

<style>
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  section {
    -webkit-user-select: none;
    user-select: none;
  }
</style>
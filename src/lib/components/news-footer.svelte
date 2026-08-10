<script>
  import newsletterBadge from "$lib/svg/bg/newsletter-badge.svg";
  import collaborateBadge from "$lib/svg/bg/collaborate-badge.svg";

  let email = "";
  let newsText = "Subscribe";
  let newsDes = "Get the latest updates, inspiring stories and important news delivered right to your inbox.";
  let collaborateText = "Be part of the Journey";
  let collaborateDes = "Our mission thrives through the support of compassionate corporates, individuals, and organizations. Join us in making a difference.";
  let confirmationMessage = "";

  const mailchimpAction =
    "https://care.us16.list-manage.com/subscribe/post?u=1c1adf80af9253ef26764a28d&id=3ed044ddf2&f_id=00e80de0f0";

  function validateEmail(value) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(value).toLowerCase());
  }

  function handleSubmit() {
    if (validateEmail(email)) {
      confirmationMessage = "Thank you for subscribing!";
    } else {
      confirmationMessage = "Please enter a valid email address.";
    }
  }
</script>

<!-- Section Header -->
<div class="w-full bg-[#DCEEFF] pt-8 pb-4 text-center">
  <h2 class="text-[26px] md:text-[36px] font-bold text-[#0C1F56]">Connect With JCF</h2>
</div>

<!-- Desktop Layout -->
<div class="hidden md:block max-w-[1312px] mx-auto my-16 px-4">
  <div class="grid grid-cols-2 gap-8 items-stretch">
    <!-- Left Card: Subscribe Box -->
    <div class="bg-[#DCEEFF] p-8 rounded-none flex flex-col justify-between">
      <div class="relative px-2 flex flex-col gap-3">
        <div>
          <img src={newsletterBadge} alt="Newsletter" class="h-[34px] mb-3 select-none" />
          <h1 class="text-[#0C1F56] font-bold text-[1.85rem] leading-snug">
            {newsText}
          </h1>
          <p class="text-[#596273] font-normal text-[0.95rem] mt-2 leading-relaxed max-w-[90%]">
            {newsDes}
          </p>
        </div>

        <form
          class="flex items-center w-full gap-3 mt-6"
          action={mailchimpAction}
          method="post"
          target="_blank"
        >
          <input
            class="w-full max-w-[448px] h-[64px] px-5 rounded-md border border-[#1E4ED8] bg-[#FAFAFA] text-base text-[#0C1F56] placeholder-[#A0AEC0] focus:outline-none focus:ring-1 focus:ring-[#1E4ED8]"
            bind:value={email}
            placeholder="Enter your email ID"
            type="email"
            name="EMAIL"
            id="mce-EMAIL"
            required
          />
          <button
            type="submit"
            on:click={handleSubmit}
            class="h-[64px] px-8 bg-white hover:bg-blue-50 border border-[#1E4ED8] text-[#1E4ED8] font-semibold rounded-full text-base flex items-center justify-center transition-colors whitespace-nowrap shadow-sm shrink-0"
          >
            Submit
          </button>
          <div aria-hidden="true" style="position: absolute; left: -5000px;">
            <input type="text" name="b_1c1adf80af9253ef26764a28d_3ed044ddf2" tabindex="-1" value="" />
          </div>
        </form>
        {#if confirmationMessage}
          <p class="text-[#596273] text-sm mt-1">{confirmationMessage}</p>
        {/if}
      </div>
    </div>

    <!-- Right Card: Collaborate With Us -->
    <div class="py-4 pl-6 pr-4 flex flex-col justify-between">
      <div class="border-[#1E4ED8] border-l-4 pl-6 flex flex-col gap-4">
        <div>
          <img src={collaborateBadge} alt="Collaborate With Us" class="h-[34px] mb-3 select-none" />
          <h1 class="text-[#0C1F56] font-bold text-[1.85rem] leading-snug">
            {collaborateText}
          </h1>
          <p class="text-[#596273] font-normal text-[0.95rem] mt-2 leading-relaxed">
            {collaborateDes}
          </p>
        </div>

        <div class="grid grid-cols-2 w-full gap-4 mt-6">
          <div class="flex items-center">
            <svg
              class="w-5 h-5 text-[#1E4ED8] inline-block shrink-0 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 17l5-5-5-5"></path>
              <path d="M13 17l5-5-5-5"></path>
            </svg>
            <a href="/" class="font-bold text-[#1E4ED8] text-[0.95rem] hover:underline">
              Join Jarurat Care Team
            </a>
          </div>
          <div class="flex items-center">
            <svg
              class="w-5 h-5 text-[#1E4ED8] inline-block shrink-0 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 17l5-5-5-5"></path>
              <path d="M13 17l5-5-5-5"></path>
            </svg>
            <a href="/" class="font-bold text-[#1E4ED8] text-[0.95rem] hover:underline">
              Donate Money
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Mobile Layout matching exact Figma specs -->
<div class="w-full relative pb-12 md:hidden flex flex-col items-center bg-[#DCEEFF] px-3">
  <!-- Outer Wrapper Box (Wider container to match Figma aspect ratio) -->
  <div class="w-full max-w-[365px] bg-[#F8FAFC] p-3.5 flex flex-col gap-5">
    
    <!-- Top Subscribe Box -->
    <div class="bg-[#DCEEFF] p-4 flex flex-col">
      <img src={newsletterBadge} alt="Newsletter" class="h-[22px] w-max mb-2 select-none" />
      <h1 class="text-[#0C1F56] font-bold text-[20px] leading-tight">
        {newsText}
      </h1>
      <p class="text-[#596273] text-[12px] leading-relaxed mt-2">
        {newsDes}
      </p>

      <form class="mt-4 flex flex-col gap-2.5" action={mailchimpAction} method="post" target="_blank">
        <input
          class="w-full h-[42px] px-3.5 rounded border border-[#1E4ED8] bg-[#FAFAFA] text-xs text-[#0C1F56] placeholder-[#A0AEC0] focus:outline-none"
          bind:value={email}
          placeholder="Enter your email ID"
          type="email"
          name="EMAIL"
          id="mce-EMAIL-mobile"
          required
        />
        <button
          type="submit"
          on:click={handleSubmit}
          class="w-full h-[40px] bg-white border border-[#1E4ED8] text-[#1E4ED8] font-semibold rounded-full text-xs flex items-center justify-center transition-colors shadow-sm"
        >
          Submit
        </button>
        <div aria-hidden="true" style="position: absolute; left: -5000px;">
          <input type="text" name="b_1c1adf80af9253ef26764a28d_3ed044ddf2" tabindex="-1" value="" />
        </div>
      </form>

      {#if confirmationMessage}
        <p class="text-[#596273] text-[11px] mt-1.5 text-center">{confirmationMessage}</p>
      {/if}
    </div>

    <!-- Bottom Collaborate Section -->
    <div class="py-1 px-1 flex flex-col">
      <div class="border-[#1E4ED8] border-l-[3px] pl-3 flex flex-col gap-2.5">
        <div>
          <img src={collaborateBadge} alt="Collaborate With Us" class="h-[22px] w-max mb-2 select-none" />
          <h1 class="text-[#0C1F56] font-bold text-[20px] leading-tight">
            {collaborateText}
          </h1>
          <p class="text-[#596273] text-[12px] leading-relaxed mt-1.5">
            {collaborateDes}
          </p>
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <div class="flex items-center">
            <svg
              class="w-4 h-4 text-[#1E4ED8] inline-block shrink-0 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 17l5-5-5-5"></path>
              <path d="M13 17l5-5-5-5"></path>
            </svg>
            <a href="/" class="font-bold text-[#1E4ED8] text-[12px] hover:underline">
              Join Jarurat Care Team
            </a>
          </div>

          <div class="flex items-center">
            <svg
              class="w-4 h-4 text-[#1E4ED8] inline-block shrink-0 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 17l5-5-5-5"></path>
              <path d="M13 17l5-5-5-5"></path>
            </svg>
            <a href="/" class="font-bold text-[#1E4ED8] text-[12px] hover:underline">
              Donate Money
            </a>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
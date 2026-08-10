<script>
  import { onMount, onDestroy } from "svelte";
  import ContactUs from "$lib/svg/contact-us.svelte";
  import ContactNumber from "../contact-number.svelte";
  import FormInput from "../form-input.svelte";
  import RoleSelector from "../ui/RoleSelector.svelte";
  import BgImage from "./contact-banner.png";

  let heroText = "We Are Here For You";
  let getInTouchHeading = "Get in Touch";
  let getInTouchDescription = "Reach out to us for any support, collaboration or information.";
  let fillDetailsNote = "We'll get back to you as soon as possible.";
  let messageLabel = "Message";
  let messagePlaceholder = "How can we support you?";
  let privacyNotice = "Your information will remain confidential and be used to provide you with personalized support.";
  let submitButtonLabel = "Submit";

  // Form values
  let fullName = "";
  let role = "";
  let email = "";
  let phone = "";
  let message = "";
  let agreed = false;
  let sending = false;
  let submitted = false;
  let globalError = "";
  let fieldErrors = { fullName: "", email: "", message: "", agreed: "" };

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzdjkpde";

  let fullNameWrap;
  let roleWrap;
  let emailWrap;
  let phoneWrap;

  const listeners = [];

  function attachInputListener(wrapper, setter) {
    if (!wrapper) return;
    const el = wrapper.querySelector("input, textarea, select");
    if (!el) return;
    setter(el.value ?? "");
    const handler = (e) => setter(e.target.value);
    el.addEventListener("input", handler);
    listeners.push({ el, handler });
  }

  onMount(() => {
    attachInputListener(fullNameWrap, (v) => (fullName = v));
    attachInputListener(emailWrap, (v) => (email = v));
    attachInputListener(roleWrap, (v) => (role = v));
    attachInputListener(phoneWrap, (v) => (phone = v));
  });

  onDestroy(() => {
    for (const { el, handler } of listeners) {
      try { el.removeEventListener("input", handler); } catch {}
    }
  });

  function readFromWrappers() {
    try {
      const fnEl = fullNameWrap?.querySelector("input, textarea, select");
      if (fnEl) fullName = fnEl.value ?? fullName;
      const emEl = emailWrap?.querySelector("input, textarea, select");
      if (emEl) email = emEl.value ?? email;
      const rEl = roleWrap?.querySelector("input, select, textarea");
      if (rEl) role = rEl.value ?? role;
      const phEl = phoneWrap?.querySelector("input, textarea, select");
      if (phEl) phone = phEl.value ?? phone;
    } catch (e) {}
  }

  function validate() {
    fieldErrors = { fullName: "", email: "", message: "", agreed: "" };
    let ok = true;
    if (!fullName || !fullName.trim()) {
      fieldErrors.fullName = "Please enter your full name.";
      ok = false;
    }
    const emailPattern = /^[^\s]+@[^\s]+\.[^\s]+$/;
    if (email && email.trim() && !emailPattern.test(email.trim())) {
      fieldErrors.email = "Enter a valid email.";
      ok = false;
    }
    if (!agreed) {
      fieldErrors.agreed = "Please accept the privacy policy.";
      ok = false;
    }
    return ok;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    globalError = "";
    submitted = false;
    readFromWrappers();

    if (!validate()) return;

    sending = true;
    const fd = new FormData();
    fd.append("full name", fullName.trim());
    fd.append("role", role);
    fd.append("email", email.trim());
    fd.append("phone", phone.trim());
    fd.append("message", message.trim());
    fd.append("agreed", agreed ? "yes" : "no");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" }
      });
      if (res.ok) {
        submitted = true;
        setTimeout(() => location.reload(), 900);
      } else {
        let json = null;
        try { json = await res.json(); } catch {}
        globalError = (json && json.error) ? json.error : "Submission failed. Please try again later.";
      }
    } catch (err) {
      globalError = "Network error. Please check your connection and try again.";
    } finally {
      sending = false;
    }
  }
</script>

<!-- Hero Banner -->
<div class="pt-[89px]">
  <div 
    class="bg-cover bg-center w-full flex items-center justify-center h-[50vh] md:h-[870px]"
    style="background-image: url({BgImage});"
  >
    <h1 class="bg-white/60 backdrop-blur-sm text-[#0D2561] text-4xl md:text-[56px] font-bold px-8 py-5 rounded-2xl shadow-sm text-center -mt-16">
      {heroText}
    </h1>
  </div>
</div>

<!-- Form Section -->
<div class="relative bg-[#D7EDFF] overflow-hidden py-12 px-4">
  <ContactUs />
  
  <div class="relative z-10 flex flex-col items-center max-w-[1000px] mx-auto">
    <!-- Header Text -->
    <div class="text-center mb-8">
      <h1 class="text-[36px] md:text-[42px] font-bold text-[#0C1F56]">
        Get in Touch <span class="text-[#0155BD]">with Us</span>
      </h1>
      <p class="mt-2 text-[15px] md:text-[16px] text-[#55607A]">
        {getInTouchDescription}
        <br />
        {fillDetailsNote}
      </p>
    </div>

    {#if submitted}
      <div class="text-green-700 font-medium mb-4 text-center">Message sent successfully. Reloading...</div>
    {:else if globalError}
      <div class="text-red-600 font-medium mb-4 text-center">{globalError}</div>
    {/if}

    <!-- Main Card -->
    <div class="w-full bg-[#FAFAFA] rounded-[24px] shadow-sm p-6 md:p-10 border border-[#EBEBEB]">
      <form class="space-y-6" on:submit|preventDefault={handleSubmit}>
        
        <!-- Row 1: Full Name & Email -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div bind:this={fullNameWrap}>
            <FormInput data={{ name: "Full Name", placeholder: "Enter your full name", type: "text", required: true }} />
            {#if fieldErrors.fullName}
              <div class="text-red-500 text-xs mt-1">{fieldErrors.fullName}</div>
            {/if}
          </div>

          <div bind:this={emailWrap}>
            <FormInput data={{ name: "Email", placeholder: "you@gmail.com", type: "email", required: false }} />
            {#if fieldErrors.email}
              <div class="text-red-500 text-xs mt-1">{fieldErrors.email}</div>
            {/if}
          </div>
        </div>

        <!-- Row 2: Phone Number & Select Role -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div bind:this={phoneWrap}>
            <ContactNumber data={{ name: "Phone Number", placeholder: "Enter your phone number", required: true }} />
          </div>

          <div bind:this={roleWrap}>
            <RoleSelector />
          </div>
        </div>

        <!-- Message Field -->
        <div class="w-full">
          <label class="block text-sm font-semibold mb-2 text-[#24272A]">{messageLabel}</label>
          <textarea
            placeholder={messagePlaceholder}
            class="w-full bg-white text-[#24272A] placeholder-[#A0AEC0] border border-[#E2E8F0] focus:border-[#0155BD] focus:outline-none rounded-xl p-4 h-32 resize-none transition-all"
            bind:value={message}
            name="message"
          ></textarea>
        </div>

        <!-- Privacy Notice -->
        <div class="flex items-center justify-center gap-3 pt-2">
          <input 
            type="checkbox" 
            id="privacy" 
            class="h-4 w-4 rounded border-gray-300 text-[#0155BD] focus:ring-[#0155BD]"
            bind:checked={agreed} 
          />
          <label for="privacy" class="text-xs md:text-sm text-[#4A5568]">
            {privacyNotice}
          </label>
        </div>
        {#if fieldErrors.agreed}
          <div class="text-red-500 text-xs text-center">{fieldErrors.agreed}</div>
        {/if}

        <!-- Submit Button -->
        <div class="text-center pt-2">
          <button 
            class="bg-[#1D5BD8] hover:bg-[#1546AA] text-white font-medium px-10 py-2.5 rounded-full transition-all disabled:opacity-50"
            type="submit" 
            disabled={sending || submitted}
          >
            {#if sending}Sending...{:else}{submitButtonLabel}{/if}
          </button>
        </div>

      </form>
    </div>
  </div>
</div>
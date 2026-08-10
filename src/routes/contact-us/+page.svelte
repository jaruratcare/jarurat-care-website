<script>
  import ContactNumber from "$lib/components/contact-number.svelte";
  import FormInput from "$lib/components/form-input.svelte";
  import Nav from "$lib/components/nav.svelte";
  import ContactUs from "$lib/svg/contact-us.svelte";
  import NewsFooter from "$lib/components/news-footer.svelte";
  import RoleSelector from "$lib/components/ui/RoleSelector.svelte";
  import ContactForm from "$lib/components/contact-us/contact-form.svelte";
  import ContactCards from "$lib/components/contact-us/contact-cards.svelte";
  import Gallery from "$lib/components/contact-us/gallery.svelte";
</script>

<style>
  input:focus, textarea:focus {
    background-color: #D3F2FC;
    border: 2px solid #0155BD;
    outline: none;
  }
  input[type="checkbox"]:checked {
    background-color: #0155BD;
    border: 2px solid #0155BD;
  }
</style>

<Nav />

<!-- Unified background wrapper -->
<div class="bg-[#D7EDFF] w-full min-h-screen">
  <ContactForm />
  <ContactCards />
  <Gallery />
</div>

<NewsFooter />
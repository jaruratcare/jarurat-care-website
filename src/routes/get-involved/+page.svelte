<script>
  import Nav from '$lib/components/nav.svelte';
  import Hero from '$lib/components/get-involved/hero.svelte';
  import Help from '$lib/components/get-involved/help.svelte';
  import ExpertCommunity from '$lib/components/get-involved/expert-community.svelte';
  import Community from '$lib/components/get-involved/community.svelte';
  import MoreInfo from '$lib/components/get-involved/moreInfo.svelte';
</script>

<Nav />

<Hero />

<section class="w-full">
  <Help />
</section>

<!-- "Join Our Expert Community" Section -->
<section id="expert-community" class="w-full">
  <ExpertCommunity />
</section>

<section id="community" class="w-full">
  <Community />
</section>

<section class="w-full">
  <MoreInfo />
</section>
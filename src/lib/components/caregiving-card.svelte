<script>
	export let icon;
	export let title;
	export let about;
</script>

<div class="flex flex-col text-left h-full p-6 bg-white border-r last:border-r-0 border-gray-200">
	<!-- Icon Container -->
	<div class="bg-[#EFF6FF] text-[#1E4ED8] w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
		{#if icon}
			<div class="w-7 h-7 flex items-center justify-center">
				<svelte:component this={icon} />
			</div>
		{/if}
	</div>

	<!-- Content -->
	<h3 class="text-[#0D2460] font-bold text-xl mb-3 leading-snug">
		{title}
	</h3>
	<p class="text-[#64748B] text-sm leading-relaxed">
		{about}
	</p>
</div>
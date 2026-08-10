<script>
	export let icon;
	export let title;
	export let about;
</script>

<div class="flex flex-col text-left h-full">
	<div class="bg-[#EFF6FF] text-[#1E4ED8] w-12 h-12 rounded-xl flex items-center justify-center mb-5">
		{#if icon}
			<div class="w-6 h-6 flex items-center justify-center">
				<svelte:component this={icon} />
			</div>
		{/if}
	</div>
	<h3 class="text-[#0D2460] font-bold text-lg mb-3">
		{title}
	</h3>
	<p class="text-[#64748B] text-[15px] leading-relaxed">
		{about}
	</p>
</div>

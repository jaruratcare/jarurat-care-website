<script>
	import { ChevronDown } from 'lucide-svelte';

	export let question = '';
	export let points = [];
	export let linkText = '';
	export let linkHref = '';

	let isOpen = true;
</script>

<<<<<<< HEAD
<div class="bg-[#EFF6FF] rounded-2xl border border-blue-100 p-6 md:p-7 shadow-sm mb-4 font-sans antialiased">
	<button
		type="button"
		class="flex items-center justify-between w-full text-left gap-4 cursor-pointer group pb-3.5 border-b border-slate-300"
		on:click={() => (isOpen = !isOpen)}
	>
		<span class="text-[#7CB342] font-semibold text-[19px] md:text-[21px] leading-snug tracking-tight">
=======
<div class="w-full max-w-[591px] mx-auto bg-[#F3F6FD] px-5 py-3.5 rounded-2xl border border-[#AFC6FF] mb-4 transition-all duration-300">
	<button type="button" class="flex items-center justify-between w-full text-left gap-4 cursor-pointer group focus:outline-none" on:click={toggleOpen}>
		<span class="text-[#60A52A] font-semibold text-[15px] sm:text-[18px] leading-normal sm:leading-snug group-hover:text-[#589223] transition-colors">
>>>>>>> privacy-policy
			{question}
		</span>
		<ChevronDown
			class={`w-6 h-6 text-[#7CB342] shrink-0 transition-transform duration-300 ${
				isOpen ? 'rotate-180' : ''
			}`}
		/>
	</button>

	{#if isOpen}
		<div class="pt-4">
			<!-- Bullet Points -->
			{#if points && points.length > 0}
				<ul class="space-y-3 mb-6">
					{#each points as point}
						<li class="flex items-start gap-2.5 text-slate-700 text-[17px] md:text-[18px] leading-relaxed font-normal">
							<span class="text-slate-400 mt-0.5 select-none font-bold text-lg">•</span>
							<span>{point}</span>
						</li>
					{/each}
				</ul>
			{/if}

			{#if linkText && linkHref}
				<div class="flex justify-end pt-2">
					<a
						href={linkHref}
						class="text-[#2563EB] font-bold text-[18px] md:text-[20px] inline-flex items-center gap-2 underline underline-offset-4 hover:underline transition-colors tracking-tight"
					>
						<span>{linkText}</span>
						<span class="no-underline text-2xl font-normal">→</span>
					</a>
				</div>
			{/if}
		</div>
	{/if}
</div>
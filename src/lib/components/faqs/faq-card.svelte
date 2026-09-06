<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';

	export let question: string = '';
	export let points: string[] = [];
	export let linkText: string = '';
	export let linkHref: string = '';

	let isOpen: boolean = true;
</script>

<div class="bg-[#EFF6FF] rounded-2xl border border-blue-100 p-4 md:p-5 shadow-sm mb-4 font-sans antialiased">
	<!-- Accordion Header -->
	<button
		type="button"
		class="flex items-center justify-between w-full text-left gap-3 cursor-pointer group pb-3 border-b border-slate-300"
		on:click={() => (isOpen = !isOpen)}
	>
		<span class="text-[#7CB342] font-semibold text-[19px] md:text-[21px] leading-snug tracking-tight">
			{question}
		</span>
		<ChevronDown
			class={`w-6 h-6 text-[#7CB342] shrink-0 transition-transform duration-300 ${
				isOpen ? 'rotate-180' : ''
			}`}
		/>
	</button>

	<!-- Accordion Content -->
	{#if isOpen}
		<div class="pt-3.5">
			<!-- Bullet Points -->
			{#if points && points.length > 0}
				<ul class="space-y-3 mb-5">
					{#each points as point}
						<li class="flex items-start gap-2.5 text-slate-700 text-[17px] md:text-[18px] leading-relaxed font-normal">
							<span class="text-slate-400 mt-0.5 select-none font-bold text-lg">•</span>
							<span>{point}</span>
						</li>
					{/each}
				</ul>
			{/if}

			<!-- Bottom Right Link -->
			{#if linkText && linkHref}
				<div class="flex justify-end pt-1">
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
<script lang="ts">
	import { marked } from 'marked';
	import { ChevronDown } from 'lucide-svelte';
	import { writable } from 'svelte/store';

	export let question = '';
	export let answer = '';

	let isOpen = writable(false);
	let contentEl: HTMLDivElement | null = null;

	const toggleOpen = () => isOpen.update((val) => !val);
	const contentHeight = (el: HTMLDivElement | null) => (el ? `${el.scrollHeight + 50}px` : '0px');

	function getActionText() {
		const q = question.trim();
		if (q === 'What is Jarurat Care Foundation?') return 'Know More →';
		if (q === 'Who can seek support from JCF?') return 'Seek Support →';
		if (q === 'Can JCF connect me with experts?' || q === 'Can JCF connect me with experts and support networks?') {
			return 'Meet Our Experts →';
		}
		return '';
	}

	function getActionHref() {
		const q = question.trim();
		if (q === 'What is Jarurat Care Foundation?') return '/about-us';
		if (q === 'Who can seek support from JCF?' || q === 'Can JCF connect me with experts?' || q === 'Can JCF connect me with experts and support networks?') {
			return '/get-involved';
		}
		return '#';
	}

	function getCleanAnswer(rawAnswer: string) {
		return rawAnswer
			.replace(/\[Meet Our Experts[^\]]*\]\([^)]+\)/g, '')
			.replace(/\[Know More[^\]]*\]\([^)]+\)/g, '')
			.replace(/\[Seek Support[^\]]*\]\([^)]+\)/g, '');
	}
</script>

<div class="w-full max-w-[590px] mx-auto bg-[#F3F6FD] px-5 py-3.5 rounded-2xl border border-[#AFC6FF] mb-4 transition-all duration-300">
	<button type="button" class="flex items-center justify-between w-full text-left gap-4 cursor-pointer group focus:outline-none" on:click={toggleOpen}>
		<span class="text-[#60A52A] font-semibold text-[15px] sm:text-[18px] leading-normal sm:leading-snug group-hover:text-[#589223] transition-colors">
			{question}
		</span>
		<ChevronDown class="text-[#5D9829] w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 transition-transform duration-300 {$isOpen ? 'rotate-180' : ''}" />
	</button>

	<div class="overflow-hidden transition-[max-height] duration-300 ease-in-out" style="max-height: {$isOpen ? contentHeight(contentEl) : '0px'}">
		<div class="border-b border-[#6BAA2E] mt-3 mb-2.5 w-full"></div>

		<div bind:this={contentEl} class="faq-content text-[#667085]">
			{@html marked(getCleanAnswer(answer))}

			{#if getActionText()}
				<a href={getActionHref()} class="faq-action-link">
					{getActionText()}
				</a>
			{/if}
		</div>
	</div>
</div>

<style>
	:global(.faq-content p, .faq-content li) {
		margin: 0 0 0.4rem 0;
		padding: 0;
		color: #667085;
		font-size: 15.5px;
		line-height: 1.5;
	}

:global(.faq-content a:hover) {
    text-decoration: underline;
}
</style>


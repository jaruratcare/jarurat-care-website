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
		if (q === 'Why is Jarurat Care Foundation started?') return 'Our Story →';
		if (q === 'Who can seek support from JCF?') return 'Seek Support →';
		if (q === 'Who are the people behind JCF?') return 'Meet Our Team →';
		if (q === 'Can JCF connect me with experts?' || q === 'Can JCF connect me with experts and support networks?') {
			return 'Meet Our Experts →';
		}
		if (q === 'How can I contribute to JCF’s mission?' || q === 'How can I contribute to JCF\'s mission?' || q === 'Who can volunteer with JCF?') {
			return 'Apply As Volunteer →';
		}
		if (q === 'Can I join the Advisory Board?') return 'Apply →';
		if (q === 'Can cancer survivors or caregivers contribute?') return 'Join The Community →';
		return '';
	}

	function getActionHref() {
		const q = question.trim();
		if (q === 'What is Jarurat Care Foundation?' || q === 'Why is Jarurat Care Foundation started?') {
			return '/about-us';
		}
		if (q === 'Who are the people behind JCF?' || q === 'Can JCF connect me with experts?' || q === 'Can JCF connect me with experts and support networks?') {
			return '/get-involved';
		}
		if (q === 'Who can seek support from JCF?') {
			return '/contact-us';
		}
		// Routes directly to your existing Join Us page route
		if (q === 'How can I contribute to JCF’s mission?' || q === 'How can I contribute to JCF\'s mission?' || q === 'Who can volunteer with JCF?') {
			return '/join-us'; 
		}
		if (q === 'Can I join the Advisory Board?' || q === 'Can cancer survivors or caregivers contribute?') {
			return '/get-involved';
		}
		return '#';
	}

	function getCleanAnswer(rawAnswer: string) {
		return rawAnswer
			.replace(/\[Our Story[^\]]*\]\([^)]+\)/g, '')
			.replace(/\[Know More[^\]]*\]\([^)]+\)/g, '')
			.replace(/\[Seek Support[^\]]*\]\([^)]+\)/g, '')
			.replace(/\[Meet Our Team[^\]]*\]\([^)]+\)/g, '')
			.replace(/\[Meet Our Experts[^\]]*\]\([^)]+\)/g, '')
			.replace(/\[Apply as Volunteer[^\]]*\]\([^)]+\)/g, '')
			.replace(/\[Apply As Volunteer[^\]]*\]\([^)]+\)/g, '')
			.replace(/\[Apply[^\]]*\]\([^)]+\)/g, '')
			.replace(/\[Join The Community[^\]]*\]\([^)]+\)/g, '');
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

	:global(.faq-content ul) {
		list-style-type: disc;
		padding-left: 1.25rem;
		margin: 0;
	}

	:global(.faq-content li::marker) {
		color: #9ca3af;
	}

	:global(.faq-action-link) {
		display: flex;
		justify-content: flex-end;
		width: 100%;
		margin-top: 0.5rem;
		color: #2563eb !important;
		font-size: 15.5px;
		font-weight: 700;
		line-height: 1.3;
		text-align: right;
		text-decoration: underline !important;
		text-decoration-color: #2563eb !important;
		text-underline-offset: 3.5px;
		text-decoration-thickness: 1.5px;
		cursor: pointer;
		transition: color 0.2s ease, opacity 0.2s ease;
	}

	:global(.faq-action-link:hover) {
		color: #1d4ed8 !important;
		opacity: 0.9;
	}

	:global(.faq-content a:not(.faq-action-link)) {
		color: #2563eb !important;
		font-weight: 700;
		text-decoration: underline !important;
		text-decoration-color: #2563eb !important;
		text-underline-offset: 3.5px;
	}

	@media (max-width: 700px) {
		:global(.faq-content p, .faq-content li) {
			font-size: 14px;
			line-height: 1.45;
			margin-bottom: 0.35rem;
		}

		:global(.faq-action-link) {
			font-size: 14px;
			margin-top: 0.45rem;
		}
	}
</style>
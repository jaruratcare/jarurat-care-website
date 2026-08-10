<script>
	import Nav from '$lib/components/nav.svelte';
	import HeroBackground from './HeroBackground.svg';

	const lastUpdated = 'March 15, 2026';

	// Mapping icons stored in static/icons/
	const icons = {
		'getting-started': '/icons/getting-started.svg',
		'responsibilities': '/icons/responsibilities.svg',
		'services': '/icons/services.svg',
		'health': '/icons/health.svg',
		'donation': '/icons/donation.svg',
		'legal': '/icons/legal.svg',
		'privacy': '/icons/privacy.svg',
		'updates': '/icons/update.svg'
	};

	let activeSection = 'Getting Started';
	let isTocOpen = false; // Mobile/Tab accordion state

	const categories = [
		{
			id: 'getting-started',
			name: 'Getting Started',
			iconKey: 'getting-started',
			items: [
				{
					num: 1,
					title: 'Introduction',
					body: `Welcome to the website of Jarurat Care Foundation. These Terms & Conditions govern your access to and use of our website, services, and resources. By accessing or using this website, you agree to comply with these Terms. If you do not agree with any part of these Terms, please discontinue use of the website immediately.`
				},
				{
					num: 2,
					title: 'About the Organization',
					body: `Jarurat Care Foundation is a nonprofit organization dedicated to supporting cancer patients, caregivers, and healthcare communities. Our platform provides educational information, support resources, and awareness initiatives related to cancer care and patient support.`
				},
				{
					num: 3,
					title: 'Eligibility',
					body: `By using this website you confirm that you are at least 18 years of age or are accessing the website under the supervision of a parent or guardian.`
				}
			]
		},
		{
			id: 'responsibilities',
			name: 'Your Responsibilities',
			iconKey: 'responsibilities',
			items: [
				{
					num: 1,
					title: 'Acceptable Use',
					body: 'Users agree not to:',
					list: [
						'Use the website for any unlawful or fraudulent activity.',
						'Post or transmit abusive, defamatory, misleading, or harmful content.',
						'Attempt to gain unauthorized access to systems or user data.',
						'Upload malware, viruses, or malicious software.',
						'Impersonate another individual or organization.'
					]
				},
				{
					num: 2,
					title: 'User Content',
					body: `If you submit messages, feedback, or other content through the website, you grant Jarurat Care Foundation a non-exclusive, worldwide, royalty-free license to use, display, and distribute such content for the purpose of operating and improving the platform.\n\nWe reserve the right to remove or restrict content that violates these Terms or is harmful to users or the community.`
				}
			]
		},
		{
			id: 'services',
			name: 'Services & Content',
			iconKey: 'services',
			items: [
				{
					num: 1,
					title: 'Intellectual Property',
					body: `All content on this website, including text, images, graphics, logos, and design elements, is the property of Jarurat Care Foundation unless otherwise stated.`,
					list: [
						'Users may access and share content for personal and educational use.',
						'Commercial use, reproduction, or redistribution requires written permission.'
					]
				},
				{
					num: 2,
					title: 'Third-Party Links',
					body: `The website may include links to third-party platforms such as social media pages, payment services, or informational resources. Jarurat Care Foundation is not responsible for the content, policies, or practices of these external websites.`
				},
				{
					num: 3,
					title: 'Service Availability',
					body: `We strive to maintain uninterrupted access to the website, but we cannot guarantee that services will always be available. The website may be temporarily unavailable due to maintenance, technical issues, or updates.`
				}
			]
		},
		{
			id: 'health',
			name: 'Health & Safety',
			iconKey: 'health',
			items: [
				{
					num: 1,
					title: 'Medical Disclaimer',
					body: `The information available on this website is intended solely for educational and informational purposes. It should not be considered a substitute for professional medical advice, diagnosis, or treatment.`,
					list: [
						'Always consult a qualified medical professional for health-related concerns.',
						'Do not ignore professional medical advice because of information found on this website.',
						'Jarurat Care Foundation does not provide direct medical treatment or diagnosis.'
					]
				}
			]
		},
		{
			id: 'donation',
			name: 'Donation',
			iconKey: 'donation',
			items: [
				{
					num: 1,
					title: 'Donations',
					body: `If donations are made through the website, they are voluntary contributions supporting the mission and programs of Jarurat Care Foundation. Payments are processed through secure third-party payment providers.\n\nRefunds, if applicable, will be reviewed and handled on a case-by-case basis.`
				}
			]
		},
		{
			id: 'legal',
			name: 'Legal Terms',
			iconKey: 'legal',
			items: [
				{
					num: 1,
					title: 'Limitation of Liability',
					body: `To the maximum extent permitted by law, Jarurat Care Foundation and its affiliates shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use this website.`
				},
				{
					num: 2,
					title: 'Indemnification',
					body: `You agree to indemnify and hold harmless Jarurat Care Foundation, its volunteers, partners, and affiliates from any claims, damages, or liabilities resulting from your misuse of the website or violation of these Terms.`
				},
				{
					num: 3,
					title: 'Governing Law',
					body: `These Terms shall be governed by and interpreted in accordance with the laws of India. Any disputes relating to the website shall fall under the jurisdiction of the competent courts in India.`
				}
			]
		},
		{
			id: 'privacy',
			name: 'Privacy',
			iconKey: 'privacy',
			items: [
				{
					num: 1,
					title: 'Privacy Policy',
					body: `Your use of this website is also governed by our Privacy Policy, which explains how personal data is collected, processed, and protected in accordance with applicable regulations, including the Digital Personal Data Protection Act, 2023.`
				}
			]
		},
		{
			id: 'contact',
			name: 'Updates & Contact',
			iconKey: 'updates',
			items: [
				{
					num: 1,
					title: 'Changes to Terms',
					body: `These Terms may be updated periodically. Any updates will be posted on this page with a revised "Last updated" date. Continued use of the website indicates acceptance of the updated Terms.`
				},
				{
					num: 2,
					title: 'Termination of Access',
					body: `We reserve the right to restrict or terminate access to the website if a user violates these Terms or engages in harmful activity.`
				},
				{
					num: 3,
					title: 'Contact',
					body: 'contact-email'
				}
			]
		}
	];

	function selectCategory(name) {
		activeSection = name;
		isTocOpen = false; // Close mobile dropdown upon selection
	}
</script>

<Nav />

<main class="bg-[#F8FBFF] min-h-screen text-[#0D2561] font-sans pb-24">
	<!-- Full Width Hero Banner pushed down from under the nav bar -->
	<section class="w-full pt-16 pb-0 mt-8 overflow-hidden">
		<img 
			src={HeroBackground} 
			alt="Terms & Conditions - Last updated March 15, 2026" 
			class="w-full h-auto block object-cover m-0 p-0"
		/>
	</section>

	<!-- Grid Layout (Responsive Stacking for Tab/Mobile) -->
	<div class="w-full px-0 mt-0 grid grid-cols-1 lg:grid-cols-12 gap-0 items-start">
		
		<!-- Table of Contents Section -->
		<aside class="lg:col-span-4 bg-white border-y lg:border-r border-[#E2E8F0] p-4 lg:p-6 shadow-sm lg:sticky lg:top-28 rounded-none">
			<!-- Mobile / Tab Accordion Header -->
			<button 
				on:click={() => (isTocOpen = !isTocOpen)}
				class="w-full flex lg:hidden items-center justify-between py-2 font-bold text-base text-[#0C1F56]"
			>
				<span>Table of Contents</span>
				<svg
					class="w-5 h-5 text-[#64748B] transition-transform duration-200 {isTocOpen ? 'rotate-180' : ''}"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			<!-- Categories List (Always visible on desktop, toggleable on mobile/tab) -->
			<div class="mt-3 lg:mt-0 space-y-3 {isTocOpen ? 'block' : 'hidden lg:block'}">
				{#each categories as category}
					<div class="border-b border-[#F1F5F9] last:border-none pb-2">
						<button
							on:click={() => selectCategory(category.name)}
							class="w-full flex items-center justify-between py-2 text-left font-semibold text-sm lg:text-base transition-colors {activeSection === category.name ? 'text-[#1E4ED8]' : 'text-[#0C1F56] hover:text-[#1E4ED8]'}"
						>
							<span>{category.name}</span>
							<svg
								class="w-4 h-4 text-[#64748B] transition-transform duration-200 lg:inline-block hidden {activeSection === category.name ? 'rotate-180' : ''}"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
							</svg>
						</button>
					</div>
				{/each}
			</div>
		</aside>

		<!-- Content Section -->
		<section class="lg:col-span-8 bg-white border-y border-[#E2E8F0] p-5 sm:p-8 lg:p-12 shadow-sm rounded-none">
			{#each categories as category}
				{#if activeSection === category.name}
					<!-- Main Section Header with Icon -->
					<div class="flex items-center gap-3 pb-4 border-b border-[#E2E8F0] mb-6 sm:mb-8">
						<img src={icons[category.iconKey]} alt="" class="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
						<h2 class="text-lg sm:text-xl font-bold text-[#0C1F56]">{category.name}</h2>
					</div>

					<!-- Dynamic Numbered Items -->
					<div class="space-y-8 sm:space-y-10">
						{#each category.items as item}
							<article id="item-{item.num}" class="scroll-mt-28">
								<div class="flex items-center gap-3 mb-3">
									<span class="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-[#EFF6FF] text-[#1E4ED8] font-bold text-xs sm:text-sm flex items-center justify-center shrink-0">
										{item.num}
									</span>
									<h3 class="text-base sm:text-lg font-bold text-[#0C1F56]">{item.title}</h3>
								</div>

								<div class="pl-9 sm:pl-10">
									{#if item.title === 'Contact'}
										<p class="text-[#596273] text-sm sm:text-base leading-relaxed">
											If you have any questions regarding these Terms & Conditions, please contact us at:
											<a href="mailto:Priyanka.joshi@jarurat.care" class="text-[#1E4ED8] font-medium hover:underline">
												Priyanka.joshi@jarurat.care
											</a>.
										</p>
									{:else}
										<p class="text-[#596273] text-sm sm:text-base leading-relaxed whitespace-pre-line">
											{item.body}
										</p>
									{/if}

									{#if item.list}
										<ul class="list-disc pl-5 mt-3 space-y-1 text-[#596273] text-sm sm:text-base">
											{#each item.list as point}
												<li>{point}</li>
											{/each}
										</ul>
									{/if}
								</div>
							</article>
						{/each}
					</div>
				{/if}
			{/each}
		</section>
	</div>
</main>
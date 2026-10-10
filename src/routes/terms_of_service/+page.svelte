<script>
	import Nav from '$lib/components/nav.svelte';
	import HeroBackground from './HeroBackground.svg';
	import HeroBackgroundMobile from './HeroBackgroundMobile.svg';

	const lastUpdated = 'March 15, 2026';
	const contactEmail = 'Priyanka.joshi@jarurat.care';
	const organisationAddress = `Jarurat Care Foundation
C/O M.C. Joshi, Aastha Vihar, Polysheet
Haldwani, Amritpur, Nainital
Uttarakhand – 263126
India`;

	// Updated icon mappings reflecting your newly renamed icon assets
	const icons = {
		'intro': '/icons/foundation.svg',
		'responsibilities': '/icons/user-response.svg',
		'payments': '/icons/pay.svg',
		'services': '/icons/services.svg',
		'legal': '/icons/legal-protection.svg',
		'updates': '/icons/update.svg'
	};

	let activeSection = 'Intro & Access';
	let isTocOpen = false;

	const categories = [
		{
			id: 'intro',
			name: 'Intro & Access',
			iconKey: 'intro',
			items: [
				{
					num: 1,
					title: 'Scope',
					body: `These Terms of Service ("Terms") govern your access to and use of the online services, resources, and content provided by Jarurat Care Foundation. This includes access to jarurat.care, its subdomains, and any related services (collectively, the "Services"). By using the Services, you agree that these Terms apply to your access and usage.`
				},
				{
					num: 2,
					title: 'Acceptance',
					body: 'By using the Services you agree to these Terms. If you do not agree with these Terms, please discontinue use of the Services.'
				},
				{
					num: 3,
					title: 'Accounts & Access',
					body: 'Some features may require registration. You are responsible for maintaining the confidentiality of your account credentials and for activities performed under your account.'
				}
			]
		},
		{
			id: 'responsibilities',
			name: 'User Responsibilities',
			iconKey: 'responsibilities',
			items: [
				{
					num: 1,
					title: 'User Obligations',
					body: '',
					list: [
						'Provide accurate and truthful information.',
						'Use the platform only for lawful purposes.',
						'Respect other users and the community.'
					]
				},
				{
					num: 2,
					title: 'Prohibited Conduct',
					body: '',
					list: [
						'Engaging in illegal or fraudulent activity.',
						'Attempting to gain unauthorized access to systems.',
						'Uploading malware or harmful software.',
						'Harassment, abusive behavior, or misinformation.'
					]
				},
				{
					num: 3,
					title: 'User Content',
					body: `If you submit content such as comments, feedback, or information, you grant Jarurat Care Foundation permission to use such content solely for the purpose of operating, maintaining, and improving the platform.`
				}
			]
		},
		{
			id: 'payments',
			name: 'Payments',
			iconKey: 'payments',
			items: [
				{
					num: 1,
					title: 'Donation',
					body: 'If donations are made through the platform, they are processed through secure third-party payment providers. Any donation-related questions or concerns may be directed to Priyanka.joshi@jarurat.care.',
					customHtmlType: 'donationsEmail'
				}
			]
		},
		{
			id: 'services',
			name: 'Services & Partners',
			iconKey: 'services',
			items: [
				{
					num: 1,
					title: 'Third-Party Services',
					body: 'The Services may include links to third-party websites or tools. Jarurat Care Foundation does not control and is not responsible for the content, policies, or practices of these external services.'
				},
				{
					num: 2,
					title: 'Intellectual Property',
					body: 'All content, including text, graphics, logos, and website design, is owned by or licensed to Jarurat Care Foundation. Such content may not be copied, reproduced, or distributed without prior written permission.'
				},
				{
					num: 3,
					title: 'Privacy',
					body: 'Your use of the Services is also governed by our Privacy Policy, which explains how personal data is collected, used, and protected.'
				}
			]
		},
		{
			id: 'legal',
			name: 'Legal Protection',
			iconKey: 'legal',
			items: [
				{
					num: 1,
					title: 'Disclaimer',
					body: 'The Services are provided on an “as is” and “as available” basis. We do not guarantee that the platform will always be available, secure, or free from errors.'
				},
				{
					num: 2,
					title: 'Limitation of Liability',
					body: 'To the maximum extent permitted by law, Jarurat Care Foundation shall not be liable for any indirect, incidental, or consequential damages arising from the use of the Services.'
				},
				{
					num: 3,
					title: 'Termination',
					body: 'We may suspend or terminate access to the Services if users violate these Terms or engage in harmful, abusive, or unlawful activities.'
				}
			]
		},
		{
			id: 'updates',
			name: 'Updates & Contact',
			iconKey: 'updates',
			items: [
				{
					num: 1,
					title: 'Changes to Terms',
					body: 'These Terms may be updated from time to time. Updated versions will be posted on this page along with a revised \'Last updated\' date, and will become effective from that date unless otherwise stated.'
				},
				{
					num: 2,
					title: 'Contact',
					customHtmlType: 'contactUs'
				}
			]
		}
	];

	function selectCategory(name) {
		activeSection = name;
		isTocOpen = false;
	}
</script>

<Nav />

<main class="bg-[#F8FBFF] min-h-screen text-[#0D2561] font-sans pb-24 pt-16 md:pt-24">
	<!-- Responsive Hero Banner -->
	<section class="w-full pb-0 overflow-hidden">
		<img 
			src={HeroBackgroundMobile} 
			alt="Terms of Service - Last updated March 15, 2026" 
			class="w-full h-auto block md:hidden object-cover m-0 p-0"
		/>
		<img 
			src={HeroBackground} 
			alt="Terms of Service - Last updated March 15, 2026" 
			class="w-full h-auto hidden md:block object-cover m-0 p-0"
		/>
	</section>

	<!-- Grid Layout with Sidebar and Content Sections -->
	<div class="w-full px-0 mt-0 grid grid-cols-1 lg:grid-cols-12 gap-0 items-start">
		
		<!-- Table of Contents Sidebar -->
		<aside class="lg:col-span-4 bg-white border-y lg:border-r border-[#E2E8F0] p-4 lg:p-6 shadow-sm lg:sticky lg:top-28 rounded-none">
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

			<div class="mt-3 lg:mt-0 space-y-4 {isTocOpen ? 'block' : 'hidden lg:block'}">
				{#each categories as category}
					<div class="border-b border-[#F1F5F9] last:border-none pb-3">
						<button
							on:click={() => selectCategory(category.name)}
							class="w-full flex items-center justify-between py-1 text-left font-semibold text-sm lg:text-base transition-colors {activeSection === category.name ? 'text-[#1E4ED8]' : 'text-[#0C1F56] hover:text-[#1E4ED8]'}"
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

						{#if activeSection === category.name}
							<div class="mt-2 ml-3 space-y-2 border-l-2 border-[#DBEAFE] pl-3 hidden lg:block">
								{#each category.items as subItem}
									<a
										href="#item-{category.id}-{subItem.num}"
										class="block text-xs lg:text-sm text-[#475569] hover:text-[#1E4ED8] transition-colors font-medium"
									>
										{subItem.title}
									</a>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</aside>

		<!-- Main Content Section -->
		<section class="lg:col-span-8 bg-white border-y border-[#E2E8F0] p-5 sm:p-8 lg:p-12 shadow-sm rounded-none">
			{#each categories as category}
				{#if activeSection === category.name}
					<div class="flex items-center gap-3 pb-4 border-b border-[#E2E8F0] mb-6 sm:mb-8">
						<img src={icons[category.iconKey]} alt="" class="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
						<h2 class="text-lg sm:text-xl font-bold text-[#0C1F56]">{category.name}</h2>
					</div>

					<div class="space-y-8 sm:space-y-10">
						{#each category.items as item}
							<article id="item-{category.id}-{item.num}" class="scroll-mt-28">
								<div class="flex items-center gap-3 mb-3">
									<span class="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-[#EFF6FF] text-[#1E4ED8] font-bold text-xs sm:text-sm flex items-center justify-center shrink-0">
										{item.num}
									</span>
									<h3 class="text-base sm:text-lg font-bold text-[#0C1F56]">{item.title}</h3>
								</div>

								<div class="pl-9 sm:pl-10">
									{#if item.body}
										<p class="text-[#596273] text-sm sm:text-base leading-relaxed whitespace-pre-line">
											{item.body}
										</p>
									{/if}

									{#if item.list}
										<ul class="list-disc pl-5 mt-3 space-y-1.5 text-[#596273] text-sm sm:text-base">
											{#each item.list as point}
												<li>{point}</li>
											{/each}
										</ul>
									{/if}

									{#if item.customHtmlType === 'donationsEmail'}
										<p class="text-[#596273] text-sm sm:text-base leading-relaxed mt-3">
											Any donation-related questions or concerns may be directed to <a href="mailto:{contactEmail}" class="text-[#1E4ED8] font-normal hover:underline">{contactEmail}</a>.
										</p>
									{/if}

									{#if item.customHtmlType === 'contactUs'}
										<p class="text-[#596273] text-sm sm:text-base leading-relaxed">
											If you have questions about these Terms of Service, please contact:<br /><br />
											<strong>Email:</strong> <a href="mailto:{contactEmail}" class="text-[#1E4ED8] font-normal hover:underline">{contactEmail}</a><br /><br />
											<strong>Address:</strong><br />
											<span class="whitespace-pre-line block mt-1">{organisationAddress}</span>
										</p>
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
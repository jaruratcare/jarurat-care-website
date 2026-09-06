<script>
	import Nav from '$lib/components/nav.svelte';
	// Footer is removed here to prevent duplication if your layout already handles it
	import HeroBackground from './HeroBackground.svg';
	import HeroBackgroundMobile from './HeroBackgroundMobile.svg';

	const lastUpdated = 'March 15, 2026';
	const contactEmail = 'Priyanka.joshi@jarurat.care';

	// Mapping icons stored in static/icons/ matching your actual filenames
	const icons = {
		'foundation': '/icons/foundation.svg',
		'data-collection': '/icons/data-collection.svg',
		'data-usage': '/icons/data-usage.svg',
		'sharing': '/icons/sharing.svg',
		'security': '/icons/security.svg',
		'user-control': '/icons/user-control.svg',
		'legal': '/icons/legal.svg',
		'contact': '/icons/contact.svg'
	};

	let activeSection = 'Foundation';
	let isTocOpen = false; // Mobile/Tab accordion state

	const categories = [
		{
			id: 'foundation',
			name: 'Foundation',
			iconKey: 'foundation',
			items: [
				{
					num: 1,
					title: 'Overview',
					body: 'Jarurat Care Foundation is committed to protecting your privacy and handling your personal data in a transparent and secure manner. This Privacy Policy explains what information we collect, why we collect it, how we use it, who we share it with, and how you can exercise your rights.'
				},
				{
					num: 2,
					title: 'Scope',
					body: 'This Policy applies to information collected through our website, services, forms, emails, phone calls, and other interactions with Jarurat Care Foundation. It covers users, donors, volunteers, healthcare partners, and visitors.'
				},
				{
					num: 3,
					title: 'Legal Framework',
					body: 'We process personal data in accordance with applicable laws, including the Digital Personal Data Protection Act, 2023 where relevant, and other local regulations. We rely on lawful bases such as consent, contract performance, legal obligation, and legitimate interests, depending on the nature of the processing activity.'
				}
			]
		},
		{
			id: 'data-collection',
			name: 'Data Collection',
			iconKey: 'data-collection',
			items: [
				{
					num: 1,
					title: 'Personal Data',
					body: '',
					list: [
						'Identity & contact data: name, email, phone number, postal address.',
						'Health & case data: medical queries, medical history, appointment notes — only when you share them to receive a service.',
						'Transactional data: donation records, payment receipts, billing address.',
						'Support & communications: messages and case notes submitted to support teams.',
						'Technical data: IP address, browser type, device, operating system, pages visited, referral URL, cookies, and usage analytics.'
					]
				},
				{
					num: 2,
					title: 'Data Collecting Method',
					body: '',
					list: [
						'Directly from you when you provide it (forms, registrations, emails, calls).',
						'Automatically when you use the website (cookies and server logs).',
						'From third parties where you have given permission or where permitted by law\n(e.g. payment processors, healthcare partners).'
					]
				},
				{
					num: 3,
					title: 'Cookies & Tracking',
					body: 'We use cookies and similar technologies for site functionality, analytics, and preference storage. You can manage cookie preferences via your browser or the cookie banner on our site. Disabling certain cookies may affect site features.'
				}
			]
		},
		{
			id: 'data-usage',
			name: 'Data Usage',
			iconKey: 'data-usage',
			items: [
				{
					num: 1,
					title: 'Service Use',
					body: 'Typical uses include:',
					list: [
						'Providing requested services (appointments, teleconsultation, follow-ups).',
						'Processing donations and sending receipts.',
						'Responding to queries, support requests, and volunteer applications.',
						'Improving our services, research, and analytics (using aggregated or anonymized data where possible).',
						'Sending service-related communications, updates, and where consent is given, occasional marketing.',
						'Meeting legal and regulatory obligations and preventing fraud or abuse.'
					]
				},
				{
					num: 2,
					title: 'Lawful Basis and Consent',
					body: 'Where required, we will ask for your explicit consent to process sensitive data (for example, health information). You may withdraw your consent at any time by contacting us at the email below. Withdrawal will not affect processing carried out while your consent was valid.'
				},
				{
					num: 3,
					title: 'Automated Decision-Making',
					body: 'We do not use solely automated decision-making that produces legal or similarly significant effects about you. If this changes, we will provide clear information and options to request human review.'
				}
			]
		},
		{
			id: 'sharing',
			name: 'Sharing & Transfer',
			iconKey: 'sharing',
			items: [
				{
					num: 1,
					title: 'Sharing and Third Parties',
					body: 'We do not sell personal data. We may share personal data with:',
					list: [
						'Service providers that support our platform (hosting, analytics, payment processors).',
						'Healthcare providers and partners when needed to deliver care or services you request.',
						'Legal or regulatory authorities where required (e.g. court orders, public health emergencies).'
					],
					footerBody: 'Where third parties process data on our behalf, we use contracts and technical measures to ensure they keep data secure and act only under our instructions.'
				},
				{
					num: 2,
					title: 'Cross-Border Transfer',
					body: 'Some processing may occur outside your country. When we transfer data internationally, we use appropriate safeguards such as contractual protections or ensure that such transfers are permitted under applicable law.'
				}
			]
		},
		{
			id: 'security',
			name: 'Security & Retention',
			iconKey: 'security',
			items: [
				{
					num: 1,
					title: 'Data Retention',
					body: 'We keep personal data only as long as necessary for the purposes described or to meet legal obligations. Example retention periods:',
					list: [
						'Donation & payment records: 7 years (for accounting and tax).',
						'Support tickets & case notes: retained for the duration of the case + 2 years.',
						'Account information: until account deletion + reasonable grace period.'
					]
				},
				{
					num: 2,
					title: 'Security Measures',
					body: 'We maintain administrative, technical, and physical safeguards such as:',
					list: [
						'Encryption of data in transit and at rest where applicable.',
						'Access controls and least-privilege access for staff and processors.',
						'Periodic security reviews, vulnerability scanning, and employee training.'
					],
					footerBody: 'No system is completely secure; if a data breach occurs, we will notify affected users and authorities as required by law.'
				},
				{
					num: 3,
					title: 'Data Breach Notice',
					body: 'In the unlikely event of a data breach that creates a risk to your rights, we will notify you and the relevant regulator as required by law and provide guidance on steps to protect yourself.'
				}
			]
		},
		{
			id: 'user-control',
			name: 'User Control',
			iconKey: 'user-control',
			items: [
				{
					num: 1,
					title: 'User Rights',
					body: 'Subject to applicable law, you may have the right to:',
					list: [
						'Access personal data we hold about you.',
						'Request correction, restriction, portability, or deletion of your personal data.',
						'Withdraw consent where processing is based on consent.',
						'Object to processing based on legitimate interests.'
					],
					customHtmlType: 'userRightsFooter'
				},
				{
					num: 2,
					title: "Children's Data",
					body: 'Our services are not intended for children under 18 without parental consent. We do not knowingly collect data from children. If we learn that we have collected such data, we will promptly delete it, subject to verification.'
				},
				{
					num: 3,
					title: 'Marketing Communication',
					body: 'We may send occasional updates or newsletters where you have opted in. You can unsubscribe from marketing communications at any time using the link in those emails or by contacting us.'
				},
				{
					num: 4,
					title: 'Privacy Concerns',
					customHtmlType: 'privacyConcerns'
				}
			]
		},
		{
			id: 'legal',
			name: 'Legal & Updates',
			iconKey: 'legal',
			items: [
				{
					num: 1,
					title: 'Third Party Links',
					body: 'Our site may contain links to third-party websites. We are not responsible for their privacy practices; please review their policies before sharing personal information.'
				},
				{
					num: 2,
					title: 'Policy Updates',
					body: 'We may update this Policy from time to time. Material changes will be posted with a new "Last updated" date. We encourage you to review this page periodically.'
				}
			]
		},
		{
			id: 'contact',
			name: 'Contact Information',
			iconKey: 'contact',
			items: [
				{
					num: 1,
					title: 'Contact Us',
					customHtmlType: 'contactUs'
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

<main class="bg-[#F8FBFF] min-h-screen text-[#0D2561] font-sans pb-24 pt-16 md:pt-24">
	<!-- Responsive Hero Banner -->
	<section class="w-full pb-0 overflow-hidden">
		<img 
			src={HeroBackgroundMobile} 
			alt="Privacy Policy - Last updated March 15, 2026" 
			class="w-full h-auto block md:hidden object-cover m-0 p-0"
		/>
		<img 
			src={HeroBackground} 
			alt="Privacy Policy - Last updated March 15, 2026" 
			class="w-full h-auto hidden md:block object-cover m-0 p-0"
		/>
	</section>

	<!-- Grid Layout with Sidebar and Content Sections -->
	<div class="w-full px-0 mt-0 grid grid-cols-1 lg:grid-cols-12 gap-0 items-start">
		
		<!-- Table of Contents Sidebar -->
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

			<!-- Categories List with Subheadings Accordion -->
			<div class="mt-3 lg:mt-0 space-y-3 {isTocOpen ? 'block' : 'hidden lg:block'}">
				{#each categories as category}
					{@const isActive = activeSection === category.name}
					<div class="border-b border-[#F1F5F9] last:border-none pb-2">
						<button
							on:click={() => selectCategory(category.name)}
							class="w-full flex items-center justify-between py-2 text-left font-semibold text-sm lg:text-base transition-colors {isActive ? 'text-[#1E4ED8]' : 'text-[#0C1F56] hover:text-[#1E4ED8]'}"
						>
							<span>{category.name}</span>
							<svg
								class="w-4 h-4 text-[#64748B] transition-transform duration-200 {isActive ? 'rotate-180' : ''}"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
							</svg>
						</button>

						<!-- Subheadings / Items list when category is active -->
						{#if isActive && category.items.length > 0}
							<ul class="mt-2 pl-3 space-y-1.5 border-l-2 border-[#1E4ED8]/20 ml-1">
								{#each category.items as item}
									<li>
										<a
											href="#item-{item.num}"
											class="text-xs sm:text-sm text-[#64748B] hover:text-[#1E4ED8] block py-1 transition-colors"
										>
											{item.title}
										</a>
									</li>
								{/each}
							</ul>
						{/if}
					</div>
				{/each}
			</div>
		</aside>

		<!-- Main Content Section -->
		<section class="lg:col-span-8 bg-white border-y border-[#E2E8F0] p-5 sm:p-8 lg:p-12 shadow-sm rounded-none">
			{#each categories as category}
				{#if activeSection === category.name}
					<!-- Section Header with Icon -->
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

									{#if item.footerBody}
										<p class="text-[#596273] text-sm sm:text-base leading-relaxed mt-3 whitespace-pre-line">
											{item.footerBody}
										</p>
									{/if}

									<!-- Custom Formatted Elements for Emails with Regular (Thin) Font Weight -->
									{#if item.customHtmlType === 'userRightsFooter'}
										<p class="text-[#596273] text-sm sm:text-base leading-relaxed mt-3">
											To exercise your rights, please email <a href="mailto:{contactEmail}" class="text-[#1E4ED8] font-normal hover:underline">{contactEmail}</a>. We aim to respond to requests promptly and in accordance with applicable law (typically within 30 days).
										</p>
									{/if}

									{#if item.customHtmlType === 'privacyConcerns'}
										<p class="text-[#596273] text-sm sm:text-base leading-relaxed">
											If you have any questions, concerns, or complaints regarding this Privacy Policy or the way your personal information is handled, please contact us:<br />
											Email: <a href="mailto:{contactEmail}" class="text-[#1E4ED8] font-normal hover:underline">{contactEmail}</a>
										</p>
									{/if}

									{#if item.customHtmlType === 'contactUs'}
										<p class="text-[#596273] text-sm sm:text-base leading-relaxed">
											For privacy questions, rights requests, or other inquiries, please contact:<br />
											Email: <a href="mailto:{contactEmail}" class="text-[#1E4ED8] font-normal hover:underline">{contactEmail}</a><br />
											Note: This page uses a single contact email for all privacy and policy inquiries.
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
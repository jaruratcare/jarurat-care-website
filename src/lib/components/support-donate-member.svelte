<script lang="ts">
	import HandPlatterHeart from '$lib/svg/hand-platter-heart.svelte';
	import HandPlatterPlus from '$lib/svg/hand-platter-plus.svelte';
	import Hand from '$lib/svg/hand.svelte';
	import Button from './ui/button.svelte';
	import ImgMom from '$lib/assets/mom.webp';
	import whyCancerIcon from '$lib/assets/icons/why-cancer-icon.svg';
	import whyDonateIcon from '$lib/assets/icons/why-donate-icon.svg';
	import whyCollaborationIcon from '$lib/assets/icons/why-collaboration-icon.svg';
	import seekSupportImg from '$lib/assets/icons/seek-support.png';
	import communityImg from '$lib/assets/icons/community.png';
	import chatbotImg from '$lib/assets/icons/hope-ai-chatbot.png';
	import divider1 from '$lib/assets/icons/divider-1.svg';
	import divider2 from '$lib/assets/icons/divider-2.svg';

	const cards = [
		{
			icon: HandPlatterPlus,
			image: seekSupportImg,
			title: 'Seek Support',
			description:
				'Our NGO is here to help you through your cancer journey. Reach out to us today for support and care.',
			ctaText: 'Seek Support',
			href: 'mailto:Priyanka.joshi@jarurat.care?subject=Seek%20Support%20For%20Cancer'
		},
		{
			icon: HandPlatterHeart,
			image: communityImg,
			title: 'Cancer Care Community',
			description:
				'Healing Hearts – Our community is here to guide, comfort, and stand beside those facing cancer.',
			ctaText: 'Join Here',
			href: 'https://chat.whatsapp.com/I95f9ycybYSDQIbOW4e0bY'
		},
		{
			icon: Hand,
			image: chatbotImg,
			title: 'HOPE AI CHATBOT',
			description:
				'Our AI assistant is here to provide clarity and support during your cancer journey. Try it today.',
			ctaText: 'Visit Here',
			href: 'https://wa.me/919389529263?text=Hi'
		}
	];

	const purposeCards = [
		{
			title: 'Why Cancer',
			icon: whyCancerIcon,
			content:
				'Cancer affects millions yet many still<br class="hidden md:inline" /> lack access to proper care. We focus on<br class="hidden md:inline" /> awareness, early detection, and<br class="hidden md:inline" /> meaningful support for every patient.',
			divider: divider1
		},
		{
			title: 'Why Donate',
			icon: whyDonateIcon,
			content:
				'Cancer affects millions yet many still lack access to proper care. We focus on awareness, early detection, and meaningful support for every patient.',
			divider: divider2
		},
		{
			title: 'Why Collaboration',
			icon: whyCollaborationIcon,
			content:
				'Together we reach further. Your<br class="hidden md:inline" /> partnership helps us bring care to more<br class="hidden md:inline" /> patients and make a real difference in<br class="hidden md:inline" /> every life we touch.',
			divider: null
		}
	];
</script>

<!-- ================= OUR PURPOSE SECTION ================= -->

<section class="py-[48px] md:py-[64px] bg-white overflow-hidden">
	<div class="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col items-center">
		<h2 class="text-2xl md:text-4xl font-bold text-[#0D2561] text-center mb-8 md:mb-12 tracking-tight">
			Our Purpose
		</h2>

		<div class="bg-white w-full max-w-[1440px] rounded-[24px] shadow-[0_4px_30px_rgba(0,0,0,0.06)] border border-[#E2E8F0] p-6 md:p-16">
			
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 items-stretch">
				{#each purposeCards as item, index}
					<div class="flex flex-col justify-between text-center md:text-left px-4 {index === 1 ? 'md:pl-6 md:pr-14' : 'md:px-10'} first:md:pl-0 last:md:pr-0 relative h-full pb-8 md:pb-0 border-b md:border-b-0 border-[#E2E8F0] last:border-b-0">
						<div>
							<div class="w-12 h-12 flex items-center justify-center md:justify-start mb-4 shrink-0 mx-auto md:mx-0">
								<img src={item.icon} alt={item.title} class="w-10 h-10 object-contain" />
							</div>
							<h3 class="text-lg md:text-xl font-bold text-[#0D2561] mb-2">
								{item.title}
							</h3>
							<p class="text-[#64748B] text-xs md:text-sm lg:text-base leading-relaxed">
								{@html item.content}
							</p>
						</div>

						<!-- Vertical custom image divider strictly for desktop (hidden on mobile to prevent distortion) -->
						{#if item.divider}
							<div class="hidden md:flex absolute {index === 0 ? 'right-[24px]' : 'right-0'} top-1/2 -translate-y-1/2 items-center justify-center z-10">
								<img src={item.divider} alt="" class="h-[176px] w-auto object-contain" />
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ================= CARDS ================= -->

<section class="relative py-10 md:py-12 px-4 bg-[#D3F2FC]">
	<div class="max-w-7xl mx-auto">
		<h2 class="text-2xl md:text-4xl font-bold text-[#0D2561] text-center mb-8 md:mb-10">
			Our Support Services
		</h2>

		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
			{#each cards as card}
				<div
					class="bg-white rounded-3xl shadow-lg p-6 md:p-8 text-center hover:scale-105 transition duration-300"
				>
					<div class="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4">
						<img src={card.image} alt={card.title} class="w-full h-full object-cover" />
					</div>
					<h3 class="text-lg md:text-xl font-semibold text-[#0D2561] mb-2">
						{card.title}
					</h3>
					<p class="text-[#475569] text-sm mb-4">
						{card.description}
					</p>
					<a href={card.href}>
						<Button class="bg-[#1E40AF] text-white hover:bg-[#0D2561]">
							{card.ctaText}
						</Button>
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ================= OUR STORY SECTION ================= -->
<section class="py-10 md:py-16 bg-[#F8FAFC]">
	<div class="max-w-7xl mx-auto px-4 md:px-8">
		<h2 class="text-2xl md:text-4xl font-bold text-[#0D2561] text-center mb-6 md:mb-8 tracking-tight">
			Our Story
		</h2>

		<div class="bg-white rounded-[24px] md:rounded-[28px] shadow-[0_4px_25px_rgba(0,0,0,0.05)] p-4 sm:p-6 md:p-8 border border-gray-100/80">
			<div class="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-center">
				<!-- Image Column -->
				<div class="md:col-span-6 lg:col-span-6 overflow-hidden rounded-2xl relative">
					<img
						src={ImgMom}
						alt="Where It All Started"
						class="w-full h-[220px] sm:h-[300px] md:h-[380px] object-cover object-[center_68%] rounded-2xl shadow-sm"
					/>
					<div class="absolute inset-0 bg-[#0D2561]/15 pointer-events-none rounded-2xl"></div>
				</div>

				<!-- Text Content Column -->
				<div class="md:col-span-6 lg:col-span-6 flex flex-col justify-center text-center md:text-left pt-2 md:pt-0 md:pl-4 lg:pl-10">
					<h3 class="text-lg sm:text-xl md:text-2xl font-bold text-[#0D2561] mb-3 md:mb-4 tracking-tight">
						Where It All Started
					</h3>

					<p class="text-[#64748B] text-xs sm:text-sm md:text-base leading-relaxed mb-4 md:mb-5">
						Rekha’s last trip before beginning her battle with<br class="hidden sm:inline md:hidden lg:inline" />
						cholangiocarcinoma. She passed away on 25th December 2023,<br class="hidden sm:inline md:hidden lg:inline" />
						leaving behind a story of strength, love, and resilience.
					</p>

					<p class="text-[#64748B] text-xs sm:text-sm md:text-base leading-relaxed">
						After losing our beloved mother, we founded Jarurat Care to<br class="hidden lg:inline" />
						support families facing similar battles. What began as a personal<br class="hidden lg:inline" />
						journey has grown into a mission of care, compassion, and support<br class="hidden lg:inline" />
						for those affected by cancer.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
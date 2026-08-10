<script>
	import AdvocasyOutline from '$lib/svg/advocasy-outline.svelte';
	import Community from '$lib/svg/community.svelte';
	import Connect from '$lib/svg/connect.svelte';
	import Resources from '$lib/svg/resources.svelte';
	import SingleWave from '$lib/svg/single-wave.svelte';

	const cards = [
		{
			icon: Connect,
			title: 'Provide Comprehensive Patient Support'
		},
		{
			icon: Resources,
			title: 'Facilitate Access to Quality Care'
		},
		{
			icon: Community,
			title: 'Promote Awareness and Education'
		},
		{
			icon: AdvocasyOutline,
			title: 'Advocate for Better Cancer Care'
		}
	];
</script>

<div class="-mt-4 sm:-mt-20">
	<SingleWave fill="#0155bd" class="w-full" />

	<div class="py-8 sm:py-16 px-4 bg-[#0155BD] relative z-10">
		<header class="flex flex-col items-center justify-center text-white text-center font-rubik">
			<h3 class="font-bold text-[2em]">What we do</h3>
			<p class="text-sm max-w-[40rem] font-manrope">
				We focus on delivering crucial support to patients, ensuring access to quality treatment,
				raising awareness, and advocating for better care. Our efforts aim to provide hope and drive
				positive change in the fight against cancer.
			</p>
		</header>

		<div
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 max-w-[60rem] mx-auto my-10 sm:my-16"
		>
			{#each cards as card}
				<div
					class="bg-gradient-to-br from-[#00C8F4]/10 to-white/50 p-[0.2rem] rounded-lg backdrop-blur-lg"
				>
					<div
						class="grow p-4 rounded-md flex flex-col gap-2 bg-white/50 bg-gradient-to-br from-[#0155BD] to-[#85DAFF] size-full backdrop-blur-lg"
					>
						<div class="flex w-full items-center justify-start sm:justify-end">
							<div class="aspect-square w-full max-w-[3.5rem] bg-white rounded-full">
								<svelte:component this={card.icon} />
							</div>
						</div>

						<h3 class="font-rubik text-white leading-[1.2]">{card.title}</h3>
					</div>
				</div>
			{/each}
		</div>
	</div>


</div>

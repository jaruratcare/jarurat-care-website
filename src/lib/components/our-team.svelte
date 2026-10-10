<script lang="ts">
	import { cn } from '$lib/utils';
	import Header from './ui/header.svelte';
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import ImgPriyanka from '$lib/assets/team-members/priyanka.webp';

	function shuffleArray(array: any[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	function formatDriveUrl(url: string) {
		if (url.includes('drive.google.com/file/d/')) {
			const id = url.split('/file/d/')[1]?.split('/')[0];
			if (id) return `https://drive.google.com/thumbnail?id=${id}&sz=w400`;
		}
		return url;
	}

	const keyTeamMembers = [
		{
			name: 'Priyanka Joshi',
			designation: 'Co founder',
			text: `At Jarurat Care, our mission is to bring hope and healing to every person battling cancer. We believe in the power of community support, compassion, and innovation to make a real difference in the lives of those we serve.`,
			imageSrc: ImgPriyanka
		}
	];

	let members = shuffleArray([
		{
			name: 'Abdus Azad',
			role: 'Tech Evangelist',
			link: 'https://i.ibb.co/tpxXXKQ/IMG-20240815-WA0051.jpg',
			isCore: true
		},
		{
			name: 'Ojasvita Dahare',
			role: "PM (Founder's Office)",
			link: 'https://i.ibb.co/YRbSShq/ojasvita.webp'
		},
		{
			name: 'Ubhay Avatsa',
			role: 'HR & Ops Lead',
			link: 'https://i.ibb.co/JsjY4vV/ubhay.webp',
			isCore: true
		},
		{
			name: 'Shruti Venkat',
			role: "PM (Founder's Office)",
			link: 'https://i.ibb.co/smWsyJd/shruti.webp'
		},
		{
			name: 'Rakshit Chopra',
			role: "Growth/Founder's Office",
			link: 'https://drive.google.com/file/d/1gevx7lShxaFjeQEQe8behYFR3K0iUzq-/view?usp=drivesdk'
		},
		{
			name: 'Hrithik Shankar Naudiyal',
			role: 'Social Media and PR Strategist',
			link: 'https://drive.google.com/file/d/1IVPqHn8LY4zXu3VgGP17xDh3mpv3dksm/view?usp=drivesdk'
		},
		{
			name: 'Sonali Bhatnagar',
			role: 'Caregiver Mentorship Lead',
			link: 'https://drive.google.com/file/d/1JyxfbS1P4ZKVrYCznGiLWx5PVyNDqNZW/view?usp=drivesdk',
			isCore: true
		},
		{
			name: 'Tripti',
			role: 'Social Media Manager',
			link: 'https://drive.google.com/file/d/1iUQxd2i99T2MkBENZ2l95VdGtld1YUcK/view?usp=drive_link'
		},
		{
			name: 'Sourav',
			role: 'Ed Tech',
			link: 'https://drive.google.com/file/d/1auoExzFNZnot-bACgOdFem6jSbrx7wmz/view?usp=drivesdk'
		},
		{
			name: 'Md Shami',
			role: 'Web Dev Tech',
			link: 'https://drive.google.com/file/d/1LEtKLfDMAnKorWPj4OOn77UMHCDCKKC5/view?usp=sharing'
		},
		{
			name: 'Shreya Jain',
			role: 'Content & Research',
			link: 'https://drive.google.com/file/d/1WGCsrneCiFfyPG8au81cFi4erlZHDc8h/view?usp=drive_link'
		},
		{
			name: 'Aarthi Reddy',
			role: 'UI/UX Lead',
			link: 'https://i.ibb.co/WBNvYLD/aarthi.webp',
			isCore: true
		},
		{
			name: 'Zaid Khan',
			role: 'Ed Tech',
			link: 'https://drive.google.com/file/d/1v9Aqj7AthqyTyIRFQfGY4PgUujFmeOx3/view?usp=sharing'
		},
		{
			name: 'Shantanu Kolhe',
			role: "Project Manager (Founder's Office)",
			link: 'https://drive.google.com/file/d/12iJH8IRyiJKJ_QUpqA-afO5TGd0xIGlo/view?usp=drivesdk'
		},
		{
			name: 'Aditya Nalawade',
			role: 'Video Editor',
			link: 'https://drive.google.com/file/d/1E0hb7aIZD3PX-PHijJYzuKS6hbA9oVrR/view?usp=drivesdk'
		},
		{
			name: 'Priyansha',
			role: 'Growth & Strategy (CSR)',
			link: 'https://drive.google.com/file/d/1hcQNCEvy7VUL3q3lyRPiBsDUvrd0Lsrj/view?usp=drivesdk',
			isCore: true
		},
		{
			name: 'Sumedha Upadhyay',
			role: 'Growth & Strategy Lead',
			link: 'https://drive.google.com/file/d/1hauqh1G9XdjoMKgsdIe3iByjjo3Dggoi/view?usp=drive_link',
			isCore: true
		}
	]);
</script>

<div class="relative z-10 max-w-[70rem] mx-auto py-12 sm:py-16 px-4 overflow-hidden">
	<Header title="Hear from our team" class="text-left font-rubik" />

	<Splide
		hasTrack={false}
		aria-label="Key Team Members"
		class="max-w-[70rem] mx-auto mt-8 z-10"
		options={{ type: 'loop', arrows: false }}
	>
		<div class="custom-wrapper">
			<SplideTrack>
				{#each keyTeamMembers as member}
					<SplideSlide class="p-2 md:max-w-[80%]">
						<div
							class="h-full rounded-2xl flex flex-col md:flex-row overflow-hidden text-[#0D2561] bg-white border border-slate-200 shadow-lg"
						>
							<div class="grow flex flex-col w-full p-6 sm:p-8 gap-4 justify-between">
								<p class="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
									"{member.text}"
								</p>

								<div class="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100">
									<div
										class="aspect-square min-w-[3.5rem] h-[3.5rem] rounded-full bg-cover bg-center border border-slate-200"
										style="background-image: url('{member.imageSrc}')"
									></div>
									<div class="flex flex-col font-semibold">
										<h4 class="text-lg text-[#0D2561]">{member.name}</h4>
										<small class="text-slate-500 font-medium">{member.designation}</small>
									</div>
								</div>
							</div>
						</div>
					</SplideSlide>
				{/each}
			</SplideTrack>
		</div>
	</Splide>
</div>

<div
	class="relative z-10 max-w-[70rem] mx-auto py-8 sm:py-12 px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-start justify-center"
>
	{#each members as member}
		<div class={cn(`w-full flex flex-col items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow`)}>
			<div class="w-24 h-24 aspect-square rounded-full overflow-hidden border-2 border-[#78C520]/20 bg-slate-50">
				<img
					src={formatDriveUrl(member.link)}
					alt={`${member.name}, ${member.role} - Jarurat Care`}
					class="block size-full object-cover"
					loading="lazy"
				/>
			</div>

			<header class="leading-tight text-center flex flex-col gap-1 w-full">
				<h3 class="leading-snug font-bold text-[#0D2561] text-sm truncate">{member.name}</h3>
				<small class="block leading-tight text-slate-500 text-xs truncate">{member.role}</small>
			</header>
		</div>
	{/each}
</div>
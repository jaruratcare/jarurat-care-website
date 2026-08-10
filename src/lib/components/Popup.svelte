<script>
	import { onMount } from 'svelte';

	export let title = "Important Update";
	export let message = "We are currently supporting patients. You can be part of this mission.";
	export let gotoLink = "/donate";

	let show = false;

	onMount(() => {
		// setTimeout(() => {
		// 	show = true;
		// }, 1000); // show after 1 seconds
	});

	function closePopup() {
		show = false;
	}
</script>

{#if show}
	<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
		<div class="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-6 relative">

			<h2 class="text-xl font-semibold mb-3 text-[#0D2561]">
				{title}
			</h2>

			<p class="text-gray-600 mb-6 text-sm">
				{message}
			</p>

			<div class="flex justify-between gap-4">
				<button
					class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
					on:click={closePopup}
				>
					Cancel
				</button>

				<a
					href={gotoLink}
					class="px-4 py-2 rounded-lg bg-[#0D2561] text-white font-medium hover:bg-[#0B1F4B] transition"
				>
					Visit Here
				</a>
			</div>

		</div>
	</div>
{/if}
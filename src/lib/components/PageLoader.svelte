<script>
	import Logo from '$lib/svg/logo.svelte';
	import { fade } from 'svelte/transition';
</script>

<div
	class="loader-overlay"
	transition:fade={{ duration: 300 }}
	role="status"
	aria-live="polite"
	aria-busy="true"
>
	<div class="loader-content">
		<div class="logo-container">
			<Logo class="h-10 md:h-14 w-auto text-[#0D2561]" />
			<div class="progress-line">
				<div class="progress-bar"></div>
			</div>
		</div>
		<p class="loader-text font-manrope">Care begins with hope.</p>
	</div>
</div>

<style>
	.loader-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: #ffffff;
		z-index: 99999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.loader-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}

	.logo-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
	}

	.progress-line {
		width: 140px;
		height: 2px;
		background-color: #e2e8f0; /* slate-200 */
		border-radius: 4px;
		overflow: hidden;
		position: relative;
	}

	.progress-bar {
		position: absolute;
		top: 0;
		left: 0;
		width: 40%;
		height: 100%;
		background-color: #0D2561; /* Brand color */
		border-radius: 4px;
		animation: progress-indeterminate 1.5s ease-in-out infinite;
	}

	.loader-text {
		color: #64748b; /* slate-500 */
		font-size: 0.95rem;
		font-weight: 500;
		letter-spacing: 0.03em;
		opacity: 0.9;
		animation: text-pulse 2s ease-in-out infinite;
	}

	@keyframes progress-indeterminate {
		0% {
			transform: translateX(-150%);
		}
		50% {
			transform: translateX(50%);
			width: 60%;
		}
		100% {
			transform: translateX(300%);
			width: 40%;
		}
	}

	@keyframes text-pulse {
		0%, 100% {
			opacity: 0.6;
		}
		50% {
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.progress-bar {
			animation: none;
			width: 100%;
			transform: translateX(0);
		}
		
		.loader-text {
			animation: none;
			opacity: 0.9;
		}
	}
</style>

<script>
	import LogoSquare from '$lib/svg/logo-square.svelte';
	import Button from './ui/button.svelte';
	import Icon from '@iconify/svelte';
	import instagramIcon from '@iconify-icons/mdi/instagram';
	import twitterIcon from '@iconify-icons/mdi/twitter';
	import facebookIcon from '@iconify-icons/mdi/facebook';
	import whatsappIcon from '@iconify-icons/mdi/whatsapp';

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<footer class="bg-[#D6ECFF] text-[#0D2561]">
	<div class="max-w-7xl mx-auto px-5 sm:px-8 py-8">

		<!-- Top Row -->
		<div class="flex flex-col sm:flex-row justify-between items-center gap-4">
			<div class="flex items-center gap-3 text-center sm:text-left">
				<div class="bg-white p-2 rounded-xl shadow-md flex items-center justify-center">
					<LogoSquare class="w-12 h-12 text-[#1E3A8A]" />
				</div>

				<div class="flex flex-col leading-tight">
					<span class="font-bold text-lg sm:text-xl">Jarurat Care Foundation</span>
					<small class="text-[#475569] text-xs">Jaisi Jarurat, Vaisi Care</small>
				</div>
			</div>

			<div class="flex flex-wrap justify-center sm:justify-end gap-2">
				<a href="/donate">
					<Button class="bg-[#1E40AF] text-white hover:bg-[#1D3A7A] px-3 py-1.5 text-sm">
						Donate
					</Button>
				</a>

				<a href="mailto:Priyanka.joshi@jarurat.care?subject=Seek Support">
					<Button class="bg-white border border-[#1E40AF] text-[#1E40AF] hover:bg-[#1E40AF] hover:text-white px-3 py-1.5 text-sm">
						Seek Support
					</Button>
				</a>
			</div>
		</div>

		<!-- Divider -->
		<div class="my-6 border-t border-[#E6EEF9]"></div>

		<!-- Link Columns -->
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">

			<div>
				<p class="font-semibold mb-2">Quick Links</p>
				<ul class="space-y-1.5 text-sm">
					<li><a class="hover:text-[#1E40AF]" href="/">Home</a></li>
					<li><a class="hover:text-[#1E40AF]" href="/join-us" data-sveltekit-reload>Volunteer</a></li>
					<li><a class="hover:text-[#1E40AF]" href="/get-involved#community">Network</a></li>
					<li><a href="/mission" class="hover:underline">Mission</a></li>
				</ul>
			</div>

			<div>
				<p class="font-semibold mb-2">Resources</p>
				<ul class="space-y-1.5 text-sm">
					<li><a class="hover:text-[#1E40AF]" href="/about-us">About Us</a></li>
					<li><a class="hover:text-[#1E40AF]" href="/get-involved">Get involved</a></li>
					<li><a class="hover:text-[#1E40AF]" href="/contact-us">Contact Us</a></li>
				</ul>
			</div>

			<div>
				<p class="font-semibold mb-2">Connect with us</p>

				<div class="flex items-center justify-center sm:justify-start gap-3">
					<a href="https://wa.me/919940263931" target="_blank" rel="noopener">
						<Icon icon={whatsappIcon} class="w-5 h-5 text-[#1E40AF]" />
					</a>

					<a href="https://www.instagram.com/jarurat.care?igsh=cjNld2FsMmhpeHNp" target="_blank" rel="noopener">
						<Icon icon={instagramIcon} class="w-5 h-5 text-[#1E40AF]" />
					</a>

					<a href="https://twitter.com/jarurat_care" target="_blank" rel="noopener">
						<Icon icon={twitterIcon} class="w-5 h-5 text-[#1E40AF]" />
					</a>

					<a href="https://facebook.com/share/1DpQCLVLdM/" target="_blank" rel="noopener">
						<Icon icon={facebookIcon} class="w-5 h-5 text-[#1E40AF]" />
					</a>
				</div>
			</div>

			<div>
				<p class="font-semibold mb-2">Contact</p>

				<div class="text-sm text-[#475569] space-y-1">
					<div>
						Email:
						<a href="mailto:Priyanka.joshi@jarurat.care" class="hover:text-[#1E40AF]">
							Priyanka.joshi@jarurat.care
						</a>
					</div>

					<div>
						Phone:
						<a href="tel:+919940263931" class="hover:text-[#1E40AF]">
							+91 99402 63931
						</a>
					</div>
				</div>
			</div>

		</div>

		<!-- Legal Links -->
		<div class="mt-6 flex justify-center">
			<nav class="flex flex-wrap gap-2 justify-center">
				<a href="/terms_and_conditions" class="px-3 py-1 rounded-full border border-[#1E40AF] text-[#1E40AF] text-xs hover:bg-[#1E40AF] hover:text-white">Terms & Conditions</a>
				<a href="/privacy_policy" class="px-3 py-1 rounded-full border border-[#1E40AF] text-[#1E40AF] text-xs hover:bg-[#1E40AF] hover:text-white">Privacy Policy</a>
				<a href="/terms_of_service" class="px-3 py-1 rounded-full border border-[#1E40AF] text-[#1E40AF] text-xs hover:bg-[#1E40AF] hover:text-white">Terms of Service</a>
			</nav>
		</div>

		<div class="my-6 border-t border-[#E6EEF9]"></div>

		<!-- Bottom Row -->
		<div class="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#475569]">

			<span>© 2026 Jarurat Care LLC. All rights reserved</span>

			<div class="hidden sm:flex items-center gap-3">
				<span>Made with ❤ by Jarurat Care</span>
			</div>

			<button on:click={scrollToTop} class="text-[#1E40AF] font-semibold hover:underline">
				↑ Back to Top
			</button>

		</div>

	</div>
</footer>
<script>
	import LogoSquare from '$lib/svg/logo-square.svelte';
	import Icon from '@iconify/svelte';
	import instagramIcon from '@iconify-icons/mdi/instagram';
	import facebookIcon from '@iconify-icons/mdi/facebook';
	import whatsappIcon from '@iconify-icons/mdi/whatsapp';

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function handleSeekSupport() {
		window.location.href = 'mailto:Priyanka.joshi@jarurat.care?subject=Seek%20Cancer%20Support';
	}
</script>

<footer class="bg-[#CBE4F9] text-[#0D2460]">
	<div class="max-w-7xl mx-auto px-6 py-10">

		<div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
			<div class="flex items-center gap-3">
				<div class="bg-white p-2 rounded-xl shadow-sm flex items-center justify-center">
					<LogoSquare class="w-10 h-10 text-[#1E3A8A]" />
				</div>

				<div class="flex flex-col leading-tight">
					<span class="font-bold text-xl text-[#0D2460]">Jarurat Care Foundation</span>
					<small class="text-slate-500 text-xs mt-0.5">Jaisi Jarurat, Vaisi Care</small>
				</div>
			</div>

			<!-- Top Right Action Buttons -->
			<div class="flex items-center gap-3">
				<a
					href="/donate"
					class="bg-[#1E56A0] hover:bg-blue-800 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all shadow-sm"
				>
					Donate Now
				</a>

				<button
					type="button"
					on:click={handleSeekSupport}
					class="bg-white/80 border border-blue-300 hover:bg-white text-[#1E56A0] text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-sm cursor-pointer"
				>
					Seek Cancer support
				</button>
			</div>
		</div>

		<!-- Link Columns -->
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-left mb-8">

			<div>
				<p class="font-bold text-[#0D2460] mb-3 text-sm">Quick Links</p>
				<ul class="space-y-2 text-sm text-slate-600">
					<li><a class="hover:underline" href="/">Home</a></li>
					<li><a class="hover:underline" href="/join-us">Volunteer</a></li>
					<li><a class="hover:underline" href="/get-involved#community">Network</a></li>
					<li><a class="hover:underline" href="/about-us">Mission</a></li>
				</ul>
			</div>

			<div>
				<p class="font-bold text-[#0D2460] mb-3 text-sm">Resources</p>
				<ul class="space-y-2 text-sm text-slate-600">
					<li><a class="hover:underline" href="/about-us">About Us</a></li>
					<li><a class="hover:underline" href="/get-involved">Get Involved</a></li>
					<li><a class="hover:underline" href="/contact-us">Contact Us</a></li>
				</ul>
			</div>

			<div>
				<p class="font-bold text-[#0D2460] mb-3 text-sm">Connect With Us</p>
				<div class="flex items-center gap-3">
					<a href="https://wa.me/919940263931" target="_blank" rel="noopener" aria-label="WhatsApp">
						<Icon icon={whatsappIcon} class="w-5 h-5 text-[#1E56A0] hover:opacity-80" />
					</a>
					<a href="https://www.instagram.com/jarurat.care" target="_blank" rel="noopener" aria-label="Instagram">
						<Icon icon={instagramIcon} class="w-5 h-5 text-[#1E56A0] hover:opacity-80" />
					</a>
					<a href="https://twitter.com/jarurat_care" target="_blank" rel="noopener" aria-label="X" class="text-[#1E56A0]">
						<svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
							<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
						</svg>
					</a>
					<a href="https://facebook.com/share/1DpQCLVLdM/" target="_blank" rel="noopener" aria-label="Facebook">
						<Icon icon={facebookIcon} class="w-5 h-5 text-[#1E56A0] hover:opacity-80" />
					</a>
				</div>
			</div>

			<div>
				<p class="font-bold text-[#0D2460] mb-3 text-sm">Contact Us</p>
				<div class="text-sm text-slate-600 space-y-1">
					<p>Priyanka.joshi@jarurat.care</p>
					<p>+91 99402 63931</p>
				</div>
			</div>

		</div>

		<div class="flex justify-center mb-10">
			<nav class="flex flex-wrap gap-3 justify-center">
				<a href="/terms_and_conditions" class="px-5 py-1.5 rounded-full border border-[#1E56A0]/40 text-[#1E3A8A] text-xs font-semibold hover:bg-white/60 transition-all">
					Terms & Conditions
				</a>
				<a href="/privacy_policy" class="px-5 py-1.5 rounded-full border border-[#1E56A0]/40 text-[#1E3A8A] text-xs font-semibold hover:bg-white/60 transition-all">
					Privacy Policy
				</a>
				<a href="/terms_of_service" class="px-5 py-1.5 rounded-full border border-[#1E56A0]/40 text-[#1E3A8A] text-xs font-semibold hover:bg-white/60 transition-all">
					Terms of Service
				</a>
			</nav>
		</div>

		<!-- Bottom Copyright Row -->
		<div class="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 pt-4 border-t border-blue-200/50">
			<span>© 2026 Jarurat care LLC All rights reserved</span>

			<div class="flex items-center gap-1">
				<span>Made with</span>
				<span class="text-[#0D2460]">❤</span>
				<span>by Jarurat Care</span>
			</div>

			<button on:click={scrollToTop} class="text-[#1E56A0] font-bold hover:underline cursor-pointer">
				» Back to Top
			</button>
		</div>

	</div>
</footer>
<script>
	let email = '';

	function handleSubscribe() {
		if (email) {
			alert(`Subscribed with: ${email}`);
			email = '';
		}
	}
</script>

<section class="max-w-6xl mx-auto py-12 md:py-16">
	<!-- Section Header -->
	<h2 class="text-3xl font-bold text-[#0D2460] text-center mb-10 tracking-tight">
		Connect With JCF
	</h2>

	<!-- Two Card Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

		<!-- LEFT CARD: Newsletter -->
		<div class="bg-[#EFF6FF] rounded-2xl p-8 md:p-10 flex flex-col justify-between border border-blue-100 shadow-sm">
			<div>
				<!-- Pill Badge -->
				<span class="inline-block bg-[#FDE8D3] text-[#D97706] text-xs font-semibold tracking-wider px-3.5 py-1 rounded-full uppercase mb-4">
					NEWSLETTER
				</span>

				<!-- Heading -->
				<h3 class="text-2xl font-bold text-[#0D2460] mb-3 leading-snug">
					Subscribe to our Newsletter
				</h3>

				<!-- Description -->
				<p class="text-sm text-slate-600 leading-relaxed mb-8">
					Get the latest updates, inspiring stories, and important news delivered right to your inbox.
				</p>
			</div>

			<!-- Input Form -->
			<form on:submit|preventDefault={handleSubscribe} class="flex items-center gap-3">
				<input
					type="email"
					bind:value={email}
					placeholder="Enter your email address"
					required
					class="w-full bg-white text-sm text-slate-700 px-4 py-3 rounded-xl border border-blue-200 outline-none focus:border-blue-500 transition-all placeholder:text-slate-400"
				/>
				<button
					type="submit"
					class="bg-[#2563EB] hover:bg-blue-700 text-white font-medium text-sm px-6 py-3 rounded-xl transition-all shadow-sm shrink-0"
				>
					Submit
				</button>
			</form>
		</div>

		<!-- RIGHT CARD: Collaborate -->
		<div class="bg-white rounded-2xl p-8 md:p-10 flex flex-col justify-between border border-slate-100 shadow-sm relative pl-10 md:pl-12">
			<!-- Vertical Blue Accent Bar -->
			<div class="absolute left-0 top-8 bottom-8 w-1 bg-[#2563EB] rounded-r-full"></div>

			<div>
				<!-- Pill Badge -->
				<span class="inline-block bg-[#FDE8D3] text-[#D97706] text-xs font-semibold tracking-wider px-3.5 py-1 rounded-full uppercase mb-4">
					COLLABORATE WITH US
				</span>

				<!-- Heading -->
				<h3 class="text-2xl font-bold text-[#0D2460] mb-3 leading-snug">
					Be part of the Journey
				</h3>

				<!-- Description -->
				<p class="text-sm text-slate-600 leading-relaxed mb-6">
					Our mission thrives through the support of compassionate corporates, individuals, and organizations. You can be part of this journey too—join us in making a difference. Every contribution brings hope, supports life-saving care, and helps patients receive the treatment they need.
				</p>
			</div>

			<!-- Links Grid -->
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 text-sm font-semibold text-[#2563EB]">
				<a href="/get-involved" class="flex items-center gap-1.5 hover:underline">
					<span>»</span> Join Jarurat Care Team
				</a>
				<a href="/donate" class="flex items-center gap-1.5 hover:underline">
					<span>»</span> Donate Money
				</a>
			</div>
		</div>

	</div>
</section>
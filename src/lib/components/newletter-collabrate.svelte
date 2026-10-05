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

	<!-- Main Outer Card (Light Blue with Sharp/Square Corners) -->
	<div class="bg-[#EFF6FF] rounded-none p-6 md:p-10 shadow-sm border border-blue-100">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative">

			<!-- LEFT CARD: Newsletter (Separate inner card with Sharp/Square Corners) -->
			<div class="bg-[#DBEAFE] rounded-none p-6 md:p-8 flex flex-col justify-between border border-blue-200 shadow-sm">
				<div>
					<!-- Pill Badge (Matched to Figma Orange) -->
					<span class="inline-block bg-[#FEE2E2] text-[#C2410C] border border-[#FED7AA] text-xs font-semibold tracking-wider px-3.5 py-1 rounded-full uppercase mb-4">
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
						class="w-full bg-white text-sm text-slate-700 px-4 py-3 rounded-xl border border-[#1E40AF] outline-none focus:ring-2 focus:ring-[#1E40AF] transition-all placeholder:text-slate-400"
					/>
					<button
						type="submit"
						class="bg-white hover:bg-blue-50 text-[#1E40AF] font-medium text-sm px-6 py-3 rounded-full border border-[#1E40AF] transition-all shadow-sm shrink-0"
					>
						Submit
					</button>
				</form>
			</div>

			<!-- Vertical Bold & Deep Blue Dividing Line -->
			<div class="hidden md:block absolute left-1/2 top-4 bottom-4 w-[2px] bg-[#2563EB] -translate-x-1/2"></div>

			<!-- RIGHT SECTION: Collaborate -->
			<div class="flex flex-col justify-between p-2 md:p-4 md:pl-6">
				<div>
					<!-- Pill Badge (Matched to Figma Orange) -->
					<span class="inline-block bg-[#FEE2E2] text-[#C2410C] border border-[#FED7AA] text-xs font-semibold tracking-wider px-3.5 py-1 rounded-full uppercase mb-4">
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
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 text-sm font-semibold">
					<a href="/get-involved" class="flex items-center gap-1.5 text-[#1E40AF] hover:underline">
						<span>»</span> Join Jarurat Care Team
					</a>
					<a href="/donate" class="flex items-center gap-1.5 text-[#1E40AF] hover:underline">
						<span>»</span> Donate Money
					</a>
				</div>
			</div>

		</div>
	</div>
</section>
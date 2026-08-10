<script>
	// Component logic if needed
</script>

<section class="max-w-6xl mx-auto py-12 md:py-16">
	<!-- Section Header -->
	<h2 class="text-3xl md:text-4xl font-bold text-[#1E293B] text-center mb-10 md:mb-12">
		Connect With JCF
	</h2>

	<!-- Two Card Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

		<!-- LEFT CARD: Newsletter -->
		<div class="bg-[#EBF5FB] rounded-3xl p-8 md:p-10 flex flex-col justify-between border border-blue-50/50">
			<div>
				<!-- Badge -->
				<span class="inline-block bg-[#FFEAD0] text-[#C27803] text-xs font-bold tracking-wider px-3.5 py-1 rounded-full uppercase mb-4">
					NEWSLETTER
				</span>

				<h3 class="text-2xl font-bold text-[#1E293B] mb-3">
					Subscribe to our Newsletter
				</h3>

				<p class="text-sm text-slate-500 leading-relaxed mb-6">
					Get the latest updates, inspiring stories, and important news delivered right to your inbox.
				</p>
			</div>

			<!-- Input Form -->
			<form on:submit|preventDefault class="flex items-center gap-3 mt-4">
				<input
					type="email"
					placeholder="Enter your email address"
					class="w-full bg-white text-sm text-slate-700 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 transition-all placeholder:text-slate-400"
				/>
				<button
					type="submit"
					class="bg-white border border-slate-300 text-slate-700 font-semibold text-sm px-6 py-3 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
				>
					Submit
				</button>
			</form>
		</div>

		<!-- RIGHT CARD: Collaborate -->
		<div class="bg-white rounded-3xl p-8 md:p-10 flex flex-col justify-between border border-slate-100 shadow-sm relative pl-10 border-l-4 border-l-[#F59E0B]">
			<div>
				<!-- Badge -->
				<span class="inline-block bg-[#FFEAD0] text-[#C27803] text-xs font-bold tracking-wider px-3.5 py-1 rounded-full uppercase mb-4">
					COLLABORATE WITH US
				</span>

				<h3 class="text-2xl font-bold text-[#1E293B] mb-3">
					Be part of the Journey
				</h3>

				<p class="text-sm text-slate-500 leading-relaxed mb-6">
					Our mission thrives through the support of compassionate corporates, individuals, and organizations. You can be part of this journey too—join us in making a difference. Every contribution brings hope, supports life-saving care, and helps patients receive the treatment they need.
				</p>
			</div>

			<!-- Links Grid -->
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 pt-2 text-sm font-semibold text-[#1E3A8A]">
				<a href="/join-team" class="flex items-center gap-1.5 hover:underline">
					<span class="text-blue-500">»</span> Join Jarurat Care Team
				</a>
				<a href="/donate" class="flex items-center gap-1.5 hover:underline">
					<span class="text-blue-500">»</span> Donate Money
				</a>
			</div>
		</div>

	</div>
</section>

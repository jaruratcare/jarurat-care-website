<script lang="ts">
	import { writable } from 'svelte/store';
	import BillingOptions from './billing-options.svelte';
	import PersonalDetails from './personal-details.svelte';
	import SuccessScreen from './success-screen.svelte';
	import ImgHeroBg from '$lib/assets/donate/hero-img.webp';
	import { billingSchema, personalDetailsSchema } from './schema';

	// Function to update payment data
	function updatePaymentData(data: Record<string, string | number>) {
		paymentData.set({ ...$paymentData, ...data });
		return $paymentData;
	}

	// Writable store to hold payment data
	let paymentData = writable({ amount: 200, 'payment-type': 'subscription', email: '' });

	let currentScreen = 'billing';
	let isLoading = writable(false);
	let transactionId = writable<string>('');

	// Function to get payment token URL
	async function getTokenUrl(amount: number) {
		transactionId.set('');
		isLoading.set(true);
		const resp = await fetch(`/api/payment/get-pay-page-url?amount=${amount}`, {
			headers: { 'Content-Type': 'application/json' }
		}).then((resp) => resp.json());

		const txnId = resp?.data?.txnId || '';
		transactionId.set(txnId);

		return resp?.data?.url || '';
	}

	// Payment callback function to verify transaction
	async function paymentCallback() {
		isLoading.set(true);
		window.document.body.style.overflow = 'auto';

		const maxRetries = 5;
		let retryCount = 0;
		let backoffTime = 1000;

		try {
			const fetchTransactionStatus = async () => {
				const response = await fetch(`/api/payment/verify-transaction?txn-id=${$transactionId}`, {
					headers: { 'Content-Type': 'application/json' }
				});

				const json = await response.json();
				const data = json.data || {};
				const state = data.state ? data.state.toLowerCase() : 'error';

				return { state, data };
			};

			while (retryCount < maxRetries) {
				const { state, data } = await fetchTransactionStatus();

				if (state === 'completed') {
					currentScreen = 'success';
					isLoading.set(false);

					await fetch('https://jarurat-care-email-service.onrender.com/jarurat-care/sendMail/', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							name: $paymentData['full-name'],
							amount: $paymentData.amount,
							email: $paymentData.email
						})
					});

					return { status: 'success', data };
				}

				if (state === 'error') {
					alert('Failed to make the transaction');
					isLoading.set(false);
					return { status: 'error', data };
				}

				retryCount++;
				backoffTime *= 2;
				await new Promise(resolve => setTimeout(resolve, backoffTime));
			}

			alert('Max retries reached. Please try again later.');
			isLoading.set(false);
			return { status: 'error', data: null };

		} catch (err) {
			console.error('Error in payment callback:', err);
			isLoading.set(false);
			return { status: 'error', data: null };
		}
	}
</script>

<div id="donate" class="py-12 px-4 bg-[#F8FAFC]">
	<div class="max-w-[62rem] mx-auto">
		<!-- Top Centered Header -->
		<div class="text-center max-w-xl mx-auto mb-8 px-4">
			<h2 class="text-2xl sm:text-3xl font-bold text-[#2D3142] mb-3 tracking-tight">
				Help Us Fight Cancer
			</h2>
			<p class="text-xs sm:text-sm text-gray-500 leading-relaxed">
				Empowering cancer patients and caregivers through emotional support, expert guidance, and essential care services funded by your donation.
			</p>
		</div>

		<!-- Main Card Container -->
		<div class="bg-[#71808F] p-4 sm:p-6 rounded-3xl shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
			
			<!-- Left Photo Container (Strict 200% width crop to cut off baked-in form) -->
			<div class="md:col-span-7 rounded-2xl overflow-hidden min-h-[350px] md:min-h-[480px] relative">
				<img 
					src={ImgHeroBg} 
					alt="Help Us Fight Cancer" 
					class="absolute top-0 left-0 w-[205%] max-w-none h-full object-cover object-left rounded-2xl" 
				/>
			</div>

			<!-- Right Form Card -->
			<div class="md:col-span-5 flex flex-col justify-center relative z-10">
				{#if currentScreen === 'billing'}
					<BillingOptions
						on:data={(ev) => updatePaymentData(ev.detail)}
						on:submit={() => {
							const resp = billingSchema.safeParse($paymentData);

							if (resp.success) {
								currentScreen = 'details';
							}
						}}
					/>
				{:else if currentScreen === 'details'}
					<PersonalDetails
						isLoading={$isLoading}
						on:data={(ev) => updatePaymentData(ev.detail)}
						on:submit={async () => {
							const billingDetails = billingSchema.parse($paymentData);
							const personalDetails = personalDetailsSchema.safeParse($paymentData);
						
							window.document.body.style.overflow = 'hidden';

							if (personalDetails.success) {
								const script = document.createElement('script');
								script.src = 'https://mercury.phonepe.com/web/bundle/checkout.js';
								document.head.appendChild(script);

								const tokenUrl = await getTokenUrl(billingDetails.amount);
								// @ts-ignore
								window.PhonePeCheckout.transact({
									tokenUrl,
									callback: paymentCallback,
									type: 'IFRAME'
								});
							} else alert(personalDetails.error.message);
						}}
					/>
				{:else}
					<SuccessScreen txnId={$transactionId} amount={$paymentData.amount} />
				{/if}
			</div>

		</div>
	</div>
</div>
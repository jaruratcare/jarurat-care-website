<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
	import Button from '$lib/components/ui/button.svelte';
	import Checkbox from '$lib/components/ui/checkbox.svelte';
	import Input from '$lib/components/ui/input.svelte';
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';

	const dispatch = createEventDispatcher();

	function onChange(data: Record<string, string | number | boolean>) {
		dispatch('data', data);
	}

	function onSubmit() {
		dispatch('submit', {});
	}

	const amounts = [200, 500, 1000, 10000, 50000];

	let selectedAmount = '200';
	let selectedPaymentType = 'one-time';
	let selectedFinalAmount = writable(200);
	let isHonor = false;
	let writeComment = false;

	selectedFinalAmount.subscribe((value) => onChange({ amount: value }));
</script>

<div
	class="font-manrope flex flex-col items-center gap-6 px-6 py-8 rounded-2xl bg-white shadow border max-w-md mx-auto"
>
	<!-- Header Section -->
	<div class="text-center">
		<h2 class="flex gap-1 font-rubik font-medium text-[1.5em] justify-center">
			<span class="text-[#0D2561]">Donate</span>
			<span class="text-[#0155BD]">Today</span>
		</h2>
		<p class="text-gray-500 text-xs sm:text-sm text-center leading-tight mt-1 max-w-[220px] mx-auto">
			Your donation can make a life-saving difference
		</p>
	</div>

	<!-- Billing Options Section -->
	<div class="w-full text-center">
		<h3 class="text-[1.05em] leading-tight font-rubik font-medium text-[#0D2460] mb-3">
			Billing Option
		</h3>
		<div class="grid grid-cols-2 gap-2 w-full">
			<Checkbox
				label="Pay Once"
				type="radio"
				name="payment-type"
				value="one-time"
				checked={selectedPaymentType === 'one-time'}
				on:change={() => {
					selectedPaymentType = 'one-time';
					onChange({ ['payment-type']: 'one-time' });
				}}
			/>
			<Checkbox
				label="Monthly"
				type="radio"
				name="payment-type"
				value="monthly"
				checked={selectedPaymentType === 'monthly'}
				on:change={() => {
					selectedPaymentType = 'monthly';
					onChange({ ['payment-type']: 'monthly' });
				}}
			/>
			<div class="col-span-2">
				<Checkbox
					label="Yearly"
					type="radio"
					name="payment-type"
					value="yearly"
					checked={selectedPaymentType === 'yearly'}
					on:change={() => {
						selectedPaymentType = 'yearly';
						onChange({ ['payment-type']: 'yearly' });
					}}
				/>
			</div>
		</div>
	</div>

	<!-- Choose Donation Amount Section -->
	<div class="w-full text-center">
		<h3 class="text-[1.05em] leading-tight font-rubik font-medium text-[#0D2460] mb-3">
			Choose Donation Amount
		</h3>
		<div class="grid grid-cols-2 gap-2 w-full">
			{#each amounts as amount}
				<Checkbox
					label={`₹${amount}`}
					type="radio"
					name="amount"
					value={amount.toString()}
					checked={amount.toString() === selectedAmount}
					on:change={() => {
						selectedAmount = amount.toString();
						selectedFinalAmount.set(amount);
					}}
				/>
			{/each}

			<Checkbox
				label={`Custom Amount`}
				type="radio"
				name="amount"
				value="custom-amount"
				checked={'custom-amount' === selectedAmount}
				on:change={() => (selectedAmount = 'custom-amount')}
			/>
		</div>

		{#if selectedAmount === 'custom-amount'}
			<div class="mt-3">
				<Input
					type="number"
					max="50000"
					class="w-full"
					placeholder="Please enter amount"
					required
					prefix="₹"
					label="Amount"
					on:change={(ev) => selectedFinalAmount.set(parseFloat(ev.detail.value))}
				/>
			</div>
		{/if}
	</div>

	<!-- Additional Checkboxes -->
	<div class="w-full flex flex-col gap-2 text-left text-xs text-deep-blue-600 pt-1">
		<label class="flex items-center gap-2 cursor-pointer">
			<input
				type="checkbox"
				bind:checked={isHonor}
				on:change={() => onChange({ isHonor })}
				class="w-3.5 h-3.5 rounded text-[#0D132442] focus:ring-[#0D132442] border-deep-blue-300"
			/>
			<span>This donation is in honor or memory of someone</span>
		</label>

		<label class="flex items-center gap-2 cursor-pointer">
			<input
				type="checkbox"
				bind:checked={writeComment}
				on:change={() => onChange({ writeComment })}
				class="w-3.5 h-3.5 rounded text-[#0D132442] focus:ring-[#0D132442] border-deep-blue-300"
			/>
			<span>Write us a comment</span>
		</label>
	</div>

	<!-- Submit Button -->
	<Button class="bg-[#0155bd] flex items-center justify-center gap-1 w-full py-2.5 rounded-full" on:click={onSubmit}>
		Continue <ArrowRight class="w-4 h-4" />
	</Button>
</div>
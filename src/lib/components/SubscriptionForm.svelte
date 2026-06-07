<script lang="ts">
	import { base } from '$app/paths';
	import type { Subscription } from '$lib/server/schema';

	interface Props {
		subscription?: Partial<Subscription>;
		errors?: Record<string, string> | null;
		submitLabel?: string;
	}

	let { subscription = {}, errors = null, submitLabel = 'Save' }: Props = $props();

	const today = new Date().toISOString().slice(0, 10);
</script>

<form
	method="POST"
	class="space-y-4 rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-sm"
>
	<div>
		<label for="name" class="block text-sm font-medium text-slate-300">Name</label>
		<input
			id="name"
			name="name"
			type="text"
			required
			value={subscription.name ?? ''}
			class="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
			placeholder="Netflix"
		/>
		{#if errors?.name}<p class="mt-1 text-xs text-red-400">{errors.name}</p>{/if}
	</div>

	<div class="grid grid-cols-2 gap-4">
		<div>
			<label for="amount" class="block text-sm font-medium text-slate-300">Amount</label>
			<input
				id="amount"
				name="amount"
				type="number"
				step="0.01"
				min="0"
				required
				value={subscription.amount ?? ''}
				class="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
			/>
			{#if errors?.amount}<p class="mt-1 text-xs text-red-400">{errors.amount}</p>{/if}
		</div>
		<div>
			<label for="currency" class="block text-sm font-medium text-slate-300">Currency</label>
			<input
				id="currency"
				name="currency"
				type="text"
				maxlength="3"
				required
				value={subscription.currency ?? 'EUR'}
				class="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm uppercase text-slate-100 focus:border-indigo-500 focus:outline-none"
			/>
		</div>
	</div>

	<div class="grid grid-cols-2 gap-4">
		<div>
			<label for="billingCycle" class="block text-sm font-medium text-slate-300"
				>Billing cycle</label
			>
			<select
				id="billingCycle"
				name="billingCycle"
				class="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
			>
				<option value="monthly" selected={subscription.billingCycle !== 'yearly'}>Monthly</option>
				<option value="yearly" selected={subscription.billingCycle === 'yearly'}>Yearly</option>
			</select>
		</div>
		<div>
			<label for="nextBillingDate" class="block text-sm font-medium text-slate-300"
				>Next billing date</label
			>
			<input
				id="nextBillingDate"
				name="nextBillingDate"
				type="date"
				required
				value={subscription.nextBillingDate ?? today}
				class="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none [color-scheme:dark]"
			/>
			{#if errors?.nextBillingDate}<p class="mt-1 text-xs text-red-400">
					{errors.nextBillingDate}
				</p>{/if}
		</div>
	</div>

	<div>
		<label for="category" class="block text-sm font-medium text-slate-300">Category</label>
		<input
			id="category"
			name="category"
			type="text"
			value={subscription.category ?? ''}
			class="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
			placeholder="Entertainment, Software, ..."
		/>
	</div>

	<div>
		<label for="notes" class="block text-sm font-medium text-slate-300">Notes</label>
		<textarea
			id="notes"
			name="notes"
			rows="3"
			class="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
		>{subscription.notes ?? ''}</textarea>
	</div>

	<div class="flex items-center justify-between pt-2">
		<a href="{base}/" class="text-sm text-slate-400 hover:text-slate-200">Cancel</a>
		<button
			type="submit"
			class="rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400"
		>
			{submitLabel}
		</button>
	</div>
</form>

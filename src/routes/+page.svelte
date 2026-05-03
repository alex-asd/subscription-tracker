<script lang="ts">
	import { totalsByCurrency, monthlyEquivalent, daysUntil, formatMoney } from '$lib/utils';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const subs = $derived(data.subscriptions);
	const totals = $derived(totalsByCurrency(subs));
</script>

<section class="mb-6 rounded-lg border border-slate-800 bg-slate-900 p-5 shadow-sm">
	<div class="text-sm text-slate-400">Estimated monthly spend</div>
	{#if totals.length === 0}
		<div class="mt-1 text-3xl font-semibold tracking-tight text-slate-50">—</div>
	{:else}
		<div class="mt-2 flex flex-wrap items-baseline gap-x-6 gap-y-2">
			{#each totals as t (t.currency)}
				<div>
					<div class="text-3xl font-semibold tracking-tight text-slate-50">
						{formatMoney(t.total, t.currency)}
					</div>
					<div class="text-xs text-slate-500">
						{t.count} subscription{t.count === 1 ? '' : 's'} in {t.currency}
					</div>
				</div>
			{/each}
		</div>
	{/if}
	<div class="mt-3 text-xs text-slate-500">
		Yearly plans normalized to monthly · totals shown per currency (no conversion)
	</div>
</section>

{#if subs.length === 0}
	<div class="rounded-lg border border-dashed border-slate-700 bg-slate-900/50 p-10 text-center">
		<p class="text-slate-400">No subscriptions yet.</p>
		<a
			href="/subscriptions/new"
			class="mt-3 inline-block rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400"
		>
			Add your first one
		</a>
	</div>
{:else}
	<ul class="space-y-2">
		{#each subs as sub (sub.id)}
			{@const days = daysUntil(sub.nextBillingDate)}
			{@const dueSoon = days >= 0 && days <= 7}
			{@const overdue = days < 0}
			<li
				class="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-4 shadow-sm"
			>
				<div class="min-w-0 flex-1">
					<div class="flex items-center gap-2">
						<a
							href="/subscriptions/{sub.id}/edit"
							class="truncate font-medium text-slate-100 hover:underline"
						>
							{sub.name}
						</a>
						{#if sub.category}
							<span class="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-300">
								{sub.category}
							</span>
						{/if}
					</div>
					<div class="mt-1 text-sm text-slate-400">
						{formatMoney(sub.amount, sub.currency)} / {sub.billingCycle}
						{#if sub.billingCycle === 'yearly'}
							<span class="text-slate-500"
								>(≈ {formatMoney(monthlyEquivalent(sub), sub.currency)}/mo)</span
							>
						{/if}
					</div>
				</div>
				<div class="ml-4 flex items-center gap-3">
					<div class="text-right text-sm">
						<div class="text-slate-200">{sub.nextBillingDate}</div>
						<div
							class="text-xs"
							class:text-amber-400={dueSoon}
							class:text-red-400={overdue}
							class:text-slate-500={!dueSoon && !overdue}
						>
							{#if overdue}
								{Math.abs(days)} day{Math.abs(days) === 1 ? '' : 's'} overdue
							{:else if days === 0}
								due today
							{:else}
								in {days} day{days === 1 ? '' : 's'}
							{/if}
						</div>
					</div>
					<form method="POST" action="?/delete" class="contents">
						<input type="hidden" name="id" value={sub.id} />
						<button
							type="submit"
							onclick={(e) => {
								if (!confirm(`Delete "${sub.name}"?`)) e.preventDefault();
							}}
							class="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-400 hover:border-red-500 hover:text-red-400"
							aria-label="Delete {sub.name}"
						>
							Delete
						</button>
					</form>
				</div>
			</li>
		{/each}
	</ul>
{/if}

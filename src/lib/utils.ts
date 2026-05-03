import type { Subscription } from './server/schema';

export function monthlyEquivalent(sub: Pick<Subscription, 'amount' | 'billingCycle'>): number {
	return sub.billingCycle === 'yearly' ? sub.amount / 12 : sub.amount;
}

export function totalsByCurrency(
	subs: Pick<Subscription, 'amount' | 'billingCycle' | 'currency'>[]
): { currency: string; total: number; count: number }[] {
	const grouped = new Map<string, { total: number; count: number }>();
	for (const sub of subs) {
		const entry = grouped.get(sub.currency) ?? { total: 0, count: 0 };
		entry.total += monthlyEquivalent(sub);
		entry.count += 1;
		grouped.set(sub.currency, entry);
	}
	return [...grouped.entries()]
		.map(([currency, { total, count }]) => ({ currency, total, count }))
		.sort((a, b) => a.currency.localeCompare(b.currency));
}

export function daysUntil(dateStr: string): number {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const target = new Date(dateStr);
	target.setHours(0, 0, 0, 0);
	return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function formatMoney(amount: number, currency = 'EUR'): string {
	return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount);
}

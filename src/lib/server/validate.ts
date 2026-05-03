export interface SubscriptionInput {
	name: string;
	amount: number;
	currency: string;
	billingCycle: 'monthly' | 'yearly';
	nextBillingDate: string;
	category: string | null;
	notes: string | null;
}

export function parseSubscriptionForm(
	data: FormData
): { ok: true; value: SubscriptionInput } | { ok: false; errors: Record<string, string> } {
	const errors: Record<string, string> = {};

	const name = String(data.get('name') ?? '').trim();
	if (!name) errors.name = 'Required';

	const amountRaw = String(data.get('amount') ?? '');
	const amount = Number(amountRaw);
	if (!amountRaw || Number.isNaN(amount) || amount < 0) errors.amount = 'Must be a positive number';

	const currency = String(data.get('currency') ?? 'EUR')
		.trim()
		.toUpperCase();

	const billingCycleRaw = String(data.get('billingCycle') ?? 'monthly');
	const billingCycle: 'monthly' | 'yearly' =
		billingCycleRaw === 'yearly' ? 'yearly' : 'monthly';

	const nextBillingDate = String(data.get('nextBillingDate') ?? '').trim();
	if (!/^\d{4}-\d{2}-\d{2}$/.test(nextBillingDate)) {
		errors.nextBillingDate = 'Use YYYY-MM-DD';
	}

	const categoryRaw = String(data.get('category') ?? '').trim();
	const category = categoryRaw || null;

	const notesRaw = String(data.get('notes') ?? '').trim();
	const notes = notesRaw || null;

	if (Object.keys(errors).length > 0) return { ok: false, errors };
	return {
		ok: true,
		value: { name, amount, currency, billingCycle, nextBillingDate, category, notes }
	};
}

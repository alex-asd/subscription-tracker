import { db } from '$lib/server/db';
import { subscriptions } from '$lib/server/schema';
import { asc, eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { advanceBillingDate, daysUntil } from '$lib/utils';

export const load: PageServerLoad = async () => {
	const subs = await db.select().from(subscriptions).orderBy(asc(subscriptions.nextBillingDate));
	const rolled = await Promise.all(
		subs.map(async (sub) => {
			if (daysUntil(sub.nextBillingDate) >= 0) return sub;
			const nextBillingDate = advanceBillingDate(sub.nextBillingDate, sub.billingCycle);
			await db
				.update(subscriptions)
				.set({ nextBillingDate })
				.where(eq(subscriptions.id, sub.id));
			return { ...sub, nextBillingDate };
		})
	);
	rolled.sort((a, b) => a.nextBillingDate.localeCompare(b.nextBillingDate));
	return { subscriptions: rolled };
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		if (!Number.isInteger(id) || id <= 0) {
			return fail(400, { message: 'Invalid id' });
		}
		const { eq } = await import('drizzle-orm');
		await db.delete(subscriptions).where(eq(subscriptions.id, id));
		return { success: true };
	}
};

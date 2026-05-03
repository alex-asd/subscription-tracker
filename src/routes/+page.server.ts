import { db } from '$lib/server/db';
import { subscriptions } from '$lib/server/schema';
import { asc } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const subs = await db.select().from(subscriptions).orderBy(asc(subscriptions.nextBillingDate));
	return { subscriptions: subs };
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

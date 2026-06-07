import { db } from '$lib/server/db';
import { subscriptions } from '$lib/server/schema';
import { parseSubscriptionForm } from '$lib/server/validate';
import { error, fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { base } from '$app/paths';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.id);
	if (!Number.isInteger(id) || id <= 0) throw error(400, 'Invalid id');
	const sub = await db.select().from(subscriptions).where(eq(subscriptions.id, id)).get();
	if (!sub) throw error(404, 'Subscription not found');
	return { subscription: sub };
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const id = Number(params.id);
		if (!Number.isInteger(id) || id <= 0) return fail(400, { errors: { _: 'Invalid id' } });
		const data = await request.formData();
		const parsed = parseSubscriptionForm(data);
		if (!parsed.ok) {
			return fail(400, {
				errors: parsed.errors,
				values: Object.fromEntries(data)
			});
		}
		await db.update(subscriptions).set(parsed.value).where(eq(subscriptions.id, id));
		throw redirect(303, `${base}/`);
	}
};

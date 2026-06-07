import { db } from '$lib/server/db';
import { subscriptions } from '$lib/server/schema';
import { parseSubscriptionForm } from '$lib/server/validate';
import { fail, redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const parsed = parseSubscriptionForm(data);
		if (!parsed.ok) {
			return fail(400, {
				errors: parsed.errors,
				values: Object.fromEntries(data)
			});
		}
		await db.insert(subscriptions).values(parsed.value);
		throw redirect(303, `${base}/`);
	}
};

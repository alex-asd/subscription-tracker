import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

export const subscriptions = sqliteTable('subscriptions', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	amount: real('amount').notNull(),
	currency: text('currency').notNull().default('EUR'),
	billingCycle: text('billing_cycle', { enum: ['monthly', 'yearly'] })
		.notNull()
		.default('monthly'),
	nextBillingDate: text('next_billing_date').notNull(),
	category: text('category'),
	notes: text('notes'),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
});

export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;

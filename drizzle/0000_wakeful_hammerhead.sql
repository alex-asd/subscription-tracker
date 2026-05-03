CREATE TABLE `subscriptions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`amount` real NOT NULL,
	`currency` text DEFAULT 'USD' NOT NULL,
	`billing_cycle` text DEFAULT 'monthly' NOT NULL,
	`next_billing_date` text NOT NULL,
	`category` text,
	`notes` text,
	`created_at` integer NOT NULL
);

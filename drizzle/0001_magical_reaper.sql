PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_subscriptions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`amount` real NOT NULL,
	`currency` text DEFAULT 'EUR' NOT NULL,
	`billing_cycle` text DEFAULT 'monthly' NOT NULL,
	`next_billing_date` text NOT NULL,
	`category` text,
	`notes` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_subscriptions`("id", "name", "amount", "currency", "billing_cycle", "next_billing_date", "category", "notes", "created_at") SELECT "id", "name", "amount", "currency", "billing_cycle", "next_billing_date", "category", "notes", "created_at" FROM `subscriptions`;--> statement-breakpoint
DROP TABLE `subscriptions`;--> statement-breakpoint
ALTER TABLE `__new_subscriptions` RENAME TO `subscriptions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
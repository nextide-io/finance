CREATE TABLE IF NOT EXISTS "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"plaid_id" text,
	"full_name" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "users";
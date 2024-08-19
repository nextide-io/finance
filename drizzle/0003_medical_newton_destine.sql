ALTER TABLE "accounts" ADD COLUMN "name" text;--> statement-breakpoint
ALTER TABLE "accounts" DROP COLUMN IF EXISTS "full_name";
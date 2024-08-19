import { defineConfig } from "drizzle-kit";

import { config } from "dotenv";

config({ path: ".env.locl" });

export default defineConfig({
  schema: "db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://postgres.pnxrqitmyaoaawumpjec:qhdr5c88@2024@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres",
  },
  verbose: true,
  strict: true,
});

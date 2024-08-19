import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { config } from "dotenv";

config({ path: ".env.locl" });

const connectionString = process.env.DATABASE_URL!;

const client = postgres(connectionString);
const db = drizzle(client);

export { db as database };

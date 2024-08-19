import { convertAmountToMiliunits } from "@/lib/utils";
import { eachDayOfInterval, format, subDays } from "date-fns";
import { accounts, categories, transactions } from "./schema";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

config({ path: ".env.local" });
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
const db = drizzle(client);

const SEED_USER_ID = "user_2jP3ceQCdBVgJg38tpGVNTWGpFg";
const SEED_CATEGORIES = [
  {
    id: "category_1",
    name: "Food",
    userId: SEED_USER_ID,
    plaidId: "N/A",
  },
  { id: "category_2", name: "Rent", userId: SEED_USER_ID, plaidId: "N/A" },
  {
    id: "category_3",
    name: "Utilities",
    userId: SEED_USER_ID,
    plaidId: "N/A",
  },
  {
    id: "category_7",
    name: "Clothing",
    userId: SEED_USER_ID,
    plaidId: "N/A",
  },
];

const SEED_ACCOUNTS = [
  {
    id: "account_1",
    name: "Checking",
    userId: SEED_USER_ID,
    plaidId: "N/A",
  },
  {
    id: "account_2",
    name: "Savings",
    userId: SEED_USER_ID,
    plaidId: "N/A",
  },
];

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);
const SEED_TRANSACTIONS: (typeof transactions.$inferSelect)[] = [];

const generateRandomAmount = (category: typeof categories.$inferInsert) => {
  switch (category.name) {
    case "Rent":
      return Math.random() * 400 + 90; // Rent will likely be a larger amount
    case "Utilities":
      return Math.random() * 200 + 50;
    case "Food":
      return Math.random() * 30 + 10;
    case "Transportation":
    case "Health":
      return Math.random() * 50 + 15;
    case "Entertainment":
    case "Clothing":
    case "Miscellaneous":
      return Math.random() * 100 + 20;
    default:
      return Math.random() * 50 + 10;
  }
};

const generateTransactionsForDay = function (day: Date) {
  const numTransactions = Math.floor(Math.random() * 4) + 1;
  for (let i = 0; i < numTransactions; i++) {
    const category =
      SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
    const isExpense = Math.random() > 0.6; // 60% chance of being an expense
    const amount = generateRandomAmount(category);
    const formattedAmount = convertAmountToMiliunits(
      isExpense ? -amount : amount
    ); // Negative for expenses
    SEED_TRANSACTIONS.push({
      id: `transaction_${format(day, "yyyy-MM-dd")}_${i}`,
      accountId: SEED_ACCOUNTS[0].id, // Assuming always using the first account for simplicity
      categoryId: category.id,
      date: day,
      amount: formattedAmount,
      payee: "Merchant",
      notes: "Random transaction",
    });
  }
};
const generateTransactions = () => {
  const days = eachDayOfInterval({ start: defaultFrom, end: defaultTo });
  days.forEach((day) => generateTransactionsForDay(day));
};
generateTransactions();

const main = async () => {
  try {
    // Reset database
    await db.delete(transactions).execute();
    await db.delete(accounts).execute();
    await db.delete(categories).execute();
    //Seed categories
    await db.insert(accounts).values(SEED_ACCOUNTS).execute();
    await db.insert(categories).values(SEED_CATEGORIES).execute(); // Seed accounts
    // Seed transactions
    await db.insert(transactions).values(SEED_TRANSACTIONS).execute();
    console.log(SEED_TRANSACTIONS);
    // process.exit(1);
  } catch (error) {
    console.error("Error during seed:", error);
    process.exit(1);
  }
};

main();

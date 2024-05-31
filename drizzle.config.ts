import { defineConfig } from "drizzle-kit";

import { config } from "dotenv";

config({ path: ".env.local" });

export default defineConfig({
  dialect: "postgresql",
  schema: "./server/schema.ts",
  out: "./server/migrations",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_POSTGRES_URL!,
  },
});

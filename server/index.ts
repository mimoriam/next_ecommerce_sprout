import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/server/schema";

// const sql = neon(process.env.POSTGRES_URL!);
const sql = neon(
  "postgresql://ecommerce_owner:H4psqBOFXSx1@ep-muddy-fire-a1afctgf.ap-southeast-1.aws.neon.tech/ecommerce?sslmode=require",
);
export const db = drizzle(sql, { schema, logger: true });

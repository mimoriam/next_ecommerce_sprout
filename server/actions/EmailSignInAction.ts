"use server";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { LoginSchema } from "@/types/LoginSchema";

const action = createSafeActionClient();

export const emailSignIn = action(
  LoginSchema,
  async ({ email, password, code }) => {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser?.email !== email) {
      return { error: "Email not  found" };
    }

    return { success: email };
  },
);

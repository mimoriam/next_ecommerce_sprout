import { createSafeActionClient } from "next-safe-action";
import { RegisterSchema } from "@/types/RegisterSchema";
import { eq } from "drizzle-orm";
import { users } from "@/server/schema";
import bcrpyt from "bcryptjs";
import { db } from "@/server";

const action = createSafeActionClient();

export const emailRegister = action(
  RegisterSchema,
  async ({ email, name, password }) => {
    const hashedPassword = await bcrpyt.hash(password, 10);

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return { error: "Email already in use" };
    }

    // Logic for when the user is not registered
    // await db.insert(users).values({
    //   email,
    //   name,
    // });

    return { success: "Confirmation Email Sent!" };
  },
);

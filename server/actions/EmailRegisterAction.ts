import { createSafeActionClient } from "next-safe-action";
import { RegisterSchema } from "@/types/RegisterSchema";
import { eq } from "drizzle-orm";
import { users } from "@/server/schema";
import bcrypt from "bcryptjs";
import { db } from "@/server";
import { generateEmailVerificationToken } from "@/server/actions/VerificationTokenAction";
import { sendVerificationEmail } from "@/server/actions/SendVerificationEmailAction";

const action = createSafeActionClient();

export const emailRegister = action(
  RegisterSchema,
  async ({ email, name, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      if (!existingUser.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(email);
        await sendVerificationEmail(
          verificationToken[0].email,
          verificationToken[0].token,
        );

        return { success: "Email Confirmation resent" };
      }
      return { error: "Email already in use" };
    }

    await db
      .insert(users)
      .values({
        email,
        name,
        password: hashedPassword,
      })
      .returning();

    const verificationToken = await generateEmailVerificationToken(email);

    await sendVerificationEmail(
      verificationToken[0].email,
      verificationToken[0].token,
    );

    return { success: "Confirmation Email Sent!" };
  },
);

import crypto from "crypto";
import { db } from "@/server";
import { twoFactorTokens } from "@/server/schema";
import { eq } from "drizzle-orm";

export const generateTwoFactorToken = async (email: string) => {
  try {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    // Hour Expiry
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getTwoFactorTokenByEmail(email);
    if (existingToken) {
      await db
        .delete(twoFactorTokens)
        .where(eq(twoFactorTokens.id, existingToken.id));
    }
    const twoFactorToken = await db
      .insert(twoFactorTokens)
      .values({
        email,
        token,
        expires,
      })
      .returning();
    return twoFactorToken;
  } catch (e) {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.query.twoFactorTokens.findFirst({
      where: eq(twoFactorTokens.email, email),
    });
    return twoFactorToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.query.twoFactorTokens.findFirst({
      where: eq(twoFactorTokens.token, token),
    });
    return twoFactorToken;
  } catch {
    return null;
  }
};

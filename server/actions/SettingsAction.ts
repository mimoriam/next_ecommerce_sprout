"use server";

import { createSafeActionClient } from "next-safe-action";
import { SettingsSchema } from "@/types/SettingsSchema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { users } from "@/server/schema";
import bcrypt from "bcryptjs";
import { db } from "@/server";
import { revalidatePath } from "next/cache";

const action = createSafeActionClient();

export const settings = action(SettingsSchema, async (values) => {
  const user = await auth();

  if (!user) {
    return { error: "User not found" };
  }

  const dbUser = await db.query.users.findFirst({
    where: eq(users.id, user.user.id as string),
  });

  if (!dbUser) {
    return { error: "User not found" };
  }

  if (user.user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password,
    );
    if (!passwordMatch) {
      return { error: "Password does not match" };
    }
    const samePassword = await bcrypt.compare(
      values.newPassword,
      dbUser.password,
    );
    if (samePassword) {
      return { error: "New password is the same as the old password" };
    }

    values.password = await bcrypt.hash(values.newPassword, 10);
    values.newPassword = undefined;
  }
  const updatedUser = await db
    .update(users)
    .set({
      twoFactorEnabled: values.isTwoFactorEnabled,
      name: values.name,
      email: values.email,
      password: values.password,
      image: values.image,
    })
    .where(eq(users.id, dbUser.id));

  revalidatePath("/dashboard/settings");
  return { success: "Settings updated" };
});

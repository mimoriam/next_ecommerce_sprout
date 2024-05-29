import type { NextAuthConfig } from "next-auth";
import GitHub from "@auth/core/providers/github";

export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

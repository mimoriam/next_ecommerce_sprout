import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    // @ts-ignore
    async session({ token, session }) {
      return session;
    },
    // // @ts-ignore
    async jwt({ token }) {
      return token;
    },

    async redirect({ url, baseUrl }) {
      // Redirect to home after login
      return baseUrl;
    },
  },
  events: {
    createUser: async ({ user }) => {},
  },
  ...authConfig,
});

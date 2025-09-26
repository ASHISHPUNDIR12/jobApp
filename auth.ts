import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import { prismaEdge } from "./lib/prisma-edge";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prismaEdge),
  providers: [Google],
  debug: true,
  session: {
    strategy: "jwt", // Changed from "database" to "jwt"
  },
  pages: {
    signIn: "/",
    signOut: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      // This runs whenever a JWT is created, updated, or accessed
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
});

import NextAuth from "next-auth";
import prisma from "./lib/prisma";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const {handlers  , signIn , signOut , auth} = NextAuth({
    adapter : PrismaAdapter(prisma),
    providers : [Google],
    debug:true,
    callbacks: {
  session({ session, user }) {
    if (session.user) {
      session.user.id = user.id;
      session.user.role = user.role; 
    }
    return session;
  },
},
})
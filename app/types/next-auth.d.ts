import { DefaultSession } from "next-auth";
import { UserRole } from "../generated/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole; 
    } & DefaultSession["user"];
  }
  
  // Also add the role to the User type from the JWT/User object
  interface User {
    role: UserRole;
  }
}
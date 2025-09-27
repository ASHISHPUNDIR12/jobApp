// lib/prisma-edge.ts
import { PrismaClient } from "@prisma/client";

// This is only for non-edge environments
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prismaEdge = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prismaEdge;
}


import { PrismaClient } from "@prisma/client";

// Evita criar múltiplas instâncias do Prisma Client no hot reload do Next.js (dev)
const isProduction = process.env.NODE_ENV === "production";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: isProduction ? [] : ["query"],
    datasources: process.env.DATABASE_URL
      ? {
          db: { url: isProduction ? process.env.POSTGRES_PRISMA_URL : process.env.DATABASE_URL },
        }
      : undefined,
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

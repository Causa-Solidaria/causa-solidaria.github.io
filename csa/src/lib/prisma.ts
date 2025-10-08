

import { PrismaClient } from "@prisma/client";

// Evita criar múltiplas instâncias do Prisma Client no hot reload do Next.js (dev)

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "production" ? [] : ["query"],
    datasources: process.env.DATABASE_URL
      ? {
          db: { url: process.env.DATABASE_URL },
        }
      : undefined,
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

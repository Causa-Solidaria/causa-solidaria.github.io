

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
    datasources: {
      db: { url: process.env.DATABASE_URL },
    },  
  });

global.prisma = prisma;

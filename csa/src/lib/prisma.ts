

import { PrismaClient } from "@prisma/client";

// Evita criar múltiplas instâncias do Prisma Client no hot reload do Next.js (dev)
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"], // opcional: para logar queries no console
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

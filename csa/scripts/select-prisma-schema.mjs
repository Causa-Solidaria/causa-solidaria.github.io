#!/usr/bin/env node
import fs from "fs";
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prismaDir = path.join(__dirname, "..", "prisma");
const schemaDest = path.join(prismaDir, "schema.prisma");

const rawProvider = (process.env.DATABASE_PROVIDER || "").toLowerCase();
const isVercel = Boolean(process.env.VERCEL);

function resolveProvider() {
  if (rawProvider === "sqlite") return "sqlite";
  if (["postgres", "postgresql", "pg"].includes(rawProvider)) return "postgres";
  return isVercel ? "postgres" : "sqlite";
}

const provider = resolveProvider();
const sourceFile = path.join(prismaDir, `schema.${provider}.prisma`);

if (!fs.existsSync(sourceFile)) {
  console.error(`\n[prisma] Schema alternativo não encontrado: ${sourceFile}`);
  process.exit(1);
}

fs.copyFileSync(sourceFile, schemaDest);

console.log(`\n[prisma] Usando schema '${provider}' -> ${path.relative(process.cwd(), schemaDest)}`);

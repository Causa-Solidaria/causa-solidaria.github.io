/*
  Warnings:

  - Added the required column `endDate` to the `Campanha` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Campanha" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "nivelAjuda" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "Campanha_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Campanha" ("bairro", "cep", "cidade", "createdAt", "descricao", "estado", "foto", "id", "nivelAjuda", "numero", "rua", "titulo", "updatedAt", "usuarioId") SELECT "bairro", "cep", "cidade", "createdAt", "descricao", "estado", "foto", "id", "nivelAjuda", "numero", "rua", "titulo", "updatedAt", "usuarioId" FROM "Campanha";
DROP TABLE "Campanha";
ALTER TABLE "new_Campanha" RENAME TO "Campanha";
CREATE UNIQUE INDEX "Campanha_id_key" ON "Campanha"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

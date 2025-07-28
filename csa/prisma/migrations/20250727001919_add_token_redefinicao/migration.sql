-- CreateTable
CREATE TABLE "TokenRedefinicaoSenha" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TokenRedefinicaoSenha_token_key" ON "TokenRedefinicaoSenha"("token");

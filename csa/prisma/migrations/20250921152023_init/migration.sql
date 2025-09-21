-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TokenRedefinicaoSenha" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TokenRedefinicaoSenha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Campanha" (
    "id" TEXT NOT NULL,
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Campanha_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TokenRedefinicaoSenha_token_key" ON "public"."TokenRedefinicaoSenha"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Campanha_id_key" ON "public"."Campanha"("id");

-- AddForeignKey
ALTER TABLE "public"."Campanha" ADD CONSTRAINT "Campanha_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

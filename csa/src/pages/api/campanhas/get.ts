import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "csa/lib/prisma"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Se a variável de ambiente exigida pelo Prisma não estiver definida, devolve []
  if (!process.env.POSTGRES_PRISMA_DATABASE_URL) {
    return res.status(200).json([]);
  }
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Método não permitido" });
    }

    const campanhas = await prisma.campanha.findMany();

    return res.status(200).json(campanhas);
  } catch (error) {
    console.error("Erro ao buscar campanhas:", error);
    // Em falha de banco, degrade com lista vazia para não quebrar o front
    return res.status(200).json([]);
  }
}

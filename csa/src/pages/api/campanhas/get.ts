import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "csa/lib/prisma"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Método não permitido" });
    }

    const campanhas = await prisma.campanha.findMany();

    return res.status(200).json(campanhas);
  } catch (error) {
    console.error("Erro ao buscar campanhas:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

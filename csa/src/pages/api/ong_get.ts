// pages/api/ongs.ts
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "csa/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Método não permitido" });

  try {
    const ongs = await prisma.ong.findMany();
    res.status(200).json(ongs);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
}

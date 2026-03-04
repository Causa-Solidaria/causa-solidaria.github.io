
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "csa/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Método não permitido" });

  try {
    const ongs = await prisma.ong.findMany({
      include: {
        usuario: {
          select: { name: true, username: true, foto: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Mapeia campos do Prisma para os nomes esperados pelo frontend
    const mapped = ongs.map((o) => ({
      id: o.id.toString(),
      nome: o.nome,
      area: o.areaAtuacao,
      descricao: o.descricao,
      cidade: o.cidade ?? "",
      uf: o.uf ?? "",
      rua: o.rua ?? "",
      numero: o.numero ?? "",
      bairro: o.bairro ?? "",
      email: o.contato,
      site: o.siteOuRede ?? "",
      logoUrl: o.logoUrl ?? "",
      criador: {
        nome: o.usuario.name,
        foto: o.usuario.foto ?? null,
      },
      criadoEm: o.createdAt.toLocaleDateString("pt-BR"),
    }));

    res.status(200).json(mapped);
  } catch (err) {
    console.error("Erro ao buscar ONGs:", err);
    res.status(500).json([]);
  }
}

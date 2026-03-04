import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "csa/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const topicos = await prisma.forumTopico.findMany({
      include: {
        tags: true,
        usuario: {
          select: { name: true, username: true, foto: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Formata para o front-end
    const resultado = topicos.map((t) => ({
      _id: t.id,
      UUID: t.slug,
      Titulo: t.titulo,
      Descrição: t.descricao,
      Joinhas: t.karma,
      Tags: t.tags.map((tag) => ({ label: tag.tag })),
      NumeroDeComentarios: t.totalComentarios,
      Criador: {
        nome: t.usuario.name,
        foto: t.usuario.foto || undefined,
      },
      EmAlta: t.isHot,
      Data: t.createdAt.toLocaleDateString("pt-BR"),
    }));

    return res.status(200).json(resultado);
  } catch (error) {
    console.error("Erro ao buscar tópicos:", error);
    return res.status(200).json([]);
  }
}

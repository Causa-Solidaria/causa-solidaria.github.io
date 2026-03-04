import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { prisma } from "csa/lib/prisma";
import { getJwtSecret } from "csa/lib/JWT";
import { z } from "zod";

const comentarSchema = z.object({
  topicoId: z.number().int().positive("ID do tópico inválido"),
  conteudo: z
    .string()
    .min(1, "O comentário não pode estar vazio")
    .max(2000, "O comentário deve ter no máximo 2000 caracteres"),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    // 1. Autenticação
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];
    let decoded: { id: number };

    try {
      decoded = jwt.verify(token, getJwtSecret()) as { id: number };
    } catch (err: any) {
      if (err?.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expirado" });
      }
      if (err?.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Token inválido" });
      }
      throw err;
    }

    const usuarioId = decoded.id;

    // 2. Validação
    const data = comentarSchema.parse(req.body);

    // 3. Verifica se o tópico existe
    const topico = await prisma.forumTopico.findUnique({
      where: { id: data.topicoId },
    });

    if (!topico) {
      return res.status(404).json({ error: "Tópico não encontrado" });
    }

    // 4. Cria o comentário e incrementa o contador em transação
    const comentario = await prisma.$transaction(async (tx) => {
      const novo = await tx.forumComentario.create({
        data: {
          conteudo: data.conteudo,
          usuarioId,
          topicoId: data.topicoId,
        },
        include: {
          usuario: {
            select: { name: true, username: true, foto: true },
          },
        },
      });

      await tx.forumTopico.update({
        where: { id: data.topicoId },
        data: { totalComentarios: { increment: 1 } },
      });

      return novo;
    });

    return res.status(201).json({
      id: comentario.id,
      autor: { nome: comentario.usuario.name, foto: comentario.usuario.foto },
      texto: comentario.conteudo,
      data: comentario.createdAt.toISOString(),
      karma: comentario.karma,
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors[0].message });
    }
    console.error("Erro ao comentar:", err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

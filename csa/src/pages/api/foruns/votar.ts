import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { prisma } from "csa/lib/prisma";
import { getJwtSecret } from "csa/lib/JWT";
import { z } from "zod";

const votarTopicoSchema = z.object({
  topicoId: z.number().int().positive("ID do tópico inválido"),
  tipo: z.enum(["UP", "DOWN"]),
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
    const data = votarTopicoSchema.parse(req.body);

    // 2. Busca voto existente
    const votoExistente = await prisma.forumVoteTopico.findUnique({
      where: {
        topicoId_usuarioId: {
          topicoId: data.topicoId,
          usuarioId,
        },
      },
    });

    let karmaChange = 0;

    if (votoExistente) {
      if (votoExistente.tipo === data.tipo) {
        // Mesmo voto → remove (toggle off)
        await prisma.forumVoteTopico.delete({
          where: { id: votoExistente.id },
        });
        karmaChange = data.tipo === "UP" ? -1 : 1;
      } else {
        // Troca de voto (UP→DOWN ou DOWN→UP)
        await prisma.forumVoteTopico.update({
          where: { id: votoExistente.id },
          data: { tipo: data.tipo },
        });
        karmaChange = data.tipo === "UP" ? 2 : -2;
      }
    } else {
      // Voto novo
      await prisma.forumVoteTopico.create({
        data: {
          tipo: data.tipo,
          topicoId: data.topicoId,
          usuarioId,
        },
      });
      karmaChange = data.tipo === "UP" ? 1 : -1;
    }

    // 3. Atualiza karma do tópico
    const topico = await prisma.forumTopico.update({
      where: { id: data.topicoId },
      data: { karma: { increment: karmaChange } },
      select: { karma: true },
    });

    // 4. Retorna estado atual do voto do usuário
    const votoAtual = await prisma.forumVoteTopico.findUnique({
      where: {
        topicoId_usuarioId: {
          topicoId: data.topicoId,
          usuarioId,
        },
      },
    });

    return res.status(200).json({
      karma: topico.karma,
      vote: votoAtual ? (votoAtual.tipo === "UP" ? "up" : "down") : null,
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors[0].message });
    }
    console.error("Erro ao votar no tópico:", err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

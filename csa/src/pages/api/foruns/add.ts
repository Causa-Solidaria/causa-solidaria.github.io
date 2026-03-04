import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { prisma } from "csa/lib/prisma";
import { getJwtSecret } from "csa/lib/JWT";
import { z } from "zod";

// ===== Validação server-side =====

const criarForumServerSchema = z.object({
  titulo: z
    .string()
    .min(5, "O título deve ter pelo menos 5 caracteres")
    .max(120, "O título deve ter no máximo 120 caracteres"),
  descricao: z
    .string()
    .min(20, "A descrição deve ter pelo menos 20 caracteres")
    .max(5000, "A descrição deve ter no máximo 5000 caracteres"),
  tags: z
    .array(z.string())
    .min(1, "Selecione pelo menos 1 tag")
    .max(4, "Selecione no máximo 4 tags"),
});

// ===== Gera slug único a partir do título =====

function gerarSlug(titulo: string): string {
  return titulo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^a-z0-9\s-]/g, "")   // remove caracteres especiais
    .trim()
    .replace(/\s+/g, "-")           // espaços → hífens
    .replace(/-+/g, "-")            // hífens múltiplos → único
    .slice(0, 80);                   // limita tamanho
}

async function gerarSlugUnico(titulo: string): Promise<string> {
  const baseSlug = gerarSlug(titulo);
  let slug = baseSlug;
  let tentativa = 0;

  while (await prisma.forumTopico.findUnique({ where: { slug } })) {
    tentativa++;
    slug = `${baseSlug}-${tentativa}`;
  }

  return slug;
}

// ===== Handler =====

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

    // 2. Validação dos dados
    const data = criarForumServerSchema.parse(req.body);

    // 3. Gera slug único
    const slug = await gerarSlugUnico(data.titulo);

    // 4. Cria o tópico + tags em uma transação
    const novoTopico = await prisma.$transaction(async (tx) => {
      const topico = await tx.forumTopico.create({
        data: {
          titulo: data.titulo,
          descricao: data.descricao,
          slug,
          usuarioId,
        },
      });

      // Cria as tags associadas
      if (data.tags.length > 0) {
        await tx.forumTagOnTopico.createMany({
          data: data.tags.map((tag) => ({
            tag,
            topicoId: topico.id,
          })),
        });
      }

      // Retorna o tópico com as tags
      return tx.forumTopico.findUnique({
        where: { id: topico.id },
        include: {
          tags: true,
          usuario: {
            select: { name: true, username: true, foto: true },
          },
        },
      });
    });

    return res.status(201).json(novoTopico);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Erro ao criar tópico:", error);
    return res.status(500).json({ error: "Erro ao criar tópico" });
  }
}

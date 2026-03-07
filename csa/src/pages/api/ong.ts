import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "csa/lib/prisma";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { getJwtSecret } from "csa/lib/JWT";
import { criarOngSchema } from "csa/lib/validations/ong";
import { checkRateLimit, setRateLimitHeaders } from "csa/lib/security/rateLimit";

const rateLimitOptions = {
  windowMs: 60 * 1000,
  limit: 6,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const rateLimit = await checkRateLimit(req, "ongs:add", rateLimitOptions);
    setRateLimitHeaders(res, rateLimit, rateLimitOptions);

    if (!rateLimit.allowed) {
      return res.status(429).json({
        error: "Muitas tentativas em pouco tempo. Aguarde e tente novamente.",
        resetAt: rateLimit.resetAt,
      });
    }

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

    // 2. Validação dos dados (usa schema compartilhado)
    const data = criarOngSchema.parse(req.body);

    // 3. Verifica CNPJ duplicado
    const cnpjExistente = await prisma.ong.findUnique({ where: { cnpj: data.cnpj } });
    if (cnpjExistente) {
      return res.status(409).json({ error: "Já existe uma ONG cadastrada com este CNPJ" });
    }

    // 4. Cria a ONG
    const novaOng = await prisma.ong.create({
      data: {
        nome: data.nome,
        cnpj: data.cnpj,
        areaAtuacao: data.areaAtuacao,
        descricao: data.descricao,
        cep: data.cep,
        cidade: data.cidade,
        uf: data.uf,
        rua: data.rua,
        numero: data.numero,
        bairro: data.bairro,
        contato: data.contato,
        siteOuRede: data.site || "",
        logoUrl: data.logo || "",
        usuarioId,
      },
    });

    return res.status(201).json(novaOng);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Erro ao cadastrar ONG:", error);
    return res.status(500).json({ error: "Erro ao cadastrar ONG" });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb",
    },
  },
};

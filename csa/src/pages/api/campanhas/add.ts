import { createRouter } from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "csa/lib/prisma";
import { getJwtSecret } from "csa/lib/JWT";
import { checkRateLimit, setRateLimitHeaders } from "csa/lib/security/rateLimit";

const router = createRouter<NextApiRequest, NextApiResponse>();
const rateLimitOptions = {
  windowMs: 60 * 1000,
  limit: 8,
};

const criarCampanhaApiSchema = z.object({
  titulo: z.string().trim().min(3, "Titulo muito curto").max(120, "Titulo muito longo"),
  descricao: z.string().trim().min(20, "Descricao muito curta").max(5000, "Descricao muito longa").optional().default(""),
  nivelAjuda: z.string().trim().min(1, "Nivel de ajuda obrigatorio").max(50, "Nivel de ajuda invalido"),
  cep: z.string().trim().regex(/^\d{5}-?\d{3}$/, "CEP invalido"),
  cidade: z.string().trim().min(1, "Cidade obrigatoria").max(80, "Cidade muito longa"),
  estado: z.string().trim().max(2, "Estado invalido").optional().default(""),
  bairro: z.string().trim().max(80, "Bairro muito longo").optional().default(""),
  rua: z.string().trim().min(1, "Rua obrigatoria").max(120, "Rua muito longa"),
  numero: z.string().trim().min(1, "Numero obrigatorio").max(20, "Numero muito longo"),
  metaTipo: z.enum(["dinheiro", "item"]).default("dinheiro"),
  meta: z.coerce.number().positive("Meta deve ser maior que zero").max(1_000_000_000, "Meta muito alta"),
  metaItem: z.string().trim().max(80, "Nome do item muito longo").optional(),
  endDate: z.unknown(),
  thumbnail: z.string().max(5_000_000, "Imagem muito grande").optional().default(""),
}).strict().superRefine((data, ctx) => {
  if (data.metaTipo === "item" && !data.metaItem?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["metaItem"],
      message: "Informe o item da meta por quantidade",
    });
  }
});

function toValidEndDate(input: unknown): Date | null {
  const MIN_YEAR = 2000;
  const MAX_YEAR = 9999;

  const parseAndValidate = (value: string): Date | null => {
    const candidate = new Date(value);
    if (Number.isNaN(candidate.getTime())) return null;

    const year = candidate.getUTCFullYear();
    if (year < MIN_YEAR || year > MAX_YEAR) return null;

    return candidate;
  };

  if (typeof input === "string") {
    return parseAndValidate(input);
  }

  if (input instanceof Date) {
    if (Number.isNaN(input.getTime())) return null;
    const year = input.getUTCFullYear();
    return year >= MIN_YEAR && year <= MAX_YEAR ? input : null;
  }

  // Some clients can send a tagged object like { value: "2026-12-31" }.
  if (input && typeof input === "object" && "value" in input) {
    const innerValue = (input as { value?: unknown }).value;
    if (typeof innerValue === "string") {
      return parseAndValidate(innerValue);
    }
  }

  return null;
}

function toValidMoneyGoal(input: unknown): number | null {
  const parsed = typeof input === "number" ? input : Number(input);
  if (!Number.isFinite(parsed)) return null;
  if (parsed <= 0) return null;
  return parsed;
}

router.post(async (req, res) => {
  try {
    const rateLimit = await checkRateLimit(req, "campanhas:add", rateLimitOptions);
    setRateLimitHeaders(res, rateLimit, rateLimitOptions);

    if (!rateLimit.allowed) {
      return res.status(429).json({
        error: "Muitas tentativas em pouco tempo. Aguarde e tente novamente.",
        resetAt: rateLimit.resetAt,
      });
    }

    // 1. Autenticação via JWT
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

    // 2. Pega dados do formulário
    const parsedBody = criarCampanhaApiSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({ error: parsedBody.error.errors });
    }

    const {
      titulo,
      descricao,
      nivelAjuda,
      cep,
      cidade,
      estado,
      bairro,
      rua,
      numero,
      metaTipo,
      meta,
      metaItem,
      endDate,
      thumbnail,
    } = parsedBody.data;

    const parsedMeta = toValidMoneyGoal(meta);
    if (parsedMeta === null) {
      return res.status(400).json({ error: "Meta da campanha deve ser um valor em dinheiro maior que zero" });
    }

    const parsedEndDate = toValidEndDate(endDate);
    if (!parsedEndDate) {
      return res.status(400).json({ error: "Data de término inválida" });
    }

    // 3. Salva no banco diretamente a string comprimida
    const novaCampanha = await prisma.campanha.create({
      data: {
        titulo,
        descricao,
        nivelAjuda,
        cep,
        cidade,
        estado,
        bairro,
        rua,
        numero,
        metaTipo,
        meta: parsedMeta,
        metaItem: metaTipo === "item" ? (metaItem ?? "") : null,
        foto: thumbnail || "", // salva a string comprimida
        usuarioId,
        endDate: parsedEndDate,
      },
    });

    return res.status(201).json(novaCampanha);
  } catch (error: any) {
    console.error("Erro:", error);
    return res.status(500).json({ error: error.message });
  }
});

// BodyParser ativo para JSON
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb",
    }
  },
};

export default router.handler({
  onError(err, req, res) {
    console.error(err);
    res.status(500).end("Erro interno.");
  },
});

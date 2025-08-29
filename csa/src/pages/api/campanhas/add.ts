import { createRouter } from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { prisma } from "csa/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "secreto-temporario";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  try {
    // 1. Autenticação via JWT
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];
    let decoded: { id: number };
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { id: number };
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
      endDate,
      thumbnail, // string Base64 comprimida
    } = req.body;

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
        foto: thumbnail || "", // salva a string comprimida
        usuarioId,
        endDate: new Date(endDate),
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
      sizeLimit: '200mb'
    }
  },
};

export default router.handler({
  onError(err, req, res) {
    console.error(err);
    res.status(500).end("Erro interno.");
  },
});

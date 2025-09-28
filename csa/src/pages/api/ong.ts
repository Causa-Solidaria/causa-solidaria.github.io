import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "csa/lib/prisma";
import { z } from "zod";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "secreto-temporario";


const ongSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  cnpj: z.string().min(14, "O CNPJ deve ter 14 dígitos"),
  areaAtuacao: z.string({ required_error: "Selecione a área de atuação" }),
  descricao: z.string().min(500, "A descrição deve ter no mínimo 500 caracteres"),
  cep: z.string().min(8, "CEP inválido"),
  contato: z.string().min(5, "Informe um contato válido"),
  site: z.string().optional(),
  logo: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token não fornecido" });
    }
    const token = authHeader.split(" ")[1];
    let decoded: { id: number };
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    } catch (err: any) {
      if (err?.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expirado" });
      }
      if (err?.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Token inválido" });
      }
      throw err;
    }
    const usuarioId = decoded.id;

    const data = ongSchema.parse(req.body);

    const novaOng = await prisma.ong.create({
      data: {
        nome: data.nome,
        cnpj: data.cnpj,
        areaAtuacao: data.areaAtuacao,
        descricao: data.descricao,
        cep: data.cep,
        contato: data.contato,
        siteOuRede: data.site,
        logoUrl: data.logo,
        usuarioId,
      },
    });

    return res.status(201).json(novaOng);
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: error.errors });
    }
    console.error(error);
    return res.status(500).json({ message: "Erro ao cadastrar ONG" });
  }
}

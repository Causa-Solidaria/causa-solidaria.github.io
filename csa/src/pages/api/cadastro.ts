
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";



// Função que calcula a idade
function isMaiorDeIdade(dataNascimento: string): number {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
}

// Validação com Zod
const cadastroSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  username: z.string().min(1, "Nome de usuário é obrigatório"),
  BornDate: z.string().refine((data) => isMaiorDeIdade(data) >= 18, "Você deve ser maior de idade"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string(),
  terms: z.any().refine((value) => !!value, "Você deve aceitar os termos e condições"),
}).refine((dados) => dados.password === dados.confirmPassword, {
  message: "As senhas devem ser iguais",
});

// Função handler correta para pages/api/
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const parsedData = cadastroSchema.parse(req.body);

    // Verifica se já existe usuário com o e-mail
    const existingUser = await prisma.user.findUnique({
      where: { email: parsedData.email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(parsedData.password, 10);

    // Cria o usuário no banco
    const user = await prisma.user.create({
      data: {
        name: parsedData.name,
        username: parsedData.username,
        email: parsedData.email,
        senha: hashedPassword,
        age: isMaiorDeIdade(parsedData.BornDate),
      },
    });

    return res.status(201).json({ message: "Usuário criado com sucesso", user });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }

    return res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
}

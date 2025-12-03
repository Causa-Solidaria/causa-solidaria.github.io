import { z } from "zod";

// ===== CAMPOS BASE REUTILIZÁVEIS =====

export const emailSchema = z.string().email("Email inválido");

export const passwordSchema = z.string().min(6, "Senha deve ter pelo menos 6 caracteres");

export const nomeSchema = z.string().min(1, "Nome é obrigatório");

export const usernameSchema = z.string().min(1, "Nome de usuário é obrigatório");

export const cepSchema = z.string().min(8, "CEP inválido");

export const cnpjSchema = z.string().min(14, "O CNPJ deve ter 14 dígitos");

// ===== FUNÇÕES DE VALIDAÇÃO =====

export function isMaiorDeIdade(dataNascimento: string): boolean {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  const m = hoje.getMonth() - nascimento.getMonth();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--;
  return idade >= 18;
}

export function isDataFutura(date: string): boolean {
  return new Date(date) > new Date();
}

// ===== SCHEMAS DE ENDEREÇO =====

export const enderecoSchema = z.object({
  cep: cepSchema,
  cidade: z.string().min(1, "Cidade é obrigatória"),
  estado: z.string().optional(),
  bairro: z.string().optional(),
  rua: z.string().min(1, "Rua é obrigatória"),
  numero: z.string().min(1, "Número é obrigatório"),
});

export type EnderecoData = z.infer<typeof enderecoSchema>;

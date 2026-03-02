import { z } from "zod";
import { cnpjSchema, cepSchema } from "./common";

// ===== CRIAR ONG =====

export const criarOngSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  cnpj: cnpjSchema,
  areaAtuacao: z.string({ required_error: "Selecione a área de atuação" }),
  descricao: z.string().min(100, "A descrição deve ter no mínimo 100 caracteres"),
  cep: cepSchema,
  cidade: z.string().optional(),
  uf: z.string().optional(),
  rua: z.string().optional(),
  numero: z.string().optional(),
  bairro: z.string().optional(),
  contato: z.string().min(5, "Informe um contato válido"),
  site: z.string().optional(),
  logo: z.string().optional(),
});

export type CriarOngData = z.infer<typeof criarOngSchema>;

// ===== DOAR PARA ONG =====
export const doarOngSchema = z.object({
  category: z.string().min(1, "A categoria é obrigatória"),
  message: z.string().max(500, "Mensagem muito longa").optional(),
});

export type DoarOngData = z.infer<typeof doarOngSchema>;

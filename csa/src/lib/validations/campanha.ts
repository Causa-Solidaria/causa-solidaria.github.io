import { z } from "zod";
import { isDataFutura } from "./common";

// ===== NÍVEIS DE AJUDA =====

export const niveisAjuda = ["Alimentos", "Roupas", "Higiene", "Brinquedos", "Outros"] as const;
export type NivelAjuda = typeof niveisAjuda[number];

// ===== CRIAR CAMPANHA =====

export const criarCampanhaSchema = z.object({
  title: z.string()
    .min(3, "Nome é obrigatório")
    .max(60, "Nome deve ter no máximo 60 caracteres"),
  description: z.string().min(200, "Descrição deve ter pelo menos 200 caracteres"),
  nivelAjuda: z.enum(niveisAjuda, {
    required_error: "Categoria é obrigatória",
  }),
  cep: z.string(),
  cidade: z.string().min(1, "Cidade é obrigatória"),
  estado: z.string().optional(),
  bairro: z.string().optional(),
  rua: z.string().min(1, "Rua é obrigatória"),
  numero: z.string().min(1, "Número é obrigatório"),
  endDate: z.string().refine(
    (date) => isDataFutura(date),
    "Data de término deve ser no futuro"
  ),
  thumbnail: z.string().optional(),
});

export type CriarCampanhaData = z.infer<typeof criarCampanhaSchema>;

// ===== DOAÇÃO DE ITEM =====

export const doarCampanhaSchema = z.object({
  message: z.string().max(500, "Mensagem deve ter no máximo 500 caracteres").optional(),
});

export type DoarCampanhaData = z.infer<typeof doarCampanhaSchema>;

import { z } from "zod";
import { cnpjSchema, cepSchema } from "./common";

// ===== CRIAR ONG =====

export const criarOngSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  cnpj: cnpjSchema,
  areaAtuacao: z.string({ required_error: "Selecione a área de atuação" }),
  descricao: z.string().min(500, "A descrição deve ter no mínimo 500 caracteres"),
  cep: cepSchema,
  contato: z.string().min(5, "Informe um contato válido"),
  site: z.string().optional(),
  logo: z.string().optional(),
});

export type CriarOngData = z.infer<typeof criarOngSchema>;

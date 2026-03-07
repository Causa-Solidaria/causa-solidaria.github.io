import { z } from "zod";
import { cnpjSchema, cepSchema } from "./common";

const areasAtuacao = [
  "educacao",
  "saude",
  "meio_ambiente",
  "direitos_humanos",
  "animais",
  "cultura_e_arte",
  "assistencia_social",
  "desenvolvimento_comunitario",
  "outros",
] as const;

const emptyStringToUndefined = (value: unknown) => {
  if (typeof value !== "string") return value;
  const normalized = value.trim();
  return normalized.length === 0 ? undefined : normalized;
};

// ===== CRIAR ONG =====

export const criarOngSchema = z.object({
  nome: z.string().trim().min(3, "O nome deve ter pelo menos 3 caracteres").max(120, "Nome muito longo"),
  cnpj: cnpjSchema,
  areaAtuacao: z.enum(areasAtuacao, { required_error: "Selecione a área de atuação" }),
  descricao: z.string().trim().min(100, "A descrição deve ter no mínimo 100 caracteres").max(2000, "Descricao muito longa"),
  cep: cepSchema,
  cidade: z.string().trim().min(1, "Cidade é obrigatória").max(80, "Cidade muito longa"),
  uf: z.string().trim().min(2, "UF é obrigatório").max(2, "UF invalida"),
  rua: z.string().trim().min(1, "Rua é obrigatória").max(120, "Rua muito longa"),
  numero: z.string().trim().min(1, "Número é obrigatório").max(20, "Numero muito longo"),
  bairro: z.string().trim().min(1, "Bairro é obrigatório").max(80, "Bairro muito longo"),
  contato: z.string().trim().min(5, "Informe um contato válido").max(120, "Contato muito longo"),
  site: z.preprocess(
    emptyStringToUndefined,
    z.string().url("Site deve ser uma URL valida").max(200, "URL muito longa").optional()
  ),
  logo: z.preprocess(
    emptyStringToUndefined,
    z.string().max(5_000_000, "Logo muito grande").optional()
  ),
}).strict();

export type CriarOngData = z.infer<typeof criarOngSchema>;

// ===== DOAR PARA ONG =====
export const doarOngSchema = z.object({
  category: z.string().min(1, "A categoria é obrigatória"),
  message: z.string().max(500, "Mensagem muito longa").optional(),
});

export type DoarOngData = z.infer<typeof doarOngSchema>;

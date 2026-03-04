import { z } from "zod";

// ===== TAGS DISPONÍVEIS =====

export const tagsForumDisponiveis = [
  "Voluntariado",
  "Doações",
  "Alimentos",
  "Campanhas",
  "Organização",
  "ONGs",
  "Financiamento",
  "Educação",
  "Meio Ambiente",
  "Sustentabilidade",
  "Animais",
  "Adoção",
  "Saúde",
  "Direitos Humanos",
  "Cultura",
  "Comunidade",
  "Iniciantes",
  "Geral",
] as const;

export type TagForum = (typeof tagsForumDisponiveis)[number];

// ===== CRIAR TÓPICO =====

export const criarForumSchema = z.object({
  titulo: z
    .string()
    .min(5, "O título deve ter pelo menos 5 caracteres")
    .max(120, "O título deve ter no máximo 120 caracteres"),
  descricao: z
    .string()
    .min(20, "A descrição deve ter pelo menos 20 caracteres")
    .max(5000, "A descrição deve ter no máximo 5000 caracteres"),
  tags: z
    .array(z.string())
    .min(1, "Selecione pelo menos 1 tag")
    .max(4, "Selecione no máximo 4 tags"),
});

export type CriarForumData = z.infer<typeof criarForumSchema>;

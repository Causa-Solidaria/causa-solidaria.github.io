import { z } from "zod";

const formSchema = z.object({
    title: z
        .string()
        .min(3, "Nome é obrigatório")
        .max(60, "Nome deve ter no máximo 60 caracteres"),

    description: z
        .string()
        .min(200, "Descrição deve ter pelo menos 200 caracteres"),

    nivelAjuda: z
        .enum(["Alimentos", "Roupas", "Higiene", "Brinquedos", "Outros"], {
            required_error: "Categoria é obrigatória",
        }),

    cep: z
        .string()
        ,
  
    cidade: z
        .string()
        .min(1, "Cidade é obrigatória"),

    // Tornados opcionais para compatibilizar com a API (usa defaults no backend)
    estado: z
        .string()
        .optional(),

    bairro: z
        .string()
        .optional(),

    rua: z
        .string()
        .min(1, "Rua é obrigatória"),

    numero: z
        .string()
        .min(1, "Número é obrigatório"),
    
    endDate: z
        .string()
        .refine(
        (date) => new Date(date) > new Date(),
        "Data de término deve ser no futuro"
    ),

    thumbnail: z
        .string()
        .optional(), 
});

export default formSchema;
export type formSchemaType = z.infer<typeof formSchema>;
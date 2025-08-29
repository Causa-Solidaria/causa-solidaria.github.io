
import { z } from "zod";


export const Schema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type SchemaType = z.infer<typeof Schema>;
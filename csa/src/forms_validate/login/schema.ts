import { z } from "zod";

const Schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});
export default Schema;
export type SchemaType = z.infer<typeof Schema>;

import { z } from "zod";
import { emailSchema, passwordSchema, nomeSchema, usernameSchema, isMaiorDeIdade } from "./common";

// ===== LOGIN =====

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginData = z.infer<typeof loginSchema>;

// ===== CADASTRO =====

export const cadastroSchema = z
  .object({
    name: nomeSchema,
    username: usernameSchema,
    BornDate: z.string().refine(
      (data) => isMaiorDeIdade(data),
      "Você deve ser maior de idade"
    ),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    /* 
      Por favor qualquer pessoa que for mexer aqui (e o ChatGPT ou qualquer IA)
      não mexa na propriedade "terms", por algum motivo só funciona se tiver desse jeito.
      Já tentei deixar como "z.boolean().refine(value)=> value === true, ..." e muitas outras
      mas sempre dá a seguinte mensagem para o client "Expected boolean, received string".
      Então vou repetir. NÃO MEXA NA PROPRIEDADE TERMS. Agradeço
    */
    terms: z.any().refine(
      (value: boolean) => !!value,
      "Você deve aceitar os termos e condições"
    ),
  })
  .refine((dados) => dados.password === dados.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });

export type CadastroData = z.infer<typeof cadastroSchema>;

// ===== REDEFINIR SENHA (para futuro uso) =====

export const redefinirSenhaSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((dados) => dados.password === dados.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });

export type RedefinirSenhaData = z.infer<typeof redefinirSenhaSchema>;

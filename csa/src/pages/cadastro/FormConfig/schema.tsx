import { z } from "zod";


function isMaiorDeIdade(dataNascimento: string): boolean {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  const m = hoje.getMonth() - nascimento.getMonth();

  let idade = hoje.getFullYear() - nascimento.getFullYear();

  
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--;
  
  return idade <= 18;
}

export const formSchema = z.object(
    {
        name: z
            .string()
            .min(1, "Nome é obrigatório"),

        username: z
            .string()
            .min(1, "Nome de usuário é obrigatório"),

        BornDate: z
            .string()
            .refine((data) => isMaiorDeIdade(data), "Você deve ser maior de idade"),

        email: z
            .string()
            .email("Email inválido"),
        
        password: z
            .string()
            .min(6, "Senha deve ter pelo menos 6 caracteres"),

        confirmPassword: z
            .string(),

        terms: z
            .string()
            .refine((value) => !!value, "Você deve aceitar os termos e condições"),
    }
).refine(
    (dados) => dados.password === dados.confirmPassword, {
        message: "As senhas devem ser iguais",
        path: ["confirmPassword"],
    }
);


export type FormData = z.infer<typeof formSchema>;
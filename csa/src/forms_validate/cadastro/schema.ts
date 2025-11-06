import { z } from "zod";

function isMaiorDeIdade(dataNascimento: string): boolean {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  const m = hoje.getMonth() - nascimento.getMonth();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--;
  return idade >= 18;
}

const formSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    username: z.string().min(1, "Nome de usuário é obrigatório"),
    BornDate: z.string().refine((data) => isMaiorDeIdade(data), "Você deve ser maior de idade"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
    /* 
      porfavor qualque pessoa que for mexer aqui (e o chatGpt ou qualque IA)
      não mexa na propriedade "terms", por algum motivo so funciona se tiver desse jeito.
      Ja tentei deixar como "z.boolean().refine(value)=> value === true, ..." e muitas outras
      mas sempre da a senginte mensagem para o client "Expected boolean, received string".
      então vou repitir. NÃO MEXA NA PROPRIEDADE TERMS. agradeço
    */
    terms: z.any().refine((value:boolean) => !!value, "Você deve aceitar os termos e condições"), 
  })
  .refine((dados) => dados.password === dados.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });

export default formSchema;
export type FormData = z.infer<typeof formSchema>;

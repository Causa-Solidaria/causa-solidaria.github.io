
import { z } from "zod";

const formSchema = z.object({
	nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
	cnpj: z.string().min(14, "O CNPJ deve ter 14 dígitos"),
	areaAtuacao: z.string({ required_error: "Selecione a área de atuação" }),
	descricao: z.string().min(500, "A descrição deve ter no mínimo 500 caracteres"),
	cep: z.string().min(8, "CEP inválido"),
	contato: z.string().min(5, "Informe um contato válido"),
	site: z.string().optional(),
	logo: z.string().optional(),
});

export default formSchema;
export type formSchemaType = z.infer<typeof formSchema>;

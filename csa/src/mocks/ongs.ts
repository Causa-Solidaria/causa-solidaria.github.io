export interface MockOng {
    id: number
    nome: string
    area: string
    descricao: string
}

export const mockOngs: MockOng[] = [
    { id: 1, nome: "Banco de Alimentos", area: "Alimentação", descricao: "Combate à fome e ao desperdício de alimentos, redistribuindo doações para comunidades carentes." },
    { id: 2, nome: "Instituto Verde Vida", area: "Meio Ambiente", descricao: "Reflorestamento e educação ambiental em áreas urbanas e periféricas." },
    { id: 3, nome: "Amigos de Patas", area: "Animais", descricao: "Resgate, reabilitação e adoção responsável de animais abandonados." },
    { id: 4, nome: "Educar para Transformar", area: "Educação", descricao: "Reforço escolar e acesso à tecnologia para crianças de comunidades vulneráveis." },
    { id: 5, nome: "Abrigo Esperança", area: "Assistência Social", descricao: "Acolhimento e reinserção social de pessoas em situação de rua." },
]

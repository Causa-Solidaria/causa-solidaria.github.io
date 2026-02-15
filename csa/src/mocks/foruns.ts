export type VoteDirection = "up" | "down" | null
export type SortOption = "recentes" | "antigos" | "top"

export interface Comentario {
    id: number
    autor: { nome: string; foto?: string }
    texto: string
    data: string
    karma: number
    vote: VoteDirection
}

export interface ForumData {
    UUID: string
    _id: string | number
    Titulo: string
    Descrição: string
    Joinhas: number
    Tags?: { label: string }[]
    NumeroDeComentarios?: number
    Criador: { nome: string; foto?: string }
    EmAlta?: boolean
    Data: string
}

export type ForumDetail = {
    id: string
    titulo: string
    descricao: string
    criador: { nome: string; foto?: string }
    data: string
    tags: { label: string }[]
    karma: number
    comentarios: Comentario[]
    notFound: boolean
}

export const mockForuns: ForumData[] = [
    {
        _id: 1,
        UUID: "como-ajudar-comunidade",
        Titulo: "Como posso ajudar minha comunidade?",
        Descrição: "Estou querendo começar a fazer trabalho voluntário na minha cidade, mas não sei por onde começar. Alguém tem dicas de como encontrar ONGs ou projetos sociais para participar?",
        Joinhas: 24,
        Criador: { nome: "Maria Silva" },
        Data: "13/02/2026",
        Tags: [{ label: "Voluntariado" }, { label: "Iniciantes" }],
        EmAlta: true,
        NumeroDeComentarios: 12,
    },
    {
        _id: 2,
        UUID: "doacoes-alimentos",
        Titulo: "Melhores práticas para doação de alimentos",
        Descrição: "Trabalho em um restaurante e sempre sobra comida no final do dia. Quais são as melhores formas de doar esses alimentos de maneira segura e legal?",
        Joinhas: 18,
        Criador: { nome: "Carlos Oliveira" },
        Data: "12/02/2026",
        Tags: [{ label: "Doações" }, { label: "Alimentos" }],
        EmAlta: true,
        NumeroDeComentarios: 8,
    },
    {
        _id: 3,
        UUID: "campanha-agasalho-dicas",
        Titulo: "Dicas para organizar uma campanha do agasalho",
        Descrição: "O inverno está chegando e quero organizar uma campanha na minha escola. Quem já fez isso e pode compartilhar como foi a experiência?",
        Joinhas: 15,
        Criador: { nome: "Ana Carolina" },
        Data: "11/02/2026",
        Tags: [{ label: "Campanhas" }, { label: "Organização" }],
        NumeroDeComentarios: 6,
    },
    {
        _id: 4,
        UUID: "ong-financiamento",
        Titulo: "Como conseguir financiamento para uma ONG pequena?",
        Descrição: "Fundamos uma ONG de proteção animal há 6 meses, mas estamos com dificuldade para manter as operações. Alguém conhece editais ou formas de captação de recursos?",
        Joinhas: 31,
        Criador: { nome: "Pedro Santos" },
        Data: "10/02/2026",
        Tags: [{ label: "ONGs" }, { label: "Financiamento" }],
        EmAlta: true,
        NumeroDeComentarios: 15,
    },
    {
        _id: 5,
        UUID: "educacao-comunidades-carentes",
        Titulo: "Projetos de educação em comunidades carentes",
        Descrição: "Sou professor e gostaria de montar um reforço escolar gratuito no meu bairro. Alguém já teve essa experiência? Como vocês conseguiram materiais didáticos?",
        Joinhas: 9,
        Criador: { nome: "Juliana Costa" },
        Data: "09/02/2026",
        Tags: [{ label: "Educação" }, { label: "Voluntariado" }],
        NumeroDeComentarios: 4,
    },
    {
        _id: 6,
        UUID: "meio-ambiente-acoes-locais",
        Titulo: "Ações locais para o meio ambiente",
        Descrição: "Quais ações simples podemos fazer no dia a dia para contribuir com o meio ambiente na nossa comunidade? Vamos trocar ideias!",
        Joinhas: 12,
        Criador: { nome: "Lucas Mendes" },
        Data: "08/02/2026",
        Tags: [{ label: "Meio Ambiente" }, { label: "Sustentabilidade" }],
        NumeroDeComentarios: 7,
    },
    {
        _id: 7,
        UUID: "adocao-responsavel",
        Titulo: "Adoção responsável de animais: como incentivar?",
        Descrição: "Nosso abrigo está lotado e precisamos encontrar lares para muitos animais. Quais estratégias vocês usam para promover adoções responsáveis?",
        Joinhas: 20,
        Criador: { nome: "Fernanda Lima" },
        Data: "07/02/2026",
        Tags: [{ label: "Animais" }, { label: "Adoção" }],
        NumeroDeComentarios: 11,
    },
]

export const mockForunsDetail: Record<string, ForumDetail> = {
    "como-ajudar-comunidade": {
        id: "1",
        titulo: "Como posso ajudar minha comunidade?",
        descricao: "Estou querendo começar a fazer trabalho voluntário na minha cidade, mas não sei por onde começar. Alguém tem dicas de como encontrar ONGs ou projetos sociais para participar?\n\nJá tentei procurar na internet, mas são muitas opções e fico perdido. Gostaria de algo que eu possa fazer nos finais de semana.",
        criador: { nome: "Maria Silva" },
        data: "13/02/2026",
        tags: [{ label: "Voluntariado" }, { label: "Iniciantes" }],
        karma: 24,
        notFound: false,
        comentarios: [
            { id: 4, autor: { nome: "Fernanda Lima" }, texto: "Se você gosta de animais, procure abrigos na sua região. Eles sempre precisam de ajuda nos finais de semana para banho, passeios etc.", data: "13/02/2026", karma: 6, vote: null },
            { id: 3, autor: { nome: "Carlos Eduardo" }, texto: "Também passei por isso! O que me ajudou foi conversar com amigos que já faziam voluntariado. Eles me indicaram o Instituto Verde Vida e foi a melhor decisão.", data: "13/02/2026", karma: 3, vote: null },
            { id: 2, autor: { nome: "Ana Beatriz" }, texto: "Uma dica: comece por ações pontuais, como campanhas de doação. Assim você conhece pessoas e vai se envolvendo aos poucos.", data: "13/02/2026", karma: 5, vote: null },
            { id: 1, autor: { nome: "João Pedro" }, texto: "Recomendo procurar no site da Causa Solidária mesmo! Tem várias ONGs cadastradas. Eu comecei assim e hoje sou voluntário fixo em duas.", data: "13/02/2026", karma: 8, vote: null },
        ],
    },
    "doacoes-alimentos": {
        id: "2",
        titulo: "Melhores práticas para doação de alimentos",
        descricao: "Trabalho em um restaurante e sempre sobra comida no final do dia. Quais são as melhores formas de doar esses alimentos de maneira segura e legal?\n\nSei que existe uma lei sobre isso, mas não conheço os detalhes. Alguém pode me orientar?",
        criador: { nome: "Carlos Oliveira" },
        data: "12/02/2026",
        tags: [{ label: "Doações" }, { label: "Alimentos" }],
        karma: 18,
        notFound: false,
        comentarios: [
            { id: 3, autor: { nome: "Camila Santos" }, texto: "No nosso restaurante, a gente separa as marmitas no final do expediente e um voluntário busca. Funciona muito bem!", data: "12/02/2026", karma: 4, vote: null },
            { id: 2, autor: { nome: "Roberto Silva" }, texto: "Procure bancos de alimentos na sua cidade. Eles fazem a ponte entre restaurantes e quem precisa, de forma organizada.", data: "12/02/2026", karma: 7, vote: null },
            { id: 1, autor: { nome: "Laura Mendes" }, texto: "Existe a Lei do Bom Samaritano (Lei 14.016/2020) que protege quem doa alimentos de boa-fé. Vale a pena pesquisar!", data: "12/02/2026", karma: 12, vote: null },
        ],
    },
}

export const mockForumDefault: ForumDetail = {
    id: "default",
    titulo: "Tópico do Fórum",
    descricao: "Este é um tópico de discussão da comunidade Causa Solidária. Participe da conversa e compartilhe suas experiências!",
    criador: { nome: "Usuário" },
    data: "14/02/2026",
    tags: [{ label: "Geral" }],
    karma: 5,
    notFound: false,
    comentarios: [
        { id: 1, autor: { nome: "Voluntário" }, texto: "Ótimo tópico! Vamos discutir mais sobre isso.", data: "14/02/2026", karma: 2, vote: null },
    ],
}

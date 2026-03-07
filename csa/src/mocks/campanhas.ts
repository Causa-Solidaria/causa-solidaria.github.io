export type Campanha = {
    id: string | number
    titulo: string
    descricao?: string | null
    foto?: string | null
    nivelAjuda?: string | number
    cidade?: string
    estado?: string
    endDate?: string
    meta?: number
    metaTipo?: "dinheiro" | "item"
    metaItem?: string
}

export type CampanhaDetail = {
    id: string
    titulo: string
    descricao?: string
    nivelAjuda: string | number
    cep: string
    cidade: string
    estado: string
    bairro: string
    rua: string
    numero: string
    foto: string
    createdAt: string
    endDate: string
    notFound: boolean
    meta: number
    metaTipo: "dinheiro" | "item"
    metaItem?: string
    arrecadado?: number
    telefone?: string
    email?: string
    galeria?: string[]
}

export const mockCampanhas: Campanha[] = [
    {
        id: "mock-001",
        titulo: "Doação de Alimentos",
        descricao: "Campanha para arrecadar alimentos não perecíveis para famílias em situação de vulnerabilidade social na região metropolitana.",
        foto: null,
        nivelAjuda: 4,
        cidade: "São Paulo",
        estado: "SP",
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        meta: 12000,
        metaTipo: "dinheiro",
    },
    {
        id: "mock-002",
        titulo: "Agasalho Solidário 2026",
        descricao: "Arrecadação de roupas de inverno para comunidades carentes. Doe cobertores, casacos e roupas em bom estado.",
        foto: null,
        nivelAjuda: 5,
        cidade: "Curitiba",
        estado: "PR",
        endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
        meta: 18000,
        metaTipo: "dinheiro",
    },
    {
        id: "mock-003",
        titulo: "Educação para Todos",
        descricao: "Coleta de materiais escolares e livros para crianças de escolas públicas que não possuem recursos básicos.",
        foto: null,
        nivelAjuda: 3,
        cidade: "Rio de Janeiro",
        estado: "RJ",
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        meta: 600,
        metaTipo: "item",
        metaItem: "kits escolares",
    },
    {
        id: "mock-004",
        titulo: "Ração Animal",
        descricao: "Ajude a alimentar animais abandonados! Estamos coletando ração para abrigos e protetores independentes.",
        foto: null,
        nivelAjuda: 3,
        cidade: "Belo Horizonte",
        estado: "MG",
        endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
        meta: 1200,
        metaTipo: "item",
        metaItem: "kg de ração",
    },
    {
        id: "mock-005",
        titulo: "Reconstrução Pós-Enchente",
        descricao: "Campanha de apoio às vítimas das enchentes. Precisamos de materiais de construção, limpeza e itens básicos.",
        foto: null,
        nivelAjuda: 5,
        cidade: "Porto Alegre",
        estado: "RS",
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        meta: 26000,
        metaTipo: "dinheiro",
    },
    {
        id: "mock-006",
        titulo: "Brinquedos para o Dia das Crianças",
        descricao: "Doe brinquedos novos ou usados em bom estado para alegrar o dia de crianças em comunidades carentes.",
        foto: null,
        nivelAjuda: 2,
        cidade: "Salvador",
        estado: "BA",
        endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        meta: 300,
        metaTipo: "item",
        metaItem: "brinquedos",
    },
]

export const mockCampanhaDetail: CampanhaDetail = {
    id: "test-001",
    titulo: "Doe agasalho para quem precisa",
    descricao: "Ajude a aquecer famílias nesse inverno",
    nivelAjuda: 3,
    cep: "59000-000",
    cidade: "Natal",
    estado: "RN",
    bairro: "Centro",
    rua: "Rua Exemplo",
    numero: "123",
    foto: "",
    createdAt: new Date().toISOString(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    notFound: false,
    meta: 5000,
    metaTipo: "dinheiro",
    arrecadado: 3250,
    telefone: "(84) 9 1234-5678",
    email: "acao.solidaria@gmail.com",
    galeria: [],
}

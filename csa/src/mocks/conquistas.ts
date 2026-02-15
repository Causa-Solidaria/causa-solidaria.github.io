export interface Conquista {
    id: string
    titulo: string
    descricao: string
    icone: string
    badgeColor: string
    pontos: number
    conquistada: boolean
}

export const mockConquistas: Conquista[] = [
    {
        id: "1",
        titulo: "Corrente do Bem",
        descricao: "Criar uma rede de ações que se multiplica",
        icone: "🔗",
        badgeColor: "#2e7d32",
        pontos: 20,
        conquistada: true,
    },
    {
        id: "2",
        titulo: "Coração Generoso",
        descricao: "Realizou sua primeira doação financeira",
        icone: "❤️",
        badgeColor: "#7b1fa2",
        pontos: 20,
        conquistada: true,
    },
    {
        id: "3",
        titulo: "Mão Amiga",
        descricao: "Entregou 2 kits de alimentos ou roupas a quem precisa",
        icone: "🤝",
        badgeColor: "#e6a817",
        pontos: 20,
        conquistada: true,
    },
    {
        id: "4",
        titulo: "Plante Esperança",
        descricao: "Plante uma árvore ou flor em um espaço comunitário",
        icone: "🌱",
        badgeColor: "#388e3c",
        pontos: 20,
        conquistada: false,
    },
    {
        id: "5",
        titulo: "Conexão do Bem",
        descricao: "Ajudou 5 pessoas através da nossa rede de apoio",
        icone: "🌐",
        badgeColor: "#c62828",
        pontos: 20,
        conquistada: false,
    },
    {
        id: "6",
        titulo: "Herói da Comunidade",
        descricao: "Impactar positivamente mais de 100 pessoas",
        icone: "🦸",
        badgeColor: "#1a237e",
        pontos: 20,
        conquistada: false,
    },
]

export const mockStats = {
    pontosObtidos: 60,
    pontosTotal: 300,
    conquistasObtidas: 3,
    conquistasTotal: 900,
    tempoAtividade: "24 horas",
}

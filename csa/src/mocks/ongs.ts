export interface MockOng {
    id: string
    nome: string
    area: string
    descricao: string
    cidade: string
    uf: string
    email: string
}

export interface OngDetail {
    id: string
    nome: string
    area: string
    descricao: string
    cidade: string
    uf: string
    email: string
    telefone: string
    site?: string
    fundacao: string
    missao: string
    voluntarios: number
    campanhasAtivas: number
    notFound: boolean
}

export const mockOngs: MockOng[] = [
    { id: "1", nome: "Banco de Alimentos", area: "Alimentação", descricao: "Combate à fome e ao desperdício de alimentos, redistribuindo doações para comunidades carentes.", cidade: "São Paulo", uf: "SP", email: "contato@bancodealimentos.org" },
    { id: "2", nome: "Instituto Verde Vida", area: "Meio Ambiente", descricao: "Reflorestamento e educação ambiental em áreas urbanas e periféricas.", cidade: "São Paulo", uf: "SP", email: "contato@verdevida.org" },
    { id: "3", nome: "Amigos de Patas", area: "Animais", descricao: "Resgate, reabilitação e adoção responsável de animais abandonados.", cidade: "Belo Horizonte", uf: "MG", email: "adote@amigosdepatas.org" },
    { id: "4", nome: "Educar para Transformar", area: "Educação", descricao: "Reforço escolar e acesso à tecnologia para crianças de comunidades vulneráveis.", cidade: "Rio de Janeiro", uf: "RJ", email: "contato@educarparatransformar.org" },
    { id: "5", nome: "Abrigo Esperança", area: "Assistência Social", descricao: "Acolhimento e reinserção social de pessoas em situação de rua.", cidade: "Curitiba", uf: "PR", email: "contato@abrigoesperanca.org" },
]

export const mockOngsDetail: Record<string, OngDetail> = {
    "1": {
        id: "1",
        nome: "Banco de Alimentos",
        area: "Alimentação",
        descricao: "O Banco de Alimentos é uma organização dedicada ao combate à fome e ao desperdício de alimentos. Atuamos coletando doações de alimentos in natura e industrializados, redistribuindo para comunidades em situação de vulnerabilidade alimentar.\n\nNosso trabalho impacta milhares de famílias mensalmente, garantindo acesso a refeições dignas e nutritivas.",
        cidade: "São Paulo",
        uf: "SP",
        email: "contato@bancodealimentos.org",
        telefone: "(11) 3456-7890",
        site: "https://bancodealimentos.org",
        fundacao: "2018",
        missao: "Erradicar a fome e o desperdício de alimentos, conectando doadores a quem mais precisa.",
        voluntarios: 120,
        campanhasAtivas: 3,
        notFound: false,
    },
    "2": {
        id: "2",
        nome: "Instituto Verde Vida",
        area: "Meio Ambiente",
        descricao: "O Instituto Verde Vida atua na preservação ambiental e reflorestamento urbano. Promovemos educação ambiental em escolas, mutirões de plantio e projetos de hortas comunitárias em periferias.\n\nJá plantamos mais de 15.000 árvores e impactamos mais de 200 escolas públicas com nossos programas educacionais.",
        cidade: "São Paulo",
        uf: "SP",
        email: "contato@verdevida.org",
        telefone: "(11) 2345-6789",
        site: "https://verdevida.org",
        fundacao: "2015",
        missao: "Transformar espaços urbanos por meio do reflorestamento e da educação ambiental.",
        voluntarios: 85,
        campanhasAtivas: 2,
        notFound: false,
    },
    "3": {
        id: "3",
        nome: "Amigos de Patas",
        area: "Animais",
        descricao: "A Amigos de Patas é uma ONG dedicada ao resgate, reabilitação e adoção responsável de animais abandonados. Contamos com um abrigo que acolhe cães e gatos em situação de rua, oferecendo cuidados veterinários e carinho.\n\nRealizamos feiras de adoção mensais e campanhas de castração para controle populacional.",
        cidade: "Belo Horizonte",
        uf: "MG",
        email: "adote@amigosdepatas.org",
        telefone: "(31) 9876-5432",
        fundacao: "2020",
        missao: "Garantir que todo animal abandonado tenha uma segunda chance e um lar amoroso.",
        voluntarios: 45,
        campanhasAtivas: 1,
        notFound: false,
    },
    "4": {
        id: "4",
        nome: "Educar para Transformar",
        area: "Educação",
        descricao: "A Educar para Transformar oferece reforço escolar gratuito e acesso à tecnologia para crianças e jovens de comunidades vulneráveis. Nossos espaços de aprendizagem contam com computadores, materiais didáticos e educadores voluntários.\n\nAtendemos mais de 300 alunos semanalmente em nossos 3 núcleos educacionais.",
        cidade: "Rio de Janeiro",
        uf: "RJ",
        email: "contato@educarparatransformar.org",
        telefone: "(21) 3456-1234",
        site: "https://educarparatransformar.org",
        fundacao: "2017",
        missao: "Democratizar o acesso à educação de qualidade e à tecnologia para comunidades vulneráveis.",
        voluntarios: 60,
        campanhasAtivas: 2,
        notFound: false,
    },
    "5": {
        id: "5",
        nome: "Abrigo Esperança",
        area: "Assistência Social",
        descricao: "O Abrigo Esperança acolhe pessoas em situação de rua, oferecendo alimentação, higiene, assistência social e apoio na reinserção no mercado de trabalho.\n\nNosso abrigo tem capacidade para 80 pessoas e funciona 24 horas, oferecendo também acompanhamento psicológico e cursos profissionalizantes.",
        cidade: "Curitiba",
        uf: "PR",
        email: "contato@abrigoesperanca.org",
        telefone: "(41) 3210-5678",
        fundacao: "2016",
        missao: "Restaurar a dignidade e autonomia de pessoas em situação de rua.",
        voluntarios: 35,
        campanhasAtivas: 1,
        notFound: false,
    },
}

export const mockOngDefault: OngDetail = {
    id: "default",
    nome: "ONG",
    area: "Geral",
    descricao: "Esta ONG ainda não possui informações detalhadas.",
    cidade: "",
    uf: "",
    email: "contato@causasolidaria.org",
    telefone: "",
    fundacao: "",
    missao: "",
    voluntarios: 0,
    campanhasAtivas: 0,
    notFound: false,
}

// retirar quando conectar o banco de dados das causas
export interface Causa {
    id: string;
    tabela:{
        title?: string;
        date?: string;
        description?: string;
        priority?: string;
        thumbnail?: string;
        postCode?: string;
    }
}
import prisma from '../prisma';
import { Causa } from 'csa/entities/Causas';

export async function getAllCausas(): Promise<Causa[]> {
  try {
    const causasFromDB = await prisma.causas.findMany();
    
    // Transformar os dados do banco para o formato esperado pelo CausaCard
    return causasFromDB.map(causa => ({
      id: causa.public_id,
      tabela: {
        title: causa.title,
        description: causa.description,
        thumbnail: causa.thumbnail,
        date: causa.createdAt.toLocaleDateString('pt-BR'),
        priority: "3", // valor padrão, pode ser ajustado conforme necessidade
        postCode: "" // valor padrão, pode ser ajustado conforme necessidade
      }
    }));
  } catch (error) {
    console.error('Erro ao buscar causas:', error);
    return [];
  }
}

export async function getCausaById(id: string): Promise<Causa | null> {
  try {
    const causa = await prisma.causas.findFirst({
      where: {
        public_id: id
      }
    });
    
    if (!causa) return null;
    
    return {
      id: causa.public_id,
      tabela: {
        title: causa.title,
        description: causa.description,
        thumbnail: causa.thumbnail,
        date: causa.createdAt.toLocaleDateString('pt-BR'),
        priority: "3", // valor padrão, pode ser ajustado conforme necessidade
        postCode: "" // valor padrão, pode ser ajustado conforme necessidade
      }
    };
  } catch (error) {
    console.error('Erro ao buscar causa por ID:', error);
    return null;
  }
} 
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Limpar a tabela causas
  await prisma.causas.deleteMany({});

  // Inserir dados de exemplo
  const causas = [
    {
      title: 'Campanha de Arrecadação de Alimentos',
      description: 'Estamos arrecadando alimentos não perecíveis para famílias em situação de vulnerabilidade. Sua doação pode alimentar uma família por até uma semana.',
      thumbnail: '/images/food-donation.jpg',
    },
    {
      title: 'Ajuda para Tratamento Médico',
      description: 'João precisa realizar um tratamento médico urgente e não possui recursos financeiros. Sua contribuição pode ajudar a custear as despesas médicas.',
      thumbnail: '/images/medical-help.jpg',
    },
    {
      title: 'Reforma de Escola Comunitária',
      description: 'A escola do bairro Esperança precisa de reformas urgentes para continuar atendendo crianças da comunidade. Ajude-nos a criar um ambiente seguro e adequado para o aprendizado.',
      thumbnail: '/images/school-renovation.jpg',
    }
  ];

  for (const causa of causas) {
    await prisma.causas.create({
      data: causa,
    });
  }

  console.log('Dados de exemplo inseridos com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
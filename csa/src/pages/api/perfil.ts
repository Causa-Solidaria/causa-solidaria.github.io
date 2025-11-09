import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "../../lib/prisma";
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secreto-temporario';

// Estrutura esperada do payload decodificado do JWT.
// Quando chamamos `jwt.verify(...)` esperamos receber um objeto
// contendo informações mínimas que identificam o usuário. Esta
// interface descreve esse contrato para o TypeScript, ajudando
// a garantir que usamos as propriedades corretas depois da
// verificação do token.
//
// Observações:
// - O token é gerado no momento do login e normalmente contém
//   o `id` do usuário (para buscas no banco) e o `email`.
// - Aqui `id` é `number` porque o modelo do Prisma usa `Int`.
// - Se o payload do seu token tiver outros campos (por exemplo
//   `role`, `exp`, etc.), você pode adicioná-los a esta
//   interface conforme necessário.
interface DecodedToken {
  // ID do usuário no banco de dados — usado para buscar o registro
  id: number;

  // Email do usuário — útil para validações adicionais ou logs
  email: string;

  // Se necessário, adicione outros campos do payload aqui, por exemplo:
  // role?: string;
  // exp?: number; // timestamp de expiração (se não estiver usando as helpers do jwt)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    // Pegar o token do cabeçalho Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1]; // Remove o "Bearer " do início
    
    // Verificar e decodificar o token
    const decoded = jwt.verify(token, secret) as DecodedToken;

    // Buscar o usuário no banco de dados com suas campanhas
const user = await prisma.user.findUnique({
  where: {
    id: decoded.id
  },
  select: {
    id: true,
    name: true,
    email: true,
    bio: true,
    foto: true,
    numero: true,
    localizacao: true,
    areasDeInteresse: true,
    genero: true,
    createdAt: true,
    updatedAt: true,
    campanhas: {
      select: {
        id: true,
        titulo: true,
        descricao: true,
        nivelAjuda: true,
        foto: true,
        cidade: true,
        estado: true,
        createdAt: true,
        endDate: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    }
  }   
});


    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    
    console.error('Erro ao buscar perfil:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

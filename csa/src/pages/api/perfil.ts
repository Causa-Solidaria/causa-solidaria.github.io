import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "../../lib/prisma";
import jwt from 'jsonwebtoken';
import { getJwtSecret } from 'csa/lib/JWT';
import { z } from 'zod';

const secret = getJwtSecret()

// Estrutura esperada do payload decodificado do JWT.
interface DecodedToken {
  id: number;
  email: string;
}

const updatePerfilSchema = z.object({
  bio: z.string().optional(),
  foto: z.string().optional(),
  numero: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {

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
    const options = {
      where: {
        id: decoded.id
      }
    }
    const user = await prisma.user.findUnique(options);


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
  } else if (req.method === 'PUT') {
    try {
      // Pegar o token do cabeçalho Authorization
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
      }

      const token = authHeader.split(' ')[1]; // Remove o "Bearer " do início
      
      // Verificar e decodificar o token
      const decoded = jwt.verify(token, secret) as DecodedToken;

      // Validar os dados de entrada
      const data = updatePerfilSchema.parse(req.body);

      // Atualizar o usuário
      const updatedUser = await prisma.user.update({
        where: {
          id: decoded.id
        },
        data: {
          bio: data.bio,
          foto: data.foto,
          numero: data.numero,
        }
      });

      return res.status(200).json(updatedUser);

    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: 'Token inválido' });
      }
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      
      console.error('Erro ao atualizar perfil:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  } else {
    return res.status(405).json({ message: 'Método não permitido' });
  }
}

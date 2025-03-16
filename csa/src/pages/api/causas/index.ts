import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllCausas } from 'csa/lib/services/causasService';
import { Causa } from 'csa/entities/Causas';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Causa[] | { error: string }>
) {
  if (req.method === 'GET') {
    try {
      const causas = await getAllCausas();
      res.status(200).json(causas);
    } catch (error) {
      console.error('Erro na API de causas:', error);
      res.status(500).json({ error: 'Erro ao buscar causas do banco de dados' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Método ${req.method} não permitido` });
  }
} 
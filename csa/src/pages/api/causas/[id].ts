import type { NextApiRequest, NextApiResponse } from 'next';
import { getCausaById } from 'csa/lib/services/causasService';
import { Causa } from 'csa/entities/Causas';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Causa | { error: string } | null>
) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  if (req.method === 'GET') {
    try {
      const causa = await getCausaById(id);
      
      if (!causa) {
        return res.status(404).json({ error: 'Causa não encontrada' });
      }
      
      res.status(200).json(causa);
    } catch (error) {
      console.error('Erro na API de causa por ID:', error);
      res.status(500).json({ error: 'Erro ao buscar causa do banco de dados' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Método ${req.method} não permitido` });
  }
} 
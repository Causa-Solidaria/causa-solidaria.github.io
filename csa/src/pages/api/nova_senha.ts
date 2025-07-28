import { prisma } from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') 
    return res.status(405).json({ message: 'Método não permitido!' });

  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token e nova senha são obrigatórios!' });
  }

  const tokenRecord = await prisma.tokenRedefinicaoSenha.findUnique({
    where: { token },
  });

  if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
    return res.status(400).json({ message: 'Token inválido ou expirado!' });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email: tokenRecord.email },
    data: { senha: hashedPassword },
  });

  await prisma.tokenRedefinicaoSenha.delete({
    where: { token },
  });

  return res.status(200).json({ message: 'Senha redefinida com sucesso!' });
}

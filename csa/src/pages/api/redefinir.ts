import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Metodo nao permitido!' });

    const { email } = req.body;

    if (!email) return res.status(400).json({ error: 'Email é obrigatorio!' });

    const user = await prisma.user.findUnique({
      where: { email },
    });

  if (!user) {
    return res.status(404).json({ message: "Email não encontrado" });
  }

    const token = randomBytes(32).toString('hex');

    const expiresAt = new Date(Date.now() + 3600000); // 1 hora de duraçao ate expirar

    await prisma.tokenRedefinicaoSenha.create({
        data: {
            email,
            token,
            expiresAt,
        },
    });

    const resetLink = `${process.env.NEXT_PUBLIC_URL}/nova_senha?token=${token}`;

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    await transporter.sendMail({
        from: `"Redefinição de Senha" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Redefinição de Senha',
        html: `<p>Você solicitou a redefinição de senha. Clique no link abaixo para redefinir sua senha:</p>
               <a href="${resetLink}">Redefinir Senha</a>
               <p>O link é válido por 1 hora.</p>`,
    });

    return res.status(200).json({ message: 'Email enviado com sucesso!' });
}
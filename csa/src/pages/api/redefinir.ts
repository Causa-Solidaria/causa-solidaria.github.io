import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo nao permitido!' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email é obrigatorio!' });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({ message: 'Email não encontrado' });
  }

  const token = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 3600000); // expira em 1 hora

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

  // 🔍 Verificar conexão SMTP
  try {
    await transporter.verify();
    console.log("✅ Conexão SMTP com Gmail OK");
  } catch (err) {
    console.error("❌ Erro no SMTP:", err);
    return res.status(500).json({ error: "Falha na conexão com servidor SMTP" });
  }

  // 📩 Enviar email
  try {
    await transporter.sendMail({
      from: `"Redefinição de Senha" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Redefinição de Senha',
      html: `
        <p>Você solicitou a redefinição de senha.</p>
        <p>Clique no link abaixo para redefinir sua senha:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>O link é válido por 1 hora.</p>
      `,
    });

    return res.status(200).json({ message: 'Email enviado com sucesso!' });
  } catch (error) {
    console.error("❌ Erro ao enviar email:", error);
    return res.status(500).json({ error: "Falha ao enviar email" });
  }
}

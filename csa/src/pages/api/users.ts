import { PrismaClient } from '@prisma/client';

const Prisma = new PrismaClient()

export default async function Handler(req, res){
    if (req.method === "GET") {
        try {
          const users = await Prisma.user.findMany();
          res.status(200).json(users);
        } catch(error) {
          res.status(500).json({ error: "Erro ao buscar usuários"});
        }
      } else {
        res.status(405).json({ error: "Método não permitido" });
    }
}
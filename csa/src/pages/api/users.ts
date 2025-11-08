import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const Prisma = new PrismaClient()

/*
  coloquei o NextApiRequest e o NextApiResponse para não ficarem com o tipo Any.
  Qualquer variavel que não tenha tipo especificado, ela ganha o tipo de Any (nada), 
  isso não é aceitavel no eslint pois pode deixas as coisa muito abstrata para quem vai 
  mexer no projeto, pode ser tbm que mexa com a segurança dependendo da variavel. 
  então é aconseiavel colocar os tipos nas variaveis.
*/
export default async function Handler(req: NextApiRequest, res: NextApiResponse){
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
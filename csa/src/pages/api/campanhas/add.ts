import { createRouter } from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
import { prisma } from "csa/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "secreto-temporario";

// Configurações de upload
const uploadDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

function multerMiddleware(req: NextApiRequest, res: NextApiResponse, next: any) {
  return upload.single("foto")(req as any, res as any, next);
}

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(multerMiddleware)
  .post(async (req: any, res) => {
    try {
      // 1. Captura o token JWT do header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token não fornecido" });
      }

      const token = authHeader.split(" ")[1];

      // 2. Decodifica o token
      const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
      const usuarioId = decoded.id;

      // 3. Pega dados do formulário
      const {
        titulo,
        descricao,
        nivelAjuda,
        cep,
        cidade,
        estado,
        bairro,
        rua,
        numero,
      } = req.body;

      const foto = req.file ? `/uploads/${req.file.filename}` : "";

      // 4. Cria a campanha vinculada ao usuário autenticado
      const novaCampanha = await prisma.campanha.create({
        data: {
          titulo,
          descricao,
          nivelAjuda,
          cep,
          cidade,
          estado,
          bairro,
          rua,
          numero,
          foto,
          usuarioId,
        },
      });

      return res.status(201).json(novaCampanha);
    } catch (error: any) {
      console.error("Erro:", error);
      return res.status(500).json({ error: error.message });
    }
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default router.handler({
  onError(err, req, res) {
    console.error(err.stack);
    res.status(500).end("Erro interno.");
  },
});

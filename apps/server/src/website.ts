import { getPrisma } from './database';
import { Router } from "express";
import { Req } from "./types";
import { verifyJWT } from './auth';
import multer from 'multer';
import crypto from 'crypto';
import fs from 'fs';

const router = Router();
const prisma = getPrisma();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'public/uploads/';

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const extension = file.originalname.split('.')[1];

        const fileName = crypto.randomBytes(64).toString('hex');

        cb(null, `${fileName}.${extension}`);
    }
});

const upload = multer({ storage });

const randInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
  

router.get('/get-cards', verifyJWT, async (req: Req, res) => {
    const id = req.user!.id;

    const cards = await prisma.cartao.findMany({
        where: {
            userId: id
        }
    })

    return res.json({ cards });
})

router.post('/generate-card', verifyJWT, async (req: Req, res) => {
    const id = req.user!.id;

    await prisma.cartao.create({
        data: {
            userId: id,
            codigoSeguranca: `${randInt(100, 999)}`,
            fatura: 0,
            limite: randInt(50, 3000),
            numero: `${randInt(1000, 9999)} ${randInt(1000, 9999)} ${randInt(1000, 9999)} ${randInt(1000, 9999)}`,
            validade: `${randInt(1,12)}/${randInt(27,32)}`
        }
    })

    return res.status(201).json({});
})

router.post('/upload-pfp', [verifyJWT, upload.single('file')], async (req: Req, res) => {
    const id = req.user!.id;
    
    const user = await prisma.user.update({
        where: {
            id
        },
        data: {
            picture: req.file?.path.slice(6)
        },
        include: {
            cliente: true,
            conta: true
        }
    })

    return res.status(200).json({ newUser: user })
})

export default { router };
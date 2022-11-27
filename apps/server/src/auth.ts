import { NextFunction, Response, Router } from 'express';
import { getPrisma } from './database';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { Req, UserInfo } from './types';

const router = Router();
const prisma = getPrisma();
const SECRET = 'secret123456bomba';

export const verifyJWT = (req: Req, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ err: 'No token provided' });

    jwt.verify(token.split(' ')[1], SECRET, async (err, decoded) => {
        if (err) return res.status(500).json({ err: 'Failed to authenticate token', meta: err });

        const { id } = decoded as jwt.JwtPayload;

        const user = await prisma.user.findFirst({
            where: {
                id
            },
            include: {
                cliente: true,
                conta: true
            }
        })

        if (!user) return res.status(500).json({ err: 'Failed to find user with decoded id' });

        req.user = user;
        next();
    })
}

router.post('/signup', async (req, res) => {
    const userInfo = req.body as UserInfo;

    try {
        const user = await prisma.user.create({
            data: {
                picture: 'https://protechlighting.com/wp-content/uploads/sites/101/2019/12/profile-placeholder-square.png',
                password: await argon2.hash(userInfo.password),
                firstTime: true,
                email: userInfo.email,
                createdAt: new Date(),
                cliente: {
                    create: {
                        ...userInfo.cliente,
                        nascimento: new Date(userInfo.cliente.nascimento)
                    }
                },
                conta: {
                    create: {
                        ...userInfo.conta
                    }
                }
            },
            include: {
                cliente: true
            }
        });

        return res.json({ user });

    } catch (err: any) {
        return res.status(400).json({ err: err.message });
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body as { email: string, password: string };

    const user = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if (!user) {
        return res.status(404).json({ err: 'User with provided email does not exist' });
    }

    if (!await argon2.verify(user.password, password)) {
        return res.status(401).json({ err: 'Wrong password' });
    }

    const payload = { id: user.id };

    const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });

    return res.json({ token });
})

router.get('/me', verifyJWT, (req: Req, res) => {
    return res.json({ user: req.user });
})

export default { router };
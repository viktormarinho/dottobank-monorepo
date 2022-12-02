import { Router } from "express";
import { verifyJWT } from "./auth";
import { Req } from "./types";
import { getPrisma } from "./database";

const router = Router();
const prisma = getPrisma();

router.post('/deposit', verifyJWT, async (req: Req, res) => {
    const { value, contaId } = req.body;

    await prisma.conta.update({
        where: {
            id: contaId
        }, 
        data: {
            saldo: {
                increment: value
            }
        }
    })

    return res.status(200).json({ msg: 'Depósito efetuado com sucesso' });
})

router.post('/pix', verifyJWT, async (req: Req, res) => {
    const { value, to } = req.body;
    
    if (req.user!.conta.saldo < value) {
        return res.status(400).json({ err: 'Saldo insuficiente' })
    }

    const recebedor = await prisma.user.findFirst({
        where: {
            conta: {
                dotto_id: to
            }
        }
    });

    if (!recebedor) {
        return res.status(404).json({ err: 'Usuário com o dotto id enviado não existe' })
    }

    await prisma.transferencia.create({
        data: {
            pagadorId: req.user!.id,
            recebedorId: recebedor.id,
            valor: value
        }
    });

    await prisma.user.update({
        where: {
            id: req.user?.id
        },
        data: {
            conta: {
                update: {
                    saldo: {
                        decrement: value
                    }
                }
            }
        }
    })

    await prisma.user.update({
        where: {
            id: recebedor.id
        },
        data: {
            conta: {
                update: {
                    saldo: {
                        increment: value
                    }
                }
            }
        }
    })

    return res.status(200).json({ msg: 'Pix enviado com sucesso' });
})

router.get('/emprestimos', verifyJWT, async (req: Req, res) => {
    const emprestimos = await prisma.emprestimo.findMany({
        where: {
            userId: req.user!.id
        }
    });

    return res.status(200).json({ emprestimos });
})

const randInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

router.post('/emprestimo', verifyJWT, async (req: Req, res) => {
    const value = req.body.value;
    const randomStatus = randInt(1, 3);

    const emprestimo = await prisma.emprestimo.create({
        data: {
            valor: value,
            userId: req.user!.id,
            status: (
                randomStatus === 1 ? 'Aprovado' : 'Em análise'
            )
        }
    })

    return res.status(200).json({ msg: 'Empréstimo requerido com sucesso.', emprestimo })
})

router.post('/transferencia', verifyJWT, async (req: Req, res) => {
    const { value, to } = req.body;
    const taxa = value / 10;
    
    if (req.user!.conta.saldo < value + taxa) {
        return res.status(400).json({ err: 'Saldo insuficiente' })
    }

    const recebedor = await prisma.user.findFirst({
        where: {
            conta: {
                dotto_id: to
            }
        }
    });

    if (!recebedor) {
        return res.status(404).json({ err: 'Usuário com o dotto id enviado não existe' })
    }

    await prisma.transferencia.create({
        data: {
            pagadorId: req.user!.id,
            recebedorId: recebedor.id,
            valor: value
        }
    });

    await prisma.user.update({
        where: {
            id: req.user?.id
        },
        data: {
            conta: {
                update: {
                    saldo: {
                        decrement: value + taxa
                    }
                }
            }
        }
    })

    await prisma.user.update({
        where: {
            id: recebedor.id
        },
        data: {
            conta: {
                update: {
                    saldo: {
                        increment: value
                    }
                }
            }
        }
    })

    return res.status(200).json({ msg: 'Transferência enviada com sucesso', taxa });
})

export default { router };
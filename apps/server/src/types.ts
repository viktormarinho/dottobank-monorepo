import { Request } from "express"

export interface UserInfo {
    id: string
    email: string
    password: string
    cliente: {
        username: string
        cpf: string
        sexo: string
        nascimento: string | Date
        telefone: string
    }
    conta: {
        dotto_id: string
        tipo: string
        saldo: number
    }
}

export interface Req extends Request {
    user?: UserInfo
}
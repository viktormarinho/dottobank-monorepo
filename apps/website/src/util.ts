
export const getAuthHeaders = () => {
    return { 'authorization': 'Bearer ' + localStorage.getItem('token') }
}

export const getAuthBearer = () => {
    return 'Bearer ' + localStorage.getItem('token')
}

export interface UserInfo {
    id: string
    email: string
    password: string
    hasPicture: boolean
    picture: string
    cliente: {
        id?: string
        username: string
        cpf: string
        sexo: string
        nascimento: string | Date
        telefone: string
    }
    conta: {
        id?: string
        dotto_id: string
        tipo: string
        saldo: number
    }
}
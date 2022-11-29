
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
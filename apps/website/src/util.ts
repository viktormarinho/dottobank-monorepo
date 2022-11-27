
export const getAuthHeaders = () => {
    return { 'authorization': 'Bearer ' + localStorage.getItem('token') }
}

export const getAuthBearer = () => {
    return 'Bearer ' + localStorage.getItem('token')
}
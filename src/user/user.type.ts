export interface Guide {
    id: number
    title: string
    summary: string
    author: string
    rating: number
}

export interface User {
    id: number
    email: string
    role: string
    iat: number
}
export interface Formation {
    id: number
    nom: string
    date: string
    intervenants: string
    guides: number[]
}

export interface FormationInput {
    id: number
    nom: string
    date: string
    intervenants: string
}

export interface FormationJoin {
    id: number
    motivation: string
}
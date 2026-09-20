export const PROJECT_TYPES = ['microfonia', 'cuadro-electrico', 'racks'] as const

export type ProjectType = (typeof PROJECT_TYPES)[number]

export interface Project {
    id: string
    name: string
    lastEditedAt: Date
}
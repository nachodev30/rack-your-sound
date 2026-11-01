export type ComponentColor = 'Plata' | 'Negro'

export type ComponentPlacement = 
    | 'corners'
    | 'side-faces'
    | 'aluminum-profile'
    | 'bottom-face'
    | 'top-face'
    | 'front-or-back'

export interface ComponentCatalogItem {
    id: number
    family: string
    name: string
    color: ComponentColor | null
    widthMm: number
    heightMm: number
    depthMm: number | null
    weightGrams: number
    material: string
    protrusionNote: string | null
    holeDiameterMm: number | null
    holeCount: number | null
    photoUrl: string
    placement: ComponentPlacement
    minPerFlightcase: number
    maxPerFlightcase: number
    rackUnits?: number
}

export interface SelectedComponent {
    quantity: number
    color: ComponentColor | null
}

export type ComponentsSelection = Record<string, SelectedComponent>
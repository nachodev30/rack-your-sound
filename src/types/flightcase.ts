export interface FlightcaseSize {
    id: string
    label: string
    units: number
    width: number
    height: number
    depth: number
}

export interface FlightcaseDimensions {
    width: number
    height: number
    depth: number
}

export interface FlightcaseComponents {
    ballCorner: number
    lidStayWithHinge: number
    rackStrip: number
    handles: number
    butterflyLatches: number
    wheels: boolean
    rubberFeet: boolean
    slidingTray: boolean
}
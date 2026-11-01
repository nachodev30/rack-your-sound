import type { ComponentsSelection } from '../types/component'
import type { FlightcaseDimensions } from '../types/flightcase'
import { getCatalogItem } from './catalog'

const PANEL_DENSITY_KG_PER_M2 = 10.7

// Estimado: el catálogo no incluye datos de los paneles de la carcasa.
export function calculateShellWeightKg(dimensions: FlightcaseDimensions) {
    const widthM = dimensions.width / 1000
    const heightM = dimensions.height / 1000
    const depthM = dimensions.depth / 1000

    const surfaceAreaM2 = 2 * (widthM * heightM + widthM * depthM + heightM * depthM)
    return surfaceAreaM2 * PANEL_DENSITY_KG_PER_M2
}

// Exacto: peso real del catálogo × cantidad de cada familia incluida.
export function calculateHardwareWeightKg(components: ComponentsSelection, rackUnits: number) {
    let totalGrams = 0

    for (const [family, selected] of Object.entries(components)) {
        if (selected.quantity <= 0) continue

        const item = getCatalogItem(family, selected.color, rackUnits)
        if (!item) continue

        totalGrams += item.weightGrams * selected.quantity
    }

    return totalGrams / 1000
}

export function calculateFlightcaseWeight(
    dimensions: FlightcaseDimensions,
    components: ComponentsSelection,
    rackUnits: number,
) {
    return calculateShellWeightKg(dimensions) + calculateHardwareWeightKg(components, rackUnits)
}
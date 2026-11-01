import { COMPONENTS_CATALOG } from '../data/componentsCatalog'
import type { ComponentCatalogItem, ComponentColor } from '../types/component'

const FAMILY_LABELS: Record<string, string> = {
    'ball-corner': 'Ball Corner',
    'side-handle': 'Asas de agarre',
    'corner-bar-handle': 'Corner bar handles',
    'butterfly-latch': 'Cierres de mariposa',
    'lid-stay': 'Soportes de tapa',
    hinge: 'Bisagras',
    'rack-rail': 'Rail de Rack',
    sign: 'Cartel',
    wheel: 'Ruedas',
    'rubber-foot': 'Patas de goma',
}

export function getFamilyLabel(family: string) {
    return FAMILY_LABELS[family] ?? family
}

export function getAllFamilies(): string[] {
    const inCatalog = Array.from(new Set(COMPONENTS_CATALOG.map((item) => item.family)))
    const labelOrder = Object.keys(FAMILY_LABELS)

    const ordered = labelOrder.filter((family) => inCatalog.includes(family))
    const unlabelled = inCatalog.filter((family) => !labelOrder.includes(family))
    
    return [...ordered, ...unlabelled]
}

export function getFamilyItems(family: string): ComponentCatalogItem[] {
    return COMPONENTS_CATALOG.filter((item) => item.family === family)
}

export function getFamilyColors(family: string): ComponentColor[] {
    const colors = getFamilyItems(family)
    .map((item) => item.color)
    .filter((color): color is ComponentColor => color !== null)

    return Array.from(new Set(colors))
}

export function getCatalogItem(
    family: string,
    color: ComponentColor | null,
    rackUnits: number,
): ComponentCatalogItem | undefined {
    const items = getFamilyItems(family)

    if (family === 'rack-rail') {
    return items.find((item) => item.rackUnits === rackUnits)
}

    return items.find((item) => item.color === color)
}
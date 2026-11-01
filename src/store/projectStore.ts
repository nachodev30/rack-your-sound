import { create } from 'zustand'
import type { ComponentColor, ComponentsSelection } from '../types/component'
import type { FlightcaseDimensions, FlightcaseSize } from '../types/flightcase'
import type { ProjectType } from '../types/project'
import { getAllFamilies, getFamilyColors, getFamilyItems } from '../utils/catalog'

// Familias que vienen incluidas (a su cantidad mínima) al elegir un tamaño estándar.
const DEFAULT_INCLUDED_FAMILIES = [
    'ball-corner',
    'side-handle',
    'butterfly-latch',
    'lid-stay',
    'hinge',
    'rack-rail',
    'wheel',
]

function buildComponents(includedFamilies: string[]): ComponentsSelection {
    const selection: ComponentsSelection = {}

    for (const family of getAllFamilies()) {
        const [firstItem] = getFamilyItems(family)
        const colors = getFamilyColors(family)

        selection[family] = {
            quantity: includedFamilies.includes(family) ? firstItem.minPerFlightcase : 0,
            color: colors.length > 0 ? colors[0] : null,
        }
    }

    return selection
}

interface ProjectState {
    name: string
    type: ProjectType | null
    flightcaseSizeId: string | null
    dimensions: FlightcaseDimensions
    rackUnits: number
    components: ComponentsSelection
    setBasicInfo: (info: { name: string; type: ProjectType }) => void
    selectStandardSize: (size: FlightcaseSize) => void
    selectCustomSize: () => void
    setDimensions: (dimensions: Partial<FlightcaseDimensions>) => void
    setRackUnits: (units: number) => void
    setComponentQuantity: (family: string, quantity: number) => void
    setComponentColor: (family: string, color: ComponentColor) => void
}

export const useProjectStore = create<ProjectState>((set) => ({
    name: '',
    type: null,
    flightcaseSizeId: null,
    dimensions: { width: 0, height: 0, depth: 0 },
    rackUnits: 12,
    components: buildComponents(DEFAULT_INCLUDED_FAMILIES),

    setBasicInfo: (info) => set(info),

    selectStandardSize: (size) =>
        set({
            flightcaseSizeId: size.id,
            dimensions: { width: size.width, height: size.height, depth: size.depth },
            rackUnits: size.units,
            components: buildComponents(DEFAULT_INCLUDED_FAMILIES),
        }),

    selectCustomSize: () =>
        set({
            flightcaseSizeId: 'custom',
            dimensions: { width: 0, height: 0, depth: 0 },
            rackUnits: 12,
            components: buildComponents([]),
        }),

    setDimensions: (dimensions) =>
        set((state) => ({ dimensions: { ...state.dimensions, ...dimensions } })),

    setRackUnits: (units) => set({ rackUnits: units }),

    setComponentQuantity: (family, quantity) =>
        set((state) => {
            const [firstItem] = getFamilyItems(family)
            if (!firstItem) return {}

            // 0 = no incluido; si se incluye, siempre entre el mínimo y el máximo.
            const clamped =
                quantity <= 0
                    ? 0
                    : Math.min(Math.max(quantity, firstItem.minPerFlightcase), firstItem.maxPerFlightcase)

            return {
                components: {
                    ...state.components,
                    [family]: { ...state.components[family], quantity: clamped },
                },
            }
        }),

    setComponentColor: (family, color) =>
        set((state) => ({
            components: {
                ...state.components,
                [family]: { ...state.components[family], color },
            },
        })),
}))
import { create } from "zustand"
import type { ProjectType } from "../types/project"
import type {
    FlightcaseSize,
    FlightcaseDimensions,
    FlightcaseComponents,
} from "../types/flightcase"

type ComponentCountKey =
    | 'ballCorner'
    | 'lidStayWithHinge'
    | 'rackStrip'
    | 'handles'
    | 'butterflyLatches'

type ComponentFlagKey = 'wheels' | 'rubberFeet' | 'slidingTray'

const DEFAULT_COMPONENTS: FlightcaseComponents = {
    ballCorner: 0,
    lidStayWithHinge: 0,
    rackStrip: 0,
    handles: 0,
    butterflyLatches: 0,
    wheels: false,
    rubberFeet: false,
    slidingTray: false,
}

const EMPTY_COMPONENTS: FlightcaseComponents = {
    ballCorner: 0,
    lidStayWithHinge: 0,
    rackStrip: 0,
    handles: 0,
    butterflyLatches: 0,
    wheels: false,
    rubberFeet: false,
    slidingTray: false,
}

interface ProjectState {
    name: string
    type: ProjectType | null
    flightcaseSizeId: string | null
    dimensions: FlightcaseDimensions
    rackUnits: number
    rackStripType: string
    components: FlightcaseComponents
    setBasicInfo: (info: { name: string; type: ProjectType }) => void
    selectStandardSize: (size: FlightcaseSize) => void
    selectCustomSize: () => void
    setDimensions: (dimensions: Partial<FlightcaseDimensions>) => void
    setRackUnits: (units: number) => void
    setRackStripType: (type: string) => void
    setComponentCount: (key: ComponentCountKey, value: number) => void
    setComponentFlag: (key: ComponentFlagKey, value: boolean) => void
}

export const useProjectStore = create<ProjectState>((set) => ({
    name: '',
    type: null,
    flightcaseSizeId: null,
    dimensions: { width: 0, height: 0, depth: 0 },
    rackUnits: 12,
    rackStripType: 'cuadrada',
    components: { ...DEFAULT_COMPONENTS },

    setBasicInfo: (info) => set(info),

    selectStandardSize: (size) =>
        set({
            flightcaseSizeId: size.id,
            dimensions: { width: size.width, height: size.height, depth: size.depth },
            rackUnits: size.units,
            rackStripType: 'cuadrada',
            components: { ...DEFAULT_COMPONENTS },
        }),

    selectCustomSize: () =>
        set({
            flightcaseSizeId: 'custom',
            dimensions: { width: 0, height: 0, depth: 0 },
            rackUnits: 12,
            rackStripType: 'cuadrada',
            components: { ...EMPTY_COMPONENTS },
        }),

    setDimensions: (dimensions) =>
        set((state) => ({ dimensions: { ...state.dimensions, ...dimensions } })),

    setRackUnits: (units) => set({ rackUnits: units }),

    setRackStripType: (type) => set({ rackStripType: type }),

    setComponentCount: (key, value) =>
        set((state) => ({
            components: { ...state.components, [key]: Math.max(0, value) },
        })),

    setComponentFlag: (key, value) =>
        set((state) => ({ components: { ...state.components, [key]: value } })),
}))
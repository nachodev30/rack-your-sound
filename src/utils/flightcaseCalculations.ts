import type { FlightcaseComponents, FlightcaseDimensions } from "../types/flightcase";

const PANEL_DENSITY_KG_PER_M2 = 10.2

const COMPONENT_UNIT_WEIGHTS = {
    ballCorner: 0.15,
    lidStayWithHinge: 0.3,
    rackStrip: 0.4,
    handles: 0.25,
    butterflyLatches: 0.2,
}

const WHEELS_WEIGHT = 1.6
const RUBBER_FEET_WEIGHT = 0.2
const SLIDING_TRAY_WEIGHT = 1.5

export function calculateFlightcaseWeight(
    dimensions: FlightcaseDimensions,
    components: FlightcaseComponents,
) {
    const widthM = dimensions.width / 1000
    const heightM = dimensions.height / 1000
    const depthM = dimensions.depth / 1000

    const surfaceAreaM2 = 2 * (widthM * heightM + widthM * depthM + heightM * depthM)
    const shellWeight = surfaceAreaM2 * PANEL_DENSITY_KG_PER_M2

    const componentsWeight =
        components.ballCorner * COMPONENT_UNIT_WEIGHTS.ballCorner +
        components.lidStayWithHinge * COMPONENT_UNIT_WEIGHTS.lidStayWithHinge +
        components.rackStrip * COMPONENT_UNIT_WEIGHTS.rackStrip +
        components.handles * COMPONENT_UNIT_WEIGHTS.handles +
        components.butterflyLatches * COMPONENT_UNIT_WEIGHTS.butterflyLatches +
        (components.wheels ? WHEELS_WEIGHT : 0) +
        (components.rubberFeet ? RUBBER_FEET_WEIGHT : 0) +
        (components.slidingTray ? SLIDING_TRAY_WEIGHT : 0)

    return shellWeight + componentsWeight
}
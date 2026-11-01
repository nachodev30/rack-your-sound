import type { ComponentCatalogItem, ComponentsSelection } from '../types/component'
import type { FlightcaseDimensions } from '../types/flightcase'
import { getCatalogItem } from './catalog'
import { distributeAlongAxis } from './distributePoints'

export type Face = 'front' | 'back' | 'left' | 'right'
type Point = [number, number, number]

export interface PlacedComponent {
    key: string
    family: string
    item: ComponentCatalogItem
    // Punto de anclaje en mm, con el flightcase centrado en el origen (y hacia arriba).
    position: Point
    // Giro sobre el eje Y (radianes) para que el eje local +z apunte hacia fuera de la cara.
    rotationY: number
    // Longitud disponible de la cara donde va pegada (null si no va sobre una cara).
    faceLengthMm: number | null
}

const FACE_ANGLE: Record<Face, number> = {
    front: 0,
    back: Math.PI,
    right: Math.PI / 2,
    left: -Math.PI / 2,
}

// Altura de cada pieza sobre la cara, como fracción de la altura total (0 = centro).
const LID_STAY_HEIGHT = 0.2
const LATCH_HEIGHT = 0.32
const HINGE_HEIGHT = 0.36

function getFaceLength(face: Face, dimensions: FlightcaseDimensions) {
    return face === 'front' || face === 'back' ? dimensions.width : dimensions.depth
}

// Convierte "u mm a lo largo de la cara, a y mm de altura" en un punto del espacio.
function pointOnFace(face: Face, u: number, y: number, dimensions: FlightcaseDimensions): Point {
    const distanceToFace =
        face === 'front' || face === 'back' ? dimensions.depth / 2 : dimensions.width / 2
    const angle = FACE_ANGLE[face]

    return [
        u * Math.cos(angle) + distanceToFace * Math.sin(angle),
        y,
        -u * Math.sin(angle) + distanceToFace * Math.cos(angle),
    ]
}

// Ball Corner: en las esquinas, las 4 de arriba primero y luego las 4 de abajo.
function placeAtCorners(
    family: string,
    item: ComponentCatalogItem,
    quantity: number,
    dimensions: FlightcaseDimensions,
): PlacedComponent[] {
    const hw = dimensions.width / 2
    const hh = dimensions.height / 2
    const hd = dimensions.depth / 2

    const corners: Point[] = [
        [-hw, hh, hd],
        [hw, hh, hd],
        [hw, hh, -hd],
        [-hw, hh, -hd],
        [-hw, -hh, hd],
        [hw, -hh, hd],
        [hw, -hh, -hd],
        [-hw, -hh, -hd],
    ]

    return corners.slice(0, quantity).map(
        (position, index): PlacedComponent => ({
            key: `${family}-${index}`,
            family,
            item,
            position,
            rotationY: 0,
            faceLengthMm: null,
        }),
    )
}

// Ruedas y Patas de goma: hasta 4, en las esquinas de la cara inferior.
function placeAtBottomCorners(
    family: string,
    item: ComponentCatalogItem,
    quantity: number,
    dimensions: FlightcaseDimensions,
): PlacedComponent[] {
    const inset = Math.max(item.widthMm, item.depthMm ?? item.widthMm) / 2
    const x = dimensions.width / 2 - inset
    const z = dimensions.depth / 2 - inset
    const y = -dimensions.height / 2

    const slots: Point[] = [
        [-x, y, z],
        [x, y, z],
        [x, y, -z],
        [-x, y, -z],
    ]

    return slots.slice(0, quantity).map(
        (position, index): PlacedComponent => ({
            key: `${family}-${index}`,
            family,
            item,
            position,
            rotationY: 0,
            faceLengthMm: null,
        }),
    )
}

// Piezas pegadas a las caras laterales. La pieza i va a faceOrder[i] y,
// si hay más piezas que caras, se da la vuelta al orden y se reparten por la cara.
function placeOnFaces(
    family: string,
    item: ComponentCatalogItem,
    quantity: number,
    faceOrder: Face[],
    y: number,
    dimensions: FlightcaseDimensions,
): PlacedComponent[] {
    const assignedFaces = Array.from({ length: quantity }, (_, i) => faceOrder[i % faceOrder.length])
    const placed: PlacedComponent[] = []

    for (const face of faceOrder) {
        const count = assignedFaces.filter((assigned) => assigned === face).length
        const length = getFaceLength(face, dimensions)
        const offsets = distributeAlongAxis(count, -length * 0.3, length * 0.3)

        offsets.forEach((u, index) => {
            placed.push({
                key: `${family}-${face}-${index}`,
                family,
                item,
                position: pointOnFace(face, u, y, dimensions),
                rotationY: FACE_ANGLE[face],
                faceLengthMm: length,
            })
        })
    }

    return placed
}

// Cartel: solo en la cara superior, repartido por su eje más largo.
function placeOnTop(
    family: string,
    item: ComponentCatalogItem,
    quantity: number,
    dimensions: FlightcaseDimensions,
): PlacedComponent[] {
    const alongX = dimensions.width >= dimensions.depth
    const length = alongX ? dimensions.width : dimensions.depth
    const offsets = distributeAlongAxis(quantity, -length * 0.3, length * 0.3)

    return offsets.map(
        (offset, index): PlacedComponent => ({
            key: `${family}-${index}`,
            family,
            item,
            position: alongX
                ? [offset, dimensions.height / 2, 0]
                : [0, dimensions.height / 2, offset],
            rotationY: 0,
            faceLengthMm: null,
        }),
    )
}

// Rail de Rack: por dentro, delante primero (izquierdo y derecho) y luego detrás.
function placeRails(
    family: string,
    item: ComponentCatalogItem,
    quantity: number,
    dimensions: FlightcaseDimensions,
): PlacedComponent[] {
    const x = dimensions.width / 2 - 50
    const z = dimensions.depth / 2 - 60

    const slots: Point[] = [
        [-x, 0, z],
        [x, 0, z],
        [-x, 0, -z],
        [x, 0, -z],
    ]

    return slots.slice(0, quantity).map(
        (position, index): PlacedComponent => ({
            key: `${family}-${index}`,
            family,
            item,
            position,
            rotationY: 0,
            faceLengthMm: null,
        }),
    )
}

export function getPlacedComponents(
    dimensions: FlightcaseDimensions,
    components: ComponentsSelection,
    rackUnits: number,
): PlacedComponent[] {
    if (dimensions.width <= 0 || dimensions.height <= 0 || dimensions.depth <= 0) return []

    // "La cara más larga": la cara lateral de mayor longitud horizontal.
    const longFaces: Face[] =
        dimensions.width >= dimensions.depth ? ['back', 'front'] : ['left', 'right']

    const placed: PlacedComponent[] = []

    for (const [family, selected] of Object.entries(components)) {
        if (selected.quantity <= 0) continue

        const item = getCatalogItem(family, selected.color, rackUnits)
        if (!item) continue

        const quantity = selected.quantity

        switch (family) {
            case 'ball-corner':
                placed.push(...placeAtCorners(family, item, quantity, dimensions))
                break
            case 'wheel':
            case 'rubber-foot':
                placed.push(...placeAtBottomCorners(family, item, quantity, dimensions))
                break
            case 'side-handle':
                placed.push(
                    ...placeOnFaces(family, item, quantity, ['left', 'right', 'front', 'back'], 0, dimensions),
                )
                break
            case 'butterfly-latch':
                placed.push(
                    ...placeOnFaces(
                        family,
                        item,
                        quantity,
                        ['front', 'back', 'left', 'right'],
                        dimensions.height * LATCH_HEIGHT,
                        dimensions,
                    ),
                )
                break
            case 'lid-stay':
                placed.push(
                    ...placeOnFaces(
                        family,
                        item,
                        quantity,
                        longFaces,
                        dimensions.height * LID_STAY_HEIGHT,
                        dimensions,
                    ),
                )
                break
            case 'hinge':
                placed.push(
                    ...placeOnFaces(
                        family,
                        item,
                        quantity,
                        longFaces,
                        dimensions.height * HINGE_HEIGHT,
                        dimensions,
                    ),
                )
                break
            case 'corner-bar-handle':
                // Perfil de aluminio superior: pegada justo bajo el borde de arriba.
                placed.push(
                    ...placeOnFaces(
                        family,
                        item,
                        quantity,
                        ['left', 'right'],
                        dimensions.height / 2 - item.heightMm / 2,
                        dimensions,
                    ),
                )
                break
            case 'sign':
                placed.push(...placeOnTop(family, item, quantity, dimensions))
                break
            case 'rack-rail':
                placed.push(...placeRails(family, item, quantity, dimensions))
                break
        }
    }

    return placed
}
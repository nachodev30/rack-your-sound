import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useProjectStore } from '../store/projectStore'
import type { ComponentCatalogItem } from '../types/component'
import { getCatalogItem } from '../utils/catalog'
import { getPlacedComponents } from '../utils/placement'
import type { PlacedComponent } from '../utils/placement'

// Three.js trabaja en metros; el resto de la app, en mm.
const MM = 0.001

// 1 = carcasa opaca. Más bajo deja ver lo que va por dentro (los rails).
const SHELL_OPACITY = 0.8

function getMaterial(item: ComponentCatalogItem) {
    if (item.color === 'Plata') return { color: '#d4d4d8', metalness: 0.85, roughness: 0.3 }
    if (item.color === 'Negro') return { color: '#18181b', metalness: 0.6, roughness: 0.45 }
    if (item.family === 'sign') return { color: '#fafafa', metalness: 0, roughness: 0.8 }
    if (item.family === 'rack-rail') return { color: '#3f3f46', metalness: 0.6, roughness: 0.5 }
    return { color: '#27272a', metalness: 0.3, roughness: 0.7 }
}

function PieceMesh({ placed }: { placed: PlacedComponent }) {
    const { item, family, position, rotationY } = placed
    const origin: [number, number, number] = [position[0] * MM, position[1] * MM, position[2] * MM]
    const material = <meshStandardMaterial {...getMaterial(item)} />

    if (family === 'ball-corner') {
        return (
            <mesh position={origin}>
                <sphereGeometry args={[(item.widthMm / 2) * MM, 16, 16]} />
                {material}
            </mesh>
        )
    }

    if (family === 'rack-rail') {
        return (
            <mesh position={origin}>
                <boxGeometry args={[item.widthMm * MM, item.heightMm * MM, (item.depthMm ?? 30) * MM]} />
                {material}
            </mesh>
        )
    }

    if (family === 'sign') {
        return (
            <mesh position={[origin[0], origin[1] + 1.5 * MM, origin[2]]}>
                <boxGeometry args={[item.widthMm * MM, 3 * MM, item.heightMm * MM]} />
                {material}
            </mesh>
        )
    }

    if (family === 'wheel') {
        return (
            <group position={origin}>
                <mesh position={[0, -4 * MM, 0]}>
                    <boxGeometry args={[item.widthMm * MM, 8 * MM, (item.depthMm ?? 80) * MM]} />
                    {material}
                </mesh>
                <mesh position={[0, -34 * MM, 0]}>
                    <boxGeometry args={[24 * MM, 52 * MM, 24 * MM]} />
                    {material}
                </mesh>
                <mesh position={[0, -(item.heightMm - 50) * MM, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[50 * MM, 50 * MM, 30 * MM, 20]} />
                    <meshStandardMaterial color="#111113" roughness={0.9} />
                </mesh>
            </group>
        )
    }

    if (family === 'rubber-foot') {
        return (
            <mesh position={[origin[0], origin[1] - 5 * MM, origin[2]]}>
                <cylinderGeometry
                    args={[(item.widthMm / 2) * MM, (item.widthMm / 2) * MM, 10 * MM, 16]}
                />
                {material}
            </mesh>
        )
    }

    // El resto de piezas van pegadas a una cara, mirando hacia fuera.
    const faceLength = placed.faceLengthMm ?? item.widthMm
    const width = Math.min(item.widthMm, faceLength - 20)
    const thickness =
        family === 'corner-bar-handle' ? (item.depthMm ?? 55) : Math.min(item.depthMm ?? 10, 25)

    return (
        <group position={origin} rotation={[0, rotationY, 0]}>
            <mesh position={[0, 0, (thickness / 2) * MM]}>
                <boxGeometry args={[width * MM, item.heightMm * MM, thickness * MM]} />
                {material}
            </mesh>
        </group>
    )
}

function FlightcasePreview3D() {
    const dimensions = useProjectStore((state) => state.dimensions)
    const components = useProjectStore((state) => state.components)
    const rackUnits = useProjectStore((state) => state.rackUnits)

    // Sin medidas todavía (p. ej. tras elegir "Personalizado") se dibuja una caja mínima visible.
    const widthM = dimensions.width * MM || 0.1
    const heightM = dimensions.height * MM || 0.1
    const depthM = dimensions.depth * MM || 0.1

    const placedComponents = getPlacedComponents(dimensions, components, rackUnits)

    // El suelo baja si hay ruedas o patas, para que no queden hundidas.
    const hasWheels = (components.wheel?.quantity ?? 0) > 0
    const hasFeet = (components['rubber-foot']?.quantity ?? 0) > 0
    const wheelItem = getCatalogItem('wheel', null, rackUnits)

    let belowCaseMm = 0
    if (hasWheels) belowCaseMm = wheelItem?.heightMm ?? 155
    else if (hasFeet) belowCaseMm = 10

    return (
        <Canvas camera={{ position: [1.4, 1.1, 1.4], fov: 40 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[3, 5, 2]} intensity={1.2} />
            <directionalLight position={[-3, -2, -2]} intensity={0.3} />

            <gridHelper args={[2, 10]} position={[0, -heightM / 2 - belowCaseMm * MM, 0]} />

            <mesh>
                <boxGeometry args={[widthM, heightM, depthM]} />
                <meshStandardMaterial
                    color="#52525b"
                    roughness={0.6}
                    metalness={0.2}
                    transparent
                    opacity={SHELL_OPACITY}
                />
            </mesh>

            {placedComponents.map((placed) => (
                <PieceMesh key={placed.key} placed={placed} />
            ))}

            <OrbitControls enablePan={false} />
        </Canvas>
    )
}

export default FlightcasePreview3D
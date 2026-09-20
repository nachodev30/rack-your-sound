import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useProjectStore } from '../store/projectStore'
import { distributeAlongAxis } from '../utils/distributePoints'

function FlightcasePreview3D() {
    const dimensions = useProjectStore((state) => state.dimensions)
    const components = useProjectStore((state) => state.components)

    const widthM = dimensions.width / 1000 || 0.1
    const heightM = dimensions.height / 1000 || 0.1
    const depthM = dimensions.depth / 1000 || 0.1

    const hw = widthM / 2
    const hh = heightM / 2
    const hd = depthM / 2

    // Las 8 esquinas reales de la caja.
    const corners: [number, number, number][] = [
        [-hw, -hh, -hd],
        [hw, -hh, -hd],
        [-hw, hh, -hd],
        [hw, hh, -hd],
        [-hw, -hh, hd],
        [hw, -hh, hd],
        [-hw, hh, hd],
        [hw, hh, hd],
    ]
    const visibleCorners = corners.slice(0, Math.min(components.ballCorner, 8))

    // Solo las 4 esquinas de abajo, para ruedas y patas de goma.
    const bottomCorners: [number, number, number][] = [
        [-hw, -hh, -hd],
        [hw, -hh, -hd],
        [-hw, -hh, hd],
        [hw, -hh, hd],
    ]

    const hingeXs = distributeAlongAxis(components.lidStayWithHinge, -hw * 0.6, hw * 0.6)
    const latchYs = distributeAlongAxis(components.butterflyLatches, -hh * 0.6, hh * 0.6)
    const handleYs = distributeAlongAxis(components.handles, -hh * 0.5, hh * 0.5)
    const rackStripXs = distributeAlongAxis(components.rackStrip, -hw * 0.8, hw * 0.8)

    return (
        <Canvas camera={{ position: [1.4, 1.1, 1.4], fov: 40 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[3, 5, 2]} intensity={1.2} />
            <directionalLight position={[-3, -2, -2]} intensity={0.3} />

            <gridHelper args={[2, 10]} position={[0, -hh, 0]} />

            {/* Cuerpo del flightcase */}
            <mesh>
                <boxGeometry args={[widthM, heightM, depthM]} />
                <meshStandardMaterial color="#52525b" roughness={0.6} metalness={0.2} />
            </mesh>

            {/* Ball Corner: en las esquinas reales de la caja */}
            {visibleCorners.map((position, i) => (
                <mesh key={`ball-corner-${i}`} position={position}>
                    <sphereGeometry args={[0.025, 12, 12]} />
                    <meshStandardMaterial color="#d4d4d8" metalness={0.8} roughness={0.3} />
                </mesh>
            ))}

            {/* Ruedas: en las 4 esquinas inferiores, solo si está activado */}
            {components.wheels &&
                bottomCorners.map((position, i) => (
                    <mesh key={`wheel-${i}`} position={[position[0], position[1] - 0.03, position[2]]}>
                        <cylinderGeometry args={[0.035, 0.035, 0.04, 16]} />
                        <meshStandardMaterial color="#18181b" roughness={0.8} />
                    </mesh>
                ))}

            {/* Patas de goma: mismas esquinas inferiores, solo si está activado */}
            {components.rubberFeet &&
                bottomCorners.map((position, i) => (
                    <mesh key={`foot-${i}`} position={[position[0], position[1] - 0.01, position[2]]}>
                        <cylinderGeometry args={[0.02, 0.02, 0.02, 12]} />
                        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
                    </mesh>
                ))}

            {/* Lid Stay with Hinge: repartidas por el borde superior trasero */}
            {hingeXs.map((x, i) => (
                <mesh key={`hinge-${i}`} position={[x, hh, -hd]}>
                    <boxGeometry args={[0.04, 0.015, 0.03]} />
                    <meshStandardMaterial color="#a1a1aa" metalness={0.6} roughness={0.4} />
                </mesh>
            ))}

            {/* Cierres mariposa: repartidos por el borde vertical delantero derecho */}
            {latchYs.map((y, i) => (
                <mesh key={`latch-${i}`} position={[hw, y, hd]}>
                    <boxGeometry args={[0.03, 0.03, 0.02]} />
                    <meshStandardMaterial color="#a1a1aa" metalness={0.6} roughness={0.4} />
                </mesh>
            ))}

            {/* Asas de agarre: repartidas por el lateral izquierdo */}
            {handleYs.map((y, i) => (
                <mesh key={`handle-${i}`} position={[-hw, y, 0]}>
                    <boxGeometry args={[0.015, 0.04, 0.08]} />
                    <meshStandardMaterial color="#3f3f46" roughness={0.7} />
                </mesh>
            ))}

            {/* Rack Strip: repartidas por el ancho de la cara frontal */}
            {rackStripXs.map((x, i) => (
                <mesh key={`rack-strip-${i}`} position={[x, 0, hd + 0.005]}>
                    <boxGeometry args={[0.02, heightM * 0.85, 0.01]} />
                    <meshStandardMaterial color="#71717a" metalness={0.5} roughness={0.5} />
                </mesh>
            ))}

            {/* Bandeja deslizante: solo si está activada */}
            {components.slidingTray && (
                <mesh position={[0, -hh * 0.3, hd + 0.06]}>
                    <boxGeometry args={[widthM * 0.7, 0.02, 0.12]} />
                    <meshStandardMaterial color="#27272a" roughness={0.6} />
                </mesh>
            )}

            <OrbitControls enablePan={false} />
        </Canvas>
    )
}

export default FlightcasePreview3D
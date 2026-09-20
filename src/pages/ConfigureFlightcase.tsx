import { useState } from 'react'
import {
    Circle,
    CircleDot,
    Disc,
    DoorClosed,
    Grip,
    Lock,
    PanelBottom,
    Plus,
    Rows3,
} from 'lucide-react'
import CounterField from '../components/CounterField'
import SizeOptionCard from '../components/SizeOptionCard'
import ToggleField from '../components/ToggleField'
import WizardHeader from '../components/WizardHeader'
import FlightcasePreview3D from '../components/FlightcasePreview3D'
import { FLIGHTCASE_SIZE } from '../data/flightcaseSizes'
import { useProjectStore } from '../store/projectStore'
import { calculateFlightcaseWeight } from '../utils/flightcaseCalculations'
import { toDisplayValue, toMillimeters } from '../utils/units'

function ConfigureFlightcase() {
    const [unit, setUnit] = useState<'mm' | 'in'>('mm')

    const flightcaseSizeId = useProjectStore((state) => state.flightcaseSizeId)
    const selectStandardSize = useProjectStore((state) => state.selectStandardSize)
    const selectCustomSize = useProjectStore((state) => state.selectCustomSize)
    const dimensions = useProjectStore((state) => state.dimensions)
    const setDimensions = useProjectStore((state) => state.setDimensions)
    const rackUnits = useProjectStore((state) => state.rackUnits)
    const setRackUnits = useProjectStore((state) => state.setRackUnits)
    const rackStripType = useProjectStore((state) => state.rackStripType)
    const setRackStripType = useProjectStore((state) => state.setRackStripType)
    const components = useProjectStore((state) => state.components)
    const setComponentCount = useProjectStore((state) => state.setComponentCount)
    const setComponentFlag = useProjectStore((state) => state.setComponentFlag)

    const estimatedWeight = calculateFlightcaseWeight(dimensions, components)

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            <WizardHeader
                currentStep={2}
                continueDisabled={!flightcaseSizeId}
                onContinue={() => {
                    // TODO: navegar al paso 3 (Resumen) cuando exista
                }}
            />

            <div className="grid grid-cols-[280px_1fr_320px] gap-6 px-6 py-8">
                <section>
                    <h2 className="text-lg font-semibold uppercase tracking-wide text-white">
                        Elige tu flightcase
                    </h2>
                    <p className="mt-1 text-sm text-neutral-500">
                        Selecciona uno de nuestros modelos más utilizados.
                    </p>

                    <div className="mt-4 flex flex-col gap-3">
                        {FLIGHTCASE_SIZE.map((size) => (
                            <SizeOptionCard
                                key={size.id}
                                size={size}
                                selected={flightcaseSizeId === size.id}
                                onSelect={() => selectStandardSize(size)}
                            />
                        ))}

                        <label className="block cursor-pointer">
                            <input
                                type="radio"
                                name="flightcase-size"
                                checked={flightcaseSizeId === 'custom'}
                                onChange={() => selectCustomSize()}
                                className="peer sr-only"
                            />
                            <div className="flex flex-col items-center gap-1 rounded-lg border-2 border-dashed border-violet-500/60 px-4 py-6 text-center text-violet-400 transition-colors peer-checked:border-violet-400 peer-checked:bg-violet-500/5">
                                <Plus className="h-5 w-5" />
                                <span className="font-semibold">Personalizado</span>
                                <span className="text-xs text-neutral-500">Diseña tu flightcase a medida.</span>
                            </div>
                        </label>
                    </div>
                </section>

                <section className="flex flex-col gap-6">
                    <div>
                        <h2 className="text-lg font-semibold uppercase tracking-wide text-white">
                            Personaliza tu flightcase
                        </h2>
                        <p className="mt-1 text-sm text-neutral-500">Define cada detalle de tu flightcase.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="flex flex-col gap-6">
                            <div>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                                        Dimensiones exteriores
                                    </h3>
                                    <div className="inline-flex rounded-full border border-neutral-800 bg-neutral-900 p-1">
                                        <button
                                            type="button"
                                            onClick={() => setUnit('mm')}
                                            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${unit === 'mm' ? 'bg-violet-500 text-white' : 'text-neutral-400'
                                                }`}
                                        >
                                            mm
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setUnit('in')}
                                            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${unit === 'in' ? 'bg-violet-500 text-white' : 'text-neutral-400'
                                                }`}
                                        >
                                            in
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-col gap-4">
                                    <div>
                                        <label className="text-sm text-neutral-400">Anchura (W)</label>
                                        <div className="relative mt-1">
                                            <input
                                                type="number"
                                                value={toDisplayValue(dimensions.width, unit)}
                                                onChange={(e) =>
                                                    setDimensions({ width: toMillimeters(Number(e.target.value), unit) })
                                                }
                                                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 pr-10 text-white focus:border-violet-500 focus:outline-none"
                                            />
                                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-neutral-500">
                                                {unit}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm text-neutral-400">Altura (H)</label>
                                        <div className="relative mt-1">
                                            <input
                                                type="number"
                                                value={toDisplayValue(dimensions.height, unit)}
                                                onChange={(e) =>
                                                    setDimensions({ height: toMillimeters(Number(e.target.value), unit) })
                                                }
                                                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 pr-10 text-white focus:border-violet-500 focus:outline-none"
                                            />
                                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-neutral-500">
                                                {unit}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm text-neutral-400">Profundidad (D)</label>
                                        <div className="relative mt-1">
                                            <input
                                                type="number"
                                                value={toDisplayValue(dimensions.depth, unit)}
                                                onChange={(e) =>
                                                    setDimensions({ depth: toMillimeters(Number(e.target.value), unit) })
                                                }
                                                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 pr-10 text-white focus:border-violet-500 focus:outline-none"
                                            />
                                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-neutral-500">
                                                {unit}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                                    Unidades de rack
                                </h3>
                                <div className="mt-4 flex flex-col gap-4">
                                    <div>
                                        <label className="text-sm text-neutral-400">Altura útil de rack</label>
                                        <select
                                            value={rackUnits}
                                            onChange={(e) => setRackUnits(Number(e.target.value))}
                                            className="mt-1 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus:border-violet-500 focus:outline-none"
                                        >
                                            <option value={12}>12U</option>
                                            <option value={14}>14U</option>
                                            <option value={16}>16U</option>
                                            <option value={20}>20U</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-sm text-neutral-400">Tipo de rack strip</label>
                                        <select
                                            value={rackStripType}
                                            onChange={(e) => setRackStripType(e.target.value)}
                                            className="mt-1 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus:border-violet-500 focus:outline-none"
                                        >
                                            <option value="cuadrada">Rack Strip (Cuadrada)</option>
                                            <option value="redonda">Rack Strip (Redonda)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                                Componentes y accesorios
                            </h3>
                            <div className="mt-4 divide-y divide-neutral-800">
                                <CounterField
                                    icon={Circle}
                                    label="Ball Corner"
                                    value={components.ballCorner}
                                    onChange={(value) => setComponentCount('ballCorner', value)}
                                />
                                <CounterField
                                    icon={DoorClosed}
                                    label="Lid Stay with Hinge"
                                    value={components.lidStayWithHinge}
                                    onChange={(value) => setComponentCount('lidStayWithHinge', value)}
                                />
                                <CounterField
                                    icon={Rows3}
                                    label={`Rack Strip (${rackUnits}U)`}
                                    value={components.rackStrip}
                                    onChange={(value) => setComponentCount('rackStrip', value)}
                                />
                                <CounterField
                                    icon={Grip}
                                    label="Asas de agarre"
                                    value={components.handles}
                                    onChange={(value) => setComponentCount('handles', value)}
                                />
                                <CounterField
                                    icon={Lock}
                                    label="Cierres mariposa"
                                    value={components.butterflyLatches}
                                    onChange={(value) => setComponentCount('butterflyLatches', value)}
                                />
                                <ToggleField
                                    icon={CircleDot}
                                    label="Ruedas"
                                    checked={components.wheels}
                                    onChange={(value) => setComponentFlag('wheels', value)}
                                />
                                <ToggleField
                                    icon={Disc}
                                    label="Patas de goma"
                                    checked={components.rubberFeet}
                                    onChange={(value) => setComponentFlag('rubberFeet', value)}
                                />
                                <ToggleField
                                    icon={PanelBottom}
                                    label="Bandeja deslizante"
                                    checked={components.slidingTray}
                                    onChange={(value) => setComponentFlag('slidingTray', value)}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="text-lg font-semibold uppercase tracking-wide text-white">
                        Vista previa 3D
                    </h2>

                    <div className="flex min-h-320px flex-1 items-center justify-center overflow-hidden rounded-lg border border-neutral-800">
                        <FlightcasePreview3D />
                    </div>

                    <div className="rounded-lg border border-neutral-800 p-4">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                            Resumen
                        </h3>
                        <dl className="mt-3 flex flex-col gap-2 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-neutral-500">Unidades de rack</dt>
                                <dd className="text-white">{rackUnits}U</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-neutral-500">Dimensiones (W x H x D)</dt>
                                <dd className="text-white">
                                    {dimensions.width} x {dimensions.height} x {dimensions.depth} mm
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-neutral-500">Peso aprox.</dt>
                                <dd className="text-white">{estimatedWeight.toFixed(1)} kg</dd>
                            </div>
                        </dl>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ConfigureFlightcase
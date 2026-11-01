import { useState } from 'react'
import { Plus } from 'lucide-react'
import ComponentRow from '../components/ComponentRow'
import FlightcasePreview3D from '../components/FlightcasePreview3D'
import SizeOptionCard from '../components/SizeOptionCard'
import WizardHeader from '../components/WizardHeader'
import { FLIGHTCASE_SIZES } from '../data/flightcaseSizes'
import { useProjectStore } from '../store/projectStore'
import {
    getAllFamilies,
    getCatalogItem,
    getFamilyColors,
    getFamilyItems,
    getFamilyLabel,
} from '../utils/catalog'
import { calculateFlightcaseWeight } from '../utils/flightcaseCalculations'
import { toDisplayValue, toMillimeters } from '../utils/units'

// Por debajo de 1280 px se ve un panel cada vez, elegido con estas pestañas.
const TABS = [
    { id: 'size', label: 'Tamaño' },
    { id: 'customize', label: 'Personalizar' },
    { id: 'preview', label: 'Vista 3D' },
] as const

type Tab = (typeof TABS)[number]['id']

const DIMENSION_FIELDS = [
    { key: 'width', label: 'Anchura (W)' },
    { key: 'height', label: 'Altura (H)' },
    { key: 'depth', label: 'Profundidad (D)' },
] as const

function ConfigureFlightcase() {
    const [unit, setUnit] = useState<'mm' | 'in'>('mm')
    const [activeTab, setActiveTab] = useState<Tab>('size')

    const flightcaseSizeId = useProjectStore((state) => state.flightcaseSizeId)
    const selectStandardSize = useProjectStore((state) => state.selectStandardSize)
    const selectCustomSize = useProjectStore((state) => state.selectCustomSize)
    const dimensions = useProjectStore((state) => state.dimensions)
    const setDimensions = useProjectStore((state) => state.setDimensions)
    const rackUnits = useProjectStore((state) => state.rackUnits)
    const setRackUnits = useProjectStore((state) => state.setRackUnits)
    const components = useProjectStore((state) => state.components)
    const setComponentQuantity = useProjectStore((state) => state.setComponentQuantity)
    const setComponentColor = useProjectStore((state) => state.setComponentColor)

    const estimatedWeight = calculateFlightcaseWeight(dimensions, components, rackUnits)

    const summaryItems = [
        { label: 'Unidades de rack', shortLabel: 'Rack', value: `${rackUnits}U` },
        {
            label: 'Dimensiones (W x H x D)',
            shortLabel: 'W x H x D',
            value: `${dimensions.width} x ${dimensions.height} x ${dimensions.depth} mm`,
        },
        { label: 'Peso aprox.', shortLabel: 'Peso aprox.', value: `${estimatedWeight.toFixed(1)} kg` },
    ]

    return (
        <div className="flex h-dvh flex-col overflow-hidden bg-neutral-950 text-white">
            <WizardHeader
                currentStep={2}
                continueDisabled={!flightcaseSizeId}
                onContinue={() => {
                    // TODO: navegar al paso 3 (Resumen) cuando exista
                }}
            />

            <div role="tablist" className="flex shrink-0 border-b border-neutral-800 xl:hidden">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 border-b-2 py-3 text-sm font-medium transition-colors ${activeTab === tab.id
                                ? 'border-violet-500 text-white'
                                : 'border-transparent text-neutral-500'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(0,1fr)] gap-6 px-4 py-4 xl:grid-cols-[minmax(200px,240px)_minmax(0,1fr)_minmax(260px,320px)] xl:px-6 xl:py-5">
                {/* Panel 1: elegir tamaño */}
                <section
                    className={`${activeTab === 'size' ? 'block' : 'hidden xl:block'} min-h-0 overflow-y-auto`}
                >
                    <h2 className="text-base font-semibold uppercase tracking-wide text-white xl:text-lg">
                        Elige tu flightcase
                    </h2>
                    <p className="mt-1 text-sm text-neutral-500">
                        Selecciona uno de nuestros modelos más utilizados.
                    </p>

                    <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5 xl:flex xl:flex-col xl:gap-3">
                        {FLIGHTCASE_SIZES.map((size) => (
                            <SizeOptionCard
                                key={size.id}
                                size={size}
                                selected={flightcaseSizeId === size.id}
                                onSelect={() => selectStandardSize(size)}
                            />
                        ))}

                        <label className="col-span-2 flex cursor-pointer md:col-span-1">
                            <input
                                type="radio"
                                name="flightcase-size"
                                checked={flightcaseSizeId === 'custom'}
                                onChange={() => selectCustomSize()}
                                className="peer sr-only"
                            />
                            <div className="flex w-full flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-violet-500/60 px-4 py-4 text-center text-violet-400 transition-colors peer-checked:border-violet-400 peer-checked:bg-violet-500/5">
                                <Plus className="h-5 w-5" />
                                <span className="font-semibold">Personalizado</span>
                                <span className="text-xs text-neutral-500">Diseña tu flightcase a medida.</span>
                            </div>
                        </label>
                    </div>
                </section>

                {/* Panel 2: personalizar */}
                <section
                    className={`${activeTab === 'customize' ? 'flex' : 'hidden xl:flex'} min-h-0 flex-col gap-4 overflow-y-auto`}
                >
                    <div>
                        <h2 className="text-base font-semibold uppercase tracking-wide text-white xl:text-lg">
                            Personaliza tu flightcase
                        </h2>
                        <p className="mt-1 text-sm text-neutral-500">Define cada detalle de tu flightcase.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-8">
                        <div className="flex flex-col gap-5">
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

                                <div className="mt-3 grid grid-cols-3 gap-2 md:grid-cols-1 md:gap-3">
                                    {DIMENSION_FIELDS.map(({ key, label }) => (
                                        <div key={key}>
                                            <label
                                                htmlFor={`dimension-${key}`}
                                                className="text-xs text-neutral-400 md:text-sm"
                                            >
                                                {label}
                                            </label>
                                            <div className="relative mt-1">
                                                <input
                                                    id={`dimension-${key}`}
                                                    type="number"
                                                    value={toDisplayValue(dimensions[key], unit)}
                                                    onChange={(e) =>
                                                        setDimensions({ [key]: toMillimeters(Number(e.target.value), unit) })
                                                    }
                                                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-2 py-2 pr-9 text-base text-white focus:border-violet-500 focus:outline-none md:px-3 md:pr-10"
                                                />
                                                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-neutral-500 md:right-3 md:text-sm">
                                                    {unit}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                                    Unidades de rack
                                </h3>
                                <label
                                    htmlFor="rack-units"
                                    className="mt-3 block text-xs text-neutral-400 md:text-sm"
                                >
                                    Altura útil de rack
                                </label>
                                <select
                                    id="rack-units"
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
                        </div>

                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                                Componentes y accesorios
                            </h3>
                            <div className="mt-2 divide-y divide-neutral-800">
                                {getAllFamilies().map((family) => {
                                    const selected = components[family]
                                    const [firstItem] = getFamilyItems(family)
                                    const item = getCatalogItem(family, selected.color, rackUnits)
                                    const label =
                                        family === 'rack-rail'
                                            ? `${getFamilyLabel(family)} (${rackUnits}U)`
                                            : getFamilyLabel(family)

                                    return (
                                        <ComponentRow
                                            key={family}
                                            label={label}
                                            photoUrl={item?.photoUrl}
                                            quantity={selected.quantity}
                                            min={firstItem.minPerFlightcase}
                                            max={firstItem.maxPerFlightcase}
                                            colors={getFamilyColors(family)}
                                            color={selected.color}
                                            onQuantityChange={(quantity) => setComponentQuantity(family, quantity)}
                                            onColorChange={(color) => setComponentColor(family, color)}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Panel 3: vista previa 3D y resumen */}
                <section
                    className={`${activeTab === 'preview' ? 'flex' : 'hidden xl:flex'} min-h-0 flex-col gap-3`}
                >
                    <h2 className="hidden text-lg font-semibold uppercase tracking-wide text-white xl:block">
                        Vista previa 3D
                    </h2>

                    <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg border border-neutral-800">
                        <div className="absolute inset-0">
                            <FlightcasePreview3D />
                        </div>
                    </div>

                    <div className="hidden rounded-lg border border-neutral-800 p-4 xl:block">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                            Resumen
                        </h3>
                        <dl className="mt-3 flex flex-col gap-2 text-sm">
                            {summaryItems.map((item) => (
                                <div key={item.label} className="flex justify-between gap-3">
                                    <dt className="text-neutral-500">{item.label}</dt>
                                    <dd className="text-white">{item.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>
            </div>

            {/* Resumen fijo para tablet y móvil */}
            <div className="shrink-0 border-t border-neutral-800 px-4 py-2 xl:hidden">
                <dl className="flex items-start justify-between gap-3 text-xs">
                    {summaryItems.map((item) => (
                        <div key={item.label}>
                            <dt className="text-neutral-500">{item.shortLabel}</dt>
                            <dd className="text-white">{item.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    )
}

export default ConfigureFlightcase
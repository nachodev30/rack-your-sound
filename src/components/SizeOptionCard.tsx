import type { FlightcaseSize } from "../types/flightcase"

interface SizeOptionCardProps {
    size: FlightcaseSize
    selected: boolean
    onSelect: () => void 
}

function SizeOptionCard({ size, selected, onSelect }: SizeOptionCardProps) {
    return (
        <label className="block cursor-pointer">
            <input type="radio" name="flightcase-size" checked={selected} onChange={onSelect} className="peer sr-only" />
            <div className="rounded-lg border-2 border-neutral-800 px-4 py-3 transition-colors peer-checked:border-violet-500">
                <p className="font-semibold text-white">{size.label}</p>
                <p className="text-sm text-neutral-500">
                    {size.units}U · {size.depth}mm Prof.
                </p>
                <p className="text-sm text-neutral-500">
                    {size.width} x {size.height} x {size.depth} mm
                </p>
            </div>
        </label>
    )
}



export default SizeOptionCard
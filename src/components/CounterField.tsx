import type { LucideIcon } from 'lucide-react'
import { Minus, Plus } from 'lucide-react'

interface CounterFieldProps {
    icon: LucideIcon
    label: string
    value: number
    onChange: (value: number) => void
    min?: number
}

function CounterField({ icon: Icon, label, value, onChange, min = 0 }: CounterFieldProps) {
    return (
        <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800">
                    <Icon className="h-5 w-5 text-neutral-400" strokeWidth={1.5} />
                </div>
                <span className="text-sm text-neutral-200">{label}</span>
            </div>
            <div className="flex items-center overflow-hidden rounded-lg border border-neutral-700">
                <button
                    type="button"
                    onClick={() => onChange(Math.max(min, value - 1))}
                    className="flex h-8 w-8 items-center justify-center text-neutral-300 transition-colors hover:bg-neutral-800"
                >
                    <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center text-sm text-white">{value}</span>
                <button
                    type="button"
                    onClick={() => onChange(value + 1)}
                    className="flex h-8 w-8 items-center justify-center text-neutral-300 transition-colors hover:bg-neutral-800"
                >
                    <Plus className="h-3.5 w-3.5" />
                </button>
            </div>
        </div>
    )
}

export default CounterField
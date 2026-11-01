import { Minus, Plus } from 'lucide-react'
import type { ComponentColor } from '../types/component'

interface ComponentRowProps {
    label: string
    photoUrl?: string
    quantity: number
    min: number
    max: number
    colors: ComponentColor[]
    color: ComponentColor | null
    onQuantityChange: (quantity: number) => void
    onColorChange: (color: ComponentColor) => void
}

const SWATCH_CLASSES: Record<ComponentColor, string> = {
    Plata: 'bg-neutral-300',
    Negro: 'bg-neutral-950',
}

function ComponentRow({
    label,
    photoUrl,
    quantity,
    min,
    max,
    colors,
    color,
    onQuantityChange,
    onColorChange,
}: ComponentRowProps) {
    // Si el mínimo y el máximo coinciden (p. ej. Ruedas: 4 y 4) solo hay "incluido / no incluido".
    const isToggle = min === max

    function decrease() {
        // Un componente incluido no puede bajar de su mínimo: desde ahí pasa a 0 (no incluido).
        onQuantityChange(quantity <= min ? 0 : quantity - 1)
    }

    function increase() {
        // Desde 0 se salta directamente al mínimo.
        onQuantityChange(quantity === 0 ? min : quantity + 1)
    }

    return (
        <div className="flex items-center justify-between gap-2 py-1.5 [@media(min-height:860px)]:py-2.5">
            <div className="flex min-w-0 items-center gap-2.5">
                <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-neutral-800 [@media(min-height:860px)]:h-10 [@media(min-height:860px)]:w-10">
                    {photoUrl && (
                        <img src={photoUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
                    )}
                </div>

                <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-sm text-neutral-200">{label}</span>

                    {colors.length > 1 && (
                        <div className="flex gap-2.5">
                            {colors.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    title={option}
                                    aria-label={`${label}: ${option}`}
                                    aria-pressed={color === option}
                                    onClick={() => onColorChange(option)}
                                    className={`h-4 w-4 rounded-full border border-neutral-600 ${SWATCH_CLASSES[option]} ${color === option
                                            ? 'ring-2 ring-violet-500 ring-offset-2 ring-offset-neutral-950'
                                            : ''
                                        }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {isToggle ? (
                <input
                    type="checkbox"
                    aria-label={label}
                    checked={quantity > 0}
                    onChange={(e) => onQuantityChange(e.target.checked ? max : 0)}
                    className="h-5 w-5 shrink-0 accent-violet-500"
                />
            ) : (
                <div className="flex shrink-0 items-center overflow-hidden rounded-lg border border-neutral-700">
                    <button
                        type="button"
                        aria-label={`Quitar ${label}`}
                        onClick={decrease}
                        disabled={quantity === 0}
                        className="flex h-8 w-8 items-center justify-center text-neutral-300 transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm text-white">{quantity}</span>
                    <button
                        type="button"
                        aria-label={`Añadir ${label}`}
                        onClick={increase}
                        disabled={quantity >= max}
                        className="flex h-8 w-8 items-center justify-center text-neutral-300 transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        <Plus className="h-3.5 w-3.5" />
                    </button>
                </div>
            )}
        </div>
    )
}

export default ComponentRow
import type { LucideIcon } from 'lucide-react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface SelectableCardProps {
    icon: LucideIcon
    label: string
    value: string
    registration: UseFormRegisterReturn
}

function SelectableCard({ icon: Icon, label, value, registration }: SelectableCardProps) {
    return (
        <label className="flex cursor-pointer">
            <input type="radio" value={value} className="peer sr-only" {...registration} />
            <div className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-neutral-800 px-2 py-4 text-center text-neutral-300 transition-colors peer-checked:border-violet-500 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-violet-500 sm:gap-3 sm:px-6 [@media(min-height:700px)]:py-8">
                <Icon className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={1.5} />
                <span className="text-sm font-medium sm:text-base">{label}</span>
            </div>
        </label>
    )
}

export default SelectableCard
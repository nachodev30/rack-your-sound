import type { LucideIcon } from "lucide-react"
import type { UseFormRegisterReturn } from "react-hook-form"

interface SelectableCardProps {
    icon: LucideIcon
    label: string
    value: string
    registration: UseFormRegisterReturn
}

function SelectableCard({ icon: Icon, label, value, registration }: SelectableCardProps) {
    return (
        <label className="cursor-pointer">
            <input type="radio" value={value} className="peer sr-only" {...registration} />
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-neutral-800 px-6 py-8 text-center text-neutral-300 transition-colors peer-checked:border-violet-500 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-violet-500 hover:border-violet-500">
                <Icon className="h-8 w-8" strokeWidth={1.5} />
                <span className="font-medium">{label}</span>
            </div>
        </label>
    )
}

export default SelectableCard
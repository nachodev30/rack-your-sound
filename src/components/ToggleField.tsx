import type { LucideIcon } from 'lucide-react'

interface ToggleFieldProps {
    icon: LucideIcon
    label: string
    checked: boolean
    onChange: (checked: boolean) => void
}

function ToggleField({ icon: Icon, label, checked, onChange }: ToggleFieldProps) {
    return (
        <label className="flex cursor-pointer items-center justify-between py-3">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800">
                    <Icon className="h-5 w-5 text-neutral-400" strokeWidth={1.5} />
                </div>
                <span className="text-sm text-neutral-200">{label}</span>
            </div>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="h-5 w-5 accent-violet-500"
            />
        </label>
    )
}

export default ToggleField
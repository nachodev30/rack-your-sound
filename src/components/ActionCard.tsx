import type { LucideIcon } from "lucide-react";

interface ActionCardProps {
    icon: LucideIcon
    label: string
    onClick: () => void
}

function ActionCard({ icon: Icon, label, onClick }: ActionCardProps) {
    return (
        <button onClick={onClick} className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-violet-500/60 bg-transparent px-8 py-10 text-center text-white transition-colors cursor-pointer hover:border-violet-400 hover:bg-violet-500/5">
            <Icon className="h-8 w-8 text-violet-400" strokeWidth={1.5} />
            <span className="text-lg font-medium">{label}</span>
        </button>
    )
}

export default ActionCard
import type { LucideIcon } from 'lucide-react'

interface ActionCardProps {
    icon: LucideIcon
    label: string
    onClick: () => void
}

function ActionCard({ icon: Icon, label, onClick }: ActionCardProps) {
    return (
        <button type='button' onClick={onClick} className='flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-violet-500/60 bg-transparent px-4 py-4 text-center text-white transition-colors cursor-pointer hover:border-violet-400 hover:bg-violet-500/5 sm:gap-3 sm:px-8 [@media(min-height: 700px)]: py-8'>
            <Icon className='h-6 w-6 text-violet-400 sm:h-8 sm:w-8' strokeWidth={1.5} />
            <span className='text-base font-medium sm:text-lg'>{label}</span>
        </button>
    )
}

export default ActionCard
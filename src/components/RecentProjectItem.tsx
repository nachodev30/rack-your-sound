import { MoreHorizontal, Package } from 'lucide-react'
import type { Project } from '../types/project'

interface RecentProjectItemProps {
    project: Project
}

function formatDate(date: Date) {
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
}

function formatTime(date: Date) {
    return date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
    })
}

function RecentProjectItem({ project }: RecentProjectItemProps) {
    return (
        <div className="flex items-center justify-between gap-3 border-b border-neutral-800 py-3 last:border-b-0 sm:py-4">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-800">
                    <Package className="h-5 w-5 text-neutral-400" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                    <p className="truncate font-medium text-white">{project.name}</p>
                    <p className="truncate text-sm text-neutral-500">
                        Última edición: {formatDate(project.lastEditedAt)} · {formatTime(project.lastEditedAt)}
                    </p>
                </div>
            </div>
            <button
                type="button"
                aria-label={`Opciones de ${project.name}`}
                className="shrink-0 rounded-lg p-2 text-neutral-500 transition-colors cursor-pointer hover:bg-neutral-800 hover:text-white"
            >
                <MoreHorizontal className="h-5 w-5" />
            </button>
        </div>
    )
}

export default RecentProjectItem
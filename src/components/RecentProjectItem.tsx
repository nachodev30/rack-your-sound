import { MoreHorizontal, Package } from "lucide-react"
import type { Project } from "../types/project"

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

function formtatTime(date:Date) {
    return date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
    })
}

function RecentProjectItem({ project }: RecentProjectItemProps) {
    return (
        <div className="flex items-center justify-between border-b border-neutral-800 py-4 last:border-b-0">
            <div className="flex items-center gap-4 cursor-pointer">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800">
                    <Package className="h-5 w-5 text-neutral-400" strokeWidth={1.5} />
                </div>
                <div>
                    <p className="font-medium text-white">{project.name}</p>
                    <p className="text-sm text-neutral-500">
                        Última edición: {formatDate(project.lastEditedAt)} · {formtatTime(project.lastEditedAt)}
                    </p>
                </div>
            </div>
            <button className="rounded-lg p-2 text-neutral-500 transition-colors cursor-pointer hover:bg-neutral-800 hover:text-white">
                <MoreHorizontal className="h-5 w-5" />
            </button>
        </div>
    )
}


export default RecentProjectItem
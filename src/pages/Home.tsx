import { useNavigate } from 'react-router'
import { FolderOpen, Plus, Settings, User } from 'lucide-react'
import ActionCard from '../components/ActionCard'
import RecentProjectItem from '../components/RecentProjectItem'
import type { Project } from '../types/project'

// Datos de ejemplo. Los proyectos 3 al 8 son solo para probar el scroll de la lista.
const mockProjects: Project[] = [
    { id: '1', name: 'Godspell 2026', lastEditedAt: new Date('2025-05-12T14:30:00') },
    { id: '2', name: 'Gira Triana', lastEditedAt: new Date('2025-05-10T11:15:00') },
    { id: '3', name: 'Festival Mad Cool', lastEditedAt: new Date('2025-05-08T18:00:00') },
    { id: '4', name: 'Sala Apolo - Residencia', lastEditedAt: new Date('2025-05-06T09:45:00') },
    { id: '5', name: 'Boda Sevilla', lastEditedAt: new Date('2025-05-03T20:10:00') },
    { id: '6', name: 'Teatro Lope de Vega', lastEditedAt: new Date('2025-04-29T12:30:00') },
    { id: '7', name: 'Gira Norte 2025 con nombre muy largo para probar el recorte', lastEditedAt: new Date('2025-04-25T16:20:00') },
    { id: '8', name: 'Corporativo Madrid', lastEditedAt: new Date('2025-04-20T10:00:00') },
]

function Home() {
    const navigate = useNavigate()

    return (
        <div className="flex h-dvh flex-col overflow-hidden bg-neutral-950 px-4 py-4 text-white sm:px-6 sm:py-6">
            <header className="flex shrink-0 justify-end">
                <button
                    type="button"
                    aria-label="Perfil"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-500/60 text-violet-400 transition-colors cursor-pointer hover:bg-violet-500/10"
                >
                    <User className="h-5 w-5" />
                </button>
            </header>

            <main className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col items-center">
                <h1 className="shrink-0 pt-2 text-center font-display text-4xl text-neutral-100 sm:text-5xl lg:text-6xl">
                    Rack Your Sound
                </h1>

                <div className="mt-6 grid w-full shrink-0 grid-cols-2 gap-3 sm:gap-6 [@media(min-height:700px)]:mt-10">
                    <ActionCard
                        icon={Plus}
                        label="Nuevo Proyecto"
                        onClick={() => navigate('/nuevo-proyecto')}
                    />
                    <ActionCard
                        icon={FolderOpen}
                        label="Cargar Proyecto"
                        onClick={() => {
                            // TODO: implementar la carga de un proyecto guardado
                        }}
                    />
                </div>

                <section className="mt-6 flex min-h-0 w-full flex-1 flex-col [@media(min-height:700px)]:mt-10">
                    <h2 className="shrink-0 text-base text-neutral-300 sm:text-lg">Proyectos recientes</h2>
                    <div className="mt-3 min-h-0 flex-1 overflow-y-auto overscroll-contain border-t border-neutral-800 [scrollbar-color:#3f3f46_transparent] [scrollbar-width:thin]">
                        {mockProjects.map((project) => (
                            <RecentProjectItem key={project.id} project={project} />
                        ))}
                    </div>
                </section>
            </main>

            <footer className="flex shrink-0 items-center justify-between gap-3 pt-3 text-xs text-neutral-500 sm:pt-4 sm:text-sm">
                <p>
                    <span className="text-violet-400">Rack Your Sound</span> · Build. Plan. Deliver.
                </p>
                <button
                    type="button"
                    aria-label="Ajustes"
                    className="rounded-lg p-2 transition-colors cursor-pointer hover:bg-neutral-900 hover:text-white"
                >
                    <Settings className="h-5 w-5" />
                </button>
            </footer>
        </div>
    )
}

export default Home
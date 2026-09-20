import { useNavigate } from "react-router"
import { FolderOpen, Plus, Settings, User } from "lucide-react"
import ActionCard from "../components/ActionCard"
import RecentProjectItem from "../components/RecentProjectItem"
import type { Project } from "../types/project"

const mockProjects: Project[] = [
    {id: '1', name: 'Godspell 2026', lastEditedAt: new Date('2025-05-12T14:30') },
    {id: '2', name: 'Gira Triana', lastEditedAt: new Date('2025-05-10T11:15') },
]

function Home() {
    const navigate = useNavigate()

    return (
        <div className="flex min-h-screen flex-col bg-neutral-950 px-6 py-10 text-white">
            <header className="flex justify-end">
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-500/60 text-violet-400 transition-colors cursor-pointer hover:bg-violet-500/10">
                    <User className="h-5 w-5" />
                </button>
            </header>

            <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center pt-8">
                <h1 className="font-display text-7xl text-neutral-100">Rack Your Sound</h1>

                <div className="mt-12 grid w-full grid-cols-2 gap-6">
                    <ActionCard 
                        icon={Plus}
                        label= "Nuevo Proyecto"
                        onClick={() => navigate('/nuevo-proyecto')}
                    />
                    <ActionCard 
                        icon={FolderOpen}
                        label= "Cargar Proyecto"
                        onClick={() => {
                            // Cargar proyecto guardado
                        }}
                    />
                </div>

                <section className="mt-14 w-full">
                    <h2 className="text-lg text-neutral-300">Proyectos recientes</h2>
                    <div className="mt-4 border-t border-neutral-800">
                        {mockProjects.map((project) => (
                            <RecentProjectItem key={project.id} project={project} />
                        ))}
                    </div>
                </section>
            </main>

            <footer className="flex items-center justify-between pt-5 text-sm text-neutral-500">
                <p>
                    <span className="text-violet-400">Rack Your Sound</span> · Build. Plan. Deliver.
                </p>
                <button className="rounded-lg p-2 transition-colors cursor-pointer hover:bg-neutral-900 hover:text-white">
                    <Settings className="h-5 w-5" />
                </button>
            </footer>
        </div>
    )
}

export default Home
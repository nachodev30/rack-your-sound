import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ArrowLeft, ArrowRight, Mic, PlugZap, Server, User } from "lucide-react"
import { useNavigate } from "react-router"
import { z } from "zod"
import SelectableCard from "../components/SelectableCard"
import { PROJECT_TYPES } from "../types/project"
import { useProjectStore } from "../store/projectStore"

const newProjectSchema = z.object({
    name: z.string().min(3, {error: 'El nombre debe tener al menos 3 caracteres' }),
    type: z.enum(PROJECT_TYPES, { error:'Selecciona qué vas a preparar ' }),
})

type NewProjectFormValues = z.infer<typeof newProjectSchema>

function NewProject() {
    const navigate = useNavigate()
    const setBasicInfo = useProjectStore((state) => state.setBasicInfo)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NewProjectFormValues>({
        resolver: zodResolver(newProjectSchema),
        defaultValues: { name: '' },
    })

    function onSubmit(data: NewProjectFormValues) {
        setBasicInfo(data)
        navigate('/nuevo-proyecto/flightcase')
    }

    return (
        <div className="min-h-screen bg-neutral-950 px-6 py-10 text-white">
            <header className="flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-400 transition-colors cursor-pointer hover:bg-neutral-900 hover:text-white">
                    <ArrowLeft className="h-5 w-5" />
                </button>

                <h1 className="font-display text-6xl text-neutral-100">Rack Your Sound</h1>

                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-500/60 text-violet-400 transition-colors cursor-pointer hover:bg-neutral-500/10">
                    <User className="h-5 w-5" />
                </button>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-16 flex w-full max-w-2xl flex-col gap-10">
                <div>
                    <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        Nombre del proyecto
                    </label>
                    <input id="name" type="text" placeholder="Escribe el nombre de tu gira, show o proyecto..." className="mt-2 w-full rounded-lg border border-violet-500 px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none" {...register('name')}/>
                    {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>}
                </div>

                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        ¿Que vas a preparar?
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-4">
                        <SelectableCard
                            icon={Mic}
                            label="Microfonía"
                            value="microfonia"
                            registration={register('type')}
                        />
                        <SelectableCard
                            icon={PlugZap}
                            label="Cuadro Eléctrico"
                            value="cuadro-electrico"
                            registration={register('type')}
                        />
                        <SelectableCard
                            icon={Server}
                            label="Racks"
                            value="racks"
                            registration={register('type')}
                        />
                    </div>
                    {errors.type && <p className="mt-2 text-sm text-red-400">{errors.type.message}</p>}
                </div>

                <button type="submit" className="flex relative items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold uppercase tracking-wide text-violet-700 transition-colors cursor-pointer border-2 border-violet-500/60 hover:bg-violet-600 hover:text-white">
                    Continuar
                    <ArrowRight className="h-6 w-6 absolute right-4" />
                </button>
            </form>
        </div>
    )
}

export default NewProject
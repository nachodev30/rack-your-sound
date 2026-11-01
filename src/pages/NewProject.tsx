import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight, Mic, PlugZap, Server, User } from 'lucide-react'
import { useNavigate } from 'react-router'
import { z } from 'zod'
import SelectableCard from '../components/SelectableCard'
import { PROJECT_TYPES } from '../types/project'
import { useProjectStore } from '../store/projectStore'

const newProjectSchema = z.object({
    name: z.string().min(3, { error: 'El nombre debe tener al menos 3 caracteres' }),
    type: z.enum(PROJECT_TYPES, { error: 'Selecciona qué vas a preparar' }),
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
        <div className="flex h-dvh flex-col overflow-hidden bg-neutral-950 px-4 py-4 text-white sm:px-6 sm:py-6">
            <header className="flex shrink-0 items-center justify-between gap-3">
                <button
                    type="button"
                    aria-label="Volver"
                    onClick={() => navigate(-1)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-white"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>

                <h1 className="font-display text-xl text-neutral-100 min-[360px]:text-2xl sm:text-3xl">
                    Rack Your Sound
                </h1>

                <button
                    type="button"
                    aria-label="Perfil"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet-500/60 text-violet-400 transition-colors hover:bg-violet-500/10"
                >
                    <User className="h-5 w-5" />
                </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-2 [scrollbar-color:#3f3f46_transparent] [scrollbar-width:thin]">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mx-auto flex w-full max-w-2xl flex-col gap-6 pt-6 [@media(min-height:800px)]:gap-10 [@media(min-height:800px)]:pt-16"
                >
                    <div>
                        <label
                            htmlFor="name"
                            className="text-xs font-semibold uppercase tracking-wider text-neutral-500"
                        >
                            Nombre del proyecto
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Escribe el nombre de tu gira, show o proyecto..."
                            className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 text-white placeholder:text-neutral-600 focus:border-violet-500 focus:outline-none"
                            {...register('name')}
                        />
                        {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>}
                    </div>

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                            ¿Qué vas a preparar?
                        </p>
                        <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-4">
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

                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 rounded-lg bg-violet-500 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-violet-600"
                    >
                        Continuar
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NewProject
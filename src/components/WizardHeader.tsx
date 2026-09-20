import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router"
import { useProjectStore } from "../store/projectStore"

const WIZARD_STEPS = [
    { step: 1, label: 'Nombre del proyecto' },
    { step: 2, label: 'Configurar Flightcase' },
    { step: 3, label: 'Resumen' },
]

interface WizardHeaderProps {
    currentStep: 1 | 2 | 3
    onContinue?: () => void
    continueDisabled?: boolean
}

function WizardHeader({ currentStep, onContinue, continueDisabled }: WizardHeaderProps) {
    const name = useProjectStore((state) => state.name)
    const navigate = useNavigate()

    return (
        <header className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 transition-colors cursor-pointer hover:bg-neutral-900 hover:text-white">
                    <ArrowLeft className="h-5 w-5" />
                </button>

                <span className="text-sm font-bold uppercase tracking-wide text-white">
                    {name}
                </span>

                <nav className="flex items-center gap-2 text-sm text-neutral-500">
                    {WIZARD_STEPS.map((item, index) => (
                        <span key={item.step} className="flex items-center gap-2">
                            {index > 0 && <ChevronRight className="h-4 w-4 text-neutral-700" />}
                            <span className={item.step === currentStep ? 'font-semibold text-white' : ''}>
                                {item.step}. {item.label}
                            </span>
                        </span>
                    ))}
                </nav>
            </div>

            <div className="flex items-center gap-3">
                <button onClick={() => navigate('/')} className="rounded-lg border border-neutral-700 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-neutral-300 transition-colors cursor-pointer hover:bg-neutral-900">
                    Cancelar
                </button>
                <button onClick={onContinue} disabled={continueDisabled} className="flex items-center gap-2 rounded-lg bg-violet-500 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white transition-colors cursor-pointer hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-50">
                    Continuar
                    <ArrowRight className="h-4 w-4"/>
                </button>
            </div>
        </header>
    )
}

export default WizardHeader
import { ArrowLeft, ArrowRight, ChevronRight, X } from 'lucide-react'
import { useNavigate } from 'react-router'

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
    const navigate = useNavigate()
    const currentLabel = WIZARD_STEPS.find((item) => item.step === currentStep)?.label

    return (
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-neutral-800 px-4 py-3 xl:px-6 xl:py-4">
            <div className="flex min-w-0 items-center gap-3 xl:gap-4">
                <button
                    type="button"
                    aria-label="Volver"
                    onClick={() => navigate(-1)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-colors cursor-pointer hover:bg-neutral-900 hover:text-white"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>

                <span className="hidden text-sm font-bold uppercase tracking-wide text-white md:inline">
                    Nuevo Proyecto
                </span>

                {/* Pantallas pequeñas: solo el paso actual */}
                <span className="truncate text-sm xl:hidden">
                    <span className="text-neutral-500">
                        Paso {currentStep} de {WIZARD_STEPS.length}
                    </span>
                    <span className="hidden font-semibold text-white sm:inline"> · {currentLabel}</span>
                </span>

                {/* Pantallas grandes: migas de pan completas */}
                <nav className="hidden items-center gap-2 text-sm text-neutral-500 xl:flex">
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

            <div className="flex shrink-0 items-center gap-2 xl:gap-3">
                <button
                    type="button"
                    aria-label="Cancelar"
                    onClick={() => navigate('/')}
                    className="flex h-9 items-center justify-center rounded-lg border border-neutral-700 px-2.5 text-sm font-semibold uppercase tracking-wide text-neutral-300 transition-colors cursor-pointer hover:bg-neutral-900 sm:px-4"
                >
                    <X className="h-4 w-4 sm:hidden" />
                    <span className="hidden sm:inline">Cancelar</span>
                </button>
                <button
                    type="button"
                    onClick={onContinue}
                    disabled={continueDisabled}
                    className="flex h-9 items-center gap-2 rounded-lg bg-violet-500 px-3 text-xs font-semibold uppercase tracking-wide text-white transition-colors cursor-pointer hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:text-sm"
                >
                    Continuar
                    <ArrowRight className="h-4 w-4" />
                </button>
            </div>
        </header>
    )
}

export default WizardHeader
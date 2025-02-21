import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRef, useEffect } from "react"

export interface Step {
  title: string
  description: string
  icon: LucideIcon
}

interface StepperProps {
  steps: Step[]
  currentStep: number
}

export function Stepper({ steps, currentStep }: StepperProps) {
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (stepsRef.current) {
      const activeStep = stepsRef.current.children[currentStep] as HTMLElement
      if (activeStep) {
        activeStep.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
      }
    }
  }, [currentStep])

  return (
    <div className="relative">
      <div 
        ref={stepsRef}
        className="flex overflow-x-auto pb-4 scrollbar-hide"
      >
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <div
              key={step.title}
              className={`flex min-w-[200px] flex-col items-center ${
                index !== steps.length - 1 ? 'mr-4' : ''
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    index === currentStep
                      ? 'border-primary bg-primary text-primary-foreground'
                      : index < currentStep
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted bg-muted'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                {index !== steps.length - 1 && (
                  <div
                    className={`h-[2px] w-16 ${
                      index < currentStep ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
              <div className="mt-2 text-center">
                <div className="text-sm font-medium">{step.title}</div>
                <div className="text-xs text-muted-foreground">
                  {step.description}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}


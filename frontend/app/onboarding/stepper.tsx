import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

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
  return (
    <div className="space-y-4">
      <div className="overflow-auto">
        <div className="flex gap-4 pb-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.title}
                className={cn(
                  "relative flex min-w-[200px] flex-col gap-2 rounded-lg border bg-card p-4",
                  currentStep === index && "border-primary bg-primary/5",
                  currentStep > index && "border-muted bg-muted",
                )}
              >
                <div className="flex items-center gap-2">
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      currentStep === index && "text-primary",
                      currentStep > index && "text-muted-foreground",
                    )}
                  />
                  <div className="font-medium">{step.title}</div>
                </div>
                <div className="text-sm text-muted-foreground">{step.description}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex gap-1">
        {steps.map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-2 flex-1 rounded-full",
              currentStep === index && "bg-primary",
              currentStep > index && "bg-primary/30",
              currentStep < index && "bg-muted",
            )}
          />
        ))}
      </div>
    </div>
  )
}


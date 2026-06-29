"use client"

import { motion } from "framer-motion"
import { User, Wallet, Hop as Home, Sparkles } from "lucide-react"

interface Step {
  id: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  status: "completed" | "active" | "pending"
}

interface VerificationTimelineProps {
  steps?: Step[]
  currentStep?: number
}

const defaultSteps: Step[] = [
  {
    id: 1,
    title: "Identity Verification",
    description: "Government ID matching and liveness checks",
    icon: User,
    status: "completed",
  },
  {
    id: 2,
    title: "Financial Verification",
    description: "Bank statements and income validation",
    icon: Wallet,
    status: "active",
  },
  {
    id: 3,
    title: "Property Check",
    description: "Ownership verification against registry",
    icon: Home,
    status: "pending",
  },
  {
    id: 4,
    title: "AI Scoring",
    description: "Generate 0-100 trust score",
    icon: Sparkles,
    status: "pending",
  },
]

export function VerificationTimeline({ steps = defaultSteps, currentStep = 2 }: VerificationTimelineProps) {
  const stepsWithStatus = steps.map((step, index) => ({
    ...step,
    status: index + 1 < currentStep ? "completed" : index + 1 === currentStep ? "active" : "pending" as const,
  }))

  const getStepColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground border-success"
      case "active":
        return "bg-primary text-primary-foreground border-primary"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const getLineColor = (index: number) => {
    if (index + 1 < currentStep) return "bg-success"
    if (index + 1 === currentStep) return "bg-gradient-to-b from-success to-primary"
    return "bg-muted"
  }

  return (
    <div className="relative">
      {stepsWithStatus.map((step, index) => (
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          className="relative flex gap-4 pb-8 last:pb-0"
        >
          {/* Connecting line */}
          {index < stepsWithStatus.length - 1 && (
            <div
              className={`absolute left-5 top-10 w-0.5 h-[calc(100%-2rem)] ${getLineColor(index)}`}
            />
          )}

          {/* Step dot */}
          <div className="relative z-10">
            <motion.div
              className={`flex size-10 items-center justify-center rounded-full border-2 ${getStepColor(step.status)}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
            >
              <step.icon className="size-4" />
            </motion.div>
          </div>

          {/* Step content */}
          <div className="flex-1 pt-1">
            <h4 className={`font-heading font-semibold ${step.status === "pending" ? "text-muted-foreground" : "text-foreground"}`}>
              {step.title}
            </h4>
            <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
            {step.status === "active" && (
              <motion.div
                className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="size-1.5 rounded-full bg-primary" />
                In progress
              </motion.div>
            )}
            {step.status === "completed" && (
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
                Completed
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

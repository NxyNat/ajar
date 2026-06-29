"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Clock, Shield, Trash2 } from "lucide-react"

interface AutoDeleteStatusProps {
  viewedAt?: Date
  hoursToDelete?: number
  onDelete?: () => void
  className?: string
}

export function AutoDeleteStatus({
  viewedAt,
  hoursToDelete = 48,
  onDelete,
  className,
}: AutoDeleteStatusProps) {
  const [timeLeft, setTimeLeft] = useState<number>(hoursToDelete * 60 * 60)
  const [isAnonymized, setIsAnonymized] = useState(false)

  useEffect(() => {
    if (!viewedAt) return

    const endTime = new Date(viewedAt.getTime() + hoursToDelete * 60 * 60 * 1000)

    const updateTimer = () => {
      const now = new Date()
      const diff = Math.max(0, Math.floor((endTime.getTime() - now.getTime()) / 1000))
      setTimeLeft(diff)

      if (diff <= 0) {
        setIsAnonymized(true)
        onDelete?.()
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [viewedAt, hoursToDelete, onDelete])

  const formatTime = (seconds: number) => {
    if (seconds <= 0) return "00:00:00"
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
  }

  if (isAnonymized) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1.5 text-sm font-medium text-success ${className}`}
      >
        <Shield className="size-4" />
        Data anonymized
      </motion.div>
    )
  }

  if (!viewedAt) {
    return (
      <div className={`inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground ${className}`}>
        <Clock className="size-4" />
        Not yet viewed
      </div>
    )
  }

  const isUrgent = timeLeft < 3600 // Less than 1 hour

  return (
    <motion.div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${
        isUrgent
          ? "bg-destructive/10 text-destructive"
          : "bg-warning/10 text-warning"
      } ${className}`}
      animate={isUrgent ? { scale: [1, 1.02, 1] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <Trash2 className="size-4" />
      <span>Auto-delete in</span>
      <span className="font-mono font-bold tabular-nums">
        {formatTime(timeLeft)}
      </span>
    </motion.div>
  )
}

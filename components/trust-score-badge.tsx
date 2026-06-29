import { cn } from "@/lib/utils"
import { getRiskLevel } from "@/lib/data"

export function TrustScoreBadge({
  score,
  size = "md",
  className,
}: {
  score: number
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const level = getRiskLevel(score)
  const color =
    level === "Low Risk"
      ? "text-success"
      : level === "Medium Risk"
        ? "text-warning"
        : "text-destructive"
  const track =
    level === "Low Risk"
      ? "stroke-success"
      : level === "Medium Risk"
        ? "stroke-warning"
        : "stroke-destructive"

  const dims = size === "lg" ? 72 : size === "sm" ? 40 : 56
  const stroke = size === "lg" ? 6 : size === "sm" ? 4 : 5
  const radius = (dims - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className={cn("relative inline-flex shrink-0 items-center justify-center", className)} style={{ width: dims, height: dims }}>
      <svg width={dims} height={dims} className="-rotate-90">
        <circle
          cx={dims / 2}
          cy={dims / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-muted"
        />
        <circle
          cx={dims / 2}
          cy={dims / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={track}
        />
      </svg>
      <span className={cn("absolute font-heading font-semibold tabular-nums", color, size === "lg" ? "text-lg" : size === "sm" ? "text-xs" : "text-sm")}>
        {score}
      </span>
    </div>
  )
}

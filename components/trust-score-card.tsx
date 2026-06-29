import { cn } from "@/lib/utils"
import { getRiskLevel, type TrustBreakdown } from "@/lib/data"
import { ShieldCheck } from "lucide-react"

const riskStyles: Record<string, { bar: string; text: string; badge: string }> = {
  "Low Risk": {
    bar: "bg-success",
    text: "text-success",
    badge: "bg-success/10 text-success",
  },
  "Medium Risk": {
    bar: "bg-warning",
    text: "text-warning",
    badge: "bg-warning/15 text-warning",
  },
  "High Risk": {
    bar: "bg-destructive",
    text: "text-destructive",
    badge: "bg-destructive/10 text-destructive",
  },
}

const componentLabels: Record<keyof TrustBreakdown, string> = {
  identity: "Identity",
  income: "Income",
  employment: "Employment",
  payment: "Payment history",
}

export function TrustScoreCard({
  score,
  breakdown,
  subtitle = "Verified profile",
  className,
}: {
  score: number
  breakdown: TrustBreakdown
  subtitle?: string
  className?: string
}) {
  const level = getRiskLevel(score)
  const styles = riskStyles[level]

  return (
    <div className={cn("rounded-2xl border bg-card p-6 shadow-sm", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-5 text-primary" aria-hidden />
          <div>
            <h3 className="font-heading font-semibold leading-tight">AJAR Trust Score</h3>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", styles.badge)}>{level}</span>
      </div>

      <div className="mt-6 flex items-end gap-2">
        <span className="font-heading text-5xl font-semibold tracking-tight tabular-nums">{score}</span>
        <span className="mb-1.5 text-sm text-muted-foreground">/ 100</span>
      </div>

      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100}>
        <div className={cn("h-full rounded-full transition-all", styles.bar)} style={{ width: `${score}%` }} />
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
        {(Object.keys(componentLabels) as (keyof TrustBreakdown)[]).map((key) => (
          <div key={key}>
            <div className="flex items-center justify-between text-sm">
              <dt className="text-muted-foreground">{componentLabels[key]}</dt>
              <dd className="font-medium tabular-nums">{breakdown[key]}%</dd>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary/70" style={{ width: `${breakdown[key]}%` }} />
            </div>
          </div>
        ))}
      </dl>
    </div>
  )
}

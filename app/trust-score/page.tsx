"use client"

import { motion } from "framer-motion"
import { ShieldCheck, FingerprintPattern as Fingerprint, Wallet, Briefcase, Clock, TrendingUp } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TrustScoreGauge } from "@/components/trust-score-gauge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { historicalScores } from "@/lib/data"

const scoreBreakdown = [
  {
    label: "Identity",
    score: 95,
    icon: Fingerprint,
    color: "#2563EB",
    description: "Government ID verified with liveness check",
  },
  {
    label: "Income",
    score: 85,
    icon: Wallet,
    color: "#0D9488",
    description: "Stable income verified via bank statements",
  },
  {
    label: "Employment",
    score: 88,
    icon: Briefcase,
    color: "#22C55E",
    description: "Full-time employment confirmed",
  },
  {
    label: "Payment History",
    score: 92,
    icon: Clock,
    color: "#F59E0B",
    description: "Consistent on-time payments for 2+ years",
  },
]

const overallScore = 87

export default function TrustScorePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Hero Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-3xl font-semibold tracking-tight">Your Trust Score</h1>
            <p className="mt-2 text-muted-foreground">
              A comprehensive assessment of your rental trustworthiness
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex justify-center"
          >
            <Card className="w-full max-w-md">
              <CardContent className="flex flex-col items-center p-8">
                <TrustScoreGauge score={overallScore} size={220} strokeWidth={14} />
                <div className="mt-4 flex items-center gap-2">
                  <ShieldCheck className="size-5 text-primary" />
                  <span className="font-heading text-lg font-semibold">AJAR Verified Profile</span>
                </div>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Your score is calculated from identity, financial, employment, and payment history signals.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Component Breakdown */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {scoreBreakdown.map((component, index) => (
              <motion.div
                key={component.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className="flex size-10 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${component.color}15` }}
                      >
                        <component.icon className="size-5" style={{ color: component.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-heading font-semibold">{component.label}</h3>
                          <span className="font-heading text-xl font-bold" style={{ color: component.color }}>
                            {component.score}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{component.description}</p>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: component.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${component.score}%` }}
                            transition={{ duration: 1, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* AI Insight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="size-5 text-primary" />
                  AI Insight
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Your profile demonstrates strong financial stability with consistent payment history. 
                  Your identity verification is fully complete, and employment records show stability. 
                  To improve your score further, consider adding additional income documentation or 
                  references from previous landlords. Your current score places you in the top 25% of 
                  applicants, making you a highly attractive tenant for verified landlords.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Historical Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="size-5 text-secondary" />
                  30-Day Score Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={historicalScores}>
                    <defs>
                      <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis domain={[0, 100]} stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#2563EB"
                      strokeWidth={2}
                      fill="url(#scoreGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

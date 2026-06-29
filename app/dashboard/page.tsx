"use client"

import { motion } from "framer-motion"
import { ShieldCheck, FileText, TrendingUp, Building2, ChartBar as BarChart3, Users, Clock, CircleCheck as CheckCircle2, Circle as XCircle, CircleAlert as AlertCircle } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CountUp } from "@/components/count-up"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import {
  applications,
  verificationActivity,
  trustScoreDistribution,
  properties,
  landlords,
  getPropertyById,
} from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { AutoDeleteStatus } from "@/components/auto-delete-status"

const stats = [
  {
    title: "Verification Status",
    value: 87,
    suffix: "%",
    icon: ShieldCheck,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Applications",
    value: applications.length,
    suffix: "",
    icon: FileText,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Trust Score",
    value: 82,
    suffix: "/100",
    icon: TrendingUp,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    title: "Active Properties",
    value: properties.filter((p) => p.status === "ACTIVE").length,
    suffix: "",
    icon: Building2,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
]

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, { color: string; icon: React.ComponentType<{ className?: string }> }> = {
    pending: { color: "bg-muted text-muted-foreground", icon: Clock },
    under_review: { color: "bg-primary/10 text-primary", icon: AlertCircle },
    approved: { color: "bg-success/10 text-success", icon: CheckCircle2 },
    rejected: { color: "bg-destructive/10 text-destructive", icon: XCircle },
  }
  const config = variants[status] || variants.pending
  const Icon = config.icon
  return (
    <Badge variant="outline" className={`gap-1 ${config.color}`}>
      <Icon className="size-3" />
      {status.replace("_", " ")}
    </Badge>
  )
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-heading text-3xl font-semibold tracking-tight">Dashboard</h1>
            <p className="mt-2 text-muted-foreground">Overview of your verification activity and applications.</p>
          </motion.div>

          {/* Stats Cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`flex size-10 items-center justify-center rounded-lg ${stat.bgColor}`}>
                        <stat.icon className={`size-5 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="font-heading text-2xl font-semibold">
                          <CountUp end={stat.value} suffix={stat.suffix} />
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Verification Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BarChart3 className="size-5 text-primary" />
                    Verification Activity (Last 7 Days)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={verificationActivity}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={12} />
                      <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="verifications" radius={[6, 6, 0, 0]}>
                        {verificationActivity.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={index === 4 ? "#2563EB" : "#93C5FD"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Trust Score Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="size-5 text-secondary" />
                    Trust Score Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={trustScoreDistribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="range" stroke="var(--muted-foreground)" fontSize={12} />
                      <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                        {trustScoreDistribution.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              index < 2
                                ? "#EF4444"
                                : index === 2
                                ? "#F59E0B"
                                : index === 3
                                ? "#0D9488"
                                : "#22C55E"
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recent Applications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="size-5 text-primary" />
                  Recent Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-muted-foreground">
                        <th className="pb-3 font-medium">Tenant</th>
                        <th className="pb-3 font-medium">Property</th>
                        <th className="pb-3 font-medium">Trust Score</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Auto-Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app, index) => {
                        const property = getPropertyById(app.propertyId)
                        return (
                          <motion.tr
                            key={app.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                            className="border-b last:border-0"
                          >
                            <td className="py-3 font-medium">{app.tenantName}</td>
                            <td className="py-3 text-muted-foreground">{property?.title || "Unknown"}</td>
                            <td className="py-3">
                              {app.trustScore ? (
                                <span
                                  className={`font-semibold ${
                                    app.trustScore >= 80
                                      ? "text-success"
                                      : app.trustScore >= 50
                                      ? "text-warning"
                                      : "text-destructive"
                                  }`}
                                >
                                  {app.trustScore}
                                </span>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td className="py-3">
                              <StatusBadge status={app.status} />
                            </td>
                            <td className="py-3">
                              <AutoDeleteStatus
                                viewedAt={app.viewedAt}
                                hoursToDelete={app.autoDeleteHours}
                              />
                            </td>
                          </motion.tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

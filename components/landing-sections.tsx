"use client"

import Image from "next/image"
import Link from "next/link"
import { ShieldCheck, FileSearch, Gauge, CircleCheck as CheckCircle2, FingerprintPattern as Fingerprint, Landmark, Trash2, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="absolute inset-0 -z-10">
        <Image src="/amman-skyline.png" alt="" fill priority className="object-cover opacity-[0.08]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background" />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-sm font-medium text-muted-foreground shadow-sm"
          >
            <span className="size-2 rounded-full bg-success" aria-hidden />
            New beginnings for Jordan&apos;s rental market
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            Rent with evidence, <span className="text-primary">not guesswork</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty"
          >
            AJAR connects landlords and tenants through identity, financial, and behavioral verification — delivering a
            0–100 AI trust score within 48 hours.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button size="lg" asChild>
              <Link href="/browse">
                Browse verified properties
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/#how-it-works">See how it works</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const stats = [
  { value: "3-Tier", label: "Verification system" },
  { value: "48 hrs", label: "Verification turnaround" },
  { value: "0–100", label: "AI trust score" },
]

export function Stats() {
  return (
    <section className="border-b bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6 lg:px-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center"
          >
            <p className="font-heading text-3xl font-semibold text-primary sm:text-4xl">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

const tiers = [
  {
    icon: Fingerprint,
    step: "Tier 1",
    title: "Identity & Compliance",
    description: "Government ID matching and liveness checks confirm a real, verified person behind every profile.",
  },
  {
    icon: Landmark,
    step: "Tier 2",
    title: "Financial & Background",
    description: "Bank statements and employment documents validate income stability and rental affordability.",
  },
  {
    icon: Gauge,
    step: "Tier 3",
    title: "AI Trust Score",
    description: "An AI model weighs every signal into a single 0–100 score with a transparent breakdown.",
  },
]

export function Verification() {
  return (
    <section id="verification" className="border-b">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Three layers of verification
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Every signal is timestamped and evidence-backed, then auto-deleted after a decision.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <tier.icon className="size-5" aria-hidden />
              </span>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-primary">{tier.step}</p>
              <h3 className="mt-1 font-heading text-lg font-semibold">{tier.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tier.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const steps = [
  { icon: FileSearch, number: "1", title: "Connect", description: "Browse verified landlords and read evidence-backed trust reviews." },
  { icon: ShieldCheck, number: "2", title: "Verify", description: "Upload ID, bank statements, and employment documents securely." },
  { icon: Gauge, number: "3", title: "Score", description: "Our AI generates a 0–100 trust score within 48 hours." },
  { icon: Trash2, number: "4", title: "Decide", description: "Landlord reviews the score, then sensitive data is auto-deleted." },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b bg-card">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            How AJAR works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            From first browse to signed lease, every step builds a verifiable trail of trust.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative rounded-2xl border bg-background p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary font-heading text-sm font-semibold text-primary-foreground">
                  {step.number}
                </span>
                <step.icon className="size-5 text-muted-foreground" aria-hidden />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const benefits = [
  "Timestamped evidence trail on every application",
  "Sensitive documents auto-delete 30 days after a decision",
  "Verified property ownership against the national registry",
  "Transparent score breakdown — no black-box decisions",
]

export function TrustHighlight() {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border bg-accent/40 p-6 sm:p-8"
        >
          <div className="flex items-center gap-2 text-primary">
            <Clock className="size-5" aria-hidden />
            <span className="text-sm font-semibold uppercase tracking-wide">Privacy by design</span>
          </div>
          <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-balance">
            Evidence when it matters, deleted when it doesn&apos;t
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <motion.li
                key={benefit}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className="flex items-start gap-2 text-sm"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                <span className="text-muted-foreground">{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

export function CallToAction() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mx-auto max-w-2xl font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Ready to rent on trust?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80 text-pretty">
            Join landlords and tenants building Jordan&apos;s most trusted rental marketplace.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/browse">Browse properties</Link>
            </Button>
            <Button
              size="lg"
              asChild
              className="border border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/verification">Get started</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

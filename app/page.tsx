import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  Hero,
  Stats,
  Verification,
  HowItWorks,
  TrustHighlight,
  CallToAction,
} from "@/components/landing-sections"
import { PropertyCard } from "@/components/property-card"
import { TrustScoreCard } from "@/components/trust-score-card"
import { Button } from "@/components/ui/button"
import { properties } from "@/lib/data"

export default function HomePage() {
  const featured = properties.filter((p) => p.ownershipVerified).slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Verification />

        {/* Trust score preview */}
        <section id="trust-score" className="border-b bg-card">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                The AJAR Trust Score, explained
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
                Every verified profile receives a single, transparent score from 0 to 100. Landlords see exactly why a
                tenant is low, medium, or high risk — broken down across identity, income, employment, and payment
                history.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
                No black boxes. Just evidence, weighted fairly and refreshed as new signals arrive.
              </p>
              <Button className="mt-6" asChild>
                <Link href="/trust-score">
                  View your trust score
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>
            <div className="mx-auto w-full max-w-md">
              <TrustScoreCard
                score={87}
                subtitle="Example: verified tenant"
                breakdown={{ payment: 92, income: 85, employment: 88, identity: 95 }}
              />
            </div>
          </div>
        </section>

        <HowItWorks />
        <TrustHighlight />

        {/* Featured properties */}
        <section className="border-b">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                  Featured verified listings
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Hand-picked properties with verified ownership and trusted landlords.
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/browse">
                  View all
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
          </div>
        </section>

        <CallToAction />
      </main>
      <SiteFooter />
    </div>
  )
}

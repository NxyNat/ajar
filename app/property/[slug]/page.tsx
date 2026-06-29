import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  BadgeCheck,
  Check,
  ArrowLeft,
  Star,
  MessageSquare,
  CalendarClock,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PropertyGallery } from "@/components/property-gallery"
import { TrustScoreBadge } from "@/components/trust-score-badge"
import { TrustReportPanel } from "@/components/trust-report-panel"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { getPropertyBySlug, getLandlord, properties } from "@/lib/data"

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const property = getPropertyBySlug(slug)
  if (!property) return { title: "Property not found — AJAR" }
  return {
    title: `${property.title} — AJAR`,
    description: property.description.slice(0, 150),
  }
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const property = getPropertyBySlug(slug)
  if (!property) notFound()
  const landlord = getLandlord(property.landlordId)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/browse"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to browse
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            {/* Left column */}
            <div>
              <PropertyGallery images={property.gallery} title={property.title} />

              <div className="mt-8">
                <div className="flex flex-wrap items-center gap-2">
                  {property.ownershipVerified ? (
                    <Badge className="gap-1 bg-success text-success-foreground hover:bg-success">
                      <BadgeCheck className="size-3.5" aria-hidden />
                      Verified ownership
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">
                      Ownership pending
                    </Badge>
                  )}
                  {property.furnished && <Badge variant="secondary">Furnished</Badge>}
                  <Badge variant="secondary">{property.district}</Badge>
                </div>

                <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance">
                  {property.title}
                </h1>
                <p className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="size-4" aria-hidden />
                  {property.address}
                </p>

                <div className="mt-6 flex flex-wrap gap-6 rounded-2xl border bg-card p-5">
                  <Feature icon={BedDouble} label="Bedrooms" value={String(property.bedrooms)} />
                  <Feature icon={Bath} label="Bathrooms" value={String(property.bathrooms)} />
                  <Feature icon={Maximize} label="Area" value={`${property.area} m²`} />
                  <Feature
                    icon={CalendarClock}
                    label="Listed"
                    value={property.listedDaysAgo === 0 ? "Today" : `${property.listedDaysAgo}d ago`}
                  />
                </div>

                <section className="mt-8">
                  <h2 className="font-heading text-xl font-semibold">About this property</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground text-pretty">{property.description}</p>
                </section>

                <section className="mt-8">
                  <h2 className="font-heading text-xl font-semibold">Amenities</h2>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {property.amenities.map((amenity) => (
                      <li key={amenity} className="flex items-center gap-2 text-sm">
                        <span className="flex size-5 items-center justify-center rounded-full bg-success/10 text-success">
                          <Check className="size-3.5" aria-hidden />
                        </span>
                        <span className="text-muted-foreground">{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="mt-8">
                  <h2 className="font-heading text-xl font-semibold">Verification & evidence</h2>
                  <dl className="mt-4 grid gap-px overflow-hidden rounded-2xl border bg-border text-sm sm:grid-cols-2">
                    <EvidenceRow label="Ownership status" value={property.ownershipVerified ? "Verified" : "Pending"} />
                    <EvidenceRow label="Registry ID" value={property.registryId} />
                    <EvidenceRow label="Listing status" value={property.status} />
                    <EvidenceRow label="City" value={property.city} />
                  </dl>
                </section>
              </div>
            </div>

            {/* Right column — sticky sidebar */}
            <div className="lg:sticky lg:top-24 lg:h-fit lg:self-start">
              <div className="space-y-6">
                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                  <p>
                    <span className="font-heading text-3xl font-semibold">JD {property.price.toLocaleString()}</span>
                    <span className="text-muted-foreground"> / month</span>
                  </p>
                  <Button className="mt-4 w-full" size="lg">
                    Request to apply
                  </Button>
                  <Button variant="outline" className="mt-2 w-full">
                    <MessageSquare className="size-4" aria-hidden />
                    Contact landlord
                  </Button>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Applying starts your verified, timestamped evidence trail.
                  </p>
                </div>

                {landlord && (
                  <div className="rounded-2xl border bg-card p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                      <Avatar className="size-12">
                        <AvatarFallback
                          style={{ backgroundColor: landlord.avatarColor }}
                          className="font-medium text-primary-foreground"
                        >
                          {landlord.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-heading font-semibold">{landlord.name}</p>
                        <p className="truncate text-sm text-muted-foreground">
                          {landlord.companyName ?? "Independent landlord"}
                        </p>
                      </div>
                      <TrustScoreBadge score={landlord.trustScore} size="lg" />
                    </div>

                    <Separator className="my-4" />

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <Metric value={`${landlord.rating}`} label="Rating" icon />
                      <Metric value={`${landlord.responseRate}%`} label="Response" />
                      <Metric value={`${landlord.reviewCount}`} label="Reviews" />
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">Member since {landlord.joinedYear}</p>
                  </div>
                )}

                {landlord && <TrustReportPanel landlord={landlord} />}
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

function Feature({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
        <Icon className="size-5" aria-hidden />
      </span>
      <div>
        <p className="text-sm font-semibold">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}

function EvidenceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-card px-4 py-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  )
}

function Metric({ value, label, icon }: { value: string; label: string; icon?: boolean }) {
  return (
    <div>
      <p className="flex items-center justify-center gap-1 font-heading font-semibold">
        {icon && <Star className="size-3.5 fill-warning text-warning" aria-hidden />}
        {value}
      </p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

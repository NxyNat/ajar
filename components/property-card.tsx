"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { BedDouble, Bath, Maximize, MapPin, BadgeCheck, Heart } from "lucide-react"
import { getLandlord, type Property } from "@/lib/data"
import { TrustScoreBadge } from "@/components/trust-score-badge"
import { cn } from "@/lib/utils"

interface PropertyCardProps {
  property: Property
  index?: number
}

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const landlord = getLandlord(property.landlordId)
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      <Link
        href={`/property/${property.slug}`}
        className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={property.image || "/placeholder.svg"}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cn(
              "object-cover transition duration-500 group-hover:scale-110",
              !imageLoaded && "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-muted" />
          )}

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {property.ownershipVerified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-success px-2.5 py-1 text-xs font-medium text-white shadow-sm">
                <BadgeCheck className="size-3.5" aria-hidden />
                Verified
              </span>
            )}
          </div>

          <div className="absolute right-3 top-3">
            {property.furnished && (
              <span className="rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur">
                Furnished
              </span>
            )}
          </div>

          {/* Favorite button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsFavorite(!isFavorite)
            }}
            className="absolute bottom-3 right-3 rounded-full bg-background/90 p-2 shadow-sm backdrop-blur transition hover:bg-background"
          >
            <motion.div
              animate={isFavorite ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={cn(
                  "size-4 transition-colors",
                  isFavorite ? "fill-destructive text-destructive" : "text-muted-foreground"
                )}
              />
            </motion.div>
          </button>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-heading font-semibold leading-snug text-balance">{property.title}</h3>
            {landlord && <TrustScoreBadge score={landlord.trustScore} size="sm" />}
          </div>

          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden />
            {property.district}, {property.city}
          </p>

          <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <BedDouble className="size-4" aria-hidden />
              {property.bedrooms}
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="size-4" aria-hidden />
              {property.bathrooms}
            </span>
            <span className="flex items-center gap-1.5">
              <Maximize className="size-4" aria-hidden />
              {property.area} m²
            </span>
          </div>

          <div className="mt-4 flex items-end justify-between border-t pt-3">
            <p>
              <span className="font-heading text-lg font-semibold">JD {property.price.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground"> / month</span>
            </p>
            <span className="text-xs text-muted-foreground">
              {property.listedDaysAgo === 0 ? "Today" : `${property.listedDaysAgo}d ago`}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

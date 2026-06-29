"use client"

import { useMemo, useState, useCallback } from "react"
import { Search, SlidersHorizontal, BadgeCheck, X, MapPin, Hop as Home } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { properties, districts, priceBounds, propertyTypes } from "@/lib/data"

const bedroomOptions = [
  { label: "Any", value: "any" },
  { label: "1+", value: "1" },
  { label: "2+", value: "2" },
  { label: "3+", value: "3" },
  { label: "4+", value: "4" },
  { label: "5+", value: "5" },
]

const sortOptions = [
  { label: "Newest first", value: "newest" },
  { label: "Price: low to high", value: "price-asc" },
  { label: "Price: high to low", value: "price-desc" },
  { label: "Highest trust score", value: "trust" },
]

export function BrowseClient() {
  const [query, setQuery] = useState("")
  const [district, setDistrict] = useState("all")
  const [minPrice, setMinPrice] = useState(priceBounds.min)
  const [maxPrice, setMaxPrice] = useState(priceBounds.max)
  const [bedrooms, setBedrooms] = useState("any")
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [furnishedOnly, setFurnishedOnly] = useState(false)
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([])
  const [sort, setSort] = useState("newest")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [showMap, setShowMap] = useState(false)

  const results = useMemo(() => {
    const filtered = properties.filter((p) => {
      if (query && !`${p.title} ${p.district} ${p.address}`.toLowerCase().includes(query.toLowerCase())) return false
      if (district !== "all" && p.district !== district) return false
      if (p.price < minPrice || p.price > maxPrice) return false
      if (bedrooms !== "any" && p.bedrooms < Number(bedrooms)) return false
      if (verifiedOnly && !p.ownershipVerified) return false
      if (furnishedOnly && !p.furnished) return false
      if (selectedPropertyTypes.length > 0 && !selectedPropertyTypes.includes(p.propertyType)) return false
      return true
    })

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "trust":
          return (b.ownershipVerified ? 1 : 0) - (a.ownershipVerified ? 1 : 0)
        default:
          return a.listedDaysAgo - b.listedDaysAgo
      }
    })
  }, [query, district, minPrice, maxPrice, bedrooms, verifiedOnly, furnishedOnly, selectedPropertyTypes, sort])

  function resetFilters() {
    setQuery("")
    setDistrict("all")
    setMinPrice(priceBounds.min)
    setMaxPrice(priceBounds.max)
    setBedrooms("any")
    setVerifiedOnly(false)
    setFurnishedOnly(false)
    setSelectedPropertyTypes([])
  }

  const togglePropertyType = (type: string) => {
    setSelectedPropertyTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const activeFilterCount = [
    district !== "all",
    minPrice !== priceBounds.min || maxPrice !== priceBounds.max,
    bedrooms !== "any",
    verifiedOnly,
    furnishedOnly,
    selectedPropertyTypes.length > 0,
  ].filter(Boolean).length

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Price Range</Label>
          <span className="text-sm font-medium tabular-nums">
            JD {minPrice.toLocaleString()} - JD {maxPrice.toLocaleString()}
          </span>
        </div>
        <Slider
          value={[minPrice, maxPrice]}
          min={priceBounds.min}
          max={priceBounds.max}
          step={50}
          onValueChange={(v) => {
            if (Array.isArray(v)) {
              setMinPrice(v[0])
              setMaxPrice(v[1])
            }
          }}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>JD {priceBounds.min}</span>
          <span>JD {priceBounds.max}</span>
        </div>
      </div>

      {/* District */}
      <div className="space-y-2">
        <Label htmlFor="district">District</Label>
        <Select value={district} onValueChange={(v) => setDistrict(v ?? "all")}>
          <SelectTrigger id="district" className="w-full">
            <SelectValue placeholder="All districts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All districts</SelectItem>
            {districts.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Property Type */}
      <div className="space-y-2">
        <Label>Property Type</Label>
        <div className="flex flex-wrap gap-2">
          {propertyTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => togglePropertyType(type)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                selectedPropertyTypes.includes(type)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:border-primary/40"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Bedrooms */}
      <div className="space-y-2">
        <Label>Bedrooms</Label>
        <div className="flex flex-wrap gap-2">
          {bedroomOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setBedrooms(opt.value)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                bedrooms === opt.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:border-primary/40"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Toggles */}
      <div className="space-y-3">
        <ToggleRow
          label="Verified ownership only"
          checked={verifiedOnly}
          onChange={setVerifiedOnly}
        />
        <ToggleRow label="Furnished only" checked={furnishedOnly} onChange={setFurnishedOnly} />
      </div>

      <Button variant="ghost" size="sm" onClick={resetFilters} className="w-full gap-2">
        <X className="size-4" />
        Clear Filters
      </Button>
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Browse properties</h1>
        <p className="text-muted-foreground">Verified listings across Amman, with trust scores you can rely on.</p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, district, or address"
            className="pl-9"
            aria-label="Search properties"
          />
        </div>
        <div className="flex items-center gap-3">
          <Select value={sort} onValueChange={(v) => setSort(v ?? sortOptions[0].value)}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="lg:hidden gap-2"
            onClick={() => setMobileFiltersOpen((o) => !o)}
          >
            <SlidersHorizontal className="size-4" aria-hidden />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowMap(!showMap)}
            className="hidden sm:inline-flex"
            aria-label="Toggle map"
          >
            <MapPin className="size-4" />
          </Button>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        {/* Desktop Sidebar */}
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-24 rounded-2xl border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading font-semibold">Filters</h2>
              {activeFilterCount > 0 && (
                <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                  {activeFilterCount}
                </span>
              )}
            </div>
            <FilterContent />
          </div>
        </aside>

        {/* Mobile Filters */}
        <AnimatePresence>
          {mobileFiltersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden rounded-2xl border bg-card p-5 lg:hidden"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-heading font-semibold">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="rounded-lg p-1 hover:bg-muted"
                >
                  <X className="size-4" />
                </button>
              </div>
              <FilterContent />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <div className="flex-1">
          {/* Map placeholder */}
          <AnimatePresence>
            {showMap && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 300 }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden rounded-2xl border bg-card"
              >
                <div className="flex h-full items-center justify-center bg-muted">
                  <div className="text-center">
                    <MapPin className="mx-auto size-10 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Interactive Map</p>
                    <p className="text-xs text-muted-foreground">Property locations across Amman</p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {results.slice(0, 4).map((p) => (
                        <div key={p.id} className="flex items-center gap-1 rounded-full bg-background px-2 py-1 text-xs">
                          <Home className="size-3 text-primary" />
                          {p.district}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{results.length}</span>{" "}
              {results.length === 1 ? "property" : "properties"} found
            </p>
            <button
              type="button"
              onClick={() => setVerifiedOnly((v) => !v)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                verifiedOnly
                  ? "border-success bg-success/10 text-success"
                  : "text-muted-foreground hover:border-success/40"
              }`}
            >
              <BadgeCheck className="size-4" aria-hidden />
              Verified only
            </button>
          </div>

          {results.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-dashed bg-card p-12 text-center"
            >
              <p className="font-heading text-lg font-semibold">No properties match your filters</p>
              <p className="mt-1 text-sm text-muted-foreground">Try widening your price range or clearing filters.</p>
              <Button variant="outline" className="mt-4" onClick={resetFilters}>
                Reset filters
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 text-left text-sm"
    >
      <span className="text-muted-foreground">{label}</span>
      <span
        className={`relative h-5 w-9 shrink-0 rounded-full transition ${checked ? "bg-primary" : "bg-muted"}`}
      >
        <span
          className={`absolute top-0.5 size-4 rounded-full bg-background shadow transition-all ${
            checked ? "left-[1.125rem]" : "left-0.5"
          }`}
        />
      </span>
    </button>
  )
}

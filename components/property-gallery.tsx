"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0)
  const safeImages = images.length > 0 ? images : ["/placeholder.svg"]

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border bg-muted">
        <Image
          src={safeImages[active] || "/placeholder.svg"}
          alt={`${title} — photo ${active + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />
      </div>
      {safeImages.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {safeImages.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-lg border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active === i ? "ring-2 ring-primary" : "opacity-80 hover:opacity-100",
              )}
              aria-label={`View photo ${i + 1}`}
              aria-pressed={active === i}
            >
              <Image src={img || "/placeholder.svg"} alt="" fill sizes="20vw" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

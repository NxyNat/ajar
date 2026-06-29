import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BrowseClient } from "@/components/browse-client"

export const metadata: Metadata = {
  title: "Browse Properties — AJAR",
  description: "Browse verified rental properties across Amman with trusted, scored landlords.",
}

export default function BrowsePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <BrowseClient />
      </main>
      <SiteFooter />
    </div>
  )
}

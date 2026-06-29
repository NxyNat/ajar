"use client"

import Link from "next/link"
import { useState } from "react"
import { Hop as Home, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Home className="size-5" aria-hidden />
          </span>
          <span className="font-heading text-xl font-semibold tracking-tight">AJAR</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <Link href="/browse" className="transition hover:text-foreground">
            Browse
          </Link>
          <Link href="/dashboard" className="transition hover:text-foreground">
            Dashboard
          </Link>
          <Link href="/trust-score" className="transition hover:text-foreground">
            Trust Score
          </Link>
          <Link href="/verification" className="transition hover:text-foreground">
            Verify
          </Link>
          <Link href="/#how-it-works" className="transition hover:text-foreground">
            How it works
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
            <Link href="/browse">Sign in</Link>
          </Button>
          <Button size="sm" asChild className="hidden sm:inline-flex">
            <Link href="/browse">Get started</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            <Link href="/browse" className="rounded-lg px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
              Browse
            </Link>
            <Link href="/dashboard" className="rounded-lg px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
              Dashboard
            </Link>
            <Link href="/trust-score" className="rounded-lg px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
              Trust Score
            </Link>
            <Link href="/verification" className="rounded-lg px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
              Verify
            </Link>
            <Link href="/#how-it-works" className="rounded-lg px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
              How it works
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

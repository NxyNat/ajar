import Link from "next/link"
import { Hop as Home } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Home className="size-5" aria-hidden />
              </span>
              <span className="font-heading text-xl font-semibold tracking-tight">AJAR</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Verified-trust platform connecting landlords and tenants in Jordan&apos;s rental market through evidence,
              not guesswork.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FooterColumn
              title="Platform"
              links={[
                { label: "Browse properties", href: "/browse" },
                { label: "Dashboard", href: "/dashboard" },
                { label: "Trust Score", href: "/trust-score" },
                { label: "How it works", href: "/#how-it-works" },
              ]}
            />
            <FooterColumn
              title="For landlords"
              links={[
                { label: "List a property", href: "/browse" },
                { label: "Verification", href: "/verification" },
                { label: "Pricing", href: "/#" },
              ]}
            />
            <FooterColumn
              title="Company"
              links={[
                { label: "About", href: "/#" },
                { label: "Privacy", href: "/#" },
                { label: "Contact", href: "/#" },
              ]}
            />
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AJAR · German Jordanian University · Thiqa</p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="font-heading text-sm font-semibold">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="transition hover:text-foreground">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

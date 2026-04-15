import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SITE } from '@/lib/constants'

const sections = [
  {
    title: 'Shop',
    links: [
      { href: '/shop', label: 'All products' },
      { href: '/collections', label: 'Collections' },
      { href: '/shop?filter=new', label: 'New arrivals' },
      { href: '/shop?filter=sale', label: 'Sale' },
    ],
  },
  {
    title: 'Brand',
    links: [
      { href: '/about', label: 'Our story' },
      { href: '/events', label: 'Events' },
      { href: '/gallery', label: 'Gallery' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Help',
    links: [
      { href: '/shipping', label: 'Shipping' },
      { href: '/returns', label: 'Returns' },
      { href: '/size-guide', label: 'Size guide' },
      { href: '/faq', label: 'FAQ' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
    ],
  },
] as const

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-ink-900/60">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="font-display text-3xl uppercase tracking-wide text-sand">
              {SITE.shortName}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-clay">
              {SITE.description}
            </p>
            <form
              action="/api/newsletter"
              method="post"
              className="mt-6 flex max-w-sm items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1 pl-5"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Email address"
                aria-label="Email address"
                className="flex-1 bg-transparent text-sm text-sand placeholder:text-tide focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-ivory px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-ink transition hover:opacity-90"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {sections.map((s) => (
              <div key={s.title}>
                <h4 className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-clay">
                  {s.title}
                </h4>
                <ul className="mt-4 space-y-2 text-sm text-sand/90">
                  {s.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="transition hover:text-ivory">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-[0.65rem] uppercase tracking-[0.28em] text-tide sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Made with care in Namibia.</p>
        </div>
      </Container>
    </footer>
  )
}

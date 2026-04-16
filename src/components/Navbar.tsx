'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '@/state/CartContext'
import { CartDrawer } from '@/components/commerce/CartDrawer'
import { cn } from '@/lib/cn'
import { NAV_LINKS } from '@/lib/constants'

export default function Navbar() {
  const pathname = usePathname()
  const { count } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) {
      document.body.classList.remove('overflow-hidden')
      return
    }
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    document.body.classList.add('overflow-hidden')
    window.addEventListener('keydown', onEsc)
    return () => {
      document.body.classList.remove('overflow-hidden')
      window.removeEventListener('keydown', onEsc)
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[80] border-b border-white/10 transition-all duration-300',
          scrolled
            ? 'bg-ink/90 backdrop-blur-xl py-0'
            : 'bg-transparent backdrop-blur-sm py-0',
        )}
      >
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="relative block h-7 w-7">
              <Image
                src="/assets/logo.png"
                alt="GLB logo"
                fill
                sizes="28px"
                className="object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
                priority
              />
            </span>
            <span className="font-display text-lg uppercase tracking-[0.28em] text-sand">
              Give Love Back
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.filter((l) => l.href !== '/').map((item) => {
              const active = pathname?.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-[0.66rem] font-semibold uppercase tracking-[0.26em] transition',
                    active ? 'text-ivory' : 'text-clay/70 hover:text-ivory',
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              aria-label={`Cart (${count} items)`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 transition hover:border-white/40"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-sand">
                <path
                  d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-ivory px-1 text-[0.6rem] font-bold tabular-nums text-ink">
                  {count}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="rounded-full border border-white/20 bg-black/45 px-4 py-2 text-[0.64rem] font-semibold uppercase tracking-[0.25em] text-sand transition hover:border-white/45 md:hidden"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[85] bg-black/70 backdrop-blur-sm md:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.17, 0.67, 0.36, 0.99] }}
              className="ml-auto h-full w-[82vw] max-w-sm border-l border-white/10 bg-ink-700 p-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <span className="text-[0.64rem] uppercase tracking-[0.24em] text-clay/70">
                  Navigation
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="rounded-full border border-white/20 px-3 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-sand"
                >
                  Close
                </button>
              </div>

              <nav className="mt-8 space-y-4">
                {NAV_LINKS.map((item) => {
                  const active =
                    item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        'block border-b border-white/10 pb-4 font-display text-3xl uppercase tracking-[0.06em]',
                        active ? 'text-ivory' : 'text-clay/80',
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}

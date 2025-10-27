"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import CartWidget from "./CartWidget";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/store", label: "Store" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      document.body.classList.remove("overflow-hidden");
      return;
    }
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  const linkClass = (href) => {
    const isActive = href === "/" ? pathname === "/" : pathname?.startsWith(href);
    return `relative text-xs uppercase tracking-[0.38em] transition ${
      isActive ? "text-flare" : "text-sand/80 hover:text-sand"
    }`;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "bg-black/70 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="font-display text-xl uppercase tracking-[0.32em] text-sand">
          Give Love Back
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(href)}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <CartWidget />
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((value) => !value)}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-sand shadow-inner shadow-black/30 transition hover:border-white/30 md:hidden"
          >
            <span
              className={`absolute h-[2px] w-6 -translate-y-2 rounded-full bg-sand transition-transform ${
                menuOpen ? "translate-y-0 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute h-[2px] w-6 rounded-full bg-sand transition-opacity ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-[2px] w-6 translate-y-2 rounded-full bg-sand transition-transform ${
                menuOpen ? "-translate-y-0 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="space-y-6 border-t border-white/5 bg-black/85 px-6 pb-8 pt-6 backdrop-blur-xl">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="block text-sm uppercase tracking-[0.4em] text-sand/80 transition hover:text-flare"
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

"use client";

import Link from "next/link";

export default function Store() {
  return (
    <main className="mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-center px-6 pb-24 pt-32 text-center sm:px-10 sm:pt-36">
      <div className="space-y-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-flare/80">
          Store
        </span>

        <h1 className="font-display text-5xl tracking-tight text-sand sm:text-6xl lg:text-7xl">
          Coming Soon
        </h1>

        <p className="mx-auto max-w-xl text-base leading-relaxed text-clay/80 md:text-lg">
          We&rsquo;re curating something special. Our store will launch soon with thoughtfully designed products that
          give back with purpose.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/events"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-flare via-pulse to-flare px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-ink shadow-[0_18px_32px_rgba(255,107,61,0.32)] transition hover:shadow-[0_22px_40px_rgba(255,107,61,0.42)]"
          >
            View Events
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-7 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-sand transition hover:bg-white/20"
          >
            Get Notified
          </Link>
        </div>

        <div className="mt-16 grid gap-6 pt-8 text-left sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="font-display text-xl text-sand">Purposeful Design</h3>
            <p className="mt-3 text-xs leading-relaxed text-clay/75">
              Every product tells a story of care, creativity, and impact.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="font-display text-xl text-sand">Limited Editions</h3>
            <p className="mt-3 text-xs leading-relaxed text-clay/75">
              Curated collections built with intention, not mass production.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="font-display text-xl text-sand">Give Love Back</h3>
            <p className="mt-3 text-xs leading-relaxed text-clay/75">
              Each purchase supports meaningful causes and creative initiatives.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
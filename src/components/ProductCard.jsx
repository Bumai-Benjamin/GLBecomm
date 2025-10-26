import Image from 'next/image'
import Link from 'next/link'

import { useCart } from '../state/CartContext'

export default function ProductCard({ p }) {
  const { add } = useCart()

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[28px] border border-white/5 bg-white/5 backdrop-blur transition hover:border-white/30 hover:bg-white/10">
      <Link href={`/store/${p.id}`} className="relative h-72 overflow-hidden">
        <Image
          src={`/assets/${p.file}`}
          alt={p.name}
          fill
          sizes="(min-width: 1024px) 23vw, (min-width: 768px) 45vw, 90vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[0.6rem] uppercase tracking-[0.35em] text-sand/80">
          {p.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <header>
          <h3 className="font-display text-xl text-sand">{p.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-clay/75">{p.description}</p>
        </header>

        <footer className="mt-auto flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => add(p.id)}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-flare via-pulse to-flare px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-ink shadow-[0_14px_24px_rgba(255,107,61,0.32)] transition hover:shadow-[0_18px_32px_rgba(255,107,61,0.42)]"
          >
            Add To Cart
          </button>
          <Link
            href={`/store/${p.id}`}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-sand/80 transition hover:border-white/40"
          >
            Details
          </Link>
        </footer>
      </div>
    </article>
  )
}

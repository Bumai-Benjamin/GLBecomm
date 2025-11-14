"use client";

import Image from "next/image";
import Link from "next/link";

import { PRODUCTS } from "../../../src/data/products";
import { formatPrice } from "../../../src/lib/pricing";
import { useCart } from "../../../src/state/CartContext";

export default function ProductDetails({ params }) {
  const { id } = params;
  const product = PRODUCTS.find((item) => item.id === id);
  const { add } = useCart();

  if (!product) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center gap-6 px-6 text-center text-sand">
        <h2 className="font-display text-3xl">Product Not Found</h2>
        <Link
          href="/store"
          className="rounded-full border border-white/10 px-6 py-3 text-xs uppercase tracking-[0.35em] text-sand/80 transition hover:border-white/30"
        >
          Back to Store
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-32 sm:px-10 sm:pt-36">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr]">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-4">
          <div className="relative h-[540px] overflow-hidden rounded-[28px]">
            <Image
              src={`/assets/${product.file}`}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 90vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-pulse/80">
              Edition Brief
            </span>
            <h1 className="mt-4 font-display text-4xl tracking-tight text-sand">{product.name}</h1>
            <div className="mt-4 flex items-center gap-4 text-xs uppercase tracking-[0.35em] text-clay/70">
              <span className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-sand">
                {formatPrice(product.price)}
              </span>
              <span>Tax Included</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-clay/80">
              {product.description} Built for the ones who run the city grid and need gear that stays composed after
              every detour.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => add(product.id)}
              className="flex-1 rounded-full bg-gradient-to-r from-flare via-pulse to-flare px-8 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-ink shadow-[0_16px_28px_rgba(255,107,61,0.32)] transition hover:shadow-[0_20px_38px_rgba(255,107,61,0.42)]"
            >
              Add to Cart
            </button>
            <Link
              href="/store"
              className="flex-1 rounded-full border border-white/10 px-8 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-sand/80 transition hover:border-white/40"
            >
              Back to Collection
            </Link>
          </div>

          {Array.isArray(product.specs) && product.specs.length > 0 && (
            <section>
              <h2 className="text-xs uppercase tracking-[0.35em] text-clay/70">Specifications</h2>
              <dl className="mt-4 grid gap-3 text-sm text-clay/75">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex items-start justify-between gap-3 rounded-2xl border border-white/5 bg-black/20 px-4 py-3">
                    <dt className="text-xs uppercase tracking-[0.35em] text-sand/70">{spec.label}</dt>
                    <dd className="flex-1 text-right text-sm text-clay/80">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <section className="rounded-2xl border border-white/5 bg-black/20 px-5 py-4 text-xs leading-relaxed text-clay/70">
            Ships in 2–4 business days. Free exchanges within 30 days. Each piece is cut in limited batches and numbered
            in-house before release.
          </section>
        </div>
      </div>
    </main>
  );
}
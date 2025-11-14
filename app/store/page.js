"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import Logo from "../../src/components/Logo";
import ProductCard from "../../src/components/ProductCard";
import { PRODUCTS } from "../../src/data/products";

const COLLECTION_FILTERS = ["All", "GLB Classic", "Embrace It", "Accessories"];

export default function Store() {
  const [activeCollection, setActiveCollection] = useState("All");

  const filteredProducts = useMemo(() => {
    if (activeCollection === "All") return PRODUCTS;
    return PRODUCTS.filter((product) => product.collection === activeCollection);
  }, [activeCollection]);

  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-32 sm:px-10 sm:pt-36">
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4">
          <div className="inline-flex flex-wrap items-center gap-2">
            <Logo size={24} />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-flare/80 sm:text-xs sm:tracking-[0.35em]">
              Store
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="font-display text-4xl tracking-tight text-sand sm:text-5xl md:text-6xl">
              Capsule pieces for the movement.
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-clay/80 md:text-base">
              Explore core GLB classics, Embrace It tees, and accessories pulled straight from the catalogue. Every piece is
              released in limited runs and built to carry love into everyday spaces.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/assets/glb-catalog.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-sand/85 transition hover:border-white/40 hover:bg-white/10"
            >
              Download Full Catalogue
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-sand transition hover:bg-white/20"
            >
              Get Drop Alerts
            </Link>
          </div>
        </div>

        <div className="mt-4 flex items-center md:mt-0">
          <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-[0.6rem] uppercase tracking-[0.28em] text-clay/70">
            {COLLECTION_FILTERS.map((collection) => {
              const isActive = activeCollection === collection;
              return (
                <button
                  key={collection}
                  type="button"
                  onClick={() => setActiveCollection(collection)}
                  className={`rounded-full px-4 py-2 transition ${
                    isActive
                      ? "bg-white text-ink shadow-[0_10px_20px_rgba(0,0,0,0.35)]"
                      : "bg-transparent text-sand/70 hover:bg-white/10 hover:text-sand"
                  }`}
                >
                  {collection}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <section className="mt-12">
        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-10 text-center text-sm leading-relaxed text-clay/80">
            No pieces are available in this collection yet. Check another filter or download the catalogue to see what&apos;s
            coming.
          </div>
        ) : (
          <div className="grid gap-6 pt-2 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} p={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
"use client";

import { useMemo, useState } from "react";

import ProductCard from "../../src/components/ProductCard";
import { PRODUCTS } from "../../src/data/products";

export default function Store() {
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return PRODUCTS;
    return PRODUCTS.filter((product) => {
      const haystack = `${product.name} ${product.description ?? ""}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [query]);

  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-32 sm:px-10 sm:pt-36">
      <header className="flex flex-col gap-6 border-b border-white/5 pb-10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-flare/80">
            Store // Editions
          </span>
          <h1 className="mt-4 font-display text-4xl tracking-tight text-sand sm:text-5xl">
            Streetwear collection engineered for night runs.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-clay/75">
            Filter the drop to lock in your kit. Every style is built in limited batches with thermal-reactive detailing,
            recycled blends, and movement-focused cuts.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex w-full flex-col gap-2 text-xs uppercase tracking-[0.35em] text-clay/60 sm:w-auto sm:flex-1">
            Search The Collection
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Type product name or detail"
              className="w-full rounded-full border border-white/10 bg-black/40 px-5 py-3 text-sm text-sand placeholder:text-clay/50 focus:border-flare/60 focus:outline-none"
            />
          </label>
        </div>
      </header>

      <section className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.length === 0 && (
          <p className="col-span-full rounded-[28px] border border-white/10 bg-white/5 p-10 text-center text-xs uppercase tracking-[0.4em] text-clay/60">
            No products match that filter.
          </p>
        )}
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} p={product} />
        ))}
      </section>
    </main>
  );
}
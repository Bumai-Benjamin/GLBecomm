"use client";

import { useEffect, useState } from "react";

import ProductCarousel from "./ProductCarousel";

export default function ProductCarouselShell() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="mx-auto mt-24 flex h-[420px] w-full max-w-5xl items-center justify-center rounded-3xl border border-white/5 bg-charcoal/60 text-sm uppercase tracking-[0.4em] text-clay">
        Loading showcase
      </div>
    );
  }

  return <ProductCarousel />;
}

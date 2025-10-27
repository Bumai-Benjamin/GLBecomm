"use client";

import { useEffect, useState } from "react";

export default function ProductCarouselShell() {
  const [Carousel, setCarousel] = useState(null);

  useEffect(() => {
    let active = true;

    import("./ProductCarousel")
      .then((mod) => {
        if (active) setCarousel(() => mod.default);
      })
      .catch((error) => {
        console.error("Failed to load ProductCarousel", error);
      });

    return () => {
      active = false;
    };
  }, []);

  if (!Carousel) {
    return (
      <div className="mx-auto mt-24 flex h-[420px] w-full max-w-5xl items-center justify-center rounded-3xl border border-white/5 bg-charcoal/60 text-sm uppercase tracking-[0.4em] text-clay">
        Loading showcase
      </div>
    );
  }

  const RenderCarousel = Carousel;

  return <RenderCarousel />;
}

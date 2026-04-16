"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { PRODUCTS } from "../src/data/products";
import { formatPrice } from "../src/lib/pricing";

const MARQUEE_ITEMS = [
  "Street Uniform",
  "Limited Drops",
  "Namibia",
  "Community First",
  "Give Love Back",
  "Run The City",
];

export default function Home() {
  const [heroSlides, setHeroSlides] = useState([]);

  const campaignImage = heroSlides[0] || "/assets/hero.jpg";

  const featuredProducts = useMemo(() => PRODUCTS.slice(0, 3), []);

  useEffect(() => {
    let mounted = true;

    const loadSlides = async () => {
      try {
        const response = await fetch("/api/hero-slideshow", { cache: "no-store" });
        const payload = await response.json();
        if (!mounted) return;
        if (payload?.success && Array.isArray(payload.data)) {
          setHeroSlides(payload.data);
        }
      } catch (error) {
        console.error("Failed to load hero slides", error);
      }
    };

    loadSlides();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main>
      <section className="brand-hero relative">
        <div className="brand-hero-media">
          <Image src={campaignImage} alt="GLB campaign frame" fill priority className="object-cover" />
          <div className="brand-hero-overlay" />
        </div>

        <div className="brand-shell relative z-10 pb-12 pt-40 sm:pb-16 lg:pb-20 lg:pt-44">
          <p className="brand-eyebrow">GLB Performance Archive 2026</p>
          <h1 className="brand-title mt-4 max-w-4xl">Built For The Street. Driven By Heart.</h1>
          <p className="brand-subtitle mt-6 max-w-2xl text-sm sm:text-base">
            Inspired by global sport culture and shaped by community, GLB crafts statement essentials for the pace,
            pressure, and pride of everyday movement.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/shop" className="brand-button brand-button-primary">
              Shop The Drop
            </Link>
            <Link href="/events" className="brand-button brand-button-ghost">
              Reserve Event Access
            </Link>
          </div>

          <div className="brand-grid mt-10">
            <article className="brand-stat span-4">
              <p className="brand-stat-label">Collections</p>
              <p className="brand-stat-value">06 Capsules</p>
            </article>
            <article className="brand-stat span-4">
              <p className="brand-stat-label">Community Reach</p>
              <p className="brand-stat-value">4 Founders. 1 Movement.</p>
            </article>
            <article className="brand-stat span-4">
              <p className="brand-stat-label">Current Mode</p>
              <p className="brand-stat-value">Limited Release</p>
            </article>
          </div>
        </div>
      </section>

      <section className="brand-marquee">
        <div className="brand-marquee-track" aria-hidden="true">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
            <span key={`${item}-${index}`} className="brand-marquee-item">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="brand-section">
        <div className="brand-shell">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="brand-eyebrow">Featured Pieces</p>
              <h2 className="mt-3 font-display text-4xl uppercase tracking-[0.03em] text-white sm:text-5xl">
                Performance-Ready Essentials
              </h2>
            </div>
            <Link href="/shop" className="brand-button brand-button-ghost">
              View Full Collection
            </Link>
          </div>

          <div className="brand-grid mt-8">
            {featuredProducts.map((product) => (
              <article key={product.id} className="brand-media-card span-4 rounded-3xl">
                <Link href={`/shop/${product.id}`} className="block">
                  <div className="relative h-[380px]">
                    <Image src={`/assets/${product.file}`} alt={product.name} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
                  </div>
                  <div className="p-5">
                    <p className="brand-chip">{product.collection}</p>
                    <h3 className="mt-4 font-display text-2xl uppercase text-white">{product.name}</h3>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm tracking-[0.18em] text-zinc-300">{formatPrice(product.price)}</span>
                      <span className="text-xs uppercase tracking-[0.28em] text-zinc-400">Details</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="brand-section pt-0">
        <div className="brand-shell brand-panel rounded-3xl p-7 sm:p-10">
          <div className="brand-grid items-start">
            <div className="span-7">
              <p className="brand-eyebrow">Movement Vision</p>
              <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] text-white sm:text-5xl">
                Not Just What You Wear. What You Represent.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                GLB designs apparel as social currency for kindness, ambition, and creative identity. Each release is
                built to perform in motion while carrying purpose in message.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/about" className="brand-button brand-button-primary">
                  Read Our Story
                </Link>
                <Link href="/contact" className="brand-button brand-button-ghost">
                  Partner With GLB
                </Link>
              </div>
            </div>

            <div className="span-5 brand-panel-soft rounded-2xl p-5 sm:p-6">
              <p className="brand-eyebrow">Community Pulse</p>
              <ul className="mt-4 space-y-4 text-sm text-zinc-300">
                <li className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
                  <span>Street Cache Exhibition</span>
                  <span className="text-zinc-500">Live</span>
                </li>
                <li className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
                  <span>Insider List</span>
                  <span className="text-zinc-500">Open</span>
                </li>
                <li className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
                  <span>Catalog 2026</span>
                  <span className="text-zinc-500">Published</span>
                </li>
                <li className="flex items-start justify-between gap-4">
                  <span>Collab Submissions</span>
                  <span className="text-zinc-500">Reviewing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
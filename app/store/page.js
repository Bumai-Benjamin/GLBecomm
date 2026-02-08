"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, EffectCoverflow } from "swiper/modules";
import gsap from "gsap";
import Image from "next/image";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/thumbs";
import "swiper/css/navigation";

import Logo from "../../src/components/Logo";
import ProductCard from "../../src/components/ProductCard";
import { PRODUCTS } from "../../src/data/products";

const COLLECTION_FILTERS = ["All", "GLB Classic", "Embrace It", "Accessories"];

export default function Store() {
  const [activeCollection, setActiveCollection] = useState("All");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [viewMode, setViewMode] = useState("carousel"); // 'carousel' | 'grid'

  const filteredProducts = useMemo(() => {
    if (activeCollection === "All") return PRODUCTS;
    return PRODUCTS.filter((product) => product.collection === activeCollection);
  }, [activeCollection]);

  useEffect(() => {
    if (viewMode === "carousel") {
      gsap.from(".swiper-thumb-slide", {
        x: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.3,
      });
    }
  }, [viewMode, filteredProducts]);

  return (
    <>
      {viewMode === "carousel" ? (
        // Carousel View
        <main className="relative min-h-screen w-full bg-black overflow-hidden">
          {/* Navigation Bar */}
          <nav className="absolute top-0 left-0 right-0 z-50 h-20 px-6 sm:px-10 flex items-center justify-between text-white">
            <Logo size={24} isLight={false} />
            <button
              onClick={() => setViewMode("grid")}
              className="text-xs uppercase tracking-[0.35em] rounded-full border border-white/20 bg-white/10 px-4 py-2 transition hover:bg-white/20"
            >
              Grid View
            </button>
          </nav>

          {/* Carousel Container */}
          <div className="w-full h-screen">
            {filteredProducts.length === 0 ? (
              <div className="flex items-center justify-center h-full bg-black">
                <div className="text-center text-sand">
                  <p className="text-lg">No products in this collection</p>
                  <button
                    onClick={() => setActiveCollection("All")}
                    className="mt-4 px-4 py-2 rounded-full border border-flare text-flare text-sm"
                  >
                    View All Products
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Main Carousel */}
                <Swiper
                  modules={[Navigation, Thumbs, EffectCoverflow]}
                  effect="coverflow"
                  grabCursor
                  centeredSlides
                  slidesPerView="auto"
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  thumbs={{
                    swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                  }}
                  coverflowEffect={{
                    rotate: 40,
                    stretch: 0,
                    depth: 120,
                    modifier: 1,
                    slideShadows: true,
                  }}
                  speed={800}
                  className="w-full h-full"
                >
                  {filteredProducts.map((product) => (
                    <SwiperSlide key={product.id} className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-black">
                      <div className="relative w-full h-full flex items-center justify-center p-8">
                        {/* Product Image */}
                        <div className="relative w-96 h-96">
                          {product.file && (
                            <Image
                              src={`/assets/${product.file}`}
                              alt={product.name}
                              fill
                              className="object-contain"
                              priority
                            />
                          )}
                        </div>

                        {/* Product Info Overlay */}
                        <div className="absolute bottom-12 left-12 text-white max-w-md">
                          <h2 className="font-display text-5xl font-bold leading-tight mb-2">
                            {product.name}
                          </h2>
                          <p className="text-sand text-sm uppercase tracking-[0.35em] mb-4">
                            {product.collection}
                          </p>
                          <p className="text-sand/80 text-sm mb-6">{product.description}</p>
                          <Link
                            href={`/store/${product.id}`}
                            className="inline-flex items-center gap-2 rounded-full bg-flare px-6 py-2 text-ink text-sm font-semibold uppercase tracking-[0.25em] transition hover:opacity-80"
                          >
                            View Details
                          </Link>
                        </div>

                        {/* Price Badge */}
                        <div className="absolute top-12 right-12 text-right">
                          <p className="text-flare font-display text-3xl font-bold">${product.price}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}

                  {/* Navigation Buttons */}
                  <button className="swiper-button-prev absolute left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition">
                    ←
                  </button>
                  <button className="swiper-button-next absolute right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition">
                    →
                  </button>
                </Swiper>

                {/* Thumbnail Carousel */}
                <div className="absolute bottom-8 right-6 z-40 w-80">
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    slidesPerView={3}
                    spaceBetween={12}
                    watchSlidesVisibility
                    watchSlidesProgress
                    className="thumbs-carousel"
                  >
                    {filteredProducts.map((product) => (
                      <SwiperSlide key={`thumb-${product.id}`} className="swiper-thumb-slide">
                        <div className="relative h-24 w-full bg-white/10 rounded-lg overflow-hidden cursor-pointer border border-white/20 hover:border-white/40 transition group">
                          {product.file && (
                            <Image
                              src={`/assets/${product.file}`}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-110 transition"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                            <p className="text-xs text-sand font-semibold uppercase truncate">
                              {product.name}
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Collection Filter */}
                <div className="absolute bottom-8 left-12 z-40">
                  <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-[0.6rem] uppercase tracking-[0.28em] text-clay/70 backdrop-blur">
                    {COLLECTION_FILTERS.map((collection) => {
                      const isActive = activeCollection === collection;
                      return (
                        <button
                          key={collection}
                          type="button"
                          onClick={() => setActiveCollection(collection)}
                          className={`rounded-full px-3 py-2 transition text-xs ${
                            isActive
                              ? "bg-flare text-ink shadow-[0_10px_20px_rgba(255,107,61,0.3)]"
                              : "bg-transparent text-sand/70 hover:bg-white/10 hover:text-sand"
                          }`}
                        >
                          {collection}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      ) : (
        // Grid View
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

        <div className="mt-4 flex flex-col items-end gap-4 md:mt-0">
          <button
            onClick={() => setViewMode("carousel")}
            className="text-xs uppercase tracking-[0.35em] rounded-full border border-flare/40 bg-flare/10 px-4 py-2 text-flare transition hover:bg-flare/20"
          >
            Carousel View
          </button>
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
      )}
    </>
  );
}
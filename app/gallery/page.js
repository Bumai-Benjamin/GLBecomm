"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Logo from "../../src/components/Logo";

export default function GalleryPage() {
  const [events, setEvents] = useState([]); // [{ slug, name, images: [{title,url}] }]
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [lightbox, setLightbox] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [layoutMode, setLayoutMode] = useState("bento"); // 'bento' | 'grid'

  // Simple neutral blur placeholder (1x1 PNG base64) – could be replaced with dynamic generation later
  const blurDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAA" +
    "AAC0lEQVR42mP8/58BAgMDAwO7AwADVgGcb8xY+QAAAABJRU5ErkJggg==";

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/gallery/events");
        const json = await res.json();
        if (json.success) {
          setEvents(json.data.events || []);
        }
      } catch (err) {
        console.error("Error fetching event gallery:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const images = useMemo(() => {
    if (selectedEvent === "all") {
      return events.flatMap((e) => e.images.map((img) => ({ ...img, event: e })));
    }
    const ev = events.find((e) => e.slug === selectedEvent);
    return ev ? ev.images.map((img) => ({ ...img, event: ev })) : [];
  }, [events, selectedEvent]);

  const openLightbox = (item, index) => {
    setLightbox(item);
    setLightboxIndex(index);
  };
  const closeLightbox = () => {
    setLightbox(null);
    setLightboxIndex(-1);
  };

  const showRelative = useCallback((delta) => {
    if (lightboxIndex < 0) return;
    const total = images.length;
    if (!total) return;
    const nextIndex = (lightboxIndex + delta + total) % total;
    const nextItem = images[nextIndex];
    setLightbox(nextItem);
    setLightboxIndex(nextIndex);
  }, [lightboxIndex, images]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === -1) return;
    const handler = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        showRelative(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showRelative(-1);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, showRelative]);
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:px-10 sm:pt-36">
      <motion.header
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <Logo size={22} />
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-tide/80">
            Event Gallery
          </span>
        </div>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-sand sm:text-5xl">Community in Focus</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-clay/75">
          Relive moments from our events and collaborations. Every image is a reminder that we’re growing together, not alone.
        </p>
      </motion.header>
      {/* Event Selector */}
      <motion.section
        className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <label className="text-xs uppercase tracking-[0.35em] text-clay/60">Event</label>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-sand focus:border-flare/60 focus:outline-none"
          >
            <option value="all">All Events</option>
            {events.map((ev) => (
              <option key={ev.slug} value={ev.slug}>
                {ev.name}
              </option>
            ))}
          </select>
        </div>
        <div className="text-xs text-clay/60">{images.length} image{images.length === 1 ? '' : 's'}</div>
        <div className="hidden flex-1 items-center justify-end gap-2 sm:flex">
          <button
            type="button"
            onClick={() => setLayoutMode("bento")}
            className={`rounded-full border px-4 py-2 text-[0.55rem] font-semibold uppercase tracking-[0.35em] transition ${layoutMode === 'bento' ? 'border-flare/50 bg-flare/10 text-flare' : 'border-white/10 bg-white/5 text-sand/70 hover:border-white/30'}`}
          >
            Bento
          </button>
          <button
            type="button"
            onClick={() => setLayoutMode("grid")}
            className={`rounded-full border px-4 py-2 text-[0.55rem] font-semibold uppercase tracking-[0.35em] transition ${layoutMode === 'grid' ? 'border-flare/50 bg-flare/10 text-flare' : 'border-white/10 bg-white/5 text-sand/70 hover:border-white/30'}`}
          >
            Uniform
          </button>
        </div>
      </motion.section>
      {/* Gallery Grid */}
      <motion.section
        className={layoutMode === 'bento' ? "grid gap-4 sm:grid-cols-6 lg:grid-cols-8" : "grid gap-4 sm:grid-cols-3 lg:grid-cols-4"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {loading ? (
          <div className="col-span-full flex h-64 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-flare border-t-transparent" />
          </div>
        ) : images.length === 0 ? (
          <div className="col-span-full rounded-[28px] border border-white/10 bg-white/5 p-8 text-center text-clay/60">
            No gallery items found
          </div>
        ) : (
          images.map((item, index) => {
            const pattern = index % 8;
            const bentoSpan =
              pattern === 0 ? "sm:col-span-4 lg:col-span-5" :
              pattern === 1 ? "sm:col-span-2 lg:col-span-3" :
              pattern === 2 ? "sm:col-span-2 lg:col-span-3" :
              pattern === 3 ? "sm:col-span-3 lg:col-span-4" :
              pattern === 4 ? "sm:col-span-3 lg:col-span-4" :
              pattern === 5 ? "sm:col-span-2 lg:col-span-2" :
              pattern === 6 ? "sm:col-span-4 lg:col-span-4" :
                              "sm:col-span-2 lg:col-span-2";
            const bentoAspect =
              pattern === 0 ? "aspect-[16/9]" :
              pattern === 1 ? "aspect-square" :
              pattern === 2 ? "aspect-[3/4]" :
              pattern === 3 ? "aspect-[4/3]" :
              pattern === 4 ? "aspect-[5/4]" :
              pattern === 5 ? "aspect-[4/5]" :
              pattern === 6 ? "aspect-[21/9]" :
                              "aspect-square";
            const gridAspect = "aspect-[4/5]";
            const gridSpan = "sm:col-span-1"; // implicit distribution by columns

            const spanClass = layoutMode === 'bento' ? bentoSpan : gridSpan;
            const aspectClass = layoutMode === 'bento' ? bentoAspect : gridAspect;

            return (
              <motion.div
                key={`${item.url}-${index}`}
                className={`group ${spanClass}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * (index % 8), duration: 0.35 }}
                onClick={() => openLightbox(item, index)}
              >
                <div className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 ${aspectClass} cursor-pointer transition hover:border-white/30 hover:bg-white/10`}> 
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 40vw, (min-width: 640px) 50vw, 90vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-5 translate-y-6 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="font-display text-lg text-sand">{item.title}</h3>
                    {item.event && (
                      <p className="mt-2 text-[0.7rem] uppercase tracking-[0.3em] text-sand/70">{item.event.name}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </motion.section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute right-8 top-8 z-10 rounded-full bg-white/10 p-3 text-sand transition hover:bg-white/20"
            onClick={closeLightbox}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {lightboxIndex > -1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={(e) => { e.stopPropagation(); showRelative(-1); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-3 text-sand backdrop-blur transition hover:border-white/40 hover:bg-black/60"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={(e) => { e.stopPropagation(); showRelative(1); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-3 text-sand backdrop-blur transition hover:border-white/40 hover:bg-black/60"
              >
                →
              </button>
            </>
          )}

          <div
            className="mx-auto"
            style={{ width: "min(92vw, 1600px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[92vh] w-full overflow-hidden rounded-2xl">
              <Image
                src={lightbox.url}
                alt={lightbox.title}
                fill
                className="object-contain"
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
            </div>
            <div className="mt-6 text-center">
              <h3 className="font-display text-2xl text-sand">{lightbox.title}</h3>
              {lightbox.event && (
                <p className="mt-2 text-sm text-clay/75">{lightbox.event.name}</p>
              )}
              {lightboxIndex > -1 && (
                <p className="mt-3 text-[0.6rem] uppercase tracking-[0.35em] text-clay/50">{lightboxIndex + 1} / {images.length}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

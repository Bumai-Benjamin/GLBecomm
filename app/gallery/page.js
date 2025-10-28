"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function GalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, image, video
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/gallery");
      const data = await response.json();

      if (data.success) {
        setGallery(data.data);
      }
    } catch (err) {
      console.error("Error fetching gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredGallery = gallery.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  const openLightbox = (item) => {
    setLightbox(item);
  };

  const closeLightbox = () => {
    setLightbox(null);
  };

  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:px-10 sm:pt-36">
      <motion.header
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-tide/80">
          Gallery
        </span>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-sand sm:text-5xl">
          Event Memories
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-clay/75">
          Relive the moments from our past events. Explore photos and videos from our community.
        </p>
      </motion.header>

      {/* Filter */}
      <motion.section
        className="mb-8 flex gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        {["all", "image", "video"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition ${
              filter === type
                ? "bg-gradient-to-r from-flare via-pulse to-flare text-ink shadow-[0_12px_22px_rgba(255,107,61,0.32)]"
                : "border border-white/10 text-sand/80 hover:border-white/30"
            }`}
          >
            {type}
          </button>
        ))}
      </motion.section>

      {/* Gallery Grid */}
      <motion.section
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {loading ? (
          <div className="col-span-full flex h-64 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-flare border-t-transparent" />
          </div>
        ) : filteredGallery.length === 0 ? (
          <div className="col-span-full rounded-[28px] border border-white/10 bg-white/5 p-8 text-center text-clay/60">
            No gallery items found
          </div>
        ) : (
          filteredGallery.map((item, index) => (
            <motion.div
              key={item._id}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 cursor-pointer transition hover:border-white/30 hover:bg-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              onClick={() => openLightbox(item)}
            >
              <div className="relative h-80 overflow-hidden">
                {item.type === "image" ? (
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="relative h-full w-full bg-gradient-to-br from-charcoal to-ash flex items-center justify-center">
                    <div className="text-6xl">▶️</div>
                    {item.thumbnail && (
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover opacity-40"
                      />
                    )}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-8 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="font-display text-xl text-sand">{item.title}</h3>
                  {item.description && (
                    <p className="mt-2 text-sm text-clay/75">{item.description}</p>
                  )}
                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[0.6rem] uppercase tracking-[0.3em] text-sand/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
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

          <div className="max-h-[90vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            {lightbox.type === "image" ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                <Image
                  src={lightbox.url}
                  alt={lightbox.title}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
                <video src={lightbox.url} controls className="h-full w-full" />
              </div>
            )}
            <div className="mt-6 text-center">
              <h3 className="font-display text-2xl text-sand">{lightbox.title}</h3>
              {lightbox.description && (
                <p className="mt-2 text-sm text-clay/75">{lightbox.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

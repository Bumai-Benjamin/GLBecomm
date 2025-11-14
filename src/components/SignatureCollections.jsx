"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const collections = [
  {
    title: "Embrace It Collection",
    copy: "Whatever comes, meet it with love. The Embrace It tees are cut in a unisex fit with bold graphics that keep your truth front and centre in everyday moments.",
    tag: "T-Shirts",
    image: "/assets/classicblack.jpg",
  },
  {
    title: "GLB Classic Collection",
    copy: "Give . Love . Back. Our Classic tees remix the core mantra across colourways like pink, purple, black, white, and blue—designed to layer with anything and still carry the message.",
    tag: "Signature",
    image: "/assets/bestipink.jpg",
  },
  {
    title: "Accessories & Winter Lore",
    copy: "From trucker hats and canvas totes to the Love Dept Winter Lore pieces, these layers keep warmth, community, and care close—whether you’re on the move or posted at the function.",
    tag: "Accessories",
    image: "/assets/truckerblack.jpg",
  },
];

export default function SignatureCollections() {
  return (
    <section className="mx-auto max-w-6xl px-6 sm:px-10">
      <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.17, 0.67, 0.36, 0.99] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-flare/80">
            Collections
          </span>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-sand sm:text-5xl">
            Signature edits built on community and care.
          </h2>
        </motion.div>
        <motion.p
          className="max-w-xl text-sm leading-relaxed text-clay/80"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Each release is crafted in limited batches with responsibly sourced materials and the help of our community.
          Expect considered details, textural pairings, and silhouettes that carry love into every space—from open‑air
          pop‑ups to late nights in the city.
        </motion.p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {collections.map((collection, index) => (
          <motion.article
            key={collection.title}
            className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-charcoal/60 p-6 backdrop-blur"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.08, duration: 0.6, ease: [0.17, 0.67, 0.36, 0.99] }}
          >
            <div className="relative h-64 overflow-hidden rounded-3xl border border-white/5">
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                sizes="(min-width: 1024px) 28vw, (min-width: 768px) 45vw, 90vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="rounded-full border border-white/10 px-3 py-1 text-[0.6rem] uppercase tracking-[0.4em] text-pulse/80">
                {collection.tag}
              </span>
              <Link
                href="/store"
                className="text-xs uppercase tracking-[0.35em] text-sand/80 transition hover:text-flare"
              >
                View Collection
              </Link>
            </div>
            <h3 className="mt-4 font-display text-2xl text-sand">{collection.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-clay/75">{collection.copy}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

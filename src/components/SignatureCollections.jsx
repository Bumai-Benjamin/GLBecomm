"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const collections = [
  {
    title: "Nightshift Capsule",
    copy: "Modular outerwear with heat-responsive graphics and concealed pocketing for midnight journeys.",
    tag: "Drop 05",
    image: "/assets/IMG-20250919-WA0014.jpg",
  },
  {
    title: "Studio Essentials",
    copy: "Everyday staples reimagined with premium cotton, taped seams, and clean monochrome palettes.",
    tag: "Core",
    image: "/assets/classicblack.jpg",
  },
  {
    title: "Motion Ready",
    copy: "Athletic silhouettes with reflective paneling and sweat-wicking tech tuned for the underground commute.",
    tag: "Velocity",
    image: "/assets/IMG-20250919-WA0032.jpg",
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
            Signature edits built for elevated street movement.
          </h2>
        </motion.div>
        <motion.p
          className="max-w-xl text-sm leading-relaxed text-clay/80"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Each release is constructed in limited batches with responsibly sourced materials. Expect textural juxtapositions,
          upgraded lining systems, and silhouettes that stay composed through high-output nights.
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
                Shop Edit
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

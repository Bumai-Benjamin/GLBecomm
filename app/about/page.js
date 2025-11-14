"use client";

import { motion } from "framer-motion";
import Logo from "../../src/components/Logo";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-32 sm:px-10 sm:pt-36">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3">
          <Logo size={22} />
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-tide/80">
            About GLB
          </span>
        </div>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-sand sm:text-5xl">
          More than a brand. A movement.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-clay/75">
          GLB started with four friends and one belief: fashion can be an act of care, connection, and self‑expression.
          We build spaces where community shines and creativity gives love back.
        </p>
      </motion.header>

      <section className="grid gap-6 md:grid-cols-2">
        <motion.article
          className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-2xl text-sand">Mission</h2>
          <p className="mt-3 text-sm leading-relaxed text-clay/80">
            To be more than a clothing brand—to become a movement that redefines fashion as an act of care, connection,
            and self‑expression. To make a difference one garment at a time. Wearing GLB is carrying love into every
            space you walk into.
          </p>
        </motion.article>

        <motion.article
          className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <h2 className="font-display text-2xl text-sand">Vision</h2>
          <p className="mt-3 text-sm leading-relaxed text-clay/80">
            GLB is built on collaboration and community. We don’t just create clothing—we create spaces where other
            brands, creatives, and voices can shine too. Fashion should express individuality and make room for
            community. Giving love back means growing together, not alone.
          </p>
        </motion.article>
      </section>

      <motion.section
        className="mt-6 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="font-display text-2xl text-sand">Our Story</h2>
        <div className="mt-3 space-y-4 text-sm leading-relaxed text-clay/80">
          <p>
            GLB started with four friends—young men with big dreams—and one question: how can we create something
            meaningful together? One of us loved graphic design, another told stories, another organized, and another
            spotted opportunity.
          </p>
          <p>
            We didn’t want to start just another clothing brand. We wanted something personal—something that reflected
            who we are and what we value. A story, a shared passion, and a quality we all carry: love. We wanted to give
            the world what we hold most dear through our creativity, skills, and dedication.
          </p>
          <p>
            GLB is our story, our friendship, and our dream made real. Proof that when you combine talent with heart,
            courage, and love, you can create something that inspires, connects, and leaves a mark on the world.
          </p>
        </div>
      </motion.section>
    </main>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function SpotlightCta() {
  return (
    <section className="mx-auto max-w-5xl px-6 sm:px-10">
      <motion.div
        className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-flare/10 via-black/60 to-tide/10 p-10 text-center backdrop-blur"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.65, ease: [0.17, 0.67, 0.36, 0.99] }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-sand/80">
          Newsletter
        </span>
        <h2 className="mt-6 font-display text-4xl tracking-tight text-sand sm:text-5xl">
          Stay synced with the next release wave.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-clay/80">
          Receive the earliest look at prototypes, build notes, and invite-only drops. We ship only the essentials—no
          noise, just the signal.
        </p>
        <form
          className="mx-auto mt-8 flex max-w-md flex-col gap-4 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            const form = event.currentTarget;
            const emailField = form.elements.namedItem("email");
            const email = typeof emailField?.value === "string" ? emailField.value : "";
            if (email) {
              window.location.href = `mailto:hello@giveloveback.com?subject=Newsletter%20Signup&body=${encodeURIComponent(`Please add ${email} to the insider list.`)}`;
              form.reset();
            }
          }}
        >
          <input
            type="email"
            name="email"
            required
            placeholder="email@domain.com"
            className="flex-1 rounded-full border border-white/10 bg-black/40 px-5 py-3 text-sm text-sand placeholder:text-clay/50 focus:border-flare/60 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-gradient-to-r from-flare via-pulse to-flare px-8 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-ink shadow-[0_18px_32px_rgba(255,107,61,0.22)] transition hover:shadow-[0_24px_42px_rgba(255,107,61,0.32)]"
          >
            Join
          </button>
        </form>
        <Link
          href="/store"
          className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-sand/70 transition hover:text-flare"
        >
          Or head straight to the store →
        </Link>
      </motion.div>
    </section>
  );
}

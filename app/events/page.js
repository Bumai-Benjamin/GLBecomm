"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import RsvpModal from "../../src/components/RsvpModal";

const EVENT = {
  title: "Street Cache Volume 1",
  date: "14 November",
  time: "5–10pm",
  entrance: "60",
  location: "Open-Air Venue",
  description:
    "A curated open-air brand exhibition blending fashion showcases, stalls, and social connection.",
  tags: ["Exhibition", "Open Air", "Curated", "Entrance: 60"],
};

export default function EventsPage() {
  const featured = useMemo(() => [EVENT], []);
  const [rsvpModal, setRsvpModal] = useState({ isOpen: false, event: null });

  const openRsvp = (event) => {
    setRsvpModal({ isOpen: true, event });
  };

  const closeRsvp = () => {
    setRsvpModal({ isOpen: false, event: null });
  };

  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-32 sm:px-10 sm:pt-36">
      <RsvpModal isOpen={rsvpModal.isOpen} onClose={closeRsvp} event={rsvpModal.event} />

      <header className="max-w-3xl space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-tide/80">
          GLB Event
        </span>
        <h1 className="font-display text-4xl tracking-tight text-sand sm:text-5xl">
          {EVENT.title}
        </h1>
        <p className="text-sm leading-relaxed text-clay/75">
          A curated open-air brand exhibition blending fashion showcases, stalls, and social connection.
        </p>
      </header>

      {/* Feature Card */}
      <section className="mt-12">
        <article className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-black/60 via-charcoal/70 to-black/40 p-8 backdrop-blur">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.35em] text-pulse/80">
            <span>{EVENT.date}</span>
            {EVENT.time ? (<><span>•</span><span>{EVENT.time}</span></>) : null}
            {EVENT.location ? (<><span>•</span><span>{EVENT.location}</span></>) : null}
            {EVENT.entrance ? (<><span>•</span><span>Entrance: {EVENT.entrance}</span></>) : null}
          </div>
          <h2 className="mt-6 font-display text-3xl text-sand">{EVENT.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-clay/75">{EVENT.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {EVENT.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 px-4 py-1 text-[0.6rem] uppercase tracking-[0.35em] text-sand/70">
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={() => openRsvp(EVENT)}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-flare via-pulse to-flare px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-ink shadow-[0_18px_32px_rgba(255,107,61,0.32)] transition hover:shadow-[0_22px_42px_rgba(255,107,61,0.42)]"
          >
            RSVP Now
          </button>
        </article>
      </section>

      {/* Details Sections */}
      <section className="mt-14 grid gap-8 lg:grid-cols-2">
        <article className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-sm text-clay/80 backdrop-blur">
          <h3 className="font-display text-2xl text-sand">Concept</h3>
          <p className="mt-3 leading-relaxed">
            GLB will host a curated open-air brand exhibition. The event blends fashion showcases, stalls, and social interaction, supported by food &amp; drink vendors.
          </p>
        </article>

        <article className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-sm text-clay/80 backdrop-blur">
          <h3 className="font-display text-2xl text-sand">Stalls &amp; Setup</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Fashion brands: one stall each for products.</li>
            <li>Food &amp; drink vendors: paid stall placement covers venue costs.</li>
            <li>GLB coordination: floor plan ensures even spacing and visual flow.</li>
            <li>MC + program flow keeps the event organized and purposeful.</li>
          </ul>
        </article>

 
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-2">
        <article className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-sm text-clay/80 backdrop-blur">
          <h3 className="font-display text-2xl text-sand">Event Flow</h3>
          <ul className="mt-3 space-y-3">
            <li>
              <span className="text-sand">4:00 – 4:30 PM |</span> Welcome &amp; Arrival — browse stalls, light music, cocktail hour.
            </li>
            <li>
              <span className="text-sand">4:30 – 5:00 PM |</span> Opening Remarks — GLB welcome; MC introduces brands.
            </li>
            <li>
              <span className="text-sand">5:00 – 7:00 PM |</span> Cocktail Hour &amp; Stalls Open — socializing, shopping, food &amp; drinks.
            </li>
            <li>
              <span className="text-sand">7:00 – 8:00 PM |</span> Brand Showcases — stage time with MC transitions.
            </li>
            <li>
              <span className="text-sand">8:00 – 8:30 PM |</span> Networking &amp; Last Sales — encourage final purchases.
            </li>
            <li>
              <span className="text-sand">8:30 – 9:00 PM |</span> Closing Remarks — thank vendors, brands, guests; photo opportunity.
            </li>
          </ul>
        </article>

        <article className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-sm text-clay/80 backdrop-blur">
          <h3 className="font-display text-2xl text-sand">Revenue &amp; Cost Coverage</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Brand stall fee: N$500 (includes space, MC, marketing).</li>
            <li>Food/drink vendor fee: N$500 + (depends on size/location).</li>
            <li>GLB handles event coordination, marketing, and program.</li>
            <li>Ticket sales per brand help cover costs and control attendance.</li>
          </ul>
        </article>
      </section>
    </main>
  );
}

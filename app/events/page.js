"use client";

import Link from "next/link";
import { useMemo } from "react";

const EVENTS = [
  {
    title: "Midnight Rooftop Session",
    date: "October 24",
    location: "Downtown Skyline",
    description:
      "Live lookbook shoot and DJ set above the city. Limited product pickup window and after-hours gifting for RSVP guests.",
    tags: ["Drop Showcase", "Invite Only"],
  },
  {
    title: "Studio Archive Night",
    date: "November 2",
    location: "GLB Atelier",
    description:
      "Pull rare samples, explore the archive, and reserve custom fittings. Styling appointments open throughout the night.",
    tags: ["Archive", "Styling"],
  },
  {
    title: "Transit Drift Ride-Along",
    date: "November 15",
    location: "Metro Line 7",
    description:
      "Document the capsule in motion during a late-night ride. Expect live photography, guerilla projections, and mobile retail moments.",
    tags: ["In Motion", "Public"],
  },
  {
    title: "Dawn Conditioning Lab",
    date: "December 4",
    location: "Riverfront Training Grounds",
    description:
      "Test the performance gear with the crew at sunrise. Warm-up sessions, durability demos, and limited gear customization.",
    tags: ["Performance", "Limited"],
  },
];

export default function EventsPage() {
  const featured = useMemo(() => EVENTS.slice(0, 2), []);
  const secondary = useMemo(() => EVENTS.slice(2), []);

  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-32 sm:px-10 sm:pt-36">
      <header className="max-w-3xl space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-tide/80">
          Events Calendar
        </span>
        <h1 className="font-display text-4xl tracking-tight text-sand sm:text-5xl">
          Meet the capsule in real time.
        </h1>
        <p className="text-sm leading-relaxed text-clay/75">
          RSVP to experience each drop across rooftop sessions, studio archive nights, and transit takeovers. Attendance is
          limited to keep every moment intentional.
        </p>
      </header>

      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        {featured.map((event) => (
          <article
            key={event.title}
            className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-black/60 via-charcoal/70 to-black/40 p-8 backdrop-blur"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-pulse/80">
              <span>{event.date}</span>
              <span>{event.location}</span>
            </div>
            <h2 className="mt-6 font-display text-3xl text-sand">{event.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-clay/75">{event.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {event.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 px-4 py-1 text-[0.6rem] uppercase tracking-[0.35em] text-sand/70">
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href={`mailto:hello@giveloveback.com?subject=${encodeURIComponent(`RSVP: ${event.title}`)}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-flare via-pulse to-flare px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-ink shadow-[0_18px_32px_rgba(255,107,61,0.32)] transition hover:shadow-[0_22px_42px_rgba(255,107,61,0.42)]"
            >
              RSVP Now
            </Link>
          </article>
        ))}
      </section>

      <section className="mt-14 space-y-6">
        <h2 className="text-xs uppercase tracking-[0.35em] text-clay/60">Upcoming</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {secondary.map((event) => (
            <article
              key={event.title}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-sm text-clay/75 backdrop-blur transition hover:border-white/30"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-pulse/70">
                <span>{event.date}</span>
                <span>{event.location}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl text-sand">{event.title}</h3>
              <p className="mt-3 leading-relaxed">{event.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-[0.55rem] uppercase tracking-[0.35em] text-sand/70">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`mailto:hello@giveloveback.com?subject=${encodeURIComponent(`RSVP: ${event.title}`)}`}
                className="mt-5 inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.4em] text-sand/70 transition hover:text-flare"
              >
                Request Invite →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

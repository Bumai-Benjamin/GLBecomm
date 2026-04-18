"use client";

import { useState } from "react";

import Logo from "../../src/components/Logo";
import RsvpModal from "../../src/components/RsvpModal";

const EVENT = {
    title: "Street Cache Volume 1",
    date: "14 November",
    time: "17:00 - 22:00",
    entrance: "N$60",
    location: "Open-Air Venue, Windhoek",
    description:
        "A curated open-air fashion experience where brands, creatives, and community come together through product, music, and shared momentum.",
    tags: ["Open Air", "Limited Entry", "Brand Showcases", "Live Vendors"],
};

const FLOW = [
    "17:00 - 17:30 | Arrival and Social Warmup",
    "17:30 - 18:00 | Opening Remarks and Introductions",
    "18:00 - 20:00 | Stalls, Networking, Product Discovery",
    "20:00 - 21:00 | Live Brand Showcases",
    "21:00 - 22:00 | Closing Sales and Community Sendoff",
];

export default function EventsPage() {
    const [rsvpModal, setRsvpModal] = useState({ isOpen: false, event: null });

    const openRsvp = (event) => {
        setRsvpModal({ isOpen: true, event });
    };

    return (
        <main className="brand-section pt-32 sm:pt-36">
            <RsvpModal isOpen={rsvpModal.isOpen} onClose={() => setRsvpModal({ isOpen: false, event: null })} event={rsvpModal.event} />

            <div className="brand-shell">
                <header className="brand-panel rounded-3xl p-7 sm:p-10">
                    <div className="inline-flex items-center gap-3">
                        <Logo size={22} />
                        <span className="brand-kicker">Live Event</span>
                    </div>
                    <h1 className="brand-title mt-5 max-w-4xl">{EVENT.title}</h1>
                    <p className="brand-subtitle mt-5 text-sm sm:text-base">{EVENT.description}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                        {EVENT.tags.map((tag) => (
                            <span key={tag} className="brand-chip">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <button type="button" className="brand-button brand-button-primary" onClick={() => openRsvp(EVENT)}>
                            RSVP Now
                        </button>
                        <a href="/assets/glb-catalog.pdf" target="_blank" rel="noopener noreferrer" className="brand-button brand-button-ghost">
                            View Catalog
                        </a>
                    </div>
                </header>

                <section className="brand-grid mt-8">
                    <article className="brand-panel-soft span-4 rounded-3xl p-6">
                        <p className="brand-eyebrow">Date</p>
                        <h2 className="mt-3 font-display text-3xl uppercase text-white">{EVENT.date}</h2>
                        <p className="mt-2 text-sm text-zinc-300">{EVENT.time}</p>
                    </article>
                    <article className="brand-panel-soft span-4 rounded-3xl p-6">
                        <p className="brand-eyebrow">Entrance</p>
                        <h2 className="mt-3 font-display text-3xl uppercase text-white">{EVENT.entrance}</h2>
                        <p className="mt-2 text-sm text-zinc-300">Per person</p>
                    </article>
                    <article className="brand-panel-soft span-4 rounded-3xl p-6">
                        <p className="brand-eyebrow">Venue</p>
                        <h2 className="mt-3 font-display text-3xl uppercase text-white">Windhoek</h2>
                        <p className="mt-2 text-sm text-zinc-300">{EVENT.location}</p>
                    </article>
                </section>

                <section className="brand-section pb-0">
                    <div className="brand-grid">
                        <article className="brand-panel span-8 rounded-3xl p-7 sm:p-9">
                            <p className="brand-eyebrow">Program Flow</p>
                            <h2 className="mt-3 font-display text-4xl uppercase text-white">Night Sequence</h2>
                            <ul className="mt-6 space-y-3 text-sm text-zinc-300 sm:text-base">
                                {FLOW.map((item) => (
                                    <li key={item} className="border-b border-white/10 pb-3">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </article>

                        <article className="brand-panel-soft span-4 rounded-3xl p-6">
                            <p className="brand-eyebrow">Operator Notes</p>
                            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                                <li className="border-b border-white/10 pb-2">Fashion and food vendors run parallel lanes.</li>
                                <li className="border-b border-white/10 pb-2">MC transitions keep momentum and schedule discipline.</li>
                                <li className="border-b border-white/10 pb-2">Limited capacity to maintain quality experience.</li>
                                <li>RSVP confirmations are processed through GLB events backend.</li>
                            </ul>
                        </article>
                    </div>
                </section>
            </div>
        </main>
    );
}

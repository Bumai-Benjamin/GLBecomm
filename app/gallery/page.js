"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import Logo from "../../src/components/Logo";

export default function GalleryPage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        let mounted = true;

        const loadGallery = async () => {
            try {
                const res = await fetch("/api/gallery/events", { cache: "no-store" });
                const payload = await res.json();
                if (!mounted) return;

                if (payload?.success) {
                    setEvents(payload?.data?.events || []);
                }
            } catch (error) {
                console.error("Gallery fetch error", error);
            }
        };

        loadGallery();
        return () => {
            mounted = false;
        };
    }, []);

    const totalCount = useMemo(
        () => events.reduce((sum, event) => sum + (event.images?.length || 0), 0),
        [events],
    );

    return (
        <main className="brand-section pt-32 sm:pt-36">
            <div className="brand-shell">
                <header className="brand-panel rounded-3xl p-7 sm:p-10">
                    <div className="inline-flex items-center gap-3">
                        <Logo size={22} />
                        <span className="brand-kicker">Gallery Archive</span>
                    </div>
                    <h1 className="brand-title mt-5 max-w-4xl">Campaign Frames, Real Moments.</h1>
                    <p className="brand-subtitle mt-5 text-sm sm:text-base">
                        A visual library from GLB events, showcases, and community touchpoints. Built as proof of energy, movement,
                        and culture.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <span className="brand-chip">{events.length} Events</span>
                        <span className="brand-chip">{totalCount} Images</span>
                        <Link href="https://instagram.com/glb.cache" target="_blank" rel="noopener noreferrer" className="brand-button brand-button-ghost">
                            Visit Instagram
                        </Link>
                    </div>
                </header>

                <section className="brand-section pb-0">
                    <div className="space-y-10">
                        {events.length === 0 && (
                            <article className="brand-panel-soft rounded-3xl p-8 text-sm text-zinc-300">
                                No event images are available yet. Add images under public/eventFolder/{"<event-slug>"}.
                            </article>
                        )}

                        {events.map((event) => (
                            <article key={event.slug} className="brand-panel-soft rounded-3xl p-6 sm:p-8">
                                <div className="mb-5 flex items-center justify-between gap-4">
                                    <div>
                                        <p className="brand-eyebrow">Event</p>
                                        <h2 className="mt-2 font-display text-4xl uppercase text-white">{event.name}</h2>
                                    </div>
                                    <span className="brand-chip">{event.images.length} Frames</span>
                                </div>

                                <div className="brand-grid">
                                    {event.images.map((img, index) => (
                                        <figure key={`${event.slug}-${img.url}-${index}`} className="brand-media-card span-3 rounded-2xl">
                                            <div className="relative h-60">
                                                <Image src={img.url} alt={img.title || `${event.name} image`} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
                                            </div>
                                        </figure>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}

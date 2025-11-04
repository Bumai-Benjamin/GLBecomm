"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AdminDashboardPage() {
  const [events, setEvents] = useState([]);
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      try {
        setLoading(true);
        const [eventsRes, rsvpRes] = await Promise.all([
          fetch("/api/events"),
          fetch("/api/rsvp"),
        ]);

        const eventsJson = await eventsRes.json();
        const rsvpJson = await rsvpRes.json();

        if (!isActive) return;

        if (!eventsJson.success || !rsvpJson.success) {
          throw new Error("Failed to load admin data");
        }

        setEvents(eventsJson.data);
        setRsvps(rsvpJson.data);
        setError(null);
      } catch (err) {
        console.error("Admin dashboard load error:", err);
        if (isActive) {
          setError("Unable to load dashboard data. Try refreshing.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isActive = false;
    };
  }, []);

  const stats = useMemo(() => {
    const statusCount = events.reduce(
      (acc, event) => {
        acc[event.status] = (acc[event.status] || 0) + 1;
        return acc;
      },
      { published: 0, draft: 0, cancelled: 0, completed: 0 }
    );

    const rsvpStatusCount = rsvps.reduce(
      (acc, rsvp) => {
        acc[rsvp.status] = (acc[rsvp.status] || 0) + 1;
        return acc;
      },
      { pending: 0, confirmed: 0, cancelled: 0 }
    );

    const totalGuests = rsvps.reduce((sum, rsvp) => sum + (rsvp.guests || 1), 0);

    return {
      totalEvents: events.length,
      publishedEvents: statusCount.published || 0,
      draftEvents: statusCount.draft || 0,
      totalRsvps: rsvps.length,
      confirmedRsvps: rsvpStatusCount.confirmed || 0,
      pendingRsvps: rsvpStatusCount.pending || 0,
      totalGuests,
      fulfilmentRate:
        rsvps.length === 0
          ? 0
          : Math.round(((rsvpStatusCount.confirmed || 0) / rsvps.length) * 100),
    };
  }, [events, rsvps]);

  const recentRsvps = useMemo(() => {
    return [...rsvps]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);
  }, [rsvps]);

  const upcomingEvents = useMemo(() => {
    return [...events]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4);
  }, [events]);

  if (loading) {
    return (
      <main className="mx-auto flex h-screen max-w-7xl items-center justify-center px-6">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-flare border-t-transparent" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto flex h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 text-sm text-clay/70">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-sand transition hover:border-white/30 hover:bg-white/10"
        >
          ↻ Refresh
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:px-10 sm:pt-36">
      <motion.header
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-tide/80">
          Admin Command Center
        </span>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-sand sm:text-5xl">
          Welcome back, curator
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-clay/70">
          Monitor engagement, tune upcoming releases, and jump straight into workflows from one overview.
        </p>
      </motion.header>

      <motion.section
        className="mb-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        {[
          {
            label: "Total Events",
            value: stats.totalEvents,
            sublabel: `${stats.publishedEvents} published • ${stats.draftEvents} drafts`,
            accent: "text-flare",
          },
          {
            label: "RSVP Volume",
            value: stats.totalRsvps,
            sublabel: `${stats.confirmedRsvps} confirmed • ${stats.pendingRsvps} pending`,
            accent: "text-sand",
          },
          {
            label: "Total Guests",
            value: stats.totalGuests,
            sublabel: "Across all events",
            accent: "text-green-400",
          },
          {
            label: "Fulfilment Rate",
            value: `${stats.fulfilmentRate}%`,
            sublabel: "Confirmed vs submitted RSVPs",
            accent: "text-blue-400",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <div className={`text-4xl font-display ${item.accent}`}>{item.value}</div>
            <div className="mt-2 text-xs uppercase tracking-[0.35em] text-clay/60">
              {item.label}
            </div>
            <div className="mt-3 text-[0.7rem] text-clay/50">{item.sublabel}</div>
          </div>
        ))}
      </motion.section>

      <motion.section
        className="mb-12 grid gap-6 lg:grid-cols-[2fr_1fr]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-sand">Recent RSVPs</h2>
            <Link
              href="/admin/rsvp"
              className="text-xs uppercase tracking-[0.35em] text-flare transition hover:text-flare/80"
            >
              View all →
            </Link>
          </div>

          {recentRsvps.length === 0 ? (
            <p className="mt-6 text-sm text-clay/60">No RSVP activity yet.</p>
          ) : (
            <div className="mt-6 space-y-3">
              {recentRsvps.map((rsvp) => (
                <div
                  key={rsvp._id}
                  className="flex items-center justify-between rounded-3xl border border-white/10 bg-black/20 px-5 py-4"
                >
                  <div>
                    <div className="text-sm font-semibold text-sand">{rsvp.name}</div>
                    <div className="text-xs text-clay/60">
                      {rsvp.eventTitle} • {rsvp.guests} {rsvp.guests === 1 ? "guest" : "guests"}
                    </div>
                  </div>
                  <div className="text-right text-xs text-clay/50">
                    <div>{new Date(rsvp.createdAt).toLocaleDateString()}</div>
                    <div className="mt-1 capitalize text-sand/60">{rsvp.status}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="font-display text-2xl text-sand">Quick Actions</h2>
          <div className="mt-6 space-y-3">
            {[
              { href: "/admin/events", label: "Plan & publish events", icon: "📅" },
              { href: "/admin/rsvp", label: "Manage RSVP responses", icon: "📝" },
              { href: "/admin/analytics", label: "Deep dive analytics", icon: "📊" },
              { href: "/admin/email", label: "Send attendee updates", icon: "📧" },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-sand transition hover:border-white/25 hover:bg-white/10"
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg">{action.icon}</span>
                  {action.label}
                </span>
                <span className="text-xs uppercase tracking-[0.3em] text-clay/50">Open</span>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="grid gap-6 lg:grid-cols-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-sand">Event Pipeline</h2>
            <Link
              href="/admin/events"
              className="text-xs uppercase tracking-[0.35em] text-flare transition hover:text-flare/80"
            >
              Manage →
            </Link>
          </div>
          {upcomingEvents.length === 0 ? (
            <p className="mt-6 text-sm text-clay/60">No events scheduled yet. Start your first release.</p>
          ) : (
            <div className="mt-6 space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event._id}
                  className="rounded-3xl border border-white/10 bg-black/20 px-5 py-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold text-sand">{event.title}</div>
                      <div className="mt-1 text-xs text-clay/60">
                        {event.date}
                        {event.location ? ` • ${event.location}` : ""}
                      </div>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[0.6rem] uppercase tracking-[0.35em] text-sand/70">
                      {event.status}
                    </span>
                  </div>
                  {event.rsvpCount > 0 && (
                    <div className="mt-3 text-[0.7rem] text-clay/60">
                      {event.rsvpCount} RSVP{event.rsvpCount === 1 ? "" : "s"} captured
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-black/10 via-black/30 to-black/10 p-6 backdrop-blur">
          <h2 className="font-display text-2xl text-sand">Inbox Snapshot</h2>
          <p className="mt-4 text-sm text-clay/70">
            Keep the community in the loop. Draft tailored updates and automate reminders when key metrics shift.
          </p>
          <Link
            href="/admin/email"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-flare via-pulse to-flare px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-ink shadow-[0_18px_32px_rgba(255,107,61,0.28)] transition hover:shadow-[0_22px_42px_rgba(255,107,61,0.4)]"
          >
            Compose message
          </Link>
        </div>
      </motion.section>
    </main>
  );
}

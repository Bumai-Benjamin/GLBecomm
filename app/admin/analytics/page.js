"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("all"); // all, week, month

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [rsvpRes, eventsRes] = await Promise.all([
        fetch("/api/rsvp"),
        fetch("/api/events"),
      ]);

      const rsvpData = await rsvpRes.json();
      const eventsData = await eventsRes.json();

      if (rsvpData.success && eventsData.success) {
        const rsvps = rsvpData.data;
        const events = eventsData.data;

        // Calculate analytics
        const stats = {
          totalRsvps: rsvps.length,
          totalEvents: events.length,
          publishedEvents: events.filter((e) => e.status === "published").length,
          upcomingEvents: events.filter((e) => e.status === "published" || e.status === "draft").length,
          totalGuests: rsvps.reduce((sum, r) => sum + (r.guests || 1), 0),
          confirmedRsvps: rsvps.filter((r) => r.status === "confirmed").length,
          pendingRsvps: rsvps.filter((r) => r.status === "pending").length,
          cancelledRsvps: rsvps.filter((r) => r.status === "cancelled").length,
          avgGuestsPerRsvp: rsvps.length > 0 
            ? (rsvps.reduce((sum, r) => sum + (r.guests || 1), 0) / rsvps.length).toFixed(1) 
            : 0,
        };

        // Event breakdown
        const eventBreakdown = events.map((event) => {
          const eventRsvps = rsvps.filter((r) => r.eventTitle === event.title);
          return {
            title: event.title,
            rsvpCount: eventRsvps.length,
            guestCount: eventRsvps.reduce((sum, r) => sum + (r.guests || 1), 0),
            status: event.status,
          };
        });

        // Recent RSVPs
        const recentRsvps = rsvps
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10);

        setAnalytics({ stats, eventBreakdown, recentRsvps });
      }
    } catch (err) {
      console.error("Error fetching analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (!analytics) return;

    // CSV for RSVPs
    const headers = ["Name", "Email", "Phone", "Event", "Date", "Guests", "Status", "Submitted"];
    const rows = analytics.recentRsvps.map((rsvp) => [
      rsvp.name,
      rsvp.email,
      rsvp.phone || "",
      rsvp.eventTitle,
      rsvp.eventDate,
      rsvp.guests,
      rsvp.status,
      new Date(rsvp.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rsvp-export-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <main className="mx-auto flex h-screen max-w-7xl items-center justify-center px-6">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-flare border-t-transparent" />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:px-10 sm:pt-36">
      <motion.header
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-tide/80">
              Admin Dashboard
            </span>
            <h1 className="mt-4 font-display text-4xl tracking-tight text-sand sm:text-5xl">
              Analytics
            </h1>
          </div>
          <button
            onClick={exportToCSV}
            className="rounded-full border border-white/10 bg-black/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-sand transition hover:border-white/30 hover:bg-white/10"
          >
            📊 Export CSV
          </button>
        </div>
      </motion.header>

      {/* Key Stats */}
      <motion.section
        className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        {[
          { label: "Total RSVPs", value: analytics.stats.totalRsvps, color: "sand", icon: "📝" },
          { label: "Total Guests", value: analytics.stats.totalGuests, color: "flare", icon: "👥" },
          { label: "Published Events", value: analytics.stats.publishedEvents, color: "green-400", icon: "📅" },
          { label: "Avg Guests/RSVP", value: analytics.stats.avgGuestsPerRsvp, color: "blue-400", icon: "📊" },
        ].map((stat, index) => (
          <div
            key={index}
            className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <div className="flex items-center justify-between">
              <div className={`text-4xl font-display text-${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
            <div className="mt-3 text-xs uppercase tracking-[0.35em] text-clay/60">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.section>

      {/* RSVP Status Breakdown */}
      <motion.section
        className="mb-10 grid gap-6 sm:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {[
          { label: "Confirmed", value: analytics.stats.confirmedRsvps, color: "green" },
          { label: "Pending", value: analytics.stats.pendingRsvps, color: "yellow" },
          { label: "Cancelled", value: analytics.stats.cancelledRsvps, color: "red" },
        ].map((stat, index) => (
          <div
            key={index}
            className={`rounded-[28px] border border-${stat.color}-500/30 bg-${stat.color}-500/10 p-6 backdrop-blur`}
          >
            <div className={`text-3xl font-display text-${stat.color}-400`}>
              {stat.value}
            </div>
            <div className={`mt-2 text-xs uppercase tracking-[0.35em] text-${stat.color}-400/80`}>
              {stat.label} RSVPs
            </div>
          </div>
        ))}
      </motion.section>

      {/* Event Breakdown */}
      <motion.section
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2 className="mb-6 font-display text-2xl text-sand">Event Performance</h2>
        <div className="space-y-4">
          {analytics.eventBreakdown.map((event, index) => (
            <div
              key={index}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl text-sand">{event.title}</h3>
                  <div className="mt-2 flex gap-4 text-xs text-clay/60">
                    <span>📝 {event.rsvpCount} RSVPs</span>
                    <span>👥 {event.guestCount} Guests</span>
                    <span className={`capitalize ${
                      event.status === "published" ? "text-green-400" : "text-yellow-400"
                    }`}>
                      {event.status}
                    </span>
                  </div>
                </div>
                <div className="h-16 w-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-2xl font-display text-flare">
                  {event.rsvpCount}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Recent Activity */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h2 className="mb-6 font-display text-2xl text-sand">Recent RSVPs</h2>
        <div className="space-y-3">
          {analytics.recentRsvps.map((rsvp, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-[28px] border border-white/10 bg-white/5 p-4 backdrop-blur"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-flare/10 text-sm font-semibold text-flare">
                  {rsvp.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-sand">{rsvp.name}</div>
                  <div className="text-xs text-clay/60">
                    {rsvp.eventTitle} • {rsvp.guests} {rsvp.guests === 1 ? "guest" : "guests"}
                  </div>
                </div>
              </div>
              <div className="text-xs text-clay/60">
                {new Date(rsvp.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}

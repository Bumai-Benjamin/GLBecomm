"use client";

import { useState } from "react";

import Logo from "../../src/components/Logo";

export default function ContactPage() {
    const [status, setStatus] = useState({ type: "idle", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        const payload = {
            type: "contact",
            name: String(formData.get("name") || "").trim(),
            email: String(formData.get("email") || "").trim(),
            message: String(formData.get("message") || "").trim(),
        };

        setStatus({ type: "idle", message: "" });
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok || !result?.success) {
                setStatus({
                    type: "error",
                    message: result?.error || "Message failed to send. Please try again.",
                });
                return;
            }

            setStatus({ type: "success", message: "Message sent. GLB will respond shortly." });
            form.reset();
        } catch (error) {
            console.error("Contact submission error", error);
            setStatus({ type: "error", message: "Network issue. Please retry in a moment." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="brand-section pt-32 sm:pt-36">
            <div className="brand-shell">
                <header className="brand-panel rounded-3xl p-7 sm:p-10">
                    <div className="inline-flex items-center gap-3">
                        <Logo size={22} />
                        <span className="brand-kicker">Contact GLB</span>
                    </div>
                    <h1 className="brand-title mt-5 max-w-4xl">Let’s Build The Next Story.</h1>
                    <p className="brand-subtitle mt-5 text-sm sm:text-base">
                        For collaborations, wholesale, event partnerships, or campaign opportunities, send a direct message to the
                        GLB team.
                    </p>
                </header>

                <section className="brand-grid mt-8">
                    <article className="brand-panel-soft span-4 rounded-3xl p-6">
                        <p className="brand-eyebrow">Studio Contact</p>
                        <div className="mt-4 space-y-3 text-sm text-zinc-300">
                            <p className="border-b border-white/10 pb-2">hello@giveloveback.com</p>
                            <p className="border-b border-white/10 pb-2">Windhoek, Namibia</p>
                            <p>Mon-Fri, 09:00-17:00</p>
                        </div>
                    </article>

                    <article className="brand-panel span-8 rounded-3xl p-6 sm:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="text-xs uppercase tracking-[0.22em] text-zinc-300">
                                    Name
                                    <input className="brand-input mt-2" name="name" required placeholder="Your name" />
                                </label>
                                <label className="text-xs uppercase tracking-[0.22em] text-zinc-300">
                                    Email
                                    <input className="brand-input mt-2" type="email" name="email" required placeholder="you@email.com" />
                                </label>
                            </div>

                            <label className="text-xs uppercase tracking-[0.22em] text-zinc-300">
                                Message
                                <textarea className="brand-textarea mt-2 min-h-44" name="message" required placeholder="Tell us about your project, event, or campaign." />
                            </label>

                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <p className="text-[0.64rem] uppercase tracking-[0.22em] text-zinc-500">
                                    Secure API submission enabled
                                </p>
                                <button type="submit" disabled={isSubmitting} className="brand-button brand-button-primary disabled:opacity-60">
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </button>
                            </div>

                            {status.type !== "idle" && (
                                <p
                                    className={`rounded-2xl border px-4 py-3 text-sm ${status.type === "success"
                                        ? "border-white/15 bg-white/5 text-zinc-200"
                                        : "border-white/15 bg-black/30 text-zinc-300"
                                        }`}
                                >
                                    {status.message}
                                </p>
                            )}
                        </form>
                    </article>
                </section>
            </div>
        </main>
    );
}

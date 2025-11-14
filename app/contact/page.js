"use client";
import Logo from "../../src/components/Logo";

export default function Contact() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-10 px-6 pb-24 pt-32 sm:px-10 sm:pt-36">
      <header className="space-y-6">
        <div className="flex items-center gap-3">
          <Logo size={22} />
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-flare/80">
            Contact
          </span>
        </div>
        <h1 className="font-display text-4xl tracking-tight text-sand sm:text-5xl">Let’s build something meaningful</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-clay/75">
          Whether you’re a brand, creative, or friend of the movement, we’d love to hear from you. Let’s create work
          that carries love into every space.
        </p>
      </header>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const formData = new FormData(form);
          const name = formData.get("name") ?? "";
          const email = formData.get("email") ?? "";
          const message = formData.get("message") ?? "";
          const subject = encodeURIComponent(`Contact from ${name}`);
          const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
          window.location.href = `mailto:gvelvebck@gmail.com?subject=${subject}&body=${body}`;
          form.reset();
        }}
        className="space-y-8 rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur"
      >
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.35em] text-clay/60">
          Name
          <input
            name="name"
            required
            placeholder="Your name"
            className="rounded-2xl border border-white/10 bg-black/30 px-5 py-3 text-sm text-sand placeholder:text-clay/50 focus:border-flare/60 focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.35em] text-clay/60">
          Email
          <input
            type="email"
            name="email"
            required
            placeholder="you@email.com"
            className="rounded-2xl border border-white/10 bg-black/30 px-5 py-3 text-sm text-sand placeholder:text-clay/50 focus:border-flare/60 focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.35em] text-clay/60">
          Message
          <textarea
            name="message"
            rows={6}
            required
            placeholder="Tell us what you need"
            className="rounded-2xl border border-white/10 bg-black/30 px-5 py-3 text-sm text-sand placeholder:text-clay/50 focus:border-flare/60 focus:outline-none"
          />
        </label>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-full bg-gradient-to-r from-flare via-pulse to-flare px-8 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-ink shadow-[0_16px_28px_rgba(255,107,61,0.32)] transition hover:shadow-[0_20px_38px_rgba(255,107,61,0.42)]"
          >
            Send Message
          </button>
        </div>
      </form>
    </main>
  );
}
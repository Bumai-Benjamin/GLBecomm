import Logo from "../../src/components/Logo";

const PILLARS = [
    {
        title: "Purpose-Driven Design",
        text: "Every garment carries language and structure that reinforces identity, confidence, and connection.",
    },
    {
        title: "Community-Led Culture",
        text: "We build with people, not around them. GLB creates spaces where creative voices rise together.",
    },
    {
        title: "Limited Precision",
        text: "Small-batch releases keep quality high, stories clear, and each piece meaningfully owned.",
    },
];

export default function AboutPage() {
    return (
        <main className="brand-section pt-32 sm:pt-36">
            <div className="brand-shell">
                <header className="brand-panel rounded-3xl p-7 sm:p-10">
                    <div className="inline-flex items-center gap-3">
                        <Logo size={23} />
                        <span className="brand-kicker">About GLB</span>
                    </div>
                    <h1 className="brand-title mt-5 max-w-5xl">Built By Friendship. Carried By Purpose.</h1>
                    <p className="brand-subtitle mt-5 text-sm sm:text-base">
                        GLB began with four friends and one shared belief: style can move culture when it is rooted in care,
                        discipline, and bold self-expression.
                    </p>
                </header>

                <section className="brand-grid mt-8">
                    {PILLARS.map((pillar) => (
                        <article key={pillar.title} className="brand-panel-soft span-4 rounded-3xl p-6">
                            <p className="brand-chip">Pillar</p>
                            <h2 className="mt-4 font-display text-3xl uppercase leading-[0.95] text-white">{pillar.title}</h2>
                            <p className="mt-4 text-sm leading-relaxed text-zinc-300">{pillar.text}</p>
                        </article>
                    ))}
                </section>

                <section className="brand-section pb-0">
                    <div className="brand-grid items-start">
                        <article className="brand-panel span-8 rounded-3xl p-7 sm:p-9">
                            <p className="brand-eyebrow">Origin Story</p>
                            <h2 className="mt-3 font-display text-4xl uppercase text-white sm:text-5xl">From A Simple Question</h2>
                            <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
                                <p>
                                    What can happen when creative skills, discipline, and love are pointed in the same direction? GLB is
                                    that answer in motion.
                                </p>
                                <p>
                                    We did not want another clothing logo with no soul. We wanted a living platform where people could
                                    wear values, collaborate with confidence, and show up for one another.
                                </p>
                                <p>
                                    This is not fashion as noise. It is fashion as language. Every release is designed to be worn hard,
                                    remembered clearly, and connected to community impact.
                                </p>
                            </div>
                        </article>

                        <article className="brand-panel-soft span-4 rounded-3xl p-6">
                            <p className="brand-eyebrow">Brand Direction</p>
                            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                                <li className="border-b border-white/10 pb-2">Athletic silhouettes with streetwear precision</li>
                                <li className="border-b border-white/10 pb-2">Message-first graphics with restrained palettes</li>
                                <li className="border-b border-white/10 pb-2">Community events integrated with product storytelling</li>
                                <li>Growth through collaboration, not hype alone</li>
                            </ul>
                        </article>
                    </div>
                </section>
            </div>
        </main>
    );
}

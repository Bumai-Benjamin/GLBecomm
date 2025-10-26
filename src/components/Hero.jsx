'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const introStats = [
  {
    label: 'Drop 05',
    value: 'Nightshift',
    text: 'Limited release engineered for after-dark velocity with thermal-reactive overlays.',
  },
  {
    label: 'Fabric Grade',
    value: 'Urban Exo',
    text: 'Reinforced eco-nylon blend tuned for multi-directional flex and abrasion resistance.',
  },
  {
    label: 'Access Code',
    value: '#GLB25',
    text: 'Scan-to-unlock invites for rooftop drops and private fittings across the grid.',
  },
]

export default function Hero() {
  const sectionRef = useRef(null)
  const mediaRef = useRef(null)

  const parallaxRange = useMemo(() => ({ top: 0, bottom: -140 }), [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], [parallaxRange.top, parallaxRange.bottom])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-gradient-orb',
        { scale: 0.8, opacity: 0.25 },
        {
          scale: 1.1,
          opacity: 0.55,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            scrub: true,
          },
        },
      )

      gsap.fromTo(
        '.hero-stat',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.16,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top+=160',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden px-6 pb-28 pt-32 sm:px-10 sm:pt-36 lg:pt-40"
    >
      <span className="hero-gradient-orb pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-hero-gradient blur-3xl" />
      <div className="absolute inset-0 -z-10 opacity-60">
        <div className="hero-parallax pointer-events-none absolute -right-24 top-10 hidden lg:block">
          <motion.div
            ref={mediaRef}
            style={{ y: parallaxY }}
            className="relative h-[540px] w-[420px] overflow-hidden rounded-[36px] border border-white/10 bg-black/20 shadow-xl"
          >
            <Image
              src="/assets/IMG-20250919-WA0043.jpg"
              alt="Nightshift collection model"
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60" />
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.span
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.38em] text-clay backdrop-blur"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.17, 0.67, 0.36, 0.99] }}
        >
          Season 25 • Nightshift Series
        </motion.span>

        <motion.h1
          className="mt-8 max-w-3xl font-display text-5xl leading-[1.05] tracking-tight text-sand md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.65, ease: [0.17, 0.67, 0.36, 0.99] }}
        >
          Nightshift Vanguard built for relentless city movement.
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl text-base leading-relaxed text-clay/80 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.65, ease: 'easeOut' }}
        >
          Modular layers with reflective carbon prints, temperature-reactive fabric tech, and silhouette mapping
          refined with night riders and rooftop runners across the grid.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.55, ease: 'easeOut' }}
        >
          <Link
            href="/store"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-flare via-pulse to-flare px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-ink shadow-[0_18px_32px_rgba(255,107,61,0.32)] transition hover:shadow-[0_22px_40px_rgba(255,107,61,0.42)]"
          >
            Shop The Drop
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-7 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-sand transition hover:bg-white/20"
          >
            Upcoming Events
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-sand transition hover:border-white/30"
          >
            Contact Studio
          </Link>
        </motion.div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:max-w-4xl lg:grid-cols-3">
          {introStats.map((item) => (
            <article
              key={item.label}
              className="hero-stat group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-sm tracking-wide text-clay/80 backdrop-blur transition hover:border-white/40 hover:bg-white/10"
            >
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-flare/80">
                {item.label}
              </span>
              <h3 className="mt-3 font-display text-2xl text-sand">{item.value}</h3>
              <p className="mt-3 text-xs leading-relaxed text-clay/80">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

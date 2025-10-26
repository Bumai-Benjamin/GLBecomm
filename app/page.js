import dynamic from 'next/dynamic'

import EventsPreview from '../src/components/EventsPreview'
import Hero from '../src/components/Hero'
import HighlightMarquee from '../src/components/HighlightMarquee'
import ParallaxStories from '../src/components/ParallaxStories'
import SignatureCollections from '../src/components/SignatureCollections'
import SpotlightCta from '../src/components/SpotlightCta'

const ProductCarousel = dynamic(() => import('../src/components/ProductCarousel'), {
  ssr: false,
  loading: () => (
    <div className="mx-auto mt-24 flex h-[420px] w-full max-w-5xl items-center justify-center rounded-3xl border border-white/5 bg-charcoal/60 text-sm uppercase tracking-[0.4em] text-clay">
      Loading showcase
    </div>
  ),
})

export default function Home() {
  return (
    <div className="space-y-28 pb-28">
      <Hero />
      <HighlightMarquee />
      <SignatureCollections />
      <ProductCarousel />
      <ParallaxStories />
      <EventsPreview />
      <SpotlightCta />
    </div>
  )
}
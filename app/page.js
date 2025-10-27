import EventsPreview from '../src/components/EventsPreview'
import Hero from '../src/components/Hero'
import HighlightMarquee from '../src/components/HighlightMarquee'
import ParallaxStories from '../src/components/ParallaxStories'
import SignatureCollections from '../src/components/SignatureCollections'
import SpotlightCta from '../src/components/SpotlightCta'
import ProductCarouselShell from '../src/components/ProductCarouselShell'

export default function Home() {
  return (
    <div className="space-y-28 pb-28">
      <Hero />
      <HighlightMarquee />
      <SignatureCollections />
      <ProductCarouselShell />
      <ParallaxStories />
      <EventsPreview />
      <SpotlightCta />
    </div>
  )
}
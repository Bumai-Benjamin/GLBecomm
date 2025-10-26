'use client'

import Page from '../src/components/Page'
import Hero from '../src/components/Hero'
import RotatingGallery from '../src/components/RotatingGallery'

export default function Home() {
  return (
    <Page>
      <Hero />
      <RotatingGallery />
    </Page>
  )
}
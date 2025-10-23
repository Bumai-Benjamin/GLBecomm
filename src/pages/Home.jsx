import React from 'react'
import Page from '../components/Page'
import Hero from '../components/Hero'
import RotatingGallery from '../components/RotatingGallery'

export default function Home(){
  return (
    <Page>
      <Hero />
      <RotatingGallery />
    </Page>
  )
}

import React from 'react'
import Hero from './component/sections/home/Hero'
import StripLine from './component/sections/home/StripLine'
import AboutSection from './component/sections/home/AboutSection'
import Legacy from './component/sections/home/Legacy'
import ProductPortfolio from './component/sections/home/ProductPortfolio'

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <StripLine />
      <AboutSection />
      <Legacy />
      <ProductPortfolio />
    </main>
  )
}

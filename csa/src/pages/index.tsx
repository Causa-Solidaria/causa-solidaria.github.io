"use client"

import DefaultPage from "csa/components/DefaultPage"
import { HeroSection, AboutSection } from "csa/components/pagesComponents/Home"

export default function Home() {
  return (
    <DefaultPage
      position={"relative"}
      p={0}
      bg={"qui"}
      transition="all 0.6s ease"
    >
      <HeroSection />
      <AboutSection />
    </DefaultPage>
  )
}



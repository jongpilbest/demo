import React from 'react'
import HeroSection from '@/sections/Home/HeroSection';
import LogoMarquee from '@/components/LogoMarquee';
import FeaturesSection from '@/sections/Home/FeaturesSection';
export default function Home_Main() {
  
  return (
       <main>
        <HeroSection />
        <LogoMarquee />
        <FeaturesSection />
      </main>
  )
}

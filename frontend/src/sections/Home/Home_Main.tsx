import React from 'react'
import HeroSection from '@/Redeign/HeroSection';
import SolutionSection from '@/Redeign/Solution';
import ProblemSection from '@/Redeign/Problem_Solution';
import SSSolutionSection from '@/Redeign/SSolution';
import ComparisonSection from './Comparision';
import ClientsSection from '@/Redeign/Partner';
import LogoMarquee from '@/components/LogoMarquee';
import HistorySection from '@/Redeign/History';
import CtaSection from '@/Redeign/Contact';
import Footer from '@/Redeign/Footer';
import FeaturesSection from '@/sections/Home/FeaturesSection';

export default function Home_Main() {

  return (
    <main>
      <HeroSection></HeroSection>
      <SolutionSection></SolutionSection>
      <SSSolutionSection></SSSolutionSection>
      <ProblemSection></ProblemSection>
      <ComparisonSection></ComparisonSection>
      <ClientsSection>
        <LogoMarquee></LogoMarquee>
        <HistorySection></HistorySection>
        <CtaSection></CtaSection>
        <Footer></Footer>

      </ClientsSection>
      {
 /*
<HeroSection />
        <LogoMarquee />
        <FeaturesSection />

   */     }
    </main>
  )
}

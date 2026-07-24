import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { TrustedBySection } from '@/components/trusted-by-section'
import { ServicesSection } from '@/components/services-section'
import { PortfolioShowcaseSection } from '@/components/portfolio-showcase-section'
import { ProcessSection } from '@/components/process-section'
import { WhyChooseUsSection } from '@/components/why-choose-us-section'
import { TechnologiesSection } from '@/components/technologies-section'
import { StatisticsSection } from '@/components/statistics-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navigation />
      <Hero />
      <TrustedBySection />
      <ServicesSection />
      <PortfolioShowcaseSection />
      <ProcessSection />
      <WhyChooseUsSection />
      <TechnologiesSection />
      <StatisticsSection />
      <CTASection />
{/*       <TestimonialsSection />
 */}      <Footer />
    </main>
  )
}

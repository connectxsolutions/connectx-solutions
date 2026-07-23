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
  // JSON-LD Organization Schema for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ConnectX Solutions',
    url: 'https://connectx-solutions.com',
    logo: 'https://connectx-solutions.com/logo.png',
    description: 'Premier software development agency engineering enterprise web applications, mobile platforms, and AI-driven digital experiences.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Assiut',
      addressCountry: 'EG',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+201019971564',
      contactType: 'customer service',
      email: 'team.connectx.solutions@gmail.com',
    },
    sameAs: [
      'https://github.com',
      'https://linkedin.com',
      'https://twitter.com',
    ],
  }

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Inject Structured Data for SEO */}
      <script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navigation />
      <Hero />
      <TrustedBySection />
      <ServicesSection />
      <PortfolioShowcaseSection />
      <ProcessSection />
      <WhyChooseUsSection />
      <TechnologiesSection />
      <StatisticsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}

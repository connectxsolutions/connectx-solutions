import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { ServicesSection } from '@/components/services-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ServicesSection />
      <Footer />
    </main>
  )
}

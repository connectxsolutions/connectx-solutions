'use client'

import { useTranslations } from 'next-intl'
import { 
  Layers, 
  Cpu, 
  Globe, 
  Shield, 
  Database, 
  Cloud, 
  Zap, 
  Code2, 
  Terminal, 
  Layout, 
  Server,
  Lock
} from 'lucide-react'

const partners = [
  { name: 'Vercel', icon: Cloud },
  { name: 'Stripe', icon: Zap },
  { name: 'Supabase', icon: Database },
  { name: 'AWS', icon: Server },
  { name: 'Linear', icon: Layers },
  { name: 'Framer', icon: Layout },
  { name: 'Clerk', icon: Lock },
  { name: 'Docker', icon: Cpu },
  { name: 'Resend', icon: Globe },
  { name: 'GitHub', icon: Code2 },
  { name: 'PostgreSQL', icon: Database },
  { name: 'Cloudinary', icon: Shield },
]

export function TrustedBySection() {
  const t = useTranslations('TrustedBy')

  return (
    <section className="py-12 border-y border-border/40 bg-card/20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <p className="text-xs font-bold tracking-widest text-muted-foreground/80 uppercase">
          {t('title')}
        </p>
      </div>

      {/* Fade Gradients at Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Infinite Marquee Ticker */}
      <div className="flex overflow-hidden select-none">
        <div className="animate-marquee flex items-center gap-12 sm:gap-16 py-2">
          {partners.concat(partners).map((partner, index) => {
            const Icon = partner.icon
            return (
              <div
                key={index}
                className="flex items-center gap-2.5 text-muted-foreground/60 hover:text-foreground transition-colors duration-200 cursor-default group"
              >
                <Icon className="w-5 h-5 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                <span className="text-sm font-semibold tracking-tight">{partner.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

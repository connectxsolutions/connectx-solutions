'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { Sparkles, Calendar, ArrowRight, CheckCircle } from 'lucide-react'

export function CTASection() {
  const t = useTranslations('CTA')

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-8 sm:p-12 lg:p-16 glass-card border border-primary/30 shadow-2xl overflow-hidden bg-gradient-to-br from-primary/10 via-card to-card text-center space-y-8"
        >
          {/* Background Ambient Spotlights */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-card border border-primary/25 text-xs font-semibold text-primary">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>

          {/* Headline & Subtitle */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              {t('title')}
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          {/* Perks Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2">
            {[t('perk1'), t('perk2'), t('perk3')].map((perk, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>{perk}</span>
              </div>
            ))}
          </div>

          {/* Dual Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="rounded-full px-8 h-12 gap-2 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" />
                <span>{t('bookMeeting')}</span>
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 h-12 gap-2 text-sm font-semibold border-border/80 bg-card/50 hover:bg-card backdrop-blur-md transition-all hover:-translate-y-0.5"
              >
                <span>{t('contactUs')}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  )
}

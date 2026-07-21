'use client'

import { Link } from '@/i18n/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

// Dynamic import for Lottie — avoids loading the heavy animation library in the critical JS bundle.
// ssr: false because Lottie requires browser APIs (canvas/requestAnimationFrame).
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square max-w-[450px] lg:max-w-[550px] flex items-center justify-center">
      <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/10 to-accent/5 animate-pulse" />
    </div>
  ),
})

// Lazy-load the heavy Lottie JSON data only when needed
const loadHeroAnimation = () => import('@/public/Tech.json').then(m => m.default)

export function Hero() {
  const t = useTranslations('Hero')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-gradient-to-b from-background via-background to-card/50">
      <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/10 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-gradient-to-tr from-secondary/20 to-primary/10 rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 md:py-20">

          {/*
            Text content is rendered immediately without opacity:0 to avoid LCP delay.
            Framer Motion's initial={{ opacity: 0 }} was hiding this from the browser
            until JS hydrated, causing a 2,690ms LCP element render delay.
            We now only animate the subtle slide-up (y), keeping opacity at 1 always.
          */}
          <div className="space-y-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary font-medium">
                  {t('badge')}
                </span>
              </motion.div>

              {/* h1 rendered with full opacity immediately — critical for LCP */}
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight tracking-tight">
                {t('titleLine1')}{' '}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  {t('titleHighlight')}
                </span>
              </h1>

              {/* LCP element — kept fully visible immediately, no opacity animation */}
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t('description')}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  {t('getStarted')}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline">{t('viewWork')}</Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-8 pt-8 border-t border-border"
            >
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <p className="text-sm text-muted-foreground">{t('projectsDelivered')}</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">100+</div>
                <p className="text-sm text-muted-foreground">{t('happyClients')}</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">10y+</div>
                <p className="text-sm text-muted-foreground">{t('industryExperience')}</p>
              </div>
            </motion.div>
          </div>

          {/* Lottie animation — deferred, doesn't block initial render */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-72 sm:h-96 lg:h-[500px] w-full flex items-center justify-center"
          >
            <div className="absolute w-72 h-72 bg-gradient-to-br from-primary via-accent to-secondary rounded-full blur-3xl opacity-25 animate-pulse" />
            <div className="relative z-10 w-full max-w-[450px] lg:max-w-[550px] aspect-square flex items-center justify-center">
              <LottieAnimation />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Separate component so the dynamic import resolves after the text content is painted
function LottieAnimation() {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    loadHeroAnimation().then(setAnimationData)
  }, [])

  if (!animationData) return null

  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      className="w-full h-full object-contain"
    />
  )
}

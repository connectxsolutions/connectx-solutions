'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function About() {
  const t = useTranslations('About')

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">{t('title')}</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('subtitle')}
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-card/50 border border-border rounded-xl p-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">{t('missionTitle')}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('missionText')}
                </p>
              </div>

              <div className="bg-card/50 border border-border rounded-xl p-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">{t('storyTitle')}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  {t('storyText1')}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('storyText2')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-card/50 border border-border rounded-xl p-8 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <p className="text-muted-foreground">{t('teamMembers')}</p>
                </div>
                <div className="bg-card/50 border border-border rounded-xl p-8 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">150+</div>
                  <p className="text-muted-foreground">{t('countriesServed')}</p>
                </div>
                <div className="bg-card/50 border border-border rounded-xl p-8 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">98%</div>
                  <p className="text-muted-foreground">{t('clientSatisfaction')}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border border-primary/20 rounded-xl p-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">{t('valuesTitle')}</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{t('excellence')}</h3>
                      <p className="text-muted-foreground">{t('excellenceDesc')}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{t('innovation')}</h3>
                      <p className="text-muted-foreground">{t('innovationDesc')}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{t('partnership')}</h3>
                      <p className="text-muted-foreground">{t('partnershipDesc')}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{t('integrity')}</h3>
                      <p className="text-muted-foreground">{t('integrityDesc')}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

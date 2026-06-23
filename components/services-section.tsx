'use client'

import { motion } from 'framer-motion'
import { Code, Palette, Rocket, BarChart3, Users, Shield } from 'lucide-react'
import { useTranslations } from 'next-intl'

const serviceItems = [
  { key: 'webDev', icon: Code },
  { key: 'uiux', icon: Palette },
  { key: 'product', icon: Rocket },
  { key: 'analytics', icon: BarChart3 },
  { key: 'team', icon: Users },
  { key: 'security', icon: Shield },
] as const

export function ServicesSection() {
  const t = useTranslations('Services')

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceItems.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 bg-background/50 border border-border hover:border-primary/50 rounded-xl transition-all hover:bg-card/50 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary/20 rounded-lg flex items-center justify-center mb-4 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{t(`${service.key}.title`)}</h3>
                <p className="text-muted-foreground">{t(`${service.key}.description`)}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

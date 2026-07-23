'use client'

import { motion } from 'framer-motion'
import { Code2, Palette, Cloud, Smartphone, Users2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

const serviceItems = [
  { 
    key: 'webDev', 
    icon: Code2,
    accent: 'from-amber-500/20 to-primary/10',
    iconColor: 'text-primary'
  },
  { 
    key: 'uiux', 
    icon: Palette,
    accent: 'from-blue-500/20 to-accent/10',
    iconColor: 'text-accent'
  },
  { 
    key: 'product', 
    icon: Cloud,
    accent: 'from-indigo-500/20 to-secondary/10',
    iconColor: 'text-secondary'
  },
  { 
    key: 'analytics', 
    icon: Smartphone,
    accent: 'from-emerald-500/20 to-teal-500/10',
    iconColor: 'text-emerald-500'
  },
  { 
    key: 'team', 
    icon: Users2,
    accent: 'from-purple-500/20 to-pink-500/10',
    iconColor: 'text-purple-500'
  },
  { 
    key: 'security', 
    icon: ShieldCheck,
    accent: 'from-orange-500/20 to-red-500/10',
    iconColor: 'text-orange-500'
  },
] as const

export function ServicesSection() {
  const t = useTranslations('Services')

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-background">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-card border border-primary/20 text-xs font-semibold text-primary">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
            {t('title')}
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceItems.map((service, index) => {
            const Icon = service.icon
            // Safely fetch tech stack tags array
            const techList = t.raw(`${service.key}.tech`) as string[] | undefined

            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group relative flex flex-col justify-between p-8 rounded-2xl glass-card glass-card-hover border border-border/60 hover:border-primary/40 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Subtle top card glow on hover */}
                <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${service.accent} opacity-0 group-hover:opacity-100 rounded-t-2xl transition-opacity duration-300`} />

                <div>
                  {/* Icon & Title */}
                  <div className="w-13 h-13 rounded-2xl bg-card border border-border/80 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:border-primary/50 transition-all duration-300 shadow-sm">
                    <Icon className={`w-6 h-6 ${service.iconColor}`} />
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {t(`${service.key}.title`)}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {t(`${service.key}.description`)}
                  </p>
                </div>

                <div>
                  {/* Tech Badges */}
                  {Array.isArray(techList) && techList.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/40 mb-6">
                      {techList.map((techItem, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-muted/60 text-muted-foreground border border-border/30 group-hover:border-primary/20 transition-colors"
                        >
                          {techItem}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Learn More Button */}
                  <Link href="/contact" className="inline-block w-full">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between rounded-xl group/btn hover:bg-primary/10 hover:text-primary transition-colors text-xs font-semibold"
                    >
                      <span>{t('learnMore')}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

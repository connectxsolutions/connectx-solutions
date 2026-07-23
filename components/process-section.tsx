'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Sparkles, Search, Compass, Layout, Code2, ShieldCheck, Rocket, RefreshCw } from 'lucide-react'

const steps = [
  { key: 'step1', icon: Search, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { key: 'step2', icon: Compass, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { key: 'step3', icon: Layout, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  { key: 'step4', icon: Code2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { key: 'step5', icon: ShieldCheck, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { key: 'step6', icon: Rocket, color: 'text-primary', bg: 'bg-primary/10' },
  { key: 'step7', icon: RefreshCw, color: 'text-sky-500', bg: 'bg-sky-500/10' },
]

export function ProcessSection() {
  const t = useTranslations('Process')

  return (
    <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20 space-y-4"
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

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Progress Line on Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary -translate-x-1/2 opacity-30" />

          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col lg:flex-row items-center ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content Card Side */}
                  <div className="w-full lg:w-1/2 lg:px-8">
                    <div className="glass-card rounded-2xl p-6 sm:p-8 border border-border/60 hover:border-primary/40 glass-card-hover shadow-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                          {t(`${step.key}.num`)}
                        </span>
                        <div className={`p-2.5 rounded-xl ${step.bg} ${step.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <h3 className="text-xl font-extrabold text-foreground tracking-tight">
                        {t(`${step.key}.title`)}
                      </h3>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t(`${step.key}.desc`)}
                      </p>
                    </div>
                  </div>

                  {/* Center Node Badge on Desktop */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-card border-2 border-primary items-center justify-center text-primary font-bold text-xs shadow-md z-10">
                    {index + 1}
                  </div>

                  {/* Spacer Side */}
                  <div className="hidden lg:block w-1/2" />
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Code2, Users, Globe, Repeat, Layers } from 'lucide-react'

const stats = [
  { num: null, labelKey: 'stat1Label', descKey: 'stat1Desc', icon: Code2,  color: 'text-amber-500'   },
  { num: null, labelKey: 'stat2Label', descKey: 'stat2Desc', icon: Users,  color: 'text-blue-500'    },
  { num: null, labelKey: 'stat3Label', descKey: 'stat3Desc', icon: Globe,  color: 'text-emerald-500' },
  { num: null, labelKey: 'stat4Label', descKey: 'stat4Desc', icon: Repeat, color: 'text-primary'     },
  { num: null, labelKey: 'stat5Label', descKey: 'stat5Desc', icon: Layers, color: 'text-purple-500'  },
]

export function StatisticsSection() {
  const t = useTranslations('Statistics')

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative bg-card/40 border-y border-border/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 border border-border/60 hover:border-primary/40 glass-card-hover shadow-sm text-center space-y-3"
              >
                <div className={`p-2.5 rounded-xl bg-card border border-border/60 w-fit mx-auto ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="text-xs font-bold text-foreground uppercase tracking-wide">
                  {t(stat.labelKey)}
                </div>

                <p className="text-[11px] text-muted-foreground leading-tight">
                  {t(stat.descKey)}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

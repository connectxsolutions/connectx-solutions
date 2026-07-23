'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { 
  Sparkles, 
  Zap, 
  Code2, 
  MonitorCheck, 
  SearchCheck, 
  TrendingUp, 
  Headphones, 
  Check, 
  X, 
  Minus 
} from 'lucide-react'

const highlights = [
  { key: 'feature1', icon: Zap, color: 'text-amber-500' },
  { key: 'feature2', icon: Code2, color: 'text-blue-500' },
  { key: 'feature3', icon: MonitorCheck, color: 'text-emerald-500' },
  { key: 'feature4', icon: SearchCheck, color: 'text-purple-500' },
  { key: 'feature5', icon: TrendingUp, color: 'text-primary' },
  { key: 'feature6', icon: Headphones, color: 'text-sky-500' },
]

export function WhyChooseUsSection() {
  const t = useTranslations('WhyChooseUs')

  const comparisonRows = [
    { label: t('row1'), connectX: true, agency: false, freelancer: false },
    { label: t('row2'), connectX: true, agency: false, freelancer: false },
    { label: t('row3'), connectX: true, agency: 'partial', freelancer: false },
    { label: t('row4'), connectX: true, agency: true, freelancer: 'partial' },
    { label: t('row5'), connectX: true, agency: false, freelancer: false },
  ]

  return (
    <section id="why-us" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-card/20 border-t border-border/40">
      <div className="max-w-7xl mx-auto">
        
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

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {highlights.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 border border-border/60 hover:border-primary/40 glass-card-hover shadow-sm space-y-3"
              >
                <div className={`p-3 rounded-xl bg-card border border-border/60 w-fit ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {t(`${item.key}.title`)}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t(`${item.key}.desc`)}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Comparison Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-6 sm:p-10 border border-border/60 shadow-2xl overflow-hidden"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-extrabold text-foreground">
              {t('comparisonTitle')}
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="pb-4 pt-2 text-muted-foreground font-medium text-xs uppercase tracking-wider">
                    Engineering Metric
                  </th>
                  <th className="pb-4 pt-2 px-4 text-center font-extrabold text-primary text-sm bg-primary/10 rounded-t-xl">
                    {t('colConnectX')}
                  </th>
                  <th className="pb-4 pt-2 px-4 text-center font-semibold text-muted-foreground text-xs">
                    {t('colAgencies')}
                  </th>
                  <th className="pb-4 pt-2 px-4 text-center font-semibold text-muted-foreground text-xs">
                    {t('colFreelancers')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-card/40 transition-colors">
                    <td className="py-4 font-semibold text-foreground text-xs sm:text-sm pr-4">
                      {row.label}
                    </td>

                    {/* ConnectX */}
                    <td className="py-4 px-4 text-center bg-primary/5">
                      <div className="flex items-center justify-center text-primary">
                        <Check className="w-5 h-5 stroke-[3]" />
                      </div>
                    </td>

                    {/* Agencies */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center">
                        {row.agency === true ? (
                          <Check className="w-4 h-4 text-muted-foreground" />
                        ) : row.agency === 'partial' ? (
                          <Minus className="w-4 h-4 text-amber-500" />
                        ) : (
                          <X className="w-4 h-4 text-destructive/70" />
                        )}
                      </div>
                    </td>

                    {/* Freelancers */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center">
                        {row.freelancer === true ? (
                          <Check className="w-4 h-4 text-muted-foreground" />
                        ) : row.freelancer === 'partial' ? (
                          <Minus className="w-4 h-4 text-amber-500" />
                        ) : (
                          <X className="w-4 h-4 text-destructive/70" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

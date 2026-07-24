'use client'

import { Link } from '@/i18n/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, Sparkles, ShieldCheck, Zap, Server, Star, CheckCircle2, Terminal } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function Hero() {
  const t = useTranslations('Hero')

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-16 bg-gradient-to-b from-background via-background/95 to-card/30 bg-grid-pattern">
      {/* Ambient Glow & Spotlight Background Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] spotlight-primary rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] spotlight-secondary rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-primary/10 rounded-full blur-3xl opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-8 lg:py-12">
          
          {/* Left Column: Headline, Subtitle, CTAs, Social Proof */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/80 border border-primary/25 backdrop-blur-md shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span className="text-xs font-semibold text-foreground tracking-wide">
                {t('badge')}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
                {t('titleLine1')}{' '}
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  {t('titleHighlight')}
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl font-normal">
                {t('description')}
              </p>
            </div>

            {/* Dual CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link href="/contact">
                <Button
                  size="lg"
                  className="rounded-full px-7 h-12 gap-2 text-sm font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5"
                >
                  <span>{t('getStarted')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-7 h-12 gap-2 text-sm font-semibold border-border/80 bg-card/50 hover:bg-card hover:border-primary/40 backdrop-blur-md transition-all hover:-translate-y-0.5"
                >
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{t('bookMeeting')}</span>
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators & Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 border-t border-border/40 space-y-4"
            >
              <div className="flex flex-wrap items-center gap-6">
                {/* Client Avatar Stack */}
                <div className="flex items-center -space-x-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#fe8101] to-[#fe6402] flex items-center justify-center text-xs font-bold text-white ring-2 ring-background">
                    SA
                  </div>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#fe6402] to-[#fd3c03] flex items-center justify-center text-xs font-bold text-white ring-2 ring-background">
                    MV
                  </div>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#fd3c03] to-[#fe8101] flex items-center justify-center text-xs font-bold text-white ring-2 ring-background">
                    DC
                  </div>
                  <div className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-xs font-bold text-muted-foreground ring-2 ring-background">
                    50+
                  </div>
                </div>

                {/* Rating & Review */}
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                    <span className="text-xs font-bold text-foreground ml-1.5">4.95 / 5.0</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t('trustedBy')}
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Floating UI Interactive SaaS Graphic Showcase */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto w-full max-w-lg"
            >
              {/* Central Code & Performance Card */}
              <div className="glass-card rounded-2xl p-6 shadow-2xl border border-border/60 relative overflow-hidden backdrop-blur-xl">
                {/* Header Dots */}
                <div className="flex items-center justify-between pb-4 border-b border-border/40 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono text-muted-foreground ml-2">connectx-core.ts</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Lighthouse 100</span>
                  </div>
                </div>

                {/* Simulated Code & Specs */}
                <div className="font-mono text-xs space-y-2 text-foreground/90 bg-background/80 p-4 rounded-xl border border-border/40">
                  <div className="text-muted-foreground">
                    <span className="text-primary">// ConnectX High-Scale Architecture</span>
                  </div>
                  <div>
                    <span className="text-accent font-semibold">import</span> &#123; NextApp, HighAvailability &#125; <span className="text-accent font-semibold">from</span> <span className="text-emerald-500">'@connectx/core'</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-primary font-semibold">export const</span> <span className="text-yellow-500">config</span> = &#123;
                  </div>
                  <div className="pl-4 text-muted-foreground">
                    latency: <span className="text-primary font-semibold">'&lt; 45ms'</span>,
                  </div>
                  <div className="pl-4 text-muted-foreground">
                    architecture: <span className="text-accent font-semibold">'Serverless Edge'</span>,
                  </div>
                  <div className="pl-4 text-muted-foreground">
                    security: <span className="text-emerald-500 font-semibold">'SOC2 Type II'</span>
                  </div>
                  <div>&#125;</div>
                </div>

                {/* Performance Gauge Row */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="p-3 rounded-xl bg-card/60 border border-border/50 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{t('cardLatencyTitle')}</div>
                      <div className="text-sm font-bold text-foreground">{t('cardLatencyVal')}</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-card/60 border border-border/50 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10 text-accent">
                      <Server className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{t('cardUptimeTitle')}</div>
                      <div className="text-sm font-bold text-foreground">{t('cardUptimeVal')}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating UI Card 1: Top Right Security Badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl glass-card border border-border/80 shadow-xl"
              >
                <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-500">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">{t('cardSecurityTitle')}</div>
                  <div className="text-[11px] text-muted-foreground">{t('cardSecurityVal')}</div>
                </div>
              </motion.div>

              {/* Floating UI Card 2: Bottom Left System Metrics Badge */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl glass-card border border-border/80 shadow-xl"
              >
                <div className="p-2.5 rounded-xl bg-primary/15 text-primary">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">Next.js 16 & React 19</div>
                  <div className="text-[11px] text-emerald-500 font-semibold">100% Type-Safe Core</div>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

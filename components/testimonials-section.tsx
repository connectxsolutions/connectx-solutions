'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Sparkles, Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react'

const testimonials = [
  { key: 'test1', avatar: 'SA', bg: 'from-amber-500 to-primary' },
  { key: 'test2', avatar: 'MV', bg: 'from-blue-600 to-accent' },
  { key: 'test3', avatar: 'DC', bg: 'from-emerald-500 to-teal-600' },
]

export function TestimonialsSection() {
  const t = useTranslations('Testimonials')
  const [currentIndex, setCurrentIndex] = useState(0)

  // Autoplay carousel every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentIndex]

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-background">
      <div className="max-w-5xl mx-auto">
        
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

        {/* Carousel Container */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.key}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl p-8 sm:p-12 border border-border/60 shadow-2xl space-y-8 relative overflow-hidden"
            >
              <Quote className="absolute top-6 right-6 w-20 h-20 text-primary/10 pointer-events-none" />

              {/* 5 Star Rating */}
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                ))}
              </div>

              {/* Quote Content */}
              <blockquote className="text-lg sm:text-xl md:text-2xl text-foreground font-medium leading-relaxed italic">
                "{t(`${current.key}.quote`)}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-border/40">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${current.bg} flex items-center justify-center text-sm font-bold text-white shadow-md`}>
                  {current.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-foreground">
                    <span>{t(`${current.key}.name`)}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {t(`${current.key}.role`)} at <span className="font-semibold text-primary">{t(`${current.key}.company`)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-muted hover:bg-muted-foreground/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full glass-card border border-border/60 hover:border-primary/40 text-foreground transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full glass-card border border-border/60 hover:border-primary/40 text-foreground transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Sparkles, ArrowRight, ExternalLink, Layers } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'

interface Project {
  _id: string
  title: string
  description: string
  image?: string
  tags?: string[]
  category?: string
  published?: boolean
}

export function PortfolioShowcaseSection() {
  const t = useTranslations('PortfolioShowcase')
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Project[]) => setProjects(data.slice(0, 3)))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-card/20 border-t border-border/40">
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

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl bg-card/60 border border-border/40 h-72 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20 glass-card rounded-3xl border border-border/60"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
              <Layers className="w-6 h-6 text-primary" />
            </div>
            <p className="text-base font-semibold text-foreground mb-1">{t('noProjects')}</p>
          </motion.div>
        )}

        {/* Project Cards Grid */}
        {!loading && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group glass-card rounded-2xl border border-border/60 hover:border-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        priority={index < 2}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Layers className="w-10 h-10 text-primary/30" />
                      </div>
                    )}
                    {/* Category badge on hover */}
                    {project.category && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-[11px] font-semibold text-white bg-primary/90 px-2.5 py-1 rounded-full backdrop-blur-sm">
                          {project.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 space-y-3">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                      {project.title}
                    </h3>

                    {project.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                        {project.description}
                      </p>
                    )}

                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground border border-border/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* View link */}
                    <div className="pt-3 border-t border-border/40">
                      <Link href={`/portfolio/${project._id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-between rounded-xl hover:bg-primary/10 hover:text-primary text-xs font-semibold group/btn"
                        >
                          <span>View Project</span>
                          <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/portfolio">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 gap-2 text-xs font-semibold hover:-translate-y-0.5 transition-transform"
            >
              <span>{t('viewAll')}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Sparkles, Code2, Cpu, Database, Cloud, Terminal, Globe, Server, Shield, Layers, Layout } from 'lucide-react'

const techList = [
  { name: 'React 19', category: 'Frontend', desc: 'UI Library & Server Components', icon: Code2 },
  { name: 'Next.js 16', category: 'Frontend', desc: 'App Router & SSR Architecture', icon: Globe },
  { name: 'TypeScript', category: 'Frontend', desc: 'Strict Type-Safe Codebases', icon: Terminal },
  { name: 'Node.js', category: 'Backend', desc: 'High-Throughput Runtime', icon: Server },
  { name: 'Express', category: 'Backend', desc: 'REST Microservices', icon: Cpu },
  { name: 'MongoDB', category: 'Database', desc: 'NoSQL Document Store', icon: Database },
  { name: 'PostgreSQL', category: 'Database', desc: 'Relational ACIDs Database', icon: Database },
  { name: 'Flutter', category: 'Mobile', desc: 'Cross-Platform Native Apps', icon: Layers },
  { name: 'Firebase', category: 'Cloud', desc: 'Realtime Backend & Auth', icon: Cloud },
  { name: 'Docker', category: 'DevOps', desc: 'Containerized Deployments', icon: Cpu },
  { name: 'AWS', category: 'Cloud', desc: 'Enterprise Cloud Infrastructure', icon: Server },
  { name: 'Vercel', category: 'Cloud', desc: 'Serverless Edge Network', icon: Cloud },
  { name: 'Cloudinary', category: 'Cloud', desc: 'CDN Media Optimization', icon: Shield },
  { name: 'GitHub', category: 'Tools', desc: 'CI/CD Pipelines & Versioning', icon: Code2 },
  { name: 'Figma', category: 'Design', desc: 'Design Systems & Prototyping', icon: Layout },
]

export function TechnologiesSection() {
  const t = useTranslations('Technologies')

  return (
    <section id="tech" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-background">
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

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {techList.map((tech, index) => {
            const Icon = tech.icon
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                viewport={{ once: true }}
                className="group p-5 rounded-2xl glass-card border border-border/60 hover:border-primary/50 glass-card-hover text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-card border border-border/80 mx-auto flex items-center justify-center group-hover:scale-110 group-hover:border-primary/40 transition-all duration-300 shadow-sm">
                  <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-[11px] text-muted-foreground leading-tight mt-0.5 line-clamp-1">
                    {tech.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

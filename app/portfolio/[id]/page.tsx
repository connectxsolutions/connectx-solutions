'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function ProjectDetail() {
  const params = useParams()
  const id = params.id as string
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`)
        if (res.ok) {
          const data = await res.json()
          setProject(data)
        }
      } catch (error) {
        console.error('Failed to fetch project:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-muted-foreground">Loading project details...</p>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Project not found</h1>
            <Link href="/portfolio">
              <Button>Back to Portfolio</Button>
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <Link href="/portfolio" className="text-primary hover:underline mb-4 inline-block">
                ← Back to Portfolio
              </Link>
              <h1 className="text-5xl font-bold text-foreground mb-4">{project.title}</h1>
              <p className="text-xl text-muted-foreground">{project.description}</p>
            </div>

            {/* Hero Image */}
            {project.image && (
              <div className="relative h-96 rounded-xl overflow-hidden border border-border">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="bg-card/50 border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Overview</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">{project.content}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-card/50 border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-3">Client</h3>
                <p className="text-muted-foreground">{project.client || 'Confidential'}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">Ready to start your project?</h3>
              <Link href="/contact">
                <Button size="lg">Get in Touch</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

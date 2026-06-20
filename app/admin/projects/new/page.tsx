'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createProject } from '@/app/actions'
import { motion } from 'framer-motion'

export default function NewProject() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const formData = new FormData(e.currentTarget)
      await createProject(formData)
      router.push('/admin/projects')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-foreground">Create Project</h1>
            <p className="text-muted-foreground mt-2">Add a new project to your portfolio</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8 space-y-6">
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-foreground mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Project title"
                />
              </div>

              <div>
                <label htmlFor="client" className="block text-sm font-semibold text-foreground mb-2">
                  Client Name
                </label>
                <input
                  type="text"
                  id="client"
                  name="client"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Client name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-foreground mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={3}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Brief description of the project"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-foreground mb-2">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                rows={6}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Detailed project content"
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-semibold text-foreground mb-2">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="React, Next.js, Tailwind (comma separated)"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                name="published"
                className="w-4 h-4 rounded border-border accent-primary"
              />
              <label htmlFor="published" className="text-sm font-medium text-foreground">
                Publish this project
              </label>
            </div>

            <div className="flex gap-3 pt-6 border-t border-border">
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Project'}
              </Button>
              <Link href="/admin/projects">
                <Button variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { updateProject } from '@/app/actions'
import { motion } from 'framer-motion'

export default function EditProject() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [project, setProject] = useState<any>(null)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/admin/projects/${id}/get`)
        if (res.ok) {
          const data = await res.json()
          setProject(data)
        }
      } catch (err) {
        console.error('Failed to fetch project:', err)
      } finally {
        setFetching(false)
      }
    }
    fetchProject()
  }, [id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const formData = new FormData(e.currentTarget)
      await updateProject(id, formData)
      router.push('/admin/projects')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update project')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading project...</p>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-muted-foreground mb-4">Project not found</p>
          <Link href="/admin/projects">
            <Button variant="outline">Back to Projects</Button>
          </Link>
        </div>
      </div>
    )
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
            <h1 className="text-4xl font-bold text-foreground">Edit Project</h1>
            <p className="text-muted-foreground mt-2">Update project details</p>
          </div>

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-card border border-border rounded-xl p-8 space-y-6">
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
                  defaultValue={project.title}
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
                  defaultValue={project.client || ''}
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
                defaultValue={project.description}
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
                defaultValue={project.content || ''}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Detailed project content"
              />
            </div>

            {project.image && (
              <div className="rounded-xl overflow-hidden border border-border mb-6">
                <div className="text-sm font-semibold text-foreground px-4 py-2 bg-card">Current image</div>
                <div className="relative h-64">
                  <Image
                    src={project.image}
                    alt="Current project image"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="image" className="block text-sm font-semibold text-foreground mb-2">
                Upload new image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-border file:bg-primary/10 file:text-primary file:font-semibold file:hover:bg-primary/20"
              />
              <p className="text-sm text-muted-foreground mt-2">Leave blank to keep the existing image.</p>
            </div>

            <input type="hidden" name="currentImage" value={project.image ?? ''} />

            <div>
              <label htmlFor="tags" className="block text-sm font-semibold text-foreground mb-2">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                defaultValue={project.tags?.join(', ') || ''}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="React, Next.js, Tailwind (comma separated)"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                name="published"
                defaultChecked={project.published}
                className="w-4 h-4 rounded border-border accent-primary"
              />
              <label htmlFor="published" className="text-sm font-medium text-foreground">
                Publish this project
              </label>
            </div>

            <div className="flex gap-3 pt-6 border-t border-border">
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
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

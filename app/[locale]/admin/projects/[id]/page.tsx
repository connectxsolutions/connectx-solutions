'use client'

import { useState, useEffect } from 'react'
import { useRouter } from '@/i18n/navigation'
import { Link } from '@/i18n/navigation'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { updateProject } from '@/app/actions'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function EditProject() {
  const t = useTranslations('Admin')
  const tc = useTranslations('Common')
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
      setError(err instanceof Error ? err.message : t('failedUpdateProject'))
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">{t('loadingProject')}</p>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-muted-foreground mb-4">{t('projectNotFound')}</p>
          <Link href="/admin/projects">
            <Button variant="outline">{t('backToProjects')}</Button>
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
            <h1 className="text-4xl font-bold text-foreground">{t('editProject')}</h1>
            <p className="text-muted-foreground mt-2">{t('editProjectDesc')}</p>
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
                  {tc('title')} *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  defaultValue={project.title}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={t('titlePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="client" className="block text-sm font-semibold text-foreground mb-2">
                  {t('clientName')}
                </label>
                <input
                  type="text"
                  id="client"
                  name="client"
                  defaultValue={project.client || ''}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={t('clientPlaceholder')}
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-foreground mb-2">
                {tc('description')} *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={3}
                defaultValue={project.description}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder={t('descriptionPlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-foreground mb-2">
                {t('content')}
              </label>
              <textarea
                id="content"
                name="content"
                rows={6}
                defaultValue={project.content || ''}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder={t('contentPlaceholder')}
              />
            </div>

            {project.image && (
              <div className="rounded-xl overflow-hidden border border-border mb-6">
                <div className="text-sm font-semibold text-foreground px-4 py-2 bg-card">{t('currentImage')}</div>
                <div className="relative h-64">
                  <Image
                    src={project.image}
                    alt={t('currentImageAlt')}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="image" className="block text-sm font-semibold text-foreground mb-2">
                {t('uploadNewImage')}
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-border file:bg-primary/10 file:text-primary file:font-semibold file:hover:bg-primary/20"
              />
              <p className="text-sm text-muted-foreground mt-2">{t('keepExistingImage')}</p>
            </div>

            <input type="hidden" name="currentImage" value={project.image ?? ''} />

            <div>
              <label htmlFor="tags" className="block text-sm font-semibold text-foreground mb-2">
                {t('tags')}
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                defaultValue={project.tags?.join(', ') || ''}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={t('tagsPlaceholder')}
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
                {t('publishProject')}
              </label>
            </div>

            <div className="flex gap-3 pt-6 border-t border-border">
              <Button type="submit" disabled={loading}>
                {loading ? tc('saving') : tc('saveChanges')}
              </Button>
              <Link href="/admin/projects">
                <Button variant="outline">{tc('cancel')}</Button>
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

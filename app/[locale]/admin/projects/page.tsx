'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { Trash2, Edit, Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function ProjectsAdmin() {
  const t = useTranslations('Admin')
  const tc = useTranslations('Common')
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/projects')
      if (res.ok) {
        const data = await res.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm(tc('confirmDeleteProject'))) return

    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        setProjects(projects.filter(p => p._id !== id))
      }
    } catch (error) {
      console.error('Failed to delete project:', error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-foreground">{t('projectsTitle')}</h1>
              <p className="text-muted-foreground mt-2">{t('manageProjects')}</p>
            </div>
            <Link href="/admin/projects/new">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                {t('newProject')}
              </Button>
            </Link>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">
                {t('loadingProjects')}
              </div>
            ) : projects.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                {t('noProjects')}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-card/50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">{tc('title')}</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">{t('status')}</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">{t('created')}</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">{tc('actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project, index) => (
                      <tr
                        key={project._id}
                        className={`${
                          index !== projects.length - 1 ? 'border-b border-border' : ''
                        } hover:bg-card/80 transition-colors`}
                      >
                        <td className="px-6 py-4 text-foreground font-medium">{project.title}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            project.published
                              ? 'bg-primary/10 text-primary'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {project.published ? tc('published') : tc('draft')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground text-sm">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Link href={`/admin/projects/${project._id}`}>
                            <Button variant="outline" size="sm" className="gap-1">
                              <Edit className="w-4 h-4" />
                              {tc('edit')}
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(project._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                            {tc('delete')}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <Link href="/admin">
            <Button variant="outline">{tc('backToDashboard')}</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

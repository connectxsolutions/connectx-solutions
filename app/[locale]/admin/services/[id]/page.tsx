'use client'

import { useState, useEffect } from 'react'
import { useRouter } from '@/i18n/navigation'
import { Link } from '@/i18n/navigation'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { updateService } from '@/app/actions'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function EditService() {
  const t = useTranslations('Admin')
  const tc = useTranslations('Common')
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [service, setService] = useState<any>(null)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/admin/services/${id}`)
        if (res.ok) {
          const data = await res.json()
          setService(data)
        }
      } catch (err) {
        console.error('Failed to fetch service:', err)
      } finally {
        setFetching(false)
      }
    }
    fetchService()
  }, [id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const formData = new FormData(e.currentTarget)
      await updateService(id, formData)
      router.push('/admin/services')
    } catch (err) {
      setError(err instanceof Error ? err.message : t('failedUpdateService'))
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">{t('loadingService')}</p>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-muted-foreground mb-4">{t('serviceNotFound')}</p>
          <Link href="/admin/services">
            <Button variant="outline">{t('backToServices')}</Button>
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
            <h1 className="text-4xl font-bold text-foreground">{t('editService')}</h1>
            <p className="text-muted-foreground mt-2">{t('editServiceDesc')}</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8 space-y-6">
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-foreground mb-2">
                {t('serviceTitle')}
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                defaultValue={service.title}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={t('serviceTitlePlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-foreground mb-2">
                {tc('description')} *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                defaultValue={service.description}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder={t('serviceDescPlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="icon" className="block text-sm font-semibold text-foreground mb-2">
                {t('iconEmoji')}
              </label>
              <input
                type="text"
                id="icon"
                name="icon"
                maxLength={2}
                defaultValue={service.icon || ''}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="💻"
              />
            </div>

            <div className="flex gap-3 pt-6 border-t border-border">
              <Button type="submit" disabled={loading}>
                {loading ? tc('saving') : tc('saveChanges')}
              </Button>
              <Link href="/admin/services">
                <Button variant="outline">{tc('cancel')}</Button>
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from '@/i18n/navigation'
import { Link } from '@/i18n/navigation'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { updateTestimonial } from '@/app/actions'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function EditTestimonial() {
  const t = useTranslations('Admin')
  const tc = useTranslations('Common')
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [testimonial, setTestimonial] = useState<any>(null)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const res = await fetch(`/api/admin/testimonials/${id}`)
        if (res.ok) {
          const data = await res.json()
          setTestimonial(data)
        }
      } catch (err) {
        console.error('Failed to fetch testimonial:', err)
      } finally {
        setFetching(false)
      }
    }
    fetchTestimonial()
  }, [id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const formData = new FormData(e.currentTarget)
      await updateTestimonial(id, formData)
      router.push('/admin/testimonials')
    } catch (err) {
      setError(err instanceof Error ? err.message : t('failedUpdateTestimonial'))
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">{t('loadingTestimonial')}</p>
      </div>
    )
  }

  if (!testimonial) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-muted-foreground mb-4">{t('testimonialNotFound')}</p>
          <Link href="/admin/testimonials">
            <Button variant="outline">{t('backToTestimonials')}</Button>
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
            <h1 className="text-4xl font-bold text-foreground">{t('editTestimonial')}</h1>
            <p className="text-muted-foreground mt-2">{t('editTestimonialDesc')}</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8 space-y-6">
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="author" className="block text-sm font-semibold text-foreground mb-2">
                  {t('authorName')}
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  required
                  defaultValue={testimonial.author}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={t('authorPlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-semibold text-foreground mb-2">
                  {t('roleTitle')}
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  defaultValue={testimonial.role || ''}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={t('rolePlaceholder')}
                />
              </div>
            </div>

            <div>
              <label htmlFor="text" className="block text-sm font-semibold text-foreground mb-2">
                {t('testimonialText')}
              </label>
              <textarea
                id="text"
                name="text"
                required
                rows={4}
                defaultValue={testimonial.text}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder={t('testimonialPlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="rating" className="block text-sm font-semibold text-foreground mb-2">
                {t('rating')}
              </label>
              <select
                id="rating"
                name="rating"
                defaultValue={String(testimonial.rating || 5)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="5">{t('star5')}</option>
                <option value="4">{t('star4')}</option>
                <option value="3">{t('star3')}</option>
                <option value="2">{t('star2')}</option>
                <option value="1">{t('star1')}</option>
              </select>
            </div>

            <div className="flex gap-3 pt-6 border-t border-border">
              <Button type="submit" disabled={loading}>
                {loading ? tc('saving') : tc('saveChanges')}
              </Button>
              <Link href="/admin/testimonials">
                <Button variant="outline">{tc('cancel')}</Button>
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

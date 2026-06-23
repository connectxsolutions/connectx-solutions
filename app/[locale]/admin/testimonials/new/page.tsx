'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createTestimonial } from '@/app/actions'
import { motion } from 'framer-motion'

export default function NewTestimonial() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const formData = new FormData(e.currentTarget)
      await createTestimonial(formData)
      router.push('/admin/testimonials')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create testimonial')
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
            <h1 className="text-4xl font-bold text-foreground">Create Testimonial</h1>
            <p className="text-muted-foreground mt-2">Add a new client testimonial</p>
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
                  Author Name *
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Client name"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-semibold text-foreground mb-2">
                  Role/Title
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="CEO at Company"
                />
              </div>
            </div>

            <div>
              <label htmlFor="text" className="block text-sm font-semibold text-foreground mb-2">
                Testimonial Text *
              </label>
              <textarea
                id="text"
                name="text"
                required
                rows={4}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="What the client says about working with you..."
              />
            </div>

            <div>
              <label htmlFor="rating" className="block text-sm font-semibold text-foreground mb-2">
                Rating (1-5)
              </label>
              <select
                id="rating"
                name="rating"
                defaultValue="5"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="5">★★★★★ 5 Stars</option>
                <option value="4">★★★★ 4 Stars</option>
                <option value="3">★★★ 3 Stars</option>
                <option value="2">★★ 2 Stars</option>
                <option value="1">★ 1 Star</option>
              </select>
            </div>

            <div className="flex gap-3 pt-6 border-t border-border">
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Testimonial'}
              </Button>
              <Link href="/admin/testimonials">
                <Button variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Trash2, Edit, Plus } from 'lucide-react'

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/testimonials')
      if (res.ok) {
        const data = await res.json()
        setTestimonials(data)
      }
    } catch (error) {
      console.error('Failed to fetch testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        setTestimonials(testimonials.filter(t => t._id !== id))
      }
    } catch (error) {
      console.error('Failed to delete testimonial:', error)
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
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-foreground">Testimonials</h1>
              <p className="text-muted-foreground mt-2">Manage client testimonials</p>
            </div>
            <Link href="/admin/testimonials/new">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Testimonial
              </Button>
            </Link>
          </div>

          {/* Testimonials Grid */}
          <div>
            {loading ? (
              <div className="text-center text-muted-foreground">
                Loading testimonials...
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center text-muted-foreground">
                No testimonials yet. Add your first testimonial to get started.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-xl p-6"
                  >
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${
                              i < (testimonial.rating || 5) ? 'text-yellow-400' : 'text-muted'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-foreground italic mb-4">&quot;{testimonial.text}&quot;</p>
                    </div>

                    <div className="border-t border-border pt-4 mb-4">
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/admin/testimonials/${testimonial._id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full gap-1">
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(testimonial._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Back Button */}
          <Link href="/admin">
            <Button variant="outline">← Back to Dashboard</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

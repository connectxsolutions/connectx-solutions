'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { Trash2, Edit, Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function ServicesAdmin() {
  const t = useTranslations('Admin')
  const tc = useTranslations('Common')
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/services')
      if (res.ok) {
        const data = await res.json()
        setServices(data)
      }
    } catch (error) {
      console.error('Failed to fetch services:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm(tc('confirmDeleteService'))) return

    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        setServices(services.filter(s => s._id !== id))
      }
    } catch (error) {
      console.error('Failed to delete service:', error)
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
              <h1 className="text-4xl font-bold text-foreground">{t('servicesTitle')}</h1>
              <p className="text-muted-foreground mt-2">{t('manageServices')}</p>
            </div>
            <Link href="/admin/services/new">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                {t('newService')}
              </Button>
            </Link>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">
                {t('loadingServices')}
              </div>
            ) : services.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                {t('noServices')}
              </div>
            ) : (
              <>
                {/* Mobile Card View */}
                <div className="block md:hidden divide-y divide-border">
                  {services.map((service) => (
                    <div key={service._id} className="p-4 flex flex-col gap-3">
                      <div>
                        <p className="font-medium text-foreground">{service.title}</p>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{service.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/admin/services/${service._id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full gap-1">
                            <Edit className="w-4 h-4" />
                            {tc('edit')}
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-1 text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(service._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                          {tc('delete')}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-card/50">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">{tc('title')}</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">{tc('description')}</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">{tc('actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service, index) => (
                        <tr
                          key={service._id}
                          className={`${
                            index !== services.length - 1 ? 'border-b border-border' : ''
                          } hover:bg-card/80 transition-colors`}
                        >
                          <td className="px-6 py-4 text-foreground font-medium">{service.title}</td>
                          <td className="px-6 py-4 text-muted-foreground text-sm truncate max-w-xs">{service.description}</td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <Link href={`/admin/services/${service._id}`}>
                              <Button variant="outline" size="sm" className="gap-1">
                                <Edit className="w-4 h-4" />
                                {tc('edit')}
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 text-destructive hover:bg-destructive/10"
                              onClick={() => handleDelete(service._id)}
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
              </>
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

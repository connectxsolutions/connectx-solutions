'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Link } from '@/i18n/navigation'
import { motion } from 'framer-motion'
import { Package, MessageSquare, Briefcase, Star, Users } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

interface OverviewData {
  projects: number
  services: number
  testimonials: number
  messages: number
  users: number
}

export default function AdminDashboard() {
  const { data: session } = useSession()
  const t = useTranslations('Admin')
  const locale = useLocale() // لمعرفة اتجاه السهم (RTL / LTR)
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null)

  const menuItems = [
    { icon: Package, titleKey: 'projectsTitle', descKey: 'projectsDesc', href: '/admin/projects' },
    { icon: Briefcase, titleKey: 'servicesTitle', descKey: 'servicesDesc', href: '/admin/services' },
    { icon: Star, titleKey: 'testimonialsTitle', descKey: 'testimonialsDesc', href: '/admin/testimonials' },
    { icon: MessageSquare, titleKey: 'messagesTitle', descKey: 'messagesDesc', href: '/admin/messages' },
    { icon: Users, titleKey: 'employeesTitle', descKey: 'employeesDesc', href: '/admin/employees' },
  ] as const

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        // تم استبدال الـ 4 طلبات بطلب واحد فقط سريع جداً وموفر للأداء
        const res = await fetch('/api/admin/overview')
        if (res.ok) {
          const data = await res.json()
          setOverviewData(data)
        }
      } catch (error) {
        console.error('Failed to fetch overview data:', error)
      }
    }

    fetchOverviewData()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">{t('dashboard')}</h1>
            <p className="text-muted-foreground">
              {t('welcomeBack', { name: session?.user?.name || t('administrator') })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Link href={item.href}>
                    <div className="group p-6 bg-card border border-border hover:border-primary/50 rounded-xl transition-all hover:bg-card/80 hover:shadow-lg hover:shadow-primary/10 cursor-pointer">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        {/* تم الإصلاح: السهم ينعكس اتجاهه وحركته تلقائياً حسب لغة المتصفح الحالية */}
                        <span className={`text-primary text-2xl transition-transform ${
                          locale === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                        }`}>
                          {locale === 'ar' ? '←' : '→'}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {t(item.titleKey)}
                      </h3>
                      <p className="text-muted-foreground text-sm">{t(item.descKey)}</p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          <div className="bg-card/50 border border-border rounded-xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">{t('overview')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{overviewData?.projects ?? '...'}</div>
                <p className="text-sm text-muted-foreground">{t('totalProjects')}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{overviewData?.services ?? '...'}</div>
                <p className="text-sm text-muted-foreground">{t('services')}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{overviewData?.testimonials ?? '...'}</div>
                <p className="text-sm text-muted-foreground">{t('testimonials')}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{overviewData?.messages ?? '...'}</div>
                <p className="text-sm text-muted-foreground">{t('newMessages')}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{overviewData?.users ?? '...'}</div>
                <p className="text-sm text-muted-foreground">{t('totalEmployees')}</p>
              </div>
            </div>
            
          </div>
        </motion.div>
      </div>
    </main>
  )
}
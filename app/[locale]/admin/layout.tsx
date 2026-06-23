'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from '@/i18n/navigation'
import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const t = useTranslations('Admin')

  useEffect(() => {
    const role = (session?.user as any)?.role
    if (status === 'unauthenticated') {
      router.replace('/login?callbackUrl=/admin')
    } else if (status === 'authenticated' && role !== 'admin') {
      router.replace('/')
    }
  }, [status, session, router])

  const userRole = (session?.user as any)?.role

  if (status === 'loading' || status === 'unauthenticated' || (status === 'authenticated' && userRole !== 'admin')) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">{t('checkingAccess')}</p>
      </div>
    )
  }

  return children
}

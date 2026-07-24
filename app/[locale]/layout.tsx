import { Analytics } from '@vercel/analytics/next'
import type { Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { AuthSessionProvider } from '@/components/session-provider'
import { routing } from '@/i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: '/main icon png.png',
      apple: '/main icon png.png',
    },
    openGraph: {
      title: t('title'),
      description: t('ogDescription'),
      type: 'website',
    },
  }
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [ 
    { media: '(prefers-color-scheme: light)', color: '#f0f0f0' },
    { media: '(prefers-color-scheme: dark)', color: '#332b28' },
  ],
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'en' | 'ar')) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  // فحص صارم للبيئة قبل رندرة أي جزء يخص التحليلات لمنع حقن السكربت في الـ Dev تماماً
  const isProd = process.env.NODE_ENV === 'production'

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NextIntlClientProvider locale={locale} messages={messages}>
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
        {/* تم فصل الشرط هنا لضمان عدم قراءته أو رندرته نهائياً في بيئة التطوير المحلية */}
        {isProd && <Analytics />}
      </NextIntlClientProvider>
    </div>
  )
}
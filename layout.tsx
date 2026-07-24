import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider, useLocale, useMessages } from 'next-intl'
import { AuthSessionProvider } from '@/components/session-provider'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'ConnectX Solutions - Premium Digital Agency',
  description: 'Transforming businesses with cutting-edge digital solutions, innovative design, and strategic technology partnerships.',
  generator: 'v0.app',
  icons: {
    icon: '/main icon png.png',
    apple: '/main icon png.png',
  },
  openGraph: {
    title: 'ConnectX Solutions - Premium Digital Agency',
    description: 'Transforming businesses with cutting-edge digital solutions.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [ 
    { media: '(prefers-color-scheme: light)', color: '#f0f0f0' },
    { media: '(prefers-color-scheme: dark)', color: '#332b28' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = useLocale() ?? 'en'
  const messages = useMessages()

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <AuthSessionProvider>
              {children}
            </AuthSessionProvider>
            {process.env.NODE_ENV === 'production' && <Analytics />}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

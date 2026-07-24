import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { getLocale } from 'next-intl/server'
import { ThemeProvider } from '@/components/theme-provider'
import { GoogleAnalytics } from '@/components/google-analytics'
import { fontVariables } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'ConnectX Solutions - Premium Digital Agency',
  description: 'Transforming businesses with cutting-edge digital solutions, innovative design, and strategic technology partnerships.',
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ConnectX Solutions',
  url: 'https://connectx-solutions.com',
  logo: 'https://connectx-solutions.com/logo png light.png',
  description: 'Premier software development agency engineering enterprise web applications, mobile platforms, and AI-driven digital experiences.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Assiut',
    addressCountry: 'EG',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+201019971564',
    contactType: 'customer service',
    email: 'team.connectx.solutions@gmail.com',
  },
  sameAs: [
    'https://x.com/connectxsolu',
    'https://www.instagram.com/connect.x.solutions/',
    'https://www.facebook.com/profile.php?id=61592269685327',
    'https://www.tiktok.com/@connect.x.solutio?_r=1&_t=ZS-98Ha8yO6BfT',
    'https://github.com/connectxsolutions/',
    'https://www.linkedin.com/company/connectxsolutions',
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${fontVariables} font-sans antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  )
}

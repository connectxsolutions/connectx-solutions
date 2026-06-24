'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { useTranslations, useLocale } from 'next-intl'
import { ThemeToggle } from './theme-toggle'
import { LanguageSwitcher } from './language-switcher'

export function Navigation() {
  const { data: session } = useSession()
  const t = useTranslations('Navigation')
  const tc = useTranslations('Common')
  const locale = useLocale()

  return (
    <nav className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
       <Link href="/" className="flex items-center gap-3 group">
  {/* أزلنا الـ div الخارجي الذي كان يحتوي على relative و w-40 h-12 */}
  <Image
    src="/logo without background.png"
    alt={tc('logoAlt')}
    width={180} // العرض الافتراضي المناسب للشعار
    height={50}  // الارتفاع الافتراضي المناسب للشعار
    className="object-contain w-40 h-auto sm:w-48" // نتحكم في التجاوب (Responsive) مرن عبر الـ CSS هنا
    priority
  />
</Link>

          <div className="hidden md:flex gap-8">
            <Link href="/#services" className="text-muted-foreground hover:text-foreground transition-colors">{t('services')}</Link>
            <Link href="/portfolio" className="text-muted-foreground hover:text-foreground transition-colors">{t('portfolio')}</Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">{t('about')}</Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">{t('contact')}</Link>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
            {session?.user ? (
              <>
                <Link href="/admin">
                  <Button variant="outline" size="sm">{t('dashboard')}</Button>
                </Link>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => signOut({ callbackUrl: `/${locale}` })}
                >
                  {t('signOut')}
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button size="sm">{t('signIn')}</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

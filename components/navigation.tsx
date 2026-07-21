'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { useTranslations, useLocale } from 'next-intl'
import { ThemeToggle } from './theme-toggle'
import { LanguageSwitcher } from './language-switcher'
import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'

export function Navigation() {
  const { data: session } = useSession()
  const t = useTranslations('Navigation')
  const tc = useTranslations('Common')
  const locale = useLocale()
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navLinks = [
    { href: '/#services', label: t('services') },
    { href: '/portfolio', label: t('portfolio') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ]

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
              <Image
                src="/logo without background.png"
                alt={tc('logoAlt')}
                width={180}
                height={50}
                className="object-contain w-32 h-auto sm:w-40 md:w-48"
                priority
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex gap-8">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
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

            {/* Mobile: Theme + Lang + Hamburger */}
            <div className="flex md:hidden items-center gap-1">
              <ThemeToggle />
              <LanguageSwitcher />
              <button
                onClick={() => setMobileOpen(prev => !prev)}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        ref={menuRef}
        className={`fixed top-16 inset-x-0 z-40 md:hidden bg-background border-b border-border shadow-xl transition-all duration-300 ease-in-out ${
          mobileOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-1">
          {/* Nav Links */}
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Divider */}
          <div className="border-t border-border my-4" />

          {/* Auth Actions */}
          <div className="px-4 space-y-2">
            {session?.user ? (
              <>
                <Link href="/admin" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full justify-start">{t('dashboard')}</Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground"
                  onClick={() => {
                    setMobileOpen(false)
                    signOut({ callbackUrl: `/${locale}` })
                  }}
                >
                  {t('signOut')}
                </Button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button className="w-full">{t('signIn')}</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

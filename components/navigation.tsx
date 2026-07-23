'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { useTranslations, useLocale } from 'next-intl'
import { ThemeToggle } from './theme-toggle'
import { LanguageSwitcher } from './language-switcher'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, ArrowUpRight, Calendar } from 'lucide-react'

export function Navigation() {
  const { data: session } = useSession()
  const t = useTranslations('Navigation')
  const tc = useTranslations('Common')
  const locale = useLocale()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Track scroll state for glass opacity shift
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const navLinks = [
    { href: '/#services', label: t('services') },
    { href: '/#portfolio', label: t('portfolio') },
    { href: '/#process', label: t('process') },
    { href: '/#why-us', label: t('whyUs') },
    { href: '/#tech', label: t('tech') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-lg shadow-black/5 py-3'
            : 'bg-background/40 backdrop-blur-md border-b border-border/20 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group transition-transform duration-200 hover:scale-[1.02]"
              onClick={() => setMobileOpen(false)}
            >
              <div className="relative w-36 sm:w-44 md:w-48 h-10">
                <Image
                  src="/logo without background.png"
                  alt={tc('logoAlt')}
                  fill
                  sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 192px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-card/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-border/50 shadow-inner">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-card/80 rounded-full transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <LanguageSwitcher />

              {session?.user ? (
                <>
                  <Link href="/admin">
                    <Button variant="outline" size="sm" className="rounded-full text-xs font-semibold">
                      {t('dashboard')}
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="rounded-full text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => signOut({ callbackUrl: `/${locale}` })}
                  >
                    {t('signOut')}
                  </Button>
                </>
              ) : (
                <Link href="/contact">
                  <Button
                    size="sm"
                    className="rounded-full gap-2 text-xs font-medium bg-gradient-to-r from-primary to-primary/85 hover:from-primary/90 hover:to-primary shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t('bookMeeting')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile: Theme + Lang + Hamburger */}
            <div className="flex lg:hidden items-center gap-1.5">
              <ThemeToggle />
              <LanguageSwitcher />
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-card border border-border/40 transition-colors"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        ref={menuRef}
        className={`fixed top-[65px] inset-x-0 z-40 lg:hidden bg-background/95 backdrop-blur-2xl border-b border-border shadow-2xl transition-all duration-300 ease-in-out ${
          mobileOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-card border border-transparent hover:border-border/60 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-border/60 my-4 pt-4 space-y-3">
            <Link href="/contact" onClick={() => setMobileOpen(false)}>
              <Button className="w-full justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-semibold">
                <Calendar className="w-4 h-4" />
                <span>{t('bookMeeting')}</span>
              </Button>
            </Link>

            {session?.user ? (
              <div className="flex gap-2">
                <Link href="/admin" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full rounded-xl">
                    {t('dashboard')}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="rounded-xl text-muted-foreground"
                  onClick={() => {
                    setMobileOpen(false)
                    signOut({ callbackUrl: `/${locale}` })
                  }}
                >
                  {t('signOut')}
                </Button>
              </div>
            ) : (
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full rounded-xl">
                  {t('signIn')}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

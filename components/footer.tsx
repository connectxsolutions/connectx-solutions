'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Mail, Phone, MapPin, ArrowUp, Code2, Globe, Share2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('Footer')
  const tc = useTranslations('Common')

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-card/60 border-t border-border/60 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-44 h-12">
                <Image
                  src="/logo without background.png"
                  alt={tc('logoAlt')}
                  fill
                  sizes="176px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              {t('tagline')}
            </p>

            {/* Live System Operational Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-500 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>All Systems Operational</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-card border border-border/60 hover:border-primary/40 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Code2 className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-card border border-border/60 hover:border-primary/40 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-card border border-border/60 hover:border-primary/40 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground text-sm tracking-wide uppercase">{t('services')}</h3>
            <ul className="space-y-2.5">
              <li><Link href="/#services" className="text-xs text-muted-foreground hover:text-primary transition-colors">{t('webDevelopment')}</Link></li>
              <li><Link href="/#services" className="text-xs text-muted-foreground hover:text-primary transition-colors">{t('uiuxDesign')}</Link></li>
              <li><Link href="/#services" className="text-xs text-muted-foreground hover:text-primary transition-colors">{t('productStrategy')}</Link></li>
              <li><Link href="/#services" className="text-xs text-muted-foreground hover:text-primary transition-colors">{t('analytics')}</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground text-sm tracking-wide uppercase">{t('company')}</h3>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-xs text-muted-foreground hover:text-primary transition-colors">{t('aboutUs')}</Link></li>
              <li><Link href="/#portfolio" className="text-xs text-muted-foreground hover:text-primary transition-colors">{t('portfolio')}</Link></li>
              <li><Link href="/contact" className="text-xs text-muted-foreground hover:text-primary transition-colors">{t('contact')}</Link></li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground text-sm tracking-wide uppercase">{t('contact')}</h3>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                <a href="mailto:team.connectx.solutions@gmail.com" className="hover:text-primary transition-colors truncate">
                  team.connectx.solutions@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                <a href="tel:+201019971564" className="hover:text-primary transition-colors">
                  +2 01019971564
                </a>
              </li>
              <li className="flex items-start gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span>{t('location')}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to top */}
        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {t('copyright')}
          </p>

          <div className="flex items-center gap-6">
            <div className="flex gap-4 text-xs text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">{t('privacy')}</a>
              <a href="#" className="hover:text-primary transition-colors">{t('terms')}</a>
              <a href="#" className="hover:text-primary transition-colors">{t('cookies')}</a>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-full glass-card border border-border/60 hover:border-primary/40 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}

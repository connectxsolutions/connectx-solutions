'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { BrandLogo } from './brand-logo'

const GithubIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const LinkedinIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
)

const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

const FacebookIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const XIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const TikTokIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V5.8a6.34 6.34 0 0 0-1-.08A6.33 6.33 0 0 0 3 12a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.14z" />
  </svg>
)

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
              <BrandLogo className="w-44 h-12" priority />
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
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {[
                { name: 'GitHub', url: 'https://github.com/connectxsolutions/', icon: GithubIcon },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/company/connectxsolutions', icon: LinkedinIcon },
                { name: 'X', url: 'https://x.com/connectxsolu', icon: XIcon },
                { name: 'Instagram', url: 'https://www.instagram.com/connect.x.solutions/', icon: InstagramIcon },
                { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61592269685327', icon: FacebookIcon },
                { name: 'TikTok', url: 'https://www.tiktok.com/@connect.x.solutio?_r=1&_t=ZS-98Ha8yO6BfT', icon: TikTokIcon },
              ].map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-card border border-border/60 hover:border-primary/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-200"
                    aria-label={social.name}
                    title={social.name}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                )
              })}
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
                  +2 01559715645
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

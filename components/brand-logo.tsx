'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface BrandLogoProps {
  className?: string
  width?: number
  height?: number
  priority?: boolean
  variant?: 'full' | 'icon'
}

export function BrandLogo({
  className = 'w-36 sm:w-44 md:w-48 h-10',
  width,
  height,
  priority = false,
  variant = 'full',
}: BrandLogoProps) {
  const tc = useTranslations('Common')

  if (variant === 'icon') {
    const iconWidth = width || 64
    const iconHeight = height || 64
    return (
      <div className={`relative ${className}`}>
        <Image
          src="/main icon png.png"
          alt={tc('logoAlt')}
          width={iconWidth}
          height={iconHeight}
          className="w-full h-full object-contain"
          priority={priority}
        />
      </div>
    )
  }

  const logoWidth = width || 200
  const logoHeight = height || 50

  return (
    <div className={`relative ${className}`}>
      {/* Light Theme Logo (Dark text for light background) */}
      <Image
        src="/logo png light.png"
        alt={tc('logoAlt')}
        width={logoWidth}
        height={logoHeight}
        className="w-full h-full object-contain block dark:hidden"
        priority={priority}
      />
      {/* Dark Theme Logo (Light text for dark background) */}
      <Image
        src="/logo png dark.png"
        alt={tc('logoAlt')}
        width={logoWidth}
        height={logoHeight}
        className="w-full h-full object-contain hidden dark:block"
        priority={priority}
      />
    </div>
  )
}

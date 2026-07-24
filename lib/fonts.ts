import { Alexandria, Outfit, Space_Grotesk, Tajawal } from 'next/font/google'

export const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap',
})

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const alexandria = Alexandria({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-alexandria',
  display: 'swap',
})

export const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
  display: 'swap',
})

export const fontVariables = [
  outfit.variable,
  spaceGrotesk.variable,
  alexandria.variable,
  tajawal.variable,
].join(' ')

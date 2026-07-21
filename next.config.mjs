import nextIntl from 'next-intl/plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Use Next.js built-in image optimization instead of unoptimized
    // This enables automatic WebP/AVIF conversion, resizing, and lazy loading
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    // Provide common device widths for responsive images
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/avif', 'image/webp'],
  },
  // Reduce JS payload: compile only the packages that need it
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'next-intl'],
  },
}

export default nextIntl({ requestConfig: './i18n.ts' })(nextConfig)

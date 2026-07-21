import type { ReactNode } from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {/*
        Preconnect hints injected at root layout so they are present in every page's <head>.
        - Cloudinary: used for all project/portfolio images
        - Vercel Analytics: vitals reporting
        These reduce connection latency by warming up TCP + TLS before the browser
        discovers the resources in the HTML or CSS.
      */}
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
      </head>
      {children}
    </>
  )
}

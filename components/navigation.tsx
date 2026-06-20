'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export function Navigation() {
  const { data: session } = useSession()

  return (
    <nav className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">CX</span>
            </div>
            <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">ConnectX</span>
          </Link>

          <div className="hidden md:flex gap-8">
            <Link href="/#services" className="text-muted-foreground hover:text-foreground transition-colors">Services</Link>
            <Link href="/portfolio" className="text-muted-foreground hover:text-foreground transition-colors">Portfolio</Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </div>

          <div className="flex gap-3">
            {session?.user ? (
              <>
                <Link href="/admin">
                  <Button variant="outline" size="sm">Dashboard</Button>
                </Link>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button size="sm">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

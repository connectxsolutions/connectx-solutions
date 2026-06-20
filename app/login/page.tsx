'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function LoginContent() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const callbackUrl = searchParams.get('callbackUrl') || '/admin'

  const handleGoogleSignIn = async () => {
    setLoading(true)
    await signIn('google', { callbackUrl })
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-card border border-border rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">CX</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Sign In</h1>
          <p className="text-muted-foreground text-sm mt-2">Welcome back to ConnectX</p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleGoogleSignIn}
            disabled={loading}
            size="lg"
            variant="outline"
            className="w-full"
          >
            {loading ? 'Signing in...' : 'Continue with Google'}
          </Button>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Only authorized team members can access the admin dashboard.</p>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <Link href="/" className="text-primary hover:underline text-sm">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Login() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginContent />
      </Suspense>
    </div>
  )
}

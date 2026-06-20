import { Suspense } from 'react'
import LoginForm from './LoginForm'

export default function Login() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Suspense fallback={<div className="text-muted-foreground">Loading login form...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}

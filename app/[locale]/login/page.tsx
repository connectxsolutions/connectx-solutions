import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import LoginForm from './LoginForm'

async function LoginFallback() {
  const t = await getTranslations('Login')
  return <div className="text-muted-foreground">{t('loadingForm')}</div>
}

export default function Login() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Suspense fallback={<LoginFallback />}>
        <LoginForm />
      </Suspense>
    </div>
  )
}

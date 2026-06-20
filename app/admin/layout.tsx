'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     router.push('/login?callbackUrl=/admin')
  //   }
  // }, [status, router])

  // if (status === 'loading') {
  //   return (
  //     <div className="min-h-screen bg-background flex items-center justify-center">
  //       <p className="text-muted-foreground">Loading...</p>
  //     </div>
  //   )
  // }

  // if (!session?.user) {
  //   return null
  // }

  return children
}

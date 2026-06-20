'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Package, MessageSquare, Briefcase, Star } from 'lucide-react'

export default function AdminDashboard() {
  const { data: session } = useSession()

  const menuItems = [
    {
      icon: Package,
      title: 'Projects',
      description: 'Manage portfolio projects',
      href: '/admin/projects'
    },
    {
      icon: Briefcase,
      title: 'Services',
      description: 'Manage service offerings',
      href: '/admin/services'
    },
    {
      icon: Star,
      title: 'Testimonials',
      description: 'Manage client testimonials',
      href: '/admin/testimonials'
    },
    {
      icon: MessageSquare,
      title: 'Messages',
      description: 'View contact form submissions',
      href: '/admin/messages'
    }
  ]

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {session?.user?.name || 'Administrator'}
            </p>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Link href={item.href}>
                    <div className="group p-6 bg-card border border-border hover:border-primary/50 rounded-xl transition-all hover:bg-card/80 hover:shadow-lg hover:shadow-primary/10 cursor-pointer">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-primary text-2xl group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Quick Stats */}
          <div className="bg-card/50 border border-border rounded-xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">0</div>
                <p className="text-sm text-muted-foreground">Total Projects</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">0</div>
                <p className="text-sm text-muted-foreground">Services</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">0</div>
                <p className="text-sm text-muted-foreground">Testimonials</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">0</div>
                <p className="text-sm text-muted-foreground">New Messages</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

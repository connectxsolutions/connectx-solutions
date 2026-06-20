'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-gradient-to-b from-background via-background to-card/50">
      {/* Decorative gradient orb */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/10 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-gradient-to-tr from-secondary/20 to-primary/10 rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary font-medium">
                  Welcome to ConnectX
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Digital Solutions That{' '}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Transform
                </span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                We create cutting-edge digital experiences that empower businesses to succeed in the modern landscape. From strategy to execution, we&apos;re your partner in growth.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline">View Our Work</Button>
              </Link>
            </div>

            <div className="flex gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <p className="text-sm text-muted-foreground">Projects Delivered</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">100+</div>
                <p className="text-sm text-muted-foreground">Happy Clients</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">10y+</div>
                <p className="text-sm text-muted-foreground">Industry Experience</p>
              </div>
            </div>
          </motion.div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-96 md:h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-2xl border border-primary/20" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-64 h-64 bg-gradient-to-br from-primary via-accent to-secondary rounded-full blur-3xl opacity-30 animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

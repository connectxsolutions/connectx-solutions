'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Lottie from 'lottie-react'

// 1. استيراد ملف الـ JSON الخاص بالإنيميشن
// تأكد من وضع الملف في مجلد public وتسميته بشكل صحيح
import heroAnimation from '@/public/Tech.json'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-gradient-to-b from-background via-background to-card/50">
      {/* Decorative gradient orb */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/10 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-gradient-to-tr from-secondary/20 to-primary/10 rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 md:py-20">
          
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

              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight tracking-tight">
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

          {/* Right visual - Lottie Animation Option */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-72 sm:h-96 lg:h-[500px] w-full flex items-center justify-center"
          >
            {/* الإضاءة الخلفية (Glow) بتدي شكل جمالي ممتاز ورا الإنيميشن الشفاف */}
            <div className="absolute w-72 h-72 bg-gradient-to-br from-primary via-accent to-secondary rounded-full blur-3xl opacity-25 animate-pulse" />

            {/* حاوية الـ Lottie Animation */}
            <div className="relative z-10 w-full max-w-[450px] lg:max-w-[550px] aspect-square flex items-center justify-center">
              <Lottie 
                animationData={heroAnimation} 
                loop={true} 
                autoplay={true}
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
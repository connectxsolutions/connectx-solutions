'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">About ConnectX</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Pioneering digital transformation for over a decade
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-card/50 border border-border rounded-xl p-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At ConnectX, we believe that great digital experiences are the foundation of successful businesses. Our mission is to empower organizations with cutting-edge technology solutions that drive growth, innovation, and lasting impact in the digital economy.
                </p>
              </div>

              <div className="bg-card/50 border border-border rounded-xl p-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Founded in 2014, ConnectX started as a small team of passionate developers and designers with a shared vision: to create digital solutions that matter. Over the years, we&apos;ve grown into a full-service agency trusted by startups and enterprises alike.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  From humble beginnings to becoming industry leaders, our journey has been defined by our commitment to excellence, innovation, and client success. Today, we proudly serve clients across diverse industries, delivering solutions that exceed expectations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-card/50 border border-border rounded-xl p-8 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <p className="text-muted-foreground">Team Members & Partners</p>
                </div>
                <div className="bg-card/50 border border-border rounded-xl p-8 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">150+</div>
                  <p className="text-muted-foreground">Countries Served</p>
                </div>
                <div className="bg-card/50 border border-border rounded-xl p-8 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">98%</div>
                  <p className="text-muted-foreground">Client Satisfaction Rate</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border border-primary/20 rounded-xl p-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Excellence</h3>
                      <p className="text-muted-foreground">We deliver exceptional quality in everything we do</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Innovation</h3>
                      <p className="text-muted-foreground">We embrace new technologies and creative solutions</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Partnership</h3>
                      <p className="text-muted-foreground">We work as an extension of your team</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Integrity</h3>
                      <p className="text-muted-foreground">We operate with transparency and honesty</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

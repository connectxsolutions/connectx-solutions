'use client'

import { motion } from 'framer-motion'
import { Code, Palette, Rocket, BarChart3, Users, Shield } from 'lucide-react'

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Custom-built, scalable web applications designed for performance and user experience.'
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive designs that delight users and drive conversions.'
  },
  {
    icon: Rocket,
    title: 'Product Strategy',
    description: 'Strategic guidance to bring your product vision to life with market insights.'
  },
  {
    icon: BarChart3,
    title: 'Analytics & Optimization',
    description: 'Data-driven insights to optimize your digital presence and improve ROI.'
  },
  {
    icon: Users,
    title: 'Team Augmentation',
    description: 'Extend your team with experienced professionals aligned with your goals.'
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Enterprise-grade security and compliance solutions for peace of mind.'
  }
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 bg-background/50 border border-border hover:border-primary/50 rounded-xl transition-all hover:bg-card/50 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary/20 rounded-lg flex items-center justify-center mb-4 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

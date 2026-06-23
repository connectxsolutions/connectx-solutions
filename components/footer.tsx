import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-card/50 border-t border-border py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-40 h-12 sm:w-48 sm:h-14">
                <Image
                  src="/logo without background.png"
                  alt="ConnectX Solutions logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Transforming businesses through digital innovation.</p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Web Development</Link></li>
              <li><Link href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">UI/UX Design</Link></li>
              <li><Link href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Product Strategy</Link></li>
              <li><Link href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Analytics</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/portfolio" className="text-sm text-muted-foreground hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex gap-2 items-center text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <a href="mailto:team.connectx.solutions@gmail.com" className="hover:text-primary transition-colors">team.connectx.solutions@gmail.com</a>
              </li>
              <li className="flex gap-2 items-center text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <a href="tel:+2 01019971564" className="hover:text-primary transition-colors">+2 01019971564</a>
              </li>
              <li className="flex gap-2 items-start text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Assiut, Egypt</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} ConnectX Solutions. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-card/30 px-4">
      {/* Decorative background orbs to match the Hero theme */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gradient-to-br from-blue-600/10 via-indigo-500/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-tr from-violet-600/10 to-transparent rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-md w-full text-center space-y-8">
        
        {/* Animated 404 text with gradient */}
        <div className="relative inline-block">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-9xl font-black tracking-tighter bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm select-none"
          >
            404
          </motion.h1>
          {/* Subtle accent bar */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "40%" }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mt-2"
          />
        </div>

        {/* Text descriptions */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-3"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
            Sorry, the page you are looking for might have been removed, renamed, or is temporarily unavailable.
          </p>
        </motion.div>

        {/* Dynamic Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4"
        >
          <Link href="/" className="w-full sm:w-auto">
            <Button 
              size="lg" 
              className="w-full gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium shadow-lg shadow-indigo-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
          </Link>
        
        </motion.div>

        {/* Code layout footer decoration */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.6 }}
          className="font-mono text-xs text-muted-foreground/50 pt-8"
        >
          <span>Error Code: ERR_PAGE_NOT_FOUND</span>
        </motion.div>
      </div>
    </div>
  )
}
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    // Subtle parallax only for hero, disabled on mobile/reduced motion
    if (prefersReducedMotion || !videoRef.current || !heroRef.current) return
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window
    if (isMobile) return

    let rafId: number
    const handleScroll = () => {
      if (!videoRef.current || !heroRef.current) return
      const scrollY = window.scrollY
      const maxScroll = heroRef.current.offsetHeight
      const parallaxAmount = Math.min(scrollY * 0.3, 100) // Limit parallax
      
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.style.transform = `translate3d(0, ${-parallaxAmount}px, 0)`
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [prefersReducedMotion])

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brown-900/40 via-brown-800/30 to-transparent z-10" />
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover will-change-transform"
          onError={(e) => {
            const target = e.target as HTMLVideoElement
            target.style.display = 'none'
          }}
        >
          <source src="https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        {/* Fallback image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920')] bg-cover bg-center" />
      </div>

      {/* Content - visible immediately with fast animation */}
      <div className="relative z-20 text-center px-6">
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-display text-cream-50 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          Transform
        </motion.h1>
        <motion.h2
          className="text-5xl md:text-7xl lg:text-8xl font-display text-gold-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05, ease: 'easeOut' }}
        >
          Your Space
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-cream-100 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
        >
          Luxury interior design that reflects your unique style and elevates your everyday living
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15, ease: 'easeOut' }}
        >
          <button
            className="px-8 py-4 bg-gold-400 text-brown-900 font-medium rounded-full hover:bg-gold-500 transition-colors"
            data-cursor-text="Explore"
          >
            Discover Our Work
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, repeat: Infinity, repeatType: 'reverse', duration: 1 }}
      >
        <ArrowDown className="w-6 h-6 text-cream-50" />
      </motion.div>
    </section>
  )
}


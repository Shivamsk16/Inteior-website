'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const textElements = textRef.current.querySelectorAll('.hero-text')
    
    gsap.from(textElements, {
      opacity: 0,
      y: 100,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power3.out',
    })

    // Parallax effect for video
    if (videoRef.current) {
      gsap.to(videoRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }
  }, [])

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
          className="w-full h-full object-cover"
          onError={(e) => {
            // Hide video on error, show fallback image
            const target = e.target as HTMLVideoElement
            target.style.display = 'none'
          }}
        >
          <source src="https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        {/* Fallback image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920')] bg-cover bg-center" />
      </div>

      {/* Content */}
      <div ref={textRef} className="relative z-20 text-center px-6">
        <motion.h1
          className="hero-text text-6xl md:text-8xl lg:text-9xl font-display text-cream-50 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Transform
        </motion.h1>
        <motion.h2
          className="hero-text text-5xl md:text-7xl lg:text-8xl font-display text-gold-300 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Your Space
        </motion.h2>
        <motion.p
          className="hero-text text-lg md:text-xl text-cream-100 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Luxury interior design that reflects your unique style and elevates your everyday living
        </motion.p>
        <motion.div
          className="hero-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
      >
        <ArrowDown className="w-6 h-6 text-cream-50" />
      </motion.div>
    </section>
  )
}


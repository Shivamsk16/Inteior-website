'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

export default function BlogHero() {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const textElements = textRef.current.querySelectorAll('.split-text')
    
    gsap.from(textElements, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
    })
  }, [])

  return (
    <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-br from-beige-200 via-cream-100 to-gold-50">
      <div ref={textRef} className="text-center px-6">
        <motion.h1
          className="split-text text-6xl md:text-8xl font-display text-brown-800 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Blog & Inspiration
        </motion.h1>
        <motion.p
          className="split-text text-xl text-brown-700 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Design insights, trends, and inspiration for your next project
        </motion.p>
      </div>
    </section>
  )
}


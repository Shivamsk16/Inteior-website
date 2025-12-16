'use client'

import { motion } from 'framer-motion'

export default function ContactHero() {
  return (
    <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-br from-beige-200 via-cream-100 to-gold-50">
      <div className="text-center px-6">
        <motion.h1
          className="text-6xl md:text-8xl font-display text-brown-800 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          Get In Touch
        </motion.h1>
        <motion.p
          className="text-xl text-brown-700 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05, ease: 'easeOut' }}
        >
          Let's bring your vision to life
        </motion.p>
      </div>
    </section>
  )
}



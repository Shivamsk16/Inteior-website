'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

export default function CTA() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section
      ref={ref}
      className="py-32 px-6 lg:px-8 bg-gradient-to-br from-beige-200 via-cream-100 to-gold-50"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-5xl md:text-6xl font-display text-brown-800 mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Ready to Transform Your Space?
        </motion.h2>
        <motion.p
          className="text-brown-700 text-lg mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Let's collaborate to create an interior that reflects your unique style
          and enhances your daily life.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            href="/contact"
            className="inline-block px-10 py-5 bg-brown-800 text-cream-50 font-medium rounded-full hover:bg-brown-900 transition-colors text-lg"
            data-cursor-text="Get Started"
          >
            Start Your Project
          </Link>
        </motion.div>
      </div>
    </section>
  )
}


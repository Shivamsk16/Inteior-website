'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useInView } from 'react-intersection-observer'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const principles = [
  {
    title: 'Authenticity',
    description: 'Every design reflects the unique personality and lifestyle of our clients.',
  },
  {
    title: 'Quality',
    description: 'We source only the finest materials and work with skilled craftspeople.',
  },
  {
    title: 'Sustainability',
    description: 'Committed to eco-friendly practices and sustainable design solutions.',
  },
  {
    title: 'Innovation',
    description: 'Embracing new technologies while honoring timeless design principles.',
  },
]

export default function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  useEffect(() => {
    if (!sectionRef.current) return

    const items = sectionRef.current.querySelectorAll('.philosophy-item')
    
    items.forEach((item) => {
      gsap.from(item, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    })
  }, [])

  return (
    <section ref={ref} className="py-32 px-6 lg:px-8 bg-cream-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-display text-brown-800 mb-6">
            Our Philosophy
          </h2>
          <p className="text-brown-700 text-lg max-w-3xl mx-auto leading-relaxed">
            We believe that great design is born from the perfect harmony of
            aesthetics, functionality, and personal expression. Our approach
            combines artistic vision with practical solutions.
          </p>
        </motion.div>

        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              className="philosophy-item p-8 bg-beige-100 rounded-lg"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-display text-brown-800 mb-4">
                {principle.title}
              </h3>
              <p className="text-brown-600 leading-relaxed">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


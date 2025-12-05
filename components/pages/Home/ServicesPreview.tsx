'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Home, Building2, Palette, Ruler } from 'lucide-react'

const services = [
  {
    icon: Home,
    title: 'Residential Design',
    description: 'Transform your home into a personalized sanctuary',
  },
  {
    icon: Building2,
    title: 'Commercial Spaces',
    description: 'Create inspiring work environments',
  },
  {
    icon: Palette,
    title: 'Color Consultation',
    description: 'Expert guidance on color schemes and palettes',
  },
  {
    icon: Ruler,
    title: 'Space Planning',
    description: 'Optimize your space for functionality and flow',
  },
]

export default function ServicesPreview() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section ref={ref} className="py-32 px-6 lg:px-8 bg-cream-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-display text-brown-800 mb-4">
            Our Services
          </h2>
          <p className="text-brown-600 text-lg max-w-2xl mx-auto">
            Comprehensive design solutions tailored to your vision
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                className="group relative p-8 bg-beige-100 rounded-lg hover:bg-beige-200 transition-colors"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="mb-6">
                  <Icon className="w-12 h-12 text-gold-500" />
                </div>
                <h3 className="text-2xl font-display text-brown-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-brown-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link
            href="/services"
            className="inline-block px-8 py-4 border-2 border-brown-700 text-brown-700 font-medium rounded-full hover:bg-brown-700 hover:text-cream-50 transition-colors"
            data-cursor-text="Explore"
          >
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  )
}


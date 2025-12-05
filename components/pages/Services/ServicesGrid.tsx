'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useInView } from 'react-intersection-observer'
import { Home, Building2, Palette, Ruler, Lightbulb, Wrench } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const services = [
  {
    icon: Home,
    title: 'Residential Design',
    description: 'Transform your home into a personalized sanctuary that reflects your unique style and lifestyle.',
    features: ['Space Planning', 'Color Consultation', 'Furniture Selection', 'Lighting Design'],
  },
  {
    icon: Building2,
    title: 'Commercial Spaces',
    description: 'Create inspiring work environments that boost productivity and reflect your brand identity.',
    features: ['Office Design', 'Retail Spaces', 'Restaurant Design', 'Brand Integration'],
  },
  {
    icon: Palette,
    title: 'Color Consultation',
    description: 'Expert guidance on color schemes and palettes that enhance mood and create harmony.',
    features: ['Color Analysis', 'Palette Development', 'Material Selection', 'Mood Boards'],
  },
  {
    icon: Ruler,
    title: 'Space Planning',
    description: 'Optimize your space for functionality, flow, and aesthetic appeal.',
    features: ['Layout Design', 'Traffic Flow', 'Storage Solutions', '3D Visualization'],
  },
  {
    icon: Lightbulb,
    title: 'Lighting Design',
    description: 'Illuminate your space with carefully planned lighting that enhances ambiance and functionality.',
    features: ['Ambient Lighting', 'Task Lighting', 'Accent Lighting', 'Smart Controls'],
  },
  {
    icon: Wrench,
    title: 'Project Management',
    description: 'End-to-end project management ensuring seamless execution from concept to completion.',
    features: ['Timeline Management', 'Vendor Coordination', 'Quality Control', 'Budget Oversight'],
  },
]

export default function ServicesGrid() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    if (!sectionRef.current) return

    const cards = sectionRef.current.querySelectorAll('.service-card')
    
    cards.forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })
  }, [])

  return (
    <section ref={ref} className="py-32 px-6 lg:px-8 bg-cream-50">
      <div className="max-w-7xl mx-auto">
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                className="service-card group p-8 bg-beige-100 rounded-lg hover:bg-beige-200 transition-all"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="mb-6">
                  <Icon className="w-12 h-12 text-gold-500" />
                </div>
                <h3 className="text-2xl font-display text-brown-800 mb-4">
                  {service.title}
                </h3>
                <p className="text-brown-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="text-sm text-brown-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


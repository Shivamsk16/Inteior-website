'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const projects = [
  {
    id: 1,
    title: 'Modern Minimalist',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
  },
  {
    id: 2,
    title: 'Luxury Penthouse',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
  },
  {
    id: 3,
    title: 'Corporate Elegance',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
  },
  {
    id: 4,
    title: 'Coastal Retreat',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
  },
]

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    if (!sectionRef.current) return

    const cards = sectionRef.current.querySelectorAll('.project-card')
    
    cards.forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 80,
        duration: 1,
        delay: index * 0.15,
        scrollTrigger: {
          trigger: card,
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
          <h2 className="text-5xl md:text-6xl font-display text-brown-800 mb-4">
            Featured Projects
          </h2>
          <p className="text-brown-600 text-lg max-w-2xl mx-auto">
            Explore our curated selection of transformative interior designs
          </p>
        </motion.div>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.id}`}
              className="project-card group relative overflow-hidden rounded-lg"
              data-cursor-text="View Project"
            >
              <div className="relative h-[500px] overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-900/80 via-brown-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-cream-50">
                  <span className="text-sm text-gold-300 mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-3xl font-display mb-2">{project.title}</h3>
                  <motion.span
                    className="inline-flex items-center gap-2 text-sm font-medium"
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                  >
                    View Project →
                  </motion.span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}


'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const projects = [
  { id: 1, title: 'Modern Minimalist', category: 'Residential', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800' },
  { id: 2, title: 'Luxury Penthouse', category: 'Residential', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800' },
  { id: 3, title: 'Corporate Elegance', category: 'Commercial', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800' },
  { id: 4, title: 'Coastal Retreat', category: 'Residential', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' },
  { id: 5, title: 'Urban Loft', category: 'Residential', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800' },
  { id: 6, title: 'Boutique Hotel', category: 'Hospitality', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800' },
  { id: 7, title: 'Wellness Center', category: 'Commercial', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800' },
  { id: 8, title: 'Family Home', category: 'Residential', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800' },
]

export default function ProjectGrid() {
  const [filter, setFilter] = useState('All')
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const categories = ['All', 'Residential', 'Commercial', 'Hospitality']

  useEffect(() => {
    if (filter === 'All') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(p => p.category === filter))
    }
  }, [filter])

  useEffect(() => {
    if (!sectionRef.current) return

    const cards = sectionRef.current.querySelectorAll('.project-card')
    
    cards.forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 80,
        duration: 0.8,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })
  }, [filteredProjects])

  return (
    <section ref={ref} className="py-16 px-6 lg:px-8 bg-cream-50">
      <div className="max-w-7xl mx-auto">
        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                filter === category
                  ? 'bg-brown-800 text-cream-50'
                  : 'bg-beige-200 text-brown-700 hover:bg-beige-300'
              }`}
              data-cursor-text="Filter"
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.id}`}
              className="project-card group relative overflow-hidden rounded-lg"
              data-cursor-text="View"
            >
              <div className="relative h-[400px] overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-cream-50">
                  <span className="text-sm text-gold-300 mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-display">{project.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}


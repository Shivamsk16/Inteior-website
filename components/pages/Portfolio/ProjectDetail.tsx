'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const projectData: Record<string, any> = {
  '1': {
    title: 'Modern Minimalist',
    category: 'Residential',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
    ],
    description: 'A stunning transformation of a downtown apartment into a serene minimalist sanctuary.',
    year: '2023',
    location: 'New York, NY',
  },
  '2': {
    title: 'Luxury Penthouse',
    category: 'Residential',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200',
    ],
    description: 'Elegant penthouse design with panoramic city views and luxurious finishes.',
    year: '2023',
    location: 'Los Angeles, CA',
  },
}

export default function ProjectDetail({ projectId }: { projectId: string }) {
  const project = projectData[projectId] || projectData['1']
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    imageRefs.current.forEach((ref) => {
      if (!ref) return

      gsap.from(ref, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: ref,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    })
  }, [])

  return (
    <main className="relative pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-brown-700 hover:text-brown-800 mb-8"
          data-cursor-text="Back"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Portfolio
        </Link>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold-500 font-semibold mb-4 block">
            {project.category}
          </span>
          <h1 className="text-6xl md:text-7xl font-display text-brown-800 mb-6">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-6 text-brown-600 mb-8">
            <span>Year: {project.year}</span>
            <span>Location: {project.location}</span>
          </div>
          <p className="text-lg text-brown-700 max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </motion.div>

        <div className="space-y-8">
          {project.images.map((image: string, index: number) => (
            <div
              key={index}
              ref={(el) => (imageRefs.current[index] = el)}
              className="relative h-[600px] md:h-[800px] overflow-hidden rounded-lg"
            >
              <img
                src={image}
                alt={`${project.title} - Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}


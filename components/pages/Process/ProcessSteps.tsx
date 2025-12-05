'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useInView } from 'react-intersection-observer'
import { Search, Lightbulb, Palette, Hammer, CheckCircle } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery',
    description: 'We begin with an in-depth consultation to understand your vision, lifestyle, and preferences.',
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Concept Development',
    description: 'Our team creates initial concepts and mood boards that capture your aesthetic and functional needs.',
  },
  {
    number: '03',
    icon: Palette,
    title: 'Design Development',
    description: 'We refine the design with detailed plans, material selections, and 3D visualizations.',
  },
  {
    number: '04',
    icon: Hammer,
    title: 'Implementation',
    description: 'Our project managers oversee every detail, coordinating with contractors and vendors.',
  },
  {
    number: '05',
    icon: CheckCircle,
    title: 'Reveal',
    description: 'Experience the transformation as we unveil your beautifully designed space, ready for you to enjoy.',
  },
]

export default function ProcessSteps() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    if (!timelineRef.current) return

    const items = timelineRef.current.querySelectorAll('.process-step')
    
    items.forEach((item) => {
      gsap.from(item, {
        opacity: 0,
        x: -80,
        duration: 1,
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
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-5xl font-display text-brown-800 mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          How We Work
        </motion.h2>

        <div ref={timelineRef} className="space-y-16">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="process-step relative flex flex-col md:flex-row gap-8 items-start"
              >
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gold-400 flex items-center justify-center">
                      <Icon className="w-12 h-12 text-brown-900" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-brown-800 rounded-full flex items-center justify-center text-cream-50 font-bold text-sm">
                      {step.number}
                    </div>
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-3xl font-display text-brown-800 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-brown-600 text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


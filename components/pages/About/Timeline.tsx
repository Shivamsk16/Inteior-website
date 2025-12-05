'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useInView } from 'react-intersection-observer'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const milestones = [
  {
    year: '2010',
    title: 'Foundation',
    description: 'Studio was founded with a vision to transform spaces into works of art.',
  },
  {
    year: '2015',
    title: 'Expansion',
    description: 'Expanded our team and opened our flagship design studio.',
  },
  {
    year: '2018',
    title: 'Recognition',
    description: 'Received the prestigious Interior Design Excellence Award.',
  },
  {
    year: '2023',
    title: 'Innovation',
    description: 'Launched sustainable design initiatives and 3D visualization services.',
  },
]

export default function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  useEffect(() => {
    if (!timelineRef.current) return

    const items = timelineRef.current.querySelectorAll('.timeline-item')
    
    items.forEach((item) => {
      gsap.from(item, {
        opacity: 0,
        x: -50,
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
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-5xl font-display text-brown-800 mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Our Journey
        </motion.h2>

        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-brown-300" />

          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="timeline-item relative pl-24">
                <div className="absolute left-6 w-4 h-4 bg-gold-400 rounded-full border-4 border-cream-50" />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.2 }}
                >
                  <span className="text-gold-500 font-semibold text-lg">
                    {milestone.year}
                  </span>
                  <h3 className="text-2xl font-display text-brown-800 mt-2 mb-3">
                    {milestone.title}
                  </h3>
                  <p className="text-brown-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


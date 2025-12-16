'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

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
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section ref={ref} className="py-32 px-6 lg:px-8 bg-cream-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-5xl font-display text-brown-800 mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          Our Journey
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-brown-300" />

          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className="relative pl-24"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
              >
                <div className="absolute left-6 w-4 h-4 bg-gold-400 rounded-full border-4 border-cream-50" />
                <div>
                  <span className="text-gold-500 font-semibold text-lg">
                    {milestone.year}
                  </span>
                  <h3 className="text-2xl font-display text-brown-800 mt-2 mb-3">
                    {milestone.title}
                  </h3>
                  <p className="text-brown-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}



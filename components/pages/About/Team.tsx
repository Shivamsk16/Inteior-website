'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const teamMembers = [
  {
    name: 'Alexandra Morgan',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  },
  {
    name: 'James Chen',
    role: 'Senior Designer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
  {
    name: 'Sophie Laurent',
    role: 'Color Specialist',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
  },
  {
    name: 'Marcus Thompson',
    role: 'Project Manager',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  },
]

export default function Team() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section ref={ref} className="py-32 px-6 lg:px-8 bg-beige-100">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-5xl font-display text-brown-800 mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Meet Our Team
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative overflow-hidden rounded-lg mb-4">
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-[400px] object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-cream-50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-sm text-gold-300">{member.role}</p>
                </div>
              </div>
              <h3 className="text-xl font-display text-brown-800">{member.name}</h3>
              <p className="text-brown-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}




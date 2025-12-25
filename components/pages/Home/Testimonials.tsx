'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const testimonials = [
  {
    id: 1,
    quote: 'Working with Studio 54 transformed our home beyond our expectations. Every detail was thoughtfully considered.',
    author: 'Sarah Johnson',
    role: 'Homeowner',
  },
  {
    id: 2,
    quote: 'The team\'s attention to detail and creative vision brought our commercial space to life. Highly recommended!',
    author: 'Michael Chen',
    role: 'Business Owner',
  },
  {
    id: 3,
    quote: 'Professional, creative, and truly passionate about design. Our new space is everything we dreamed of.',
    author: 'Emily Rodriguez',
    role: 'Client',
  },
]

export default function Testimonials() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section ref={ref} className="py-32 px-6 lg:px-8 bg-brown-900 text-cream-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <h2 className="text-5xl md:text-6xl font-display mb-4">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="p-8 bg-brown-800/50 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
            >
              <p className="text-cream-100 text-lg mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-semibold text-gold-300">{testimonial.author}</p>
                <p className="text-cream-200 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}



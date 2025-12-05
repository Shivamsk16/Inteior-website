'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AboutPreview() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current) return

    // Parallax effect for image
    gsap.to(imageRef.current, {
      y: -50,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, [])

  return (
    <section
      ref={ref}
      className="py-32 px-6 lg:px-8 bg-beige-100 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-display text-brown-800 mb-6">
              Our Story
            </h2>
            <p className="text-brown-700 text-lg mb-6 leading-relaxed">
              With over a decade of experience, we transform spaces into sanctuaries
              of luxury and comfort. Our team of passionate designers brings a unique
              blend of artistry and functionality to every project.
            </p>
            <p className="text-brown-600 mb-8 leading-relaxed">
              We believe that interior design is not just about aesthetics—it's about
              creating environments that inspire, comfort, and reflect the essence of
              those who inhabit them.
            </p>
            <Link
              href="/about"
              className="inline-block px-8 py-4 bg-brown-700 text-cream-50 font-medium rounded-full hover:bg-brown-800 transition-colors"
              data-cursor-text="Learn More"
            >
              Learn More About Us
            </Link>
          </motion.div>

          <div ref={sectionRef} className="relative">
            <motion.div
              ref={imageRef}
              className="relative h-[600px] rounded-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1556912172-45b7abe8b7e4?w=800"
                alt="Designer at work"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}


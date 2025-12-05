'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const articles = [
  {
    id: 1,
    title: 'The Art of Minimalist Design',
    excerpt: 'Discover how less can truly be more in interior design.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    date: 'March 15, 2024',
    category: 'Design Tips',
  },
  {
    id: 2,
    title: 'Color Psychology in Interior Design',
    excerpt: 'Understanding how colors affect mood and perception in your space.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
    date: 'March 10, 2024',
    category: 'Inspiration',
  },
  {
    id: 3,
    title: 'Sustainable Design Practices',
    excerpt: 'Creating beautiful spaces while respecting our environment.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    date: 'March 5, 2024',
    category: 'Sustainability',
  },
  {
    id: 4,
    title: 'Maximizing Small Spaces',
    excerpt: 'Clever design solutions for compact living areas.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    date: 'February 28, 2024',
    category: 'Design Tips',
  },
  {
    id: 5,
    title: 'Lighting: The Unsung Hero',
    excerpt: 'How proper lighting can transform any interior space.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    date: 'February 20, 2024',
    category: 'Design Tips',
  },
  {
    id: 6,
    title: 'Trending: Biophilic Design',
    excerpt: 'Bringing nature indoors for healthier, happier spaces.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    date: 'February 15, 2024',
    category: 'Trends',
  },
]

export default function BlogGrid() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    if (!sectionRef.current) return

    const cards = sectionRef.current.querySelectorAll('.blog-card')
    
    cards.forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        delay: index * 0.1,
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
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.id}`}
              className="blog-card group block"
              data-cursor-text="Read"
            >
              <div className="relative h-64 overflow-hidden rounded-lg mb-4">
                <motion.img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-cream-50 text-brown-800 text-xs font-medium rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <span className="text-sm text-brown-500 mb-2 block">
                  {article.date}
                </span>
                <h3 className="text-2xl font-display text-brown-800 mb-3 group-hover:text-gold-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-brown-600 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}


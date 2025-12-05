'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const postData: Record<string, any> = {
  '1': {
    title: 'The Art of Minimalist Design',
    date: 'March 15, 2024',
    category: 'Design Tips',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200',
    content: `
      Minimalist design is more than just a trend—it's a philosophy that emphasizes simplicity, functionality, and intentionality. In interior design, minimalism creates spaces that feel calm, uncluttered, and deeply personal.

      The key to successful minimalist design lies in the careful selection of each element. Every piece of furniture, every color choice, and every decorative item must serve a purpose. This doesn't mean the space should feel cold or sterile; rather, it should feel curated and meaningful.

      When designing a minimalist space, consider the following principles:

      1. **Quality over Quantity**: Choose fewer, high-quality pieces that will stand the test of time.
      2. **Neutral Palette**: Use a restrained color palette with subtle variations in tone and texture.
      3. **Functional Beauty**: Every item should be both beautiful and functional.
      4. **Negative Space**: Embrace empty space as a design element in itself.
      5. **Natural Light**: Maximize natural light to create a sense of openness and airiness.

      Minimalist design isn't about deprivation—it's about creating a space that truly reflects who you are, without the noise and clutter that can distract from what matters most.
    `,
  },
}

export default function BlogPost({ postId }: { postId: string }) {
  const post = postData[postId] || postData['1']

  return (
    <main className="relative pt-24">
      <article className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-brown-700 hover:text-brown-800 mb-8"
          data-cursor-text="Back"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Blog
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold-500 font-semibold mb-4 block">
            {post.category}
          </span>
          <h1 className="text-5xl md:text-6xl font-display text-brown-800 mb-6">
            {post.title}
          </h1>
          <span className="text-brown-600 mb-8 block">{post.date}</span>

          <div className="relative h-[500px] mb-12 rounded-lg overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="text-brown-700 leading-relaxed whitespace-pre-line">
              {post.content}
            </div>
          </div>
        </motion.div>
      </article>
    </main>
  )
}


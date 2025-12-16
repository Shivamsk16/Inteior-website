'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Minimal delay - just enough for initial render, max 300ms
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 200) // Reduced from 2000ms to 200ms

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-cream-50 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }} // Reduced from 0.8s
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }} // Reduced from 0.6s
          >
            <motion.div
              className="text-4xl font-display text-brown-800 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              Studio
            </motion.div>
            <motion.div
              className="w-32 h-0.5 bg-brown-300 mx-auto"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              className="text-sm text-brown-600 mt-4 tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              INTERIOR DESIGN
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}



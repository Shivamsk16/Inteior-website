'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Phone number - using the first phone number from ContactForm
  const phoneNumber = '919251004513' // Remove + and spaces for WhatsApp URL
  const message = encodeURIComponent('Hi Studio 54, I\'m interested in your services.')
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  useEffect(() => {
    // Show button after a short delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleClick = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[9999]"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 0.3,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative w-16 h-16 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        aria-label="Contact us on WhatsApp"
        data-cursor-text="Chat"
      >
        {/* WhatsApp Icon */}
        <motion.div
          animate={{
            rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          {/* <MessageCircle className="w-8 h-8 text-white" fill="white" /> */}
          <Image width={1000} height={1000} src={"/whatsapp.png"} alt='whatsapp' className='w-8 h-8' />
        </motion.div>

        {/* Pulse animation ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#25D366]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Tooltip */}
        <motion.div
          className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-brown-800 text-cream-50 text-sm rounded-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
        >
          Chat with us on WhatsApp
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-brown-800" />
        </motion.div>
      </motion.button>
    </motion.div>
  )
}


'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [hoverText, setHoverText] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      // Check if target is an Element (has closest method)
      const isElement = target instanceof Element
      
      // Helper to safely check closest
      const hasClosest = (selector: string): boolean => {
        if (!isElement) return false
        return !!target.closest(selector)
      }

      // Check for interactive elements
      const isLink = target.tagName === 'A' || hasClosest('a')
      const isButton = target.tagName === 'BUTTON' || hasClosest('button')
      const hasRoleButton = hasClosest('[role="button"]')
      const isImage = target.tagName === 'IMG' || hasClosest('img')
      const isMagnetic = hasClosest('[data-magnetic]')

      if (isLink || isButton || hasRoleButton) {
        setIsHovering(true)
        const text = target.getAttribute('data-cursor-text') || 
                    (isLink ? 'View' : 
                     isButton ? 'Explore' : 'View')
        setHoverText(text)
      } else if (isImage || isMagnetic) {
        setIsHovering(true)
        setHoverText('View')
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
      setHoverText('')
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseOver, true)
    document.addEventListener('mouseout', handleMouseOut, true)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleMouseOver, true)
      document.removeEventListener('mouseout', handleMouseOut, true)
    }
  }, [cursorX, cursorY, isMobile])

  if (isMobile) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full bg-brown-500/20 backdrop-blur-sm pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-brown-400/30 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <span className="text-xs font-medium text-brown-800 whitespace-nowrap">
            {hoverText}
          </span>
        </motion.div>
      )}
    </>
  )
}


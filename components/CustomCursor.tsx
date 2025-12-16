'use client'

import { useEffect, useState, useRef } from 'react'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [hoverText, setHoverText] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorOuterRef = useRef<HTMLDivElement>(null)
  const cursorTextRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>()
  const posRef = useRef({ x: -100, y: -100 })
  const targetPosRef = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 'ontouchstart' in window
      setIsMobile(mobile)
      // Hide cursor elements on mobile
      if (mobile && cursorRef.current && cursorOuterRef.current) {
        cursorRef.current.style.display = 'none'
        cursorOuterRef.current.style.display = 'none'
      }
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const moveCursor = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const isElement = target instanceof Element
      const hasClosest = (selector: string): boolean => {
        if (!isElement) return false
        return !!target.closest(selector)
      }

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

    // Smooth cursor animation using requestAnimationFrame
    const animate = () => {
      const { x: currentX, y: currentY } = posRef.current
      const { x: targetX, y: targetY } = targetPosRef.current
      
      // Smooth interpolation (easing)
      posRef.current = {
        x: currentX + (targetX - currentX) * 0.15,
        y: currentY + (targetY - currentY) * 0.15,
      }

      if (cursorRef.current && cursorOuterRef.current) {
        const { x, y } = posRef.current
        // Use transform3d for hardware acceleration
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
        cursorOuterRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
        
        if (cursorTextRef.current) {
          cursorTextRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseOver, true)
    document.addEventListener('mouseout', handleMouseOut, true)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleMouseOver, true)
      document.removeEventListener('mouseout', handleMouseOut, true)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full bg-brown-500/20 backdrop-blur-sm pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      />
      <div
        ref={cursorOuterRef}
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-brown-400/30 pointer-events-none z-[9998] will-change-transform transition-all duration-200 ease-out"
        style={{
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          transformOrigin: 'center',
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
      />
      {isHovering && (
        <div
          ref={cursorTextRef}
          className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center will-change-transform"
          style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
        >
          <span className="text-xs font-medium text-brown-800 whitespace-nowrap">
            {hoverText}
          </span>
        </div>
      )}
    </>
  )
}


'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis';
import { usePathname } from 'next/navigation'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Check for reduced motion preference
    if(typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    
    // Use native scroll on mobile or if user prefers reduced motion
    if (isMobile || prefersReducedMotion) {
      return
    }

    const lenis = new Lenis({
      duration: 0.8, // Reduced from 1.2 to 0.4 for instant feel
      easing: (t) => t,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1, // Reduced from 2
      
    })

    lenisRef.current = lenis

    let frame: number
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [pathname])

  return <>{children}</>
}

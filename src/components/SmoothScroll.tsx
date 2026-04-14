'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap-config'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  // Initialise Lenis once and wire it to GSAP's ticker
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })
    lenisRef.current = lenis

    // 1. Feed every Lenis scroll event into ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // 2. Drive Lenis from GSAP's ticker so they share the exact same frame
    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)

    // 3. Let Lenis handle lag — GSAP shouldn't also compensate
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // On route change: reset scroll and refresh all ScrollTrigger calculations
  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return

    lenis.scrollTo(0, { immediate: true })

    // Double refresh: once after first paint, once after images load
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
    const delayed = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 600)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(delayed)
    }
  }, [pathname])

  return <>{children}</>
}

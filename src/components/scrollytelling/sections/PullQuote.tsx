'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap-config'

interface PullQuoteProps {
  data: {
    quote?: string
    attribution?: string
    style?: 'large' | 'decorated' | 'minimal'
    backgroundColor?: string
  }
  index: number
}

export function PullQuote({ data }: PullQuoteProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const quoteRef = useRef<HTMLQuoteElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Quote text — scale in with blur
      if (quoteRef.current) {
        gsap.from(quoteRef.current, {
          scale: 0.92,
          opacity: 0,
          filter: 'blur(6px)',
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // Decorative frame — draw in
      if (frameRef.current) {
        gsap.from(frameRef.current, {
          opacity: 0,
          scale: 0.96,
          duration: 1.2,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    })

    return () => mm.revert()
  }, [])

  // Use TOBB teal as accent background, or custom
  const bgColor = data.backgroundColor || '#487A7B'

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center px-6 py-24"
      style={{ backgroundColor: bgColor }}
    >
      {/* Decorative frame — thin border with rounded corners */}
      <div
        ref={frameRef}
        className="absolute inset-6 rounded-[4px] border border-current opacity-20 lg:inset-10"
        style={{ color: data.backgroundColor ? 'white' : '#003865' }}
      />

      {/* Inner decorative corners */}
      <div className="absolute inset-8 lg:inset-12">
        {/* Top-left corner */}
        <div className="absolute left-0 top-0 h-6 w-6 border-l border-t opacity-30" style={{ borderColor: data.backgroundColor ? 'white' : '#003865' }} />
        {/* Top-right corner */}
        <div className="absolute right-0 top-0 h-6 w-6 border-r border-t opacity-30" style={{ borderColor: data.backgroundColor ? 'white' : '#003865' }} />
        {/* Bottom-left corner */}
        <div className="absolute bottom-0 left-0 h-6 w-6 border-b border-l opacity-30" style={{ borderColor: data.backgroundColor ? 'white' : '#003865' }} />
        {/* Bottom-right corner */}
        <div className="absolute bottom-0 right-0 h-6 w-6 border-b border-r opacity-30" style={{ borderColor: data.backgroundColor ? 'white' : '#003865' }} />
      </div>

      <blockquote ref={quoteRef} className="relative z-10 max-w-4xl text-center">
        <p className="font-display text-3xl leading-[1.25] text-navy md:text-4xl lg:text-5xl xl:text-[3.5rem]">
          &ldquo;{data.quote}&rdquo;
        </p>

        {data.attribution && (
          <footer className="mt-8 font-heading text-[11px] uppercase tracking-[0.4em] text-navy/50">
            — {data.attribution}
          </footer>
        )}

        {/* Divider icon */}
        <div className="mt-8 flex justify-center">
          <span className="font-display text-2xl text-navy/30">&#10043;</span>
        </div>
      </blockquote>
    </section>
  )
}

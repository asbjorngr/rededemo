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

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (quoteRef.current) {
        gsap.from(quoteRef.current, {
          scale: 0.9,
          opacity: 0,
          filter: 'blur(8px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    })

    return () => mm.revert()
  }, [])

  const style = data.style || 'large'

  return (
    <section
      ref={sectionRef}
      className="flex min-h-[70vh] items-center justify-center px-6 py-24"
      style={{ backgroundColor: data.backgroundColor || '#003865' }}
    >
      <blockquote ref={quoteRef} className="max-w-3xl text-center">
        {style === 'decorated' && (
          <span className="mb-4 block font-display text-6xl text-gold">&ldquo;</span>
        )}
        <p
          className={`font-display leading-snug text-white ${
            style === 'minimal'
              ? 'text-2xl md:text-3xl'
              : 'text-3xl md:text-4xl lg:text-5xl'
          }`}
        >
          {style !== 'minimal' && <>&ldquo;</>}
          {data.quote}
          {style !== 'minimal' && <>&rdquo;</>}
        </p>
        {data.attribution && (
          <footer className="mt-6 font-heading text-sm uppercase tracking-[0.3em] text-white/50">
            — {data.attribution}
          </footer>
        )}
      </blockquote>
    </section>
  )
}

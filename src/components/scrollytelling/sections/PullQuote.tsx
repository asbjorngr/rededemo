'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap-config'
import { useScrollyTheme } from '../ScrollyThemeContext'

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
  const theme = useScrollyTheme()

  useEffect(() => {
    const mm = gsap.matchMedia()
    const { animation } = theme

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (quoteRef.current) {
        const words = quoteRef.current.querySelectorAll('[data-word]')
        if (words.length > 0) {
          gsap.from(words, {
            opacity: 0.15,
            duration: animation.duration * 0.3,
            stagger: animation.stagger * 0.4,
            ease: animation.ease,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          })
        } else {
          gsap.from(quoteRef.current, {
            scale: 0.94,
            opacity: 0,
            duration: animation.duration,
            ease: animation.ease,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          })
        }
      }
    })

    return () => mm.revert()
  }, [theme])

  // Split quote into words for staggered animation
  const words = data.quote?.split(/\s+/) || []

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy px-6 py-24"
    >
      {/* Large decorative quote mark — background element */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[30vw] leading-none text-white/[0.03]">
        &ldquo;
      </div>

      <blockquote ref={quoteRef} className="relative z-10 max-w-5xl text-center">
        {/* Quote text — word-by-word animation */}
        <p className="font-display text-3xl leading-[1.2] md:text-4xl lg:text-5xl xl:text-[3.5rem] xl:leading-[1.2]" style={{ color: theme.colors.accent }}>
          &ldquo;
          {words.map((word, i) => (
            <span key={i} data-word className="inline-block">
              {word}
              {i < words.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
          &rdquo;
        </p>

        {data.attribution && (
          <footer className="mt-10 font-heading text-[11px] uppercase tracking-[0.4em] text-white/40">
            — {data.attribution}
          </footer>
        )}
      </blockquote>
    </section>
  )
}

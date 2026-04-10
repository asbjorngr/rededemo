'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap-config'
import { PortableText } from '@portabletext/react'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface FactBoxProps {
  data: {
    title?: string
    content?: any[]
    style?: 'highlight' | 'sidebar' | 'fullWidth'
    icon?: string
    backgroundColor?: string
  }
  index: number
}

export function FactBox({ data }: FactBoxProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (boxRef.current) {
        const children = boxRef.current.querySelectorAll(':scope > *')
        gsap.from(children, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    })

    return () => mm.revert()
  }, [])

  const isFullWidth = data.style === 'fullWidth'

  return (
    <section
      ref={sectionRef}
      className="px-6 py-16"
      style={{ backgroundColor: data.backgroundColor || '#003865' }}
    >
      <div className={isFullWidth ? 'mx-auto max-w-4xl' : 'mx-auto max-w-2xl'}>
        <div
          ref={boxRef}
          className="rounded-xl border border-white/10 bg-white/5 p-8 lg:p-10"
        >
          {data.icon && (
            <span className="mb-3 block text-3xl">{data.icon}</span>
          )}
          {data.title && (
            <h3 className="mb-4 font-heading text-xs uppercase tracking-[0.3em] text-gold">
              {data.title}
            </h3>
          )}
          {data.content && (
            <div className="prose prose-invert prose-sm max-w-none prose-headings:font-display prose-p:text-white/80 prose-li:text-white/80">
              <PortableText value={data.content} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

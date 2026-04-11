'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap-config'
import { PortableText } from '@portabletext/react'
import { useScrollyTheme } from '../ScrollyThemeContext'

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
  const theme = useScrollyTheme()

  useEffect(() => {
    const mm = gsap.matchMedia()
    const { animation } = theme

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (boxRef.current) {
        gsap.from(boxRef.current, {
          y: 40,
          opacity: 0,
          duration: animation.duration,
          ease: animation.ease,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    })

    return () => mm.revert()
  }, [theme])

  const bgColor = data.backgroundColor || '#003865'

  return (
    <section
      ref={sectionRef}
      className="px-6 py-16 lg:px-16 lg:py-24"
      style={{ backgroundColor: bgColor }}
    >
      <div className="mx-auto max-w-3xl">
        <div
          ref={boxRef}
          className="relative overflow-hidden rounded-sm border p-8 lg:p-12"
          style={{
            borderColor: `rgba(${theme.colors.accentRgb}, 0.2)`,
            backgroundColor: `rgba(${theme.colors.accentRgb}, 0.05)`,
          }}
        >
          {/* Accent line at top */}
          <div className="absolute inset-x-0 top-0 h-[2px]" style={{ backgroundColor: `rgba(${theme.colors.accentRgb}, 0.4)` }} />

          {data.icon && (
            <span className="mb-4 block text-3xl">{data.icon}</span>
          )}

          {data.title && (
            <h3 className="mb-6 font-heading text-[11px] uppercase tracking-[0.4em]" style={{ color: theme.colors.accent }}>
              {data.title}
            </h3>
          )}

          {data.content && (
            <div className="fact-box-content">
              <PortableText
                value={data.content}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="mb-4 text-[16px] leading-[1.7] text-white/75">
                        {children}
                      </p>
                    ),
                    h3: ({ children }) => (
                      <h3 className="mb-3 mt-6 font-heading text-lg text-white">
                        {children}
                      </h3>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => (
                      <ul className="mb-4 list-none space-y-2 pl-0">
                        {children}
                      </ul>
                    ),
                  },
                  listItem: {
                    bullet: ({ children }) => (
                      <li className="flex items-baseline gap-3 text-[15px] text-white/70">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: `rgba(${theme.colors.accentRgb}, 0.6)` }} />
                        {children}
                      </li>
                    ),
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

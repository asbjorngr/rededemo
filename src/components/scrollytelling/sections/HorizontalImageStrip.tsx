'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { gsap, ScrollTrigger } from '@/lib/gsap-config'
import { useScrollyTheme } from '../ScrollyThemeContext'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface HorizontalImageStripProps {
  data: {
    title?: string
    images?: { asset: { _ref: string }; alt?: string; caption?: string; _key?: string }[]
    backgroundColor?: string
  }
  index: number
}

export function HorizontalImageStrip({ data }: HorizontalImageStripProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const theme = useScrollyTheme()

  const images = data.images || []
  const bgColor = data.backgroundColor || '#003865'

  useEffect(() => {
    if (images.length === 0) return

    const mm = gsap.matchMedia()

    // Desktop: pin section and scrub horizontal scroll
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      if (!trackRef.current || !sectionRef.current) return

      const track = trackRef.current
      const scrollWidth = track.scrollWidth - track.clientWidth

      gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })
    })

    return () => mm.revert()
  }, [images.length])

  if (images.length === 0) return null

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* Title */}
      {data.title && (
        <div className="px-6 pt-16 lg:px-16 lg:pt-20">
          <h2 className="font-display text-2xl text-white lg:text-3xl" style={{ color: theme.colors.accent }}>
            {data.title}
          </h2>
        </div>
      )}

      {/* Mobile: horizontal scroll with snap */}
      <div className="md:hidden">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 py-12 scrollbar-hide">
          {images.map((img, i) => (
            <div
              key={img._key || i}
              className="w-[75vw] flex-shrink-0 snap-center"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                {img.asset && (
                  <Image
                    src={urlFor(img).width(600).height(450).fit('crop').url()}
                    alt={img.alt || ''}
                    fill
                    className="object-cover"
                    sizes="75vw"
                  />
                )}
              </div>
              {img.caption && (
                <p className="mt-3 font-heading text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {img.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: GSAP scrub horizontal strip */}
      <div className="hidden h-screen items-center md:flex">
        <div
          ref={trackRef}
          className="flex gap-8 px-16 py-12"
          style={{ width: `${images.length * 45}vw` }}
        >
          {images.map((img, i) => (
            <div
              key={img._key || i}
              className="w-[40vw] flex-shrink-0 lg:w-[35vw]"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                {img.asset && (
                  <Image
                    src={urlFor(img).width(900).height(675).fit('crop').url()}
                    alt={img.alt || ''}
                    fill
                    className="object-cover"
                    sizes="40vw"
                  />
                )}
              </div>
              {img.caption && (
                <p className="mt-4 font-heading text-[10px] uppercase tracking-[0.3em] text-white/40">
                  {img.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

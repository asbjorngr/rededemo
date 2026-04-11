'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { gsap, ScrollTrigger } from '@/lib/gsap-config'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface HeroSectionProps {
  data: {
    image?: { asset: { _ref: string }; alt?: string; hotspot?: { x: number; y: number } }
    title?: string
    subtitle?: string
    titlePosition?: 'center' | 'bottom-left' | 'bottom-right'
    backgroundColor?: string
    author?: string
    date?: string
  }
  index: number
}

export function HeroSection({ data }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Pin the hero — content scrolls OVER it
      if (sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          pin: true,
          pinSpacing: false,
        })
      }

      // Title reveal
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
        })
      }

      // Meta reveal
      if (metaRef.current) {
        gsap.from(metaRef.current, {
          y: 20,
          opacity: 0,
          duration: 1,
          delay: 0.4,
          ease: 'power3.out',
        })
      }
    })

    return () => mm.revert()
  }, [])

  // Use hotspot for object-position if available
  const hotspot = data.image?.hotspot
  const objectPosition = hotspot
    ? `${hotspot.x * 100}% ${hotspot.y * 100}%`
    : 'center 30%'

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full overflow-hidden"
      style={{ backgroundColor: data.backgroundColor || '#000' }}
    >
      {/* Background image */}
      {data.image?.asset && (
        <Image
          src={urlFor(data.image).width(1920).height(1080).fit('crop').url()}
          alt={data.image.alt || ''}
          fill
          className="object-cover"
          style={{ objectPosition }}
          sizes="100vw"
          priority
        />
      )}

      {/* Gradient overlays — strong bottom for title legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

      {/* Content — centered at bottom */}
      <div className="relative z-10 flex w-full flex-col items-center justify-end px-6 pb-16 text-center lg:px-16 lg:pb-20">
        {data.title && (
          <h1
            ref={titleRef}
            className="max-w-5xl font-display text-4xl leading-[1.05] text-gold md:text-5xl lg:text-[4.5rem] xl:text-[5.5rem]"
          >
            {data.title}
          </h1>
        )}

        <div ref={metaRef}>
          {data.subtitle && (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60 lg:text-lg">
              {data.subtitle}
            </p>
          )}
          {(data.author || data.date) && (
            <p className="mt-6 font-heading text-[10px] uppercase tracking-[0.4em] text-white/40">
              {data.author && <span>Tekst: {data.author}</span>}
              {data.author && data.date && <span className="mx-2">&middot;</span>}
              {data.date && <span>{data.date}</span>}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

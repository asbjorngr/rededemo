'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { gsap } from '@/lib/gsap-config'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface HeroSectionProps {
  data: {
    image?: { asset: { _ref: string }; alt?: string }
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
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Subtle parallax on hero image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
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

      // Subtitle reveal
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          y: 30,
          opacity: 0,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
        })
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full overflow-hidden"
      style={{ backgroundColor: data.backgroundColor || undefined }}
    >
      {/* Parallax image container — slightly taller for scroll */}
      {data.image?.asset && (
        <div ref={imageRef} className="absolute inset-x-0 -top-[5%] h-[115%]">
          <Image
            src={urlFor(data.image).width(1920).height(1080).url()}
            alt={data.image.alt || ''}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      )}

      {/* Gradient overlays — cinematic */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/20" />

      {/* Content — bottom left (Joshua's style) */}
      <div className="relative z-10 flex w-full flex-col justify-end px-6 pb-12 lg:px-16 lg:pb-20">
        {data.title && (
          <h1
            ref={titleRef}
            className="max-w-4xl font-display text-5xl leading-[1.05] text-white md:text-6xl lg:text-[5rem] xl:text-[6rem]"
          >
            {data.title}
          </h1>
        )}
        {data.subtitle && (
          <p
            ref={subtitleRef}
            className="mt-4 max-w-xl text-base leading-relaxed text-white/60 lg:text-lg"
          >
            {data.subtitle}
          </p>
        )}
        {/* Author & date */}
        {(data.author || data.date) && (
          <div className="mt-6 font-heading text-[10px] uppercase tracking-[0.4em] text-white/40">
            {data.author && <span>Tekst: {data.author}</span>}
            {data.author && data.date && <span className="mx-3">&middot;</span>}
            {data.date && <span>{data.date}</span>}
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center lg:bottom-6">
        <div className="flex flex-col items-center gap-2">
          <span className="h-8 w-px animate-pulse bg-white/30" />
        </div>
      </div>
    </section>
  )
}

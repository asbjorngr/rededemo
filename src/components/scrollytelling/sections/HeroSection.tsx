'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { gsap, ScrollTrigger } from '@/lib/gsap-config'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface HeroSectionProps {
  data: {
    image?: { asset: { _ref: string }; alt?: string }
    title?: string
    subtitle?: string
    titlePosition?: 'center' | 'bottom-left' | 'bottom-right'
    backgroundColor?: string
  }
  index: number
}

export function HeroSection({ data }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      }
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          y: 30,
          opacity: 0,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const positionClasses = {
    center: 'items-center justify-center text-center',
    'bottom-left': 'items-end justify-start text-left pb-16 lg:pb-24 px-6 lg:px-12',
    'bottom-right': 'items-end justify-end text-right pb-16 lg:pb-24 px-6 lg:px-12',
  }

  const pos = data.titlePosition || 'center'

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full"
      style={{ backgroundColor: data.backgroundColor || undefined }}
    >
      {data.image?.asset && (
        <Image
          src={urlFor(data.image).width(1920).height(1080).url()}
          alt={data.image.alt || ''}
          fill
          className="object-cover"
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />
      <div className={`relative z-10 flex w-full flex-col ${positionClasses[pos]} px-6`}>
        {data.title && (
          <h1
            ref={titleRef}
            className="max-w-4xl font-display text-5xl leading-[1.05] text-white md:text-6xl lg:text-8xl"
          >
            {data.title}
          </h1>
        )}
        {data.subtitle && (
          <p
            ref={subtitleRef}
            className="mt-4 max-w-xl text-lg text-white/70 lg:text-xl"
          >
            {data.subtitle}
          </p>
        )}
      </div>
    </section>
  )
}

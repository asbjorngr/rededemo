'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { gsap, ScrollTrigger } from '@/lib/gsap-config'
import { PortableText } from '@portabletext/react'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface FullscreenParallaxProps {
  data: {
    backgroundImage?: { asset: { _ref: string }; alt?: string }
    overlayText?: any[]
    overlayPosition?: 'left' | 'center' | 'right'
    darkenOverlay?: number
    backgroundColor?: string
  }
  index: number
}

export function FullscreenParallax({ data }: FullscreenParallaxProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Parallax on background image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Fade in overlay text
      if (textRef.current) {
        gsap.from(textRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
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

  const darken = data.darkenOverlay ?? 40
  const posClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: data.backgroundColor || undefined }}
    >
      {/* Parallax image — taller than viewport for movement */}
      {data.backgroundImage?.asset && (
        <div ref={imageRef} className="absolute inset-x-0 -top-[15%] h-[130%]">
          <Image
            src={urlFor(data.backgroundImage).width(1920).height(1400).url()}
            alt={data.backgroundImage.alt || ''}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}

      {/* Darken overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0,0,0,${darken / 100})` }}
      />

      {/* Overlay text */}
      {data.overlayText && (
        <div
          ref={textRef}
          className={`relative z-10 flex h-full flex-col justify-center px-6 lg:px-16 ${posClasses[data.overlayPosition || 'center']}`}
        >
          <div className="prose prose-invert max-w-2xl prose-headings:font-display prose-headings:text-white prose-p:text-white/80 prose-p:text-lg prose-p:leading-relaxed lg:prose-p:text-xl">
            <PortableText value={data.overlayText} />
          </div>
        </div>
      )}
    </section>
  )
}

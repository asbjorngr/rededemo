'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { gsap, ScrollTrigger } from '@/lib/gsap-config'
import { PortableText } from '@portabletext/react'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface FullscreenParallaxProps {
  data: {
    backgroundImage?: { asset: { _ref: string }; alt?: string; caption?: string; photographer?: string }
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
          yPercent: -12,
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
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    })

    return () => mm.revert()
  }, [])

  const darken = data.darkenOverlay ?? 40

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: data.backgroundColor || undefined }}
    >
      {/* Parallax image — taller than viewport */}
      {data.backgroundImage?.asset && (
        <div ref={imageRef} className="absolute inset-x-0 -top-[12%] h-[130%]">
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

      {/* Overlay text — centered prose */}
      {data.overlayText && data.overlayText.length > 0 && (
        <div className="relative z-10 flex min-h-screen flex-col justify-end px-6 pb-16 lg:px-16 lg:pb-24">
          <div
            ref={textRef}
            className="mx-auto max-w-[680px]"
          >
            <PortableText
              value={data.overlayText}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="mb-6 text-[17px] leading-[1.75] text-white/80 lg:text-[18px]">
                      {children}
                    </p>
                  ),
                  h2: ({ children }) => (
                    <h2 className="mb-6 font-display text-3xl leading-tight text-white lg:text-4xl">
                      {children}
                    </h2>
                  ),
                },
              }}
            />
          </div>
        </div>
      )}

      {/* Caption */}
      {(data.backgroundImage?.caption || data.backgroundImage?.photographer) && (
        <div className="absolute inset-x-0 bottom-4 z-10 text-center">
          <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-white/30">
            {data.backgroundImage.caption}
            {data.backgroundImage.photographer && (
              <>{data.backgroundImage.caption ? ' — ' : ''}Foto: {data.backgroundImage.photographer}</>
            )}
          </p>
        </div>
      )}
    </section>
  )
}

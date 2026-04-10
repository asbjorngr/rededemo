'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { gsap, ScrollTrigger } from '@/lib/gsap-config'
import { PortableText } from '@portabletext/react'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface TextWithImageProps {
  data: {
    text?: any[]
    image?: { asset: { _ref: string }; alt?: string; caption?: string }
    imagePosition?: 'left' | 'right'
    imageSize?: 'small' | 'medium' | 'large'
    backgroundColor?: string
  }
  index: number
}

export function TextWithImage({ data }: TextWithImageProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      if (!imageRef.current || !sectionRef.current) return

      // Sticky image while text scrolls past
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: imageRef.current,
        pinSpacing: false,
      })
    })

    // Fade in text
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (textRef.current) {
        gsap.from(textRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    })

    return () => mm.revert()
  }, [])

  const isRight = data.imagePosition !== 'left'
  const sizeClasses = {
    small: 'lg:w-1/3',
    medium: 'lg:w-1/2',
    large: 'lg:w-2/3',
  }
  const imgSize = sizeClasses[data.imageSize || 'medium']

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen"
      style={{ backgroundColor: data.backgroundColor || '#003865' }}
    >
      <div
        className={`flex flex-col lg:flex-row ${isRight ? '' : 'lg:flex-row-reverse'} min-h-screen`}
      >
        {/* Text */}
        <div
          ref={textRef}
          className={`flex flex-1 items-center px-6 py-16 lg:px-12 lg:py-24`}
        >
          <div className="prose prose-invert mx-auto max-w-xl prose-headings:font-display prose-headings:text-white prose-p:text-white/80 prose-p:leading-relaxed">
            {data.text && <PortableText value={data.text} />}
          </div>
        </div>

        {/* Image */}
        <div ref={imageRef} className={`relative ${imgSize} shrink-0`}>
          {data.image?.asset && (
            <div className="relative h-screen w-full">
              <Image
                src={urlFor(data.image).width(1000).height(1200).url()}
                alt={data.image.alt || ''}
                fill
                className="object-cover"
                sizes="50vw"
              />
              {data.image.caption && (
                <p className="absolute bottom-4 left-4 text-xs text-white/50">
                  {data.image.caption}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

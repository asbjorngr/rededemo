'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { gsap } from '@/lib/gsap-config'
import { PortableText } from '@portabletext/react'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface TextWithImageProps {
  data: {
    text?: any[]
    image?: { asset: { _ref: string }; alt?: string; caption?: string; photographer?: string }
    imagePosition?: 'left' | 'right'
    imageSize?: 'small' | 'medium' | 'large'
    backgroundColor?: string
    title?: string
  }
  index: number
}

export function TextWithImage({ data, index }: TextWithImageProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Cinematic image reveal — scale from slightly zoomed
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scale: 1.08,
          opacity: 0.6,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // Text fade in
      if (textRef.current) {
        const paragraphs = textRef.current.querySelectorAll('p, h2, h3, h4')
        gsap.from(paragraphs, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    })

    return () => mm.revert()
  }, [])

  const isFirstSection = index <= 1
  const bgColor = data.backgroundColor || '#003865'

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ backgroundColor: bgColor }}
    >
      {/* Section title — small caps label */}
      {data.title && (
        <div className="px-6 pt-16 lg:px-16 lg:pt-24">
          <h2 className="mx-auto max-w-3xl font-heading text-[11px] uppercase tracking-[0.4em] text-gold">
            {data.title}
          </h2>
        </div>
      )}

      {/* Cinematic full-width image */}
      {data.image?.asset && (
        <div className="px-6 pt-10 lg:px-16 lg:pt-14">
          <div
            ref={imageRef}
            className="relative mx-auto max-w-5xl overflow-hidden"
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={urlFor(data.image).width(1400).height(875).url()}
                alt={data.image.alt || ''}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 80vw"
                priority={isFirstSection}
              />
            </div>
            {/* Caption in small caps */}
            {(data.image.caption || data.image.photographer) && (
              <p className="mt-3 text-center font-heading text-[10px] uppercase tracking-[0.3em] text-white/40">
                {data.image.caption}
                {data.image.photographer && (
                  <>{data.image.caption ? ' — ' : ''}Foto: {data.image.photographer}</>
                )}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Text — centered prose */}
      {data.text && data.text.length > 0 && (
        <div
          ref={textRef}
          className="px-6 py-14 lg:px-16 lg:py-20"
        >
          <div className={`mx-auto max-w-[680px] ${isFirstSection ? 'text-block-intro' : ''}`}>
            <PortableText
              value={data.text}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="mb-6 font-body text-[17px] leading-[1.75] text-white/80 lg:text-[18px]">
                      {children}
                    </p>
                  ),
                  h2: ({ children }) => (
                    <h2 className="mb-6 mt-10 font-display text-3xl leading-tight text-white lg:text-4xl">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mb-4 mt-8 font-heading text-xl text-white lg:text-2xl">
                      {children}
                    </h3>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-8 border-l-2 border-gold/40 pl-6 font-display text-xl italic leading-relaxed text-white/60 lg:text-2xl">
                      {children}
                    </blockquote>
                  ),
                },
                marks: {
                  em: ({ children }) => (
                    <em className="italic text-white/70">{children}</em>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-white">{children}</strong>
                  ),
                },
              }}
            />
          </div>
        </div>
      )}
    </section>
  )
}

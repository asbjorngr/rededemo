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
    image?: { asset: { _ref: string }; alt?: string; caption?: string; photographer?: string; hotspot?: { x: number; y: number } }
    imagePosition?: 'left' | 'right'
    imageSize?: 'small' | 'medium' | 'large'
    backgroundColor?: string
    title?: string
  }
  index: number
}

/**
 * Detect if a text block is an inline quote (starts with – or «)
 */
function isInlineQuote(block: any): boolean {
  if (block._type !== 'block' || block.style !== 'normal') return false
  const text = block.children?.map((c: any) => c.text)?.join('') || ''
  return text.startsWith('–') || text.startsWith('−') || text.startsWith('«')
}

/**
 * Pre-process blocks: pick max 2 quotes to style as gold blockquotes.
 * Spread them out — first and one near the middle. The rest render as
 * subtle italic to avoid walls of gold.
 */
function markQuoteBlocks(blocks: any[]): Set<number> {
  const quoteIndices: number[] = []
  for (let i = 0; i < blocks.length; i++) {
    if (isInlineQuote(blocks[i])) quoteIndices.push(i)
  }

  const styledQuotes = new Set<number>()
  if (quoteIndices.length === 0) return styledQuotes

  // Always style the first quote
  styledQuotes.add(quoteIndices[0])

  // If there are 3+ quotes, pick one near the middle
  if (quoteIndices.length >= 3) {
    const mid = Math.floor(quoteIndices.length / 2)
    styledQuotes.add(quoteIndices[mid])
  }

  return styledQuotes
}

export function TextWithImage({ data, index }: TextWithImageProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const ledeRef = useRef<HTMLDivElement>(null)

  const isFirstTextSection = index === 1 // Right after hero (index 0)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Cinematic image reveal
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scale: 1.06,
          opacity: 0.4,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // Lede — big intro text animation
      if (ledeRef.current) {
        gsap.from(ledeRef.current, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ledeRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // Body text paragraphs stagger in
      if (textRef.current) {
        const elements = textRef.current.querySelectorAll('p, blockquote, h2, h3')
        gsap.from(elements, {
          y: 25,
          opacity: 0,
          duration: 0.6,
          stagger: 0.06,
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

  const bgColor = data.backgroundColor || '#003865'
  const hotspot = data.image?.hotspot
  const objectPosition = hotspot
    ? `${hotspot.x * 100}% ${hotspot.y * 100}%`
    : 'center 30%'

  // Split text: first paragraph as lede (if first section), rest as body
  const blocks = data.text || []
  let ledeBlock: any = null
  let bodyBlocks = blocks

  if (isFirstTextSection && blocks.length > 0 && blocks[0]._type === 'block') {
    ledeBlock = blocks[0]
    bodyBlocks = blocks.slice(1)
  }

  // Pre-calculate which quotes get styled treatment
  const styledQuoteIndices = markQuoteBlocks(bodyBlocks)

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ backgroundColor: bgColor }}
    >
      {/* Section title — prominent display */}
      {data.title && (
        <div className="px-6 pt-16 lg:px-16 lg:pt-24">
          <div className="mx-auto max-w-[680px]">
            <h2 className="font-display text-2xl leading-tight text-white lg:text-3xl">
              {data.title}
            </h2>
            <div className="mt-4 h-px w-16 bg-gold/40" />
          </div>
        </div>
      )}

      {/* LEDE — huge display font intro (Joshua's style) */}
      {ledeBlock && (
        <div ref={ledeRef} className="px-6 pt-16 lg:px-16 lg:pt-24">
          <div className="mx-auto max-w-5xl">
            <PortableText
              value={[ledeBlock]}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="font-display text-2xl leading-[1.3] text-gold md:text-3xl lg:text-[2.75rem] lg:leading-[1.25] xl:text-[3.25rem]">
                      {children}
                    </p>
                  ),
                },
              }}
            />
          </div>
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
                src={urlFor(data.image).width(1400).height(875).fit('crop').url()}
                alt={data.image.alt || ''}
                fill
                className="object-cover"
                style={{ objectPosition }}
                sizes="(max-width: 1024px) 100vw, 80vw"
              />
            </div>
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

      {/* Body text — centered prose with smart quote detection */}
      {bodyBlocks.length > 0 && (
        <div
          ref={textRef}
          className="px-6 py-14 lg:px-16 lg:py-20"
        >
          <div className="mx-auto max-w-[680px]">
            <PortableText
              value={bodyBlocks}
              components={{
                block: {
                  normal: ({ children, value }) => {
                    // Find this block's index in bodyBlocks
                    const blockIndex = bodyBlocks.indexOf(value)

                    // Only style first quote in a consecutive run
                    if (isInlineQuote(value) && styledQuoteIndices.has(blockIndex)) {
                      return (
                        <blockquote className="my-8 border-l-2 border-gold/50 pl-6 font-display text-xl italic leading-relaxed text-gold/80 lg:text-2xl">
                          {children}
                        </blockquote>
                      )
                    }
                    // Consecutive quotes after the first render as subtle italic
                    if (isInlineQuote(value)) {
                      return (
                        <p className="mb-6 text-[17px] italic leading-[1.75] text-white/60 lg:text-[18px]">
                          {children}
                        </p>
                      )
                    }
                    return (
                      <p className="mb-6 text-[17px] leading-[1.75] text-white/80 lg:text-[18px]">
                        {children}
                      </p>
                    )
                  },
                  h2: ({ children }) => (
                    <h2 className="mb-6 mt-14 font-display text-3xl leading-tight text-white lg:text-4xl">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mb-4 mt-10 font-heading text-xl text-white lg:text-2xl">
                      {children}
                    </h3>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-10 border-l-2 border-gold/50 pl-6 font-display text-xl italic leading-relaxed text-gold/80 lg:text-2xl">
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

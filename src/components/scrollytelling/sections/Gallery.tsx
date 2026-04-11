'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { gsap } from '@/lib/gsap-config'

interface GalleryImage {
  asset: { _ref: string }
  alt?: string
  caption?: string
  photographer?: string
  hotspot?: { x: number; y: number }
  _key?: string
}

interface GalleryProps {
  data: {
    images?: GalleryImage[]
    layout?: 'grid' | 'carousel' | 'masonry'
    backgroundColor?: string
  }
  index: number
}

// Predefined positions for stacked gallery — wider spread, bigger images
const STACK_POSITIONS = [
  { x: 0, y: 0, rotate: -2, scale: 1 },
  { x: 18, y: -10, rotate: 2, scale: 0.96 },
  { x: -14, y: 6, rotate: -1.5, scale: 0.93 },
  { x: 22, y: -4, rotate: 3, scale: 0.9 },
  { x: -18, y: 10, rotate: -2, scale: 0.92 },
  { x: 8, y: -14, rotate: 1, scale: 0.94 },
]

export function Gallery({ data }: GalleryProps) {
  const [viewMode, setViewMode] = useState<'gallery' | 'grid'>('gallery')
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (sectionRef.current && viewMode === 'grid') {
        const items = sectionRef.current.querySelectorAll('[data-gallery-item]')
        gsap.from(items, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    })

    return () => mm.revert()
  }, [viewMode])

  const images = data.images || []
  if (images.length === 0) return null

  const bgColor = data.backgroundColor || '#003865'

  return (
    <section
      ref={sectionRef}
      className="relative px-6 py-20 lg:px-16 lg:py-32"
      style={{ backgroundColor: bgColor }}
    >
      {/* Gallery/Grid toggle */}
      <div className="mb-12 flex justify-center">
        <div className="inline-flex overflow-hidden rounded-full border border-white/20">
          <button
            onClick={() => setViewMode('gallery')}
            className={`cursor-pointer px-5 py-2 font-heading text-[10px] uppercase tracking-[0.2em] transition-colors ${
              viewMode === 'gallery'
                ? 'bg-white/15 text-white'
                : 'text-white/50 hover:text-white/70'
            }`}
          >
            Galleri
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`cursor-pointer px-5 py-2 font-heading text-[10px] uppercase tracking-[0.2em] transition-colors ${
              viewMode === 'grid'
                ? 'bg-white/15 text-white'
                : 'text-white/50 hover:text-white/70'
            }`}
          >
            Rutenett
          </button>
        </div>
      </div>

      {/* Gallery view — stacked images, hover to bring to front */}
      {viewMode === 'gallery' && (
        <div className="mx-auto max-w-5xl">
          <div className="relative" style={{ height: 'clamp(450px, 70vh, 800px)' }}>
            {images.map((img, i) => {
              const pos = STACK_POSITIONS[i % STACK_POSITIONS.length]
              const isActive = i === activeIndex
              const zIndex = isActive ? 50 : images.length - Math.abs(i - activeIndex)

              return (
                <div
                  key={img._key || i}
                  className="absolute left-1/2 top-1/2 w-[70%] max-w-[650px] cursor-pointer transition-all duration-500 ease-out lg:w-[60%]"
                  style={{
                    transform: isActive
                      ? 'translate(-50%, -50%) rotate(0deg) scale(1)'
                      : `translate(calc(-50% + ${pos.x}%), calc(-50% + ${pos.y}%)) rotate(${pos.rotate}deg) scale(${pos.scale})`,
                    zIndex,
                    filter: isActive ? 'none' : 'brightness(0.7)',
                  }}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => setActiveIndex(i)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-2xl">
                    <Image
                      src={urlFor(img).width(1000).height(750).fit('crop').url()}
                      alt={img.alt || ''}
                      fill
                      className="object-cover"
                      sizes="60vw"
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Active image caption */}
          {images[activeIndex] && (images[activeIndex].caption || images[activeIndex].photographer) && (
            <p className="mt-8 text-center font-heading text-[10px] uppercase tracking-[0.3em] text-white/40 transition-all duration-300">
              {images[activeIndex].caption}
              {images[activeIndex].photographer && (
                <>{images[activeIndex].caption ? ' — ' : ''}Foto: {images[activeIndex].photographer}</>
              )}
            </p>
          )}
        </div>
      )}

      {/* Grid view — clean grid with more spacing */}
      {viewMode === 'grid' && (
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img, i) => (
              <div
                key={img._key || i}
                data-gallery-item
                className="overflow-hidden"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={urlFor(img).width(600).height(450).fit('crop').url()}
                    alt={img.alt || ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
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
      )}
    </section>
  )
}

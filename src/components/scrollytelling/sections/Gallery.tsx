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

export function Gallery({ data }: GalleryProps) {
  const [viewMode, setViewMode] = useState<'gallery' | 'grid'>('gallery')
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (sectionRef.current) {
        const items = sectionRef.current.querySelectorAll('[data-gallery-item]')
        gsap.from(items, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
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
      className="relative px-6 py-16 lg:px-16 lg:py-24"
      style={{ backgroundColor: bgColor }}
    >
      {/* Gallery/Grid toggle */}
      <div className="mb-8 flex justify-center">
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

      {/* Gallery view — stacked/overlapping images */}
      {viewMode === 'gallery' && (
        <div className="mx-auto max-w-5xl">
          <div className="relative flex flex-col items-center gap-[-2rem]">
            {images.map((img, i) => {
              // Alternate sizes and slight offsets for editorial feel
              const isWide = i % 3 === 0
              const offset = i % 2 === 0 ? 'lg:-translate-x-8' : 'lg:translate-x-8'

              return (
                <div
                  key={img._key || i}
                  data-gallery-item
                  className={`relative w-full ${isWide ? 'max-w-4xl' : 'max-w-2xl'} ${offset} ${i > 0 ? '-mt-6 lg:-mt-10' : ''}`}
                  style={{ zIndex: images.length - i }}
                >
                  <div className={`relative overflow-hidden shadow-2xl ${isWide ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
                    <Image
                      src={urlFor(img).width(isWide ? 1200 : 800).height(isWide ? 750 : 600).fit('crop').url()}
                      alt={img.alt || ''}
                      fill
                      className="object-cover"
                      sizes={isWide ? '80vw' : '60vw'}
                    />
                  </div>
                  {(img.caption || img.photographer) && (
                    <p className="mt-2 text-center font-heading text-[10px] uppercase tracking-[0.3em] text-white/40">
                      {img.caption}
                      {img.photographer && (
                        <>{img.caption ? ' — ' : ''}Foto: {img.photographer}</>
                      )}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Grid view — clean grid */}
      {viewMode === 'grid' && (
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                  <p className="mt-2 font-heading text-[10px] uppercase tracking-[0.2em] text-white/40">
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

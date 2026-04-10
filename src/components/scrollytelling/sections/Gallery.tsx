'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { gsap, ScrollTrigger } from '@/lib/gsap-config'

interface GalleryImage {
  asset: { _ref: string }
  alt?: string
  caption?: string
  photographer?: string
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
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    // Horizontal scroll on desktop for carousel layout
    if (data.layout === 'carousel') {
      mm.add('(min-width: 1024px)', () => {
        if (!trackRef.current || !sectionRef.current) return

        const totalWidth = trackRef.current.scrollWidth - window.innerWidth

        gsap.to(trackRef.current, {
          x: -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${totalWidth}`,
            scrub: 1,
            pin: true,
          },
        })
      })
    }

    // Staggered reveal for grid/masonry
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (data.layout !== 'carousel' && sectionRef.current) {
        const items = sectionRef.current.querySelectorAll('[data-gallery-item]')
        gsap.from(items, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    })

    return () => mm.revert()
  }, [data.layout])

  const images = data.images || []
  if (images.length === 0) return null

  // Carousel layout
  if (data.layout === 'carousel') {
    return (
      <section
        ref={sectionRef}
        className="relative h-screen overflow-hidden"
        style={{ backgroundColor: data.backgroundColor || '#003865' }}
      >
        <div ref={trackRef} className="flex h-full items-center gap-6 px-12">
          {images.map((img, i) => (
            <div key={img._key || i} className="relative h-[70vh] w-[50vw] shrink-0 overflow-hidden rounded-lg lg:w-[35vw]">
              <Image
                src={urlFor(img).width(800).height(1000).url()}
                alt={img.alt || ''}
                fill
                className="object-cover"
                sizes="50vw"
              />
              {img.caption && (
                <p className="absolute bottom-3 left-3 text-xs text-white/60">
                  {img.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    )
  }

  // Grid / Masonry layout
  return (
    <section
      ref={sectionRef}
      className="px-6 py-16"
      style={{ backgroundColor: data.backgroundColor || '#003865' }}
    >
      <div
        className={`mx-auto max-w-5xl ${
          data.layout === 'masonry'
            ? 'columns-2 gap-4 lg:columns-3'
            : 'grid grid-cols-2 gap-4 lg:grid-cols-3'
        }`}
      >
        {images.map((img, i) => (
          <div
            key={img._key || i}
            data-gallery-item
            className={`overflow-hidden rounded-lg ${
              data.layout === 'masonry' ? 'mb-4 break-inside-avoid' : ''
            }`}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={urlFor(img).width(600).height(450).url()}
                alt={img.alt || ''}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            </div>
            {img.caption && (
              <p className="mt-2 text-xs text-white/50">{img.caption}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

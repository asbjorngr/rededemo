'use client'

import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface HorizontalImageStripProps {
  data: {
    title?: string
    images?: { asset: { _ref: string }; alt?: string; caption?: string; _key?: string }[]
    backgroundColor?: string
  }
  index: number
}

export function HorizontalImageStrip({ data }: HorizontalImageStripProps) {
  const images = data.images || []
  const bgColor = data.backgroundColor || '#003865'

  if (images.length === 0) return null

  return (
    <section className="relative overflow-hidden py-16 lg:py-24" style={{ backgroundColor: bgColor }}>
      {data.title && (
        <div className="px-6 pb-8 lg:px-16">
          <h2 className="font-display text-2xl text-white lg:text-3xl">
            {data.title}
          </h2>
        </div>
      )}

      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 scrollbar-hide lg:gap-6 lg:px-16">
        {images.map((img, i) => (
          <div
            key={img._key || i}
            className="w-[72vw] flex-shrink-0 snap-center sm:w-[50vw] lg:w-[35vw]"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              {img.asset && (
                <Image
                  src={urlFor(img).width(800).height(600).fit('crop').url()}
                  alt={img.alt || ''}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 72vw, (max-width: 1024px) 50vw, 35vw"
                />
              )}
            </div>
            {img.caption && (
              <p className="mt-3 font-heading text-[10px] uppercase tracking-[0.2em] text-white/40">
                {img.caption}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

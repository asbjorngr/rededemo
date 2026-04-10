'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/sanity/lib/image'

/* eslint-disable @typescript-eslint/no-explicit-any */

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mb-4 mt-12 font-display text-3xl leading-tight text-navy lg:text-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-10 font-heading text-xl font-bold text-navy lg:text-2xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-8 font-heading text-lg font-bold text-navy">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-gold pl-6 font-display text-xl italic text-navy/80 lg:text-2xl">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-6 text-lg leading-relaxed text-navy/80 lg:text-[19px]">
        {children}
      </p>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-tobb-blue underline decoration-tobb-blue/30 underline-offset-2 hover:decoration-tobb-blue"
      >
        {children}
      </a>
    ),
    internalLink: ({ children, value }) => (
      <Link
        href={`/artikler/${value?.slug?.current || ''}`}
        className="text-tobb-blue underline decoration-tobb-blue/30 underline-offset-2 hover:decoration-tobb-blue"
      >
        {children}
      </Link>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-10 -mx-6 lg:-mx-16">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={urlFor(value).width(1200).height(750).url()}
              alt={value.alt || ''}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          {(value.caption || value.photographer) && (
            <figcaption className="mt-2 px-6 text-sm text-navy/50 lg:px-16">
              {value.caption}
              {value.photographer && (
                <span className="ml-1">Foto: {value.photographer}</span>
              )}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

interface PortableTextRendererProps {
  value: any[]
}

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  return (
    <div className="mx-auto max-w-prose px-6 lg:px-0">
      <PortableText value={value} components={components} />
    </div>
  )
}

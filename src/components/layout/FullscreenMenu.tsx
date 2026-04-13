'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface Tag {
  _id: string
  title: string
  slug: { current: string }
}

interface FeaturedArticle {
  _id: string
  title: string
  slug: { current: string }
  heroImage?: { asset: { _ref: string }; alt?: string }
  tags?: { _id: string; title: string }[]
}

interface FullscreenMenuProps {
  isOpen: boolean
  onClose: () => void
  tags: Tag[]
  featured: FeaturedArticle | null
}

const NAV_LINKS = [
  { label: 'Utgaver', href: '/', key: 'utgaver' },
  { label: 'Om', href: '/om', key: 'om' },
  { label: 'Kontakt', href: '/kontakt', key: 'kontakt' },
]

export function FullscreenMenu({ isOpen, onClose, tags, featured }: FullscreenMenuProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [showTopics, setShowTopics] = useState(false)
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null)
  const topicsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openTopics = useCallback(() => {
    if (topicsTimeout.current) clearTimeout(topicsTimeout.current)
    setShowTopics(true)
    setHoveredItem('temaer')
  }, [])

  const closeTopics = useCallback(() => {
    topicsTimeout.current = setTimeout(() => {
      setShowTopics(false)
      setHoveredItem(null)
      setHoveredTopic(null)
    }, 400)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      if (topicsTimeout.current) clearTimeout(topicsTimeout.current)
      setShowTopics(false)
      setHoveredItem(null)
      setHoveredTopic(null)
    }
  }, [isOpen])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const itemBlurred = (key: string) => hoveredItem !== null && hoveredItem !== key

  return (
    <div
      className={`fixed inset-0 z-40 transition-all duration-700 ease-out ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-navy" />

      {/* 3-column layout: nav | topics | featured */}
      <div className="relative z-10 flex h-full px-8 lg:px-16">
        {/* Column 1 — Main nav */}
        <div className="flex w-[280px] flex-col justify-center lg:w-[320px]">
          <nav className="space-y-1">
            {/* Temaer — with hover to show topics */}
            <div
              onMouseEnter={openTopics}
              onMouseLeave={closeTopics}
            >
              <span
                className={`cursor-default font-display text-5xl text-white transition-all duration-500 hover:text-gold md:text-6xl lg:text-7xl ${
                  itemBlurred('temaer') ? 'opacity-20 blur-[2px]' : 'opacity-100'
                }`}
              >
                Temaer
              </span>
            </div>

            {NAV_LINKS.map((item, index) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={onClose}
                onMouseEnter={() => { setHoveredItem(item.key); closeTopics() }}
                onMouseLeave={() => setHoveredItem(null)}
                className={`block font-display text-5xl text-white transition-all duration-500 hover:text-gold md:text-6xl lg:text-7xl ${
                  itemBlurred(item.key) ? 'opacity-20 blur-[2px]' : 'opacity-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Social links */}
          <div className="mt-12 flex gap-6">
            <a href="https://www.tobb.no" target="_blank" rel="noopener noreferrer" className="font-heading text-[11px] uppercase tracking-[0.2em] text-white/30 transition-colors hover:text-white/60">
              TOBB.no
            </a>
            <a href="https://www.facebook.com/tobbbolig" target="_blank" rel="noopener noreferrer" className="font-heading text-[11px] uppercase tracking-[0.2em] text-white/30 transition-colors hover:text-white/60">
              Facebook
            </a>
            <a href="https://www.instagram.com/tobbbolig" target="_blank" rel="noopener noreferrer" className="font-heading text-[11px] uppercase tracking-[0.2em] text-white/30 transition-colors hover:text-white/60">
              Instagram
            </a>
          </div>
        </div>

        {/* Column 2 — Topic subtopics (shown on Temaer hover) */}
        <div
          className={`flex w-[250px] flex-col justify-center transition-all duration-400 ${
            showTopics ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0 pointer-events-none'
          }`}
          onMouseEnter={openTopics}
          onMouseLeave={closeTopics}
        >
          <div className="flex flex-col gap-1">
            {tags.map((tag) => {
              const blurred = hoveredTopic !== null && hoveredTopic !== tag._id
              return (
                <Link
                  key={tag._id}
                  href={`/tema/${tag.slug.current}`}
                  onClick={onClose}
                  onMouseEnter={() => setHoveredTopic(tag._id)}
                  onMouseLeave={() => setHoveredTopic(null)}
                  className={`font-display text-2xl capitalize transition-all duration-400 hover:text-gold md:text-3xl ${
                    blurred ? 'text-white/20' : 'text-white/70'
                  }`}
                >
                  {tag.title}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Column 3 — Featured article (right side) */}
        {featured && (
          <div
            className={`hidden flex-1 items-center justify-end transition-all duration-700 lg:flex ${
              isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
            style={{ transitionDelay: isOpen ? '200ms' : '0ms' }}
          >
            <Link
              href={`/artikler/${featured.slug.current}`}
              onClick={onClose}
              className="group block w-full max-w-sm"
            >
              <div className="overflow-hidden rounded-2xl bg-white/[0.06]">
                {featured.heroImage?.asset && (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={urlFor(featured.heroImage).width(600).height(450).fit('crop').url()}
                      alt={featured.heroImage.alt || featured.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="400px"
                    />
                  </div>
                )}
                <div className="p-6">
                  {featured.tags?.[0] && (
                    <span className="mb-2 inline-block font-heading text-[10px] uppercase tracking-[0.3em] text-gold">
                      {featured.tags[0].title}
                    </span>
                  )}
                  <h3 className="font-display text-xl leading-snug text-white transition-colors duration-300 group-hover:text-gold">
                    {featured.title}
                  </h3>
                  <span className="mt-4 inline-block font-heading text-[11px] uppercase tracking-[0.2em] text-white/40">
                    Les nå
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface Article {
  _id: string
  title: string
  slug: { current: string }
  teaser?: string
  heroImage?: { asset: { _ref: string }; alt?: string }
  tags?: { _id: string; title: string }[]
  type: string
}

interface HorizontalScrollProps {
  articles: Article[]
  title?: string
  label?: string
}

function CardItem({ article }: { article: Article }) {
  return (
    <Link
      href={`/artikler/${article.slug.current}`}
      className="group shrink-0"
      style={{ width: 'clamp(280px, 30vw, 400px)' }}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
        {article.heroImage?.asset ? (
          <Image
            src={urlFor(article.heroImage).width(400).height(530).fit('crop').url()}
            alt={article.heroImage.alt || article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="30vw"
          />
        ) : (
          <div className="h-full w-full bg-tobb-blue" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          {article.tags?.[0] && (
            <span className="mb-2 inline-block font-heading text-[10px] uppercase tracking-[0.3em] text-gold">
              {article.tags[0].title}
            </span>
          )}
          <h3 className="font-display text-lg leading-snug text-white">
            {article.title}
          </h3>
        </div>
      </div>
    </Link>
  )
}

export function HorizontalScroll({
  articles,
  title = 'Kuratert',
  label,
}: HorizontalScrollProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  // Pause on hover
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const pause = () => { track.style.animationPlayState = 'paused' }
    const resume = () => { track.style.animationPlayState = 'running' }

    track.addEventListener('mouseenter', pause)
    track.addEventListener('mouseleave', resume)
    return () => {
      track.removeEventListener('mouseenter', pause)
      track.removeEventListener('mouseleave', resume)
    }
  }, [])

  if (articles.length === 0) return null

  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="font-heading text-[11px] uppercase tracking-[0.3em] text-white/40">
            {title}
          </h2>
          {label && (
            <span className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/30">
              {label}
            </span>
          )}
        </div>
      </div>

      {/* Infinite scroll container */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-5 animate-scroll-left"
          style={{ width: 'max-content' }}
        >
          {/* Original set */}
          {articles.map((article) => (
            <CardItem key={article._id} article={article} />
          ))}
          {/* Duplicate set for seamless loop */}
          {articles.map((article) => (
            <CardItem key={`dup-${article._id}`} article={article} />
          ))}
        </div>
      </div>
    </section>
  )
}

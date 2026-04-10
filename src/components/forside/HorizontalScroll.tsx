'use client'

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

export function HorizontalScroll({
  articles,
  title = 'Kuratert',
  label,
}: HorizontalScrollProps) {
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

      {/* Scrollable container */}
      <div className="flex gap-5 overflow-x-auto px-6 pb-4 snap-x snap-mandatory scrollbar-hide lg:px-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))]">
        {articles.map((article) => (
          <Link
            key={article._id}
            href={`/artikler/${article.slug.current}`}
            className="group shrink-0 snap-start"
            style={{ width: 'clamp(280px, 30vw, 400px)' }}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
              {article.heroImage?.asset ? (
                <Image
                  src={urlFor(article.heroImage).width(400).height(530).url()}
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
        ))}
      </div>
    </section>
  )
}

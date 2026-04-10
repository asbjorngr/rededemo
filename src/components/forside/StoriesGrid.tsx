'use client'

import { useState } from 'react'
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

interface StoriesGridProps {
  articles: Article[]
}

export function StoriesGrid({ articles }: StoriesGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  if (articles.length === 0) return null

  // Extract unique tags from all articles
  const allTags = Array.from(
    new Map(
      articles
        .flatMap((a) => a.tags || [])
        .map((t) => [t._id, t])
    ).values()
  )

  const filtered = activeTag
    ? articles.filter((a) => a.tags?.some((t) => t._id === activeTag))
    : articles

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-[1400px]">
        {/* Header with tags */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-heading text-[11px] uppercase tracking-[0.3em] text-white/40">
            Flere saker
          </h2>
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTag(null)}
                className={`cursor-pointer rounded-full border px-3 py-1 font-heading text-[10px] uppercase tracking-[0.2em] transition-colors ${
                  activeTag === null
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-white/15 text-white/50 hover:border-white/30 hover:text-white/70'
                }`}
              >
                Alle
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag._id}
                  onClick={() => setActiveTag(tag._id)}
                  className={`cursor-pointer rounded-full border px-3 py-1 font-heading text-[10px] uppercase tracking-[0.2em] transition-colors ${
                    activeTag === tag._id
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-white/15 text-white/50 hover:border-white/30 hover:text-white/70'
                  }`}
                >
                  {tag.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Asymmetric grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article, index) => {
            // Vary card sizes for editorial feel
            const isLarge = index === 0 || index === 3
            return (
              <Link
                key={article._id}
                href={`/artikler/${article.slug.current}`}
                className={`group block ${isLarge ? 'sm:col-span-2 lg:col-span-2' : ''}`}
              >
                <div
                  className={`relative overflow-hidden rounded-lg ${
                    isLarge ? 'aspect-[16/9]' : 'aspect-[4/3]'
                  }`}
                >
                  {article.heroImage?.asset ? (
                    <Image
                      src={urlFor(article.heroImage)
                        .width(isLarge ? 1000 : 600)
                        .height(isLarge ? 563 : 450)
                        .url()}
                      alt={article.heroImage.alt || article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes={
                        isLarge
                          ? '(max-width: 640px) 100vw, 66vw'
                          : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                      }
                    />
                  ) : (
                    <div className="h-full w-full bg-navy-light" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                    {article.tags?.[0] && (
                      <span className="mb-2 inline-block font-heading text-[10px] uppercase tracking-[0.3em] text-gold">
                        {article.tags[0].title}
                      </span>
                    )}
                    <h3
                      className={`font-display leading-snug text-white transition-colors duration-300 group-hover:text-gold ${
                        isLarge ? 'text-2xl lg:text-3xl' : 'text-lg lg:text-xl'
                      }`}
                    >
                      {article.title}
                    </h3>
                  </div>
                </div>

                {article.teaser && (
                  <p className="mt-3 text-sm leading-relaxed text-white/50 line-clamp-2">
                    {article.teaser}
                  </p>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

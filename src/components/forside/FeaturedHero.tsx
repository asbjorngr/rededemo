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

interface FeaturedHeroProps {
  articles: Article[]
}

export function FeaturedHero({ articles }: FeaturedHeroProps) {
  if (articles.length === 0) return null

  const featured = articles.slice(0, 3)

  return (
    <>
      {featured.map((article, index) => (
        <section key={article._id} className="relative h-screen w-full">
          {/* Fullscreen background image */}
          {article.heroImage?.asset && (
            <Image
              src={urlFor(article.heroImage).width(1920).height(1080).fit('crop').url()}
              alt={article.heroImage.alt || article.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />
          )}

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />

          {/* Top label */}
          <div className="absolute inset-x-0 top-0 px-6 pt-8 lg:px-12 lg:pt-12">
            <span className="font-heading text-[11px] uppercase tracking-[0.5em] text-white/50">
              Feature
            </span>
          </div>

          {/* Bottom content — centered */}
          <Link
            href={`/artikler/${article.slug.current}`}
            className="group absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-10 text-center lg:px-12 lg:pb-16"
          >
            <h2 className="max-w-3xl font-display text-4xl leading-[1.1] text-white transition-colors duration-300 group-hover:text-gold md:text-5xl lg:text-6xl">
              {article.title}
            </h2>
            {article.teaser && (
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60 lg:text-lg">
                {article.teaser}
              </p>
            )}

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag._id}
                    className="rounded-full border border-white/20 px-3 py-1 font-heading text-[10px] uppercase tracking-[0.2em] text-white/60"
                  >
                    {tag.title}
                  </span>
                ))}
              </div>
            )}
          </Link>

          {/* Slide indicator */}
          <div className="absolute bottom-10 right-6 flex flex-col items-center gap-1 lg:bottom-16 lg:right-12">
            <span className="font-heading text-[10px] tabular-nums text-white/40">
              {String(index + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}
            </span>
          </div>
        </section>
      ))}
    </>
  )
}

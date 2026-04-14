import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface Article {
  _id: string
  title: string
  slug: { current: string }
  type: string
  teaser?: string
  heroImage?: { asset: { _ref: string }; alt?: string }
  tags?: { _id: string; title: string }[]
}

interface DiscoverViewProps {
  articles: Article[]
  editorial: {
    _id: string
    title: string
    slug: { current: string }
    teaserText?: string
  } | null
  podcast: {
    _id: string
    title: string
    description?: string
    spotifyUrl?: string
    thumbnail?: { asset: { _ref: string }; alt?: string }
    duration?: number
    episodeNumber?: number
    tags?: { _id: string; title: string }[]
  } | null
  edition: { _id: string; title: string; number: number; year: number } | null
}

function DiscoverCard({
  href,
  imageRef,
  imageAlt,
  title,
  tag,
  aspect,
  featured = false,
  imageWidth = 600,
  imageHeight = 800,
  sizes = '33vw',
}: {
  href: string
  imageRef?: { asset: { _ref: string }; alt?: string }
  imageAlt?: string
  title: string
  tag?: string
  aspect: string
  featured?: boolean
  imageWidth?: number
  imageHeight?: number
  sizes?: string
}) {
  return (
    <Link href={href} className="group block">
      <div
        className="relative overflow-hidden rounded-lg"
        style={{ aspectRatio: aspect }}
      >
        {imageRef?.asset ? (
          <Image
            src={urlFor(imageRef).width(imageWidth).height(imageHeight).fit('crop').url()}
            alt={imageAlt || title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-[1.02] group-hover:brightness-110"
            sizes={sizes}
          />
        ) : (
          <div className="h-full w-full bg-navy-light" />
        )}
        <div className={`absolute inset-0 bg-gradient-to-t ${featured ? 'from-black/80 via-black/30' : 'from-black/70 via-black/20'} to-transparent`} />
        <div className={`absolute inset-x-0 bottom-0 ${featured ? 'p-4 lg:p-6' : 'p-3 lg:p-4'}`}>
          {tag && (
            <span className={`inline-block font-heading uppercase tracking-[0.3em] text-gold ${featured ? 'mb-2 text-[10px] lg:text-[11px]' : 'mb-1 text-[9px] lg:text-[10px]'}`}>
              {tag}
            </span>
          )}
          <h3 className={`font-display leading-snug text-white ${featured ? 'text-lg lg:text-2xl' : 'text-sm lg:text-base'}`}>
            {title}
          </h3>
        </div>
      </div>
    </Link>
  )
}

export function DiscoverView({
  articles,
  editorial,
  podcast,
  edition,
}: DiscoverViewProps) {
  const scrollytelling = articles.filter((a) => a.type === 'scrollytelling')
  const standard = articles.filter((a) => a.type === 'standard')

  // Row 1: Top 3 features (scrollytelling)
  const features = scrollytelling.slice(0, 3)

  // Row 3: "I denne utgaven" — first 4 standard articles
  const curated = standard.slice(0, 4)

  // Row 4+: Remaining articles
  const remaining = standard.slice(4)

  return (
    <div className="px-3 pb-12 pt-20 lg:px-6">
      <div className="mx-auto max-w-[1400px] space-y-3">
        {/* Row 1 — 3 feature cards (tall, portrait) */}
        {features.length > 0 && (
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-3">
            {features.map((article) => (
              <DiscoverCard
                key={article._id}
                href={`/artikler/${article.slug.current}`}
                imageRef={article.heroImage}
                imageAlt={article.heroImage?.alt}
                title={article.title}
                tag={article.tags?.[0]?.title}
                aspect="3/4"
                featured
                imageWidth={500}
                imageHeight={667}
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            ))}
          </div>
        )}

        {/* Row 2 — Leder + Podcast (wide, landscape) */}
        {(editorial || podcast) && (
          <div className="grid grid-cols-2 gap-2 lg:gap-3">
            {/* Leder */}
            {editorial && (
              <Link
                href="/leder"
                className="group block"
              >
                <div
                  className="relative flex flex-col justify-end overflow-hidden rounded-lg bg-tobb-blue p-4 lg:p-6"
                  style={{ aspectRatio: '16/9' }}
                >
                  <span className="mb-1 font-heading text-[9px] uppercase tracking-[0.3em] text-white/50 lg:text-[10px]">
                    Leder
                  </span>
                  <h3 className="font-display text-sm leading-snug text-white transition-colors duration-300 group-hover:text-gold lg:text-lg">
                    {editorial.title}
                  </h3>
                  {editorial.teaserText && (
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/50 lg:text-sm">
                      {editorial.teaserText}
                    </p>
                  )}
                </div>
              </Link>
            )}

            {/* Podcast */}
            {podcast && (
              <div className="group block">
                <div
                  className="relative flex flex-col justify-end overflow-hidden rounded-lg bg-purple p-4 lg:p-6"
                  style={{ aspectRatio: '16/9' }}
                >
                  {podcast.thumbnail?.asset && (
                    <Image
                      src={urlFor(podcast.thumbnail).width(600).height(338).fit('crop').url()}
                      alt={podcast.title}
                      fill
                      className="object-cover opacity-40"
                      sizes="50vw"
                    />
                  )}
                  <div className="relative">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="font-heading text-[9px] uppercase tracking-[0.3em] text-white/50 lg:text-[10px]">
                        {podcast.episodeNumber
                          ? `Podcast ep. ${podcast.episodeNumber}`
                          : 'Podcast'}
                      </span>
                      {/* Play indicator */}
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                        <svg
                          viewBox="0 0 24 24"
                          fill="white"
                          className="ml-0.5 h-2.5 w-2.5"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </div>
                    <h3 className="font-display text-sm leading-snug text-white lg:text-lg">
                      {podcast.title}
                    </h3>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Row 3 — "I denne utgaven" (4 portrait cards) */}
        {curated.length > 0 && (
          <div>
            <p className="mb-2 px-1 font-heading text-[10px] uppercase tracking-[0.3em] text-white/30">
              I denne utgaven
            </p>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-3">
              {curated.map((article) => (
                <DiscoverCard
                  key={article._id}
                  href={`/artikler/${article.slug.current}`}
                  imageRef={article.heroImage}
                  imageAlt={article.heroImage?.alt}
                  title={article.title}
                  tag={article.tags?.[0]?.title}
                  aspect="3/4"
                  imageWidth={400}
                  imageHeight={533}
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              ))}
            </div>
          </div>
        )}

        {/* Row 4+ — Remaining articles (2-col landscape grid) */}
        {remaining.length > 0 && (
          <div>
            <p className="mb-2 px-1 font-heading text-[10px] uppercase tracking-[0.3em] text-white/30">
              Flere saker
            </p>
            <div className="grid grid-cols-2 gap-2 lg:gap-3">
              {remaining.map((article) => (
                <DiscoverCard
                  key={article._id}
                  href={`/artikler/${article.slug.current}`}
                  imageRef={article.heroImage}
                  imageAlt={article.heroImage?.alt}
                  title={article.title}
                  tag={article.tags?.[0]?.title}
                  aspect="4/3"
                  imageWidth={600}
                  imageHeight={450}
                  sizes="50vw"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

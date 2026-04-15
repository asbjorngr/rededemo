import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { IntroSection } from './IntroSection'
import { FeaturedHero } from './FeaturedHero'
import { HorizontalScroll } from './HorizontalScroll'
import { StoriesGrid } from './StoriesGrid'

interface Article {
  _id: string
  title: string
  slug: { current: string }
  type: string
  teaser?: string
  heroImage?: { asset: { _ref: string }; alt?: string }
  heroVideoUrl?: string
  tags?: { _id: string; title: string }[]
}

interface MagasinViewProps {
  featured: Article[]
  curated: Article[]
  remaining: Article[]
  editorial: {
    _id: string
    title: string
    slug: { current: string }
    teaserText?: string
    heroImage?: { asset: { _ref: string }; alt?: string }
  } | null
  podcast: {
    _id: string
    title: string
    description?: string
    spotifyUrl?: string
    thumbnail?: { asset: { _ref: string } }
    duration?: number
    episodeNumber?: number
    tags?: { _id: string; title: string }[]
  } | null
  edition: { _id: string; title: string; number: number; year: number } | null
}

export function MagasinView({ featured, curated, remaining, editorial, podcast, edition }: MagasinViewProps) {
  const embedUrl = podcast?.spotifyUrl
    ? podcast.spotifyUrl.replace('open.spotify.com/', 'open.spotify.com/embed/')
    : null

  return (
    <>
      {/* 1. Intro + Features — sticky scroll zone */}
      <div className="relative" style={{ clipPath: 'inset(0)' }}>
        <div className="sticky top-0 z-0">
          <IntroSection />
        </div>
        <FeaturedHero articles={featured} />
      </div>

      {/* 2. Horizontal scroll — "I denne utgaven" */}
      <HorizontalScroll
        articles={curated}
        title="I denne utgaven"
        label={`Rede nr ${edition?.number} ${edition?.year}`}
      />

      {/* 3. Leder + Podcast — side by side */}
      {(editorial || podcast) && (
        <section className="bg-navy px-6 py-16 lg:px-16 lg:py-24">
          <div className="mx-auto grid max-w-[1100px] gap-6 lg:grid-cols-2">
            {/* Leder */}
            {editorial && (
              <Link href="/leder" className="group block h-full">
                <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white/[0.06]">
                  {editorial.heroImage?.asset && (
                    <div className="relative aspect-[16/9] overflow-hidden lg:aspect-auto lg:flex-1">
                      <Image
                        src={urlFor(editorial.heroImage).width(600).height(338).fit('crop').url()}
                        alt={editorial.heroImage.alt || editorial.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <div className="p-6 lg:p-8">
                    <p className="mb-2 font-heading text-[10px] uppercase tracking-[0.4em] text-white/40">
                      Leder
                    </p>
                    <h3 className="font-display text-xl leading-snug text-white transition-colors duration-300 group-hover:text-gold lg:text-2xl">
                      {editorial.title}
                    </h3>
                    {editorial.teaserText && (
                      <p className="mt-3 line-clamp-3 text-[15px] leading-[1.7] text-white/50">
                        {editorial.teaserText}
                      </p>
                    )}
                    <span className="mt-4 inline-block font-heading text-[11px] uppercase tracking-[0.2em] text-white/30 transition-colors group-hover:text-white/50">
                      Les lederen
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Podcast — full Spotify embed */}
            {podcast && embedUrl && (
              <div className="h-full overflow-hidden rounded-2xl">
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="100%"
                  style={{ minHeight: 352 }}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="block border-0"
                  title={podcast.title}
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. Stories grid with tag filters */}
      <StoriesGrid articles={remaining} />
    </>
  )
}

import { IntroSection } from './IntroSection'
import { FeaturedHero } from './FeaturedHero'
import { HorizontalScroll } from './HorizontalScroll'
import { PodcastSection } from './PodcastSection'
import { StoriesGrid } from './StoriesGrid'

interface Article {
  _id: string
  title: string
  slug: { current: string }
  type: string
  teaser?: string
  heroImage?: { asset: { _ref: string }; alt?: string }
  tags?: { _id: string; title: string }[]
}

interface MagasinViewProps {
  featured: Article[]
  curated: Article[]
  remaining: Article[]
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

export function MagasinView({ featured, curated, remaining, podcast, edition }: MagasinViewProps) {
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

      {/* 3. Podcast */}
      {podcast && <PodcastSection episode={podcast} />}

      {/* 4. Stories grid with tag filters */}
      <StoriesGrid articles={remaining} />
    </>
  )
}

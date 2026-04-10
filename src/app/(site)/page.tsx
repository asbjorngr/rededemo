import { sanityFetch } from '@/sanity/lib/live'
import { FRONTPAGE_QUERY } from '@/sanity/lib/queries'
import { IntroSection } from '@/components/forside/IntroSection'
import { FeaturedHero } from '@/components/forside/FeaturedHero'
import { HorizontalScroll } from '@/components/forside/HorizontalScroll'
import { StoriesGrid } from '@/components/forside/StoriesGrid'

export default async function Home() {
  const data = await sanityFetch<{
    edition: { _id: string; title: string; number: number; year: number } | null
    articles: Array<{
      _id: string
      title: string
      slug: { current: string }
      type: string
      teaser?: string
      heroImage?: { asset: { _ref: string }; alt?: string }
      tags?: { _id: string; title: string }[]
    }>
    editorial: { _id: string; title: string; slug: { current: string }; teaserText?: string } | null
  }>({ query: FRONTPAGE_QUERY })

  const articles = data.articles || []

  // Scrollytelling articles → fullscreen features
  const scrollytelling = articles.filter((a) => a.type === 'scrollytelling')
  const standard = articles.filter((a) => a.type === 'standard')

  // 3 fullscreen features = scrollytelling articles
  const featured = scrollytelling.slice(0, 3)

  // Horizontal scroll = first batch of standard articles
  const curated = standard.slice(0, 5)

  // Grid = remaining standard articles
  const remaining = standard.slice(5)

  return (
    <>
      {/* 1. Intro */}
      <IntroSection />

      {/* 2. Fullscreen feature articles (100vh each) */}
      <FeaturedHero articles={featured} />

      {/* 3. Horizontal scroll — "Nytt fra lokalmiljøet" */}
      <HorizontalScroll
        articles={curated}
        title="I denne utgaven"
        label={`Rede nr ${data.edition?.number} ${data.edition?.year}`}
      />

      {/* 4. Stories grid with tag filters */}
      <StoriesGrid articles={remaining} />
    </>
  )
}

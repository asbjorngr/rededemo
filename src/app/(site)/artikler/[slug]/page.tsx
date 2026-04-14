import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { ARTICLE_BY_SLUG_QUERY, RELATED_ARTICLES_QUERY } from '@/sanity/lib/queries'
import { ScrollytellingRenderer } from '@/components/scrollytelling/ScrollytellingRenderer'
import { StandardArticle } from '@/components/article/StandardArticle'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params

  const article = await sanityFetch<{
    _id: string
    title: string
    slug: { current: string }
    type: 'scrollytelling' | 'standard'
    scrollyTheme?: 'warm' | 'documentary' | 'playful'
    scrollyBackground?: string
    teaser?: string
    heroImage?: { asset: { _ref: string }; alt?: string; photographer?: string }
    body?: unknown[]
    sections?: unknown[]
    audioFileUrl?: string
    tags?: { _id: string; title: string; slug: { current: string } }[]
    edition?: { _id: string; title: string; number: number; year: number }
    author?: { _id: string; name: string; bio?: string; portrait?: { asset: { _ref: string } } }
  }>({ query: ARTICLE_BY_SLUG_QUERY, params: { slug } })

  if (!article) notFound()

  const relatedArticles = await sanityFetch<{
    _id: string
    title: string
    slug: { current: string }
    type: string
    teaser?: string
    heroImage?: { asset: { _ref: string }; alt?: string }
    tags?: { _id: string; title: string }[]
  }[]>({ query: RELATED_ARTICLES_QUERY, params: { id: article._id } })

  if (article.type === 'scrollytelling') {
    return <ScrollytellingRenderer article={article} relatedArticles={relatedArticles || []} />
  }

  return <StandardArticle article={article} />
}

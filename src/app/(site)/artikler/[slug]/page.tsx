import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { ARTICLE_BY_SLUG_QUERY } from '@/sanity/lib/queries'
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
    teaser?: string
    heroImage?: { asset: { _ref: string }; alt?: string; photographer?: string }
    body?: unknown[]
    sections?: unknown[]
    tags?: { _id: string; title: string; slug: { current: string } }[]
    edition?: { _id: string; title: string; number: number; year: number }
    author?: { _id: string; name: string; bio?: string; portrait?: { asset: { _ref: string } } }
  }>({ query: ARTICLE_BY_SLUG_QUERY, params: { slug } })

  if (!article) notFound()

  if (article.type === 'scrollytelling') {
    return <ScrollytellingRenderer article={article} />
  }

  return <StandardArticle article={article} />
}

'use client'

import { useState, useEffect, useCallback } from 'react'
import { DiscoverView } from './DiscoverView'
import { MagasinView } from './MagasinView'

const STORAGE_KEY = 'rede-forside-mode'

type Mode = 'discover' | 'magasin'

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

interface ForsideControllerProps {
  articles: Article[]
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

export function ForsideController({
  articles,
  editorial,
  podcast,
  edition,
}: ForsideControllerProps) {
  const [mode, setMode] = useState<Mode>('discover')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Mode | null
    if (saved === 'discover' || saved === 'magasin') {
      setMode(saved)
    }
    setMounted(true)
  }, [])

  const toggle = useCallback(() => {
    const next: Mode = mode === 'discover' ? 'magasin' : 'discover'
    setMode(next)
    localStorage.setItem(STORAGE_KEY, next)
    window.scrollTo(0, 0)
  }, [mode])

  // Categorize articles for MagasinView
  const scrollytelling = articles.filter((a) => a.type === 'scrollytelling')
  const standard = articles.filter((a) => a.type === 'standard')
  const featured = scrollytelling.slice(0, 3)
  const curated = standard.slice(0, 5)
  const remaining = standard.slice(5)

  return (
    <>
      {/* Toggle pill — overlays in header area, centered */}
      {mounted && (
        <div className="pointer-events-none fixed top-0 z-50 flex h-16 w-full items-center justify-center">
          <div className="pointer-events-auto flex items-center gap-0.5 rounded-full bg-white/[0.08] p-0.5 backdrop-blur-sm">
            <button
              onClick={mode === 'discover' ? undefined : toggle}
              className={`cursor-pointer rounded-full px-3.5 py-1.5 font-heading text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
                mode === 'discover'
                  ? 'bg-white/15 text-white'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              Discover
            </button>
            <button
              onClick={mode === 'magasin' ? undefined : toggle}
              className={`cursor-pointer rounded-full px-3.5 py-1.5 font-heading text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
                mode === 'magasin'
                  ? 'bg-white/15 text-white'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              Magasin
            </button>
          </div>
        </div>
      )}

      {mode === 'discover' ? (
        <DiscoverView
          articles={articles}
          editorial={editorial}
          podcast={podcast}
          edition={edition}
        />
      ) : (
        <MagasinView
          featured={featured}
          curated={curated}
          remaining={remaining}
          editorial={editorial}
          podcast={podcast}
          edition={edition}
        />
      )}
    </>
  )
}

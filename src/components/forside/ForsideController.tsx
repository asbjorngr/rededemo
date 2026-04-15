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
      {/* Toggle — right-aligned near Meny+ */}
      {mounted && (
        <div className="pointer-events-none fixed top-0 z-50 w-full">
          <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-end px-6">
            <button
              onClick={toggle}
              className="pointer-events-auto mr-24 flex cursor-pointer items-center gap-2.5"
            >
              <span className="font-heading text-[11px] uppercase tracking-[0.3em] text-white/50">
                {mode === 'discover' ? 'Discover' : 'Magasin'}
              </span>
              <div className="relative h-5 w-9 rounded-full bg-white/10 transition-colors duration-300">
                <div
                  className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform duration-300"
                  style={{ transform: mode === 'magasin' ? 'translateX(18px)' : 'translateX(2px)' }}
                />
              </div>
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

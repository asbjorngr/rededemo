'use client'

import Link from 'next/link'
import { HeroSection } from './sections/HeroSection'
import { TextWithImage } from './sections/TextWithImage'
import { FullscreenParallax } from './sections/FullscreenParallax'
import { PullQuote } from './sections/PullQuote'
import { VideoSection } from './sections/VideoSection'
import { AudioSection } from './sections/AudioSection'
import { FactBox } from './sections/FactBox'
import { Gallery } from './sections/Gallery'
import { ProgressBar } from './ProgressBar'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ScrollytellingRendererProps {
  article: {
    _id: string
    title: string
    sections?: any[]
    tags?: { _id: string; title: string }[]
    author?: { _id: string; name: string; bio?: string }
    edition?: { _id: string; title: string; number: number; year: number }
  }
}

const SECTION_MAP: Record<string, React.ComponentType<{ data: any; index: number }>> = {
  heroSection: HeroSection,
  textWithImage: TextWithImage,
  fullscreenParallax: FullscreenParallax,
  pullQuote: PullQuote,
  videoSection: VideoSection,
  audioSection: AudioSection,
  factBox: FactBox,
  gallery: Gallery,
}

export function ScrollytellingRenderer({ article }: ScrollytellingRendererProps) {
  const sections = article.sections || []

  return (
    <article className="relative">
      <ProgressBar />

      {/* Sections */}
      {sections.map((section, index) => {
        const Component = SECTION_MAP[section._type]
        if (!Component) return null
        return (
          <Component
            key={section._key || index}
            data={section}
            index={index}
          />
        )
      })}

      {/* Article footer — author info, share, meta */}
      <footer className="relative bg-navy">
        {/* Cream/light footer card — overlapping style */}
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-16">
          <div className="rounded-lg bg-mint p-8 shadow-lg lg:p-12">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Left — meta */}
              <div>
                {article.edition && (
                  <>
                    <h4 className="font-heading text-[10px] uppercase tracking-[0.3em] text-navy/40">
                      Publisert i
                    </h4>
                    <p className="mt-1 font-display text-lg text-navy">
                      Rede nr {article.edition.number} {article.edition.year}
                    </p>
                  </>
                )}

                {/* Share */}
                <div className="mt-8">
                  <h4 className="font-heading text-[10px] uppercase tracking-[0.3em] text-navy/40">
                    Del artikkelen
                  </h4>
                  <div className="mt-3 flex gap-4">
                    <button
                      onClick={() => navigator.share?.({ title: article.title, url: window.location.href }).catch(() => {})}
                      className="cursor-pointer font-heading text-xs uppercase tracking-wide text-navy/60 transition-colors hover:text-navy"
                    >
                      Del
                    </button>
                  </div>
                </div>
              </div>

              {/* Right — author */}
              {article.author && (
                <div>
                  <h4 className="font-heading text-[10px] uppercase tracking-[0.3em] text-navy/40">
                    Om forfatteren
                  </h4>
                  <p className="mt-1 font-display text-lg text-navy">
                    {article.author.name}
                  </p>
                  {article.author.bio && (
                    <p className="mt-2 text-sm leading-relaxed text-navy/60">
                      {article.author.bio}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2 border-t border-navy/10 pt-6">
                {article.tags.map((tag) => (
                  <span
                    key={tag._id}
                    className="rounded-full border border-navy/15 px-3 py-1 font-heading text-[10px] uppercase tracking-[0.2em] text-navy/50"
                  >
                    {tag.title}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Back to front */}
        <div className="pb-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-3 font-heading text-[11px] uppercase tracking-[0.3em] text-white/40 transition-colors hover:text-white/70"
          >
            <span className="h-px w-8 bg-current" />
            Tilbake til magasinet
            <span className="h-px w-8 bg-current" />
          </Link>
        </div>
      </footer>
    </article>
  )
}

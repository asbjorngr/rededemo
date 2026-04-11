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
import { StickyPortrait } from './sections/StickyPortrait'
import { HorizontalImageStrip } from './sections/HorizontalImageStrip'
import { RecipeCard } from './sections/RecipeCard'
import { CountUpFact } from './sections/CountUpFact'
import { NumberedStop } from './sections/NumberedStop'
import { InteractiveQuiz } from './sections/InteractiveQuiz'
import { ProgressBar } from './ProgressBar'
import { ScrollyThemeProvider } from './ScrollyThemeContext'
import { type ScrollyThemeName } from './theme-config'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ScrollytellingRendererProps {
  article: {
    _id: string
    title: string
    scrollyTheme?: ScrollyThemeName
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
  stickyPortrait: StickyPortrait,
  horizontalImageStrip: HorizontalImageStrip,
  recipeCard: RecipeCard,
  countUpFact: CountUpFact,
  numberedStop: NumberedStop,
  interactiveQuiz: InteractiveQuiz,
}

export function ScrollytellingRenderer({ article }: ScrollytellingRendererProps) {
  const sections = article.sections || []

  return (
    <ScrollyThemeProvider theme={article.scrollyTheme}>
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

      {/* Article footer — full width, editorial */}
      <footer className="relative bg-mint">
        <div className="px-6 py-20 lg:px-16 lg:py-28">
          {/* Large "Rede" branding */}
          <div className="mb-16 text-center">
            <Link href="/" className="font-display text-7xl text-navy/15 lg:text-9xl">
              Rede
            </Link>
          </div>

          {/* Content grid */}
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-3">
            {/* Meta */}
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
            </div>

            {/* Author */}
            {article.author && (
              <div>
                <h4 className="font-heading text-[10px] uppercase tracking-[0.3em] text-navy/40">
                  Tekst
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

            {/* Share */}
            <div>
              <h4 className="font-heading text-[10px] uppercase tracking-[0.3em] text-navy/40">
                Del artikkelen
              </h4>
              <div className="mt-3">
                <button
                  onClick={() => navigator.share?.({ title: article.title, url: window.location.href }).catch(() => {})}
                  className="cursor-pointer font-heading text-xs uppercase tracking-wide text-navy/60 transition-colors hover:text-navy"
                >
                  Del
                </button>
              </div>
            </div>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mx-auto mt-12 flex max-w-5xl flex-wrap gap-2 border-t border-navy/10 pt-8">
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

          {/* Back to magazine */}
          <div className="mt-16 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-3 font-heading text-[11px] uppercase tracking-[0.3em] text-navy/40 transition-colors hover:text-navy/70"
            >
              <span className="h-px w-8 bg-current" />
              Tilbake til magasinet
              <span className="h-px w-8 bg-current" />
            </Link>
          </div>
        </div>
      </footer>
    </article>
    </ScrollyThemeProvider>
  )
}

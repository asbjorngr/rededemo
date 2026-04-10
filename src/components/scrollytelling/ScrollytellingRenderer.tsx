'use client'

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
    </article>
  )
}

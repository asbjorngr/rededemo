import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

const COVER_IMAGE = {
  asset: { _ref: 'image-787bdd622e3a11a3777495213a31faa25506122c-4000x5000-jpg' },
  alt: 'Kirsebærblomster',
}

const SCROLL_TEXT = 'Scroll for å lese magasinet'
const TICKER_REPEAT = 8
const TICKER_SEPARATOR = '\u00A0\u00A0\u00A0\u2014\u00A0\u00A0\u00A0'

export function IntroSection() {
  const tickerContent = Array(TICKER_REPEAT)
    .fill(`${SCROLL_TEXT}${TICKER_SEPARATOR}`)
    .join('')

  return (
    <section className="relative flex h-screen w-full items-center justify-center">
      {/* Background image */}
      <Image
        src={urlFor(COVER_IMAGE).width(1920).height(1080).url()}
        alt={COVER_IMAGE.alt}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content — centered */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p className="mb-10 font-heading text-[11px] uppercase tracking-[0.5em] text-white/50 lg:mb-12">
          Rede utgave 2 — 2026
        </p>
        <h1 className="max-w-4xl font-display text-5xl leading-[1.1] text-gold md:text-7xl lg:text-8xl">
          Ta deg tid til å slappe av litt
        </h1>

        {/* Scroll ticker — same spacing as label above title */}
        <div
          className="mt-10 w-full max-w-md overflow-hidden lg:mt-12 lg:max-w-lg"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          }}
        >
          <div
            className="animate-scroll-left flex whitespace-nowrap"
            style={{ width: 'max-content', animationDuration: '60s' }}
          >
            <span className="font-heading text-[10px] uppercase tracking-[0.4em] text-gold/50">
              {tickerContent}
            </span>
            <span className="font-heading text-[10px] uppercase tracking-[0.4em] text-gold/50">
              {tickerContent}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

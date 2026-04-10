import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

const COVER_IMAGE = {
  asset: { _ref: 'image-787bdd622e3a11a3777495213a31faa25506122c-4000x5000-jpg' },
  alt: 'Kirsebærblomster',
}

export function IntroSection() {
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
        <p className="mb-6 font-heading text-[11px] uppercase tracking-[0.5em] text-white/50">
          Rede utgave 2 — 2026
        </p>
        <h1 className="max-w-4xl font-display text-5xl leading-[1.1] text-gold md:text-7xl lg:text-8xl">
          Ta deg tid til å slappe av mellom slagene
        </h1>
      </div>

      {/* Bottom — scroll label */}
      <div className="absolute inset-x-0 bottom-8 flex items-center justify-center gap-4 text-white/50 lg:bottom-12">
        <span className="font-heading text-[10px] uppercase tracking-[0.4em]">Magasin</span>
        <span className="h-px w-6 bg-white/30" />
        <span className="font-heading text-[10px] uppercase tracking-[0.4em]">Scroll for å lese magasinet</span>
      </div>
    </section>
  )
}

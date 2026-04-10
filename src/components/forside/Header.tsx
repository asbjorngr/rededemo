import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        <Link href="/" className="font-display text-2xl italic text-white">
          Rede
        </Link>
        <div className="flex items-center gap-6">
          <span className="hidden font-heading text-[11px] uppercase tracking-[0.2em] text-white/50 md:block">
            TOBB | Et magasin for TOBB-medlemmer
          </span>
        </div>
      </div>
    </header>
  )
}

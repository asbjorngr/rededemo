'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FullscreenMenu } from '@/components/layout/FullscreenMenu'

interface Tag {
  _id: string
  title: string
  slug: { current: string }
}

interface FeaturedArticle {
  _id: string
  title: string
  slug: { current: string }
  heroImage?: { asset: { _ref: string }; alt?: string }
  tags?: { _id: string; title: string }[]
}

interface HeaderProps {
  tags?: Tag[]
  featured?: FeaturedArticle | null
}

export function Header({ tags = [], featured = null }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 z-50 w-full">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
          <Link href="/" className="font-display text-2xl text-white">
            Rede
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex cursor-pointer items-center gap-2 font-heading text-base tracking-[0.1em] text-white transition-colors hover:text-gold"
          >
            Meny
            <span className="transition-transform duration-300" style={{ display: 'inline-block', transform: menuOpen ? 'rotate(45deg)' : 'none' }}>
              +
            </span>
          </button>
        </div>
      </header>

      <FullscreenMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        tags={tags}
        featured={featured}
      />
    </>
  )
}

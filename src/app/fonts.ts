import { Roboto, Varela_Round } from 'next/font/google'

// Gastromond (display) lastes via Adobe Fonts i layout.tsx
// font-family: "gastromond", serif

// Body font — fallback for Depot New (Adobe Fonts)
// Brukes til brødtekst og generell tekst
export const bodyFont = Roboto({
  subsets: ['latin'],
  variable: '--font-face-body',
  display: 'swap',
  weight: ['300', '400', '700'],
})

// Heading font — Varela Round (tilgjengelig på Google Fonts)
// Brukes til headings (h2, h3) og meta-tekst
export const headingFont = Varela_Round({
  subsets: ['latin'],
  variable: '--font-face-heading',
  display: 'swap',
  weight: '400',
})

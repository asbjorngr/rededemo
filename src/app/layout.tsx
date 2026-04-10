import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Rede – Et magasin for TOBB-medlemmer',
    template: '%s | Rede',
  },
  description:
    'Rede er TOBBs medlemsmagasin med historier om bolig, nabolag og livet i Trondheim.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="no" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}

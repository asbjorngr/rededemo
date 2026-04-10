import { Header } from '@/components/forside/Header'
import { Footer } from '@/components/forside/Footer'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

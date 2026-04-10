export const metadata = {
  title: 'Rede Studio',
  description: 'Sanity Studio for Rede Digitalt',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div id="sanity" style={{ height: '100vh' }}>
      {children}
    </div>
  )
}

import Link from 'next/link'

interface TagProps {
  label: string
  slug?: string
  variant?: 'default' | 'light' | 'gold'
  size?: 'sm' | 'md'
}

const variantClasses = {
  default: 'bg-white/10 text-white hover:bg-white/20',
  light: 'bg-navy/10 text-navy hover:bg-navy/20',
  gold: 'bg-gold/20 text-gold hover:bg-gold/30',
}

export function Tag({ label, slug, variant = 'default', size = 'sm' }: TagProps) {
  const classes = `inline-block rounded-sm font-heading uppercase tracking-wider transition-colors ${
    variantClasses[variant]
  } ${size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'}`

  if (slug) {
    return (
      <Link href={`/tema/${slug}`} className={classes}>
        {label}
      </Link>
    )
  }

  return <span className={classes}>{label}</span>
}

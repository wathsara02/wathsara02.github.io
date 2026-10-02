import type { ReactNode } from 'react'

type Variant = 'primary' | 'outline'

type Props = {
  children: ReactNode
  href: string
  variant?: Variant
  /** Pass for file downloads; otherwise external links open in a new tab. */
  download?: boolean
}

const BASE =
  'inline-flex items-center gap-2.5 border-2 px-6 py-3.5 font-mono text-sm font-bold uppercase tracking-widest ' +
  'transition-[transform,box-shadow,color,border-color] duration-150 ease-out-expo ' +
  'hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0'

const VARIANTS: Record<Variant, string> = {
  primary: 'border-accent bg-accent text-accentFg hover:shadow-[4px_4px_0_rgb(var(--color-primary))] active:shadow-none',
  outline: 'border-border text-primary hover:border-accent hover:text-accent hover:shadow-hard-sm active:shadow-none',
}

export function Button({ children, href, variant = 'primary', download = false }: Props) {
  const isExternal = /^https?:/.test(href) && !download
  return (
    <a
      href={href}
      download={download || undefined}
      {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
      className={`${BASE} ${VARIANTS[variant]}`}
    >
      {children}
    </a>
  )
}

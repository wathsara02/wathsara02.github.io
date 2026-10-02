import { ArrowUpRight } from 'lucide-react'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import { SECTIONS, SOCIAL_LABELS } from '@/lib/sections'
import { safeUrl } from '@/lib/url'
import type { SocialKey } from '@/types/portfolio'

const LINK = 'w-fit font-mono text-sm uppercase tracking-widest text-secondary transition-colors hover:text-accent'

export function Footer() {
  const { meta } = usePortfolioData().portfolioData
  const socials = (Object.entries(meta.socials) as [SocialKey, string][]).filter(([, url]) => safeUrl(url))

  return (
    <footer className="border-t-2 border-border">
      <div className="shell grid gap-12 py-16 md:grid-cols-3">
        <div>
          <p className="mb-3 font-display text-3xl font-bold">
            {meta.name.split(' ')[0]}<span className="text-accent">.</span>
          </p>
          <p className="font-mono text-sm uppercase tracking-widest text-faint">{meta.title}</p>
          {meta.location && <p className="mt-1 font-mono text-sm text-faint">{meta.location}</p>}
        </div>

        <nav aria-label="Footer navigation" className="flex flex-col gap-2">
          <p className="eyebrow mb-3 text-accent">Navigate</p>
          {SECTIONS.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className={LINK}>{label}</a>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          <p className="eyebrow mb-3 text-accent">Elsewhere</p>
          <a href={`mailto:${meta.email}`} className={LINK}>Email</a>
          {socials.map(([key, url]) => (
            <a key={key} href={url} target="_blank" rel="noopener noreferrer" className={`group flex items-center gap-2 ${LINK}`}>
              {SOCIAL_LABELS[key]}
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t-2 border-border">
        <p className="shell py-6 font-mono text-xs uppercase tracking-widest text-faint">
          © {new Date().getFullYear()} {meta.name}
        </p>
      </div>
    </footer>
  )
}

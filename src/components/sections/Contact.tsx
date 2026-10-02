import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import { sectionIndex, SOCIAL_LABELS } from '@/lib/sections'
import { displayUrl, safeUrl } from '@/lib/url'
import type { SocialKey } from '@/types/portfolio'

const COPIED_NOTICE_MS = 2200

// Text inside a .fill-hover element flips to dark as the accent floods in.
const ON_FILL = 'transition-colors duration-200 group-hover:text-accentFg group-focus-visible:text-accentFg'

export function Contact() {
  const { meta, contact } = usePortfolioData().portfolioData
  const [isCopied, setIsCopied] = useState(false)
  const socials = (Object.entries(meta.socials) as [SocialKey, string][]).filter(([, url]) => safeUrl(url))

  useEffect(() => {
    if (!isCopied) return
    const timer = setTimeout(() => setIsCopied(false), COPIED_NOTICE_MS)
    return () => clearTimeout(timer)
  }, [isCopied])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(meta.email)
      setIsCopied(true)
    } catch {
      // Clipboard blocked (permissions, insecure context): open the mail client instead.
      window.location.href = `mailto:${meta.email}`
    }
  }

  return (
    <section id="contact" className="border-t-2 border-border bg-base py-section">
      <div className="shell">
        <Reveal>
          <p className="eyebrow mb-6 text-accent">{sectionIndex('contact')} — Contact</p>
          <h2 className="max-w-5xl font-display text-display font-bold uppercase">{contact.heading}</h2>
          <p className="mt-6 max-w-2xl text-lead text-secondary">{contact.subtext}</p>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal delay={100} className="min-w-0">
            <p className="eyebrow mb-4 text-faint">Email</p>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={`Copy email address ${meta.email}`}
              className="fill-hover group flex w-full items-center gap-5 border-2 border-border p-5 text-left transition-colors hover:border-accent md:p-6"
            >
              <Mail size={22} className={`shrink-0 text-accent ${ON_FILL}`} />
              <span className={`min-w-0 flex-1 truncate font-display text-lg font-bold md:text-xl ${ON_FILL}`}>{meta.email}</span>
              <span className={`shrink-0 text-secondary ${ON_FILL}`}>
                {isCopied ? <Check size={22} /> : <Copy size={22} />}
              </span>
            </button>
            <p role="status" className="mt-3 h-5 font-mono text-xs uppercase tracking-widest text-accent">
              {isCopied && 'Copied to clipboard'}
            </p>
          </Reveal>

          <Reveal delay={200} className="min-w-0">
            <p className="eyebrow mb-4 text-faint">Elsewhere</p>
            <ul className="border-t-2 border-border">
              {socials.map(([key, url]) => (
                <li key={key}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fill-hover group flex items-center justify-between gap-4 border-b-2 border-border px-2 py-5"
                  >
                    <span className={`font-display text-2xl font-bold uppercase ${ON_FILL}`}>{SOCIAL_LABELS[key]}</span>
                    <span className={`flex min-w-0 items-center gap-2 font-mono text-sm text-secondary ${ON_FILL}`}>
                      <span className="hidden truncate sm:inline">{displayUrl(url)}</span>
                      <ArrowUpRight size={18} className="shrink-0" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

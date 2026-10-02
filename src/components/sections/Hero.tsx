import type { CSSProperties } from 'react'
import { ArrowDownRight, Download, Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import { sortNewestFirst } from '@/lib/period'
import { safeUrl } from '@/lib/url'
import type { ExperienceEntry } from '@/types/portfolio'

const STAGGER_MS = 90
const riseDelay = (step: number) => ({ '--rise-delay': `${step * STAGGER_MS}ms` }) as CSSProperties

function currentRole(experience: readonly ExperienceEntry[]): ExperienceEntry | undefined {
  const latest = sortNewestFirst(experience)[0]
  const isOngoing = latest && (latest.current || /present/i.test(latest.period))
  return isOngoing ? latest : undefined
}

export function Hero() {
  const { meta, experience } = usePortfolioData().portfolioData
  const [firstName, ...otherNames] = meta.name.split(' ')
  const resumeUrl = safeUrl(meta.resumeUrl)
  const role = currentRole(experience)

  const facts = [
    role && { label: 'Currently', value: `${role.role}, ${role.company}` },
    meta.roles.length > 0 && { label: 'Focus', value: meta.roles.join(' / ') },
    meta.location && { label: 'Based in', value: meta.location },
  ].filter((fact) => !!fact)

  return (
    <section aria-labelledby="hero-heading" className="relative flex min-h-svh flex-col justify-end overflow-hidden border-b-2 border-border">
      <div aria-hidden="true" className="plot-grid absolute inset-0" />

      <div className="shell relative pb-12 pt-[calc(var(--header-height)+3rem)] md:pb-16">
        <p className="eyebrow rise mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-secondary">
          {meta.availability && (
            <>
              <span aria-hidden="true" className="size-2 bg-accent" />
              <span className="text-accent">{meta.availability}</span>
              <span aria-hidden="true" className="text-faint">/</span>
            </>
          )}
          {meta.title}
        </p>

        <h1 id="hero-heading" className="font-display text-hero font-bold uppercase">
          <span className="rise block" style={riseDelay(1)}>{firstName}</span>{' '}
          <span className="rise block text-accent" style={riseDelay(2)}>{otherNames.join(' ')}</span>
        </h1>

        <div className="rise mt-10 grid gap-10 border-t-2 border-border pt-8 md:mt-14 md:grid-cols-12" style={riseDelay(3)}>
          <div className="md:col-span-7">
            <p className="max-w-xl text-lead text-secondary">{meta.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#projects">View work <ArrowDownRight size={18} /></Button>
              {resumeUrl && (
                <Button href={resumeUrl} variant="outline" download><Download size={18} /> Download CV</Button>
              )}
              <Button href={`mailto:${meta.email}`} variant="outline"><Mail size={18} /> Email me</Button>
            </div>
          </div>

          <dl className="flex flex-col gap-5 md:col-span-5 md:border-l-2 md:border-border md:pl-10">
            {facts.map(({ label, value }) => (
              <div key={label}>
                <dt className="eyebrow mb-1 text-faint">{label}</dt>
                <dd className="font-mono text-sm leading-relaxed text-primary">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

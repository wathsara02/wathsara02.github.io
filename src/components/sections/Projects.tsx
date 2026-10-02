import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import { sectionIndex } from '@/lib/sections'
import { safeUrl } from '@/lib/url'
import type { Project } from '@/types/portfolio'

// Descriptions longer than this are clamped to three lines behind a toggle.
const LONG_DESCRIPTION_CHARS = 220

function ProjectLink({ href, label, projectTitle }: { href: string; label: string; projectTitle: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}: ${projectTitle}`}
      className="group/link flex items-center gap-1.5 border-b-2 border-accent pb-0.5 font-mono text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:text-accent"
    >
      {label}
      <ArrowUpRight size={16} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
    </a>
  )
}

/** The card's top visual: a screenshot when there is one, otherwise the headline numbers. */
function ProjectVisual({ project }: { project: Project }) {
  const image = safeUrl(project.image)
  if (image) {
    return (
      <div className="aspect-video overflow-hidden border-b-2 border-border bg-surface2">
        <img
          src={image}
          alt={`Screenshot of ${project.title}`}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.03]"
        />
      </div>
    )
  }
  if (project.metrics.length === 0) return null
  return (
    <dl className="grid aspect-video content-center gap-5 border-b-2 border-border bg-surface p-6">
      {project.metrics.map(({ value, label }) => (
        <div key={label} className="flex flex-col-reverse">
          <dt className="eyebrow text-faint">{label}</dt>
          <dd className="mb-1 font-display text-4xl font-bold leading-none text-accent">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

function ProjectCard({ project, position }: { project: Project; position: number }) {
  const liveUrl = safeUrl(project.liveUrl)
  const githubUrl = safeUrl(project.githubUrl)
  const [isExpanded, setIsExpanded] = useState(false)
  const isLong = project.description.length > LONG_DESCRIPTION_CHARS
  const clamp = isLong && !isExpanded ? 'line-clamp-3' : ''

  return (
    <article className="group flex h-full flex-col border-2 border-border bg-base transition-[transform,box-shadow,border-color] duration-200 ease-out-expo hover:-translate-x-1 hover:-translate-y-1 hover:border-accent hover:shadow-hard">
      <ProjectVisual project={project} />

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p aria-hidden="true" className="mb-2 font-mono text-sm tracking-widest text-faint transition-colors group-hover:text-accent">
          {String(position).padStart(2, '0')}
        </p>
        <h3 className="font-display text-2xl font-bold uppercase leading-tight tracking-tight">{project.title}</h3>
        <p className={`mt-2 text-[0.9375rem] leading-relaxed text-secondary ${clamp}`}>{project.description}</p>
        {isLong && (
          <button
            type="button"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded((expanded) => !expanded)}
            className="mt-2 w-fit font-mono text-xs uppercase tracking-widest text-accent hover:underline"
          >
            {isExpanded ? 'Show less' : 'Read more'}
            <span className="sr-only"> about {project.title}</span>
          </button>
        )}

        <ul aria-label="Technologies" className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li key={tag} className="border border-border px-2.5 py-1 font-mono text-xs text-secondary">{tag}</li>
          ))}
        </ul>

        {(liveUrl || githubUrl) && (
          <div className="mt-auto flex flex-wrap gap-6 pt-5">
            {liveUrl && <ProjectLink href={liveUrl} label="Live" projectTitle={project.title} />}
            {githubUrl && <ProjectLink href={githubUrl} label="Code" projectTitle={project.title} />}
          </div>
        )}
      </div>
    </article>
  )
}

const CARD_STAGGER_MS = 80

export function Projects() {
  const { projects } = usePortfolioData().portfolioData

  return (
    <section id="projects" className="py-section">
      <div className="shell">
        <SectionHeader index={sectionIndex('projects')} title="Projects" subtitle="Things I've designed, trained and shipped." />
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:mt-12 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * CARD_STAGGER_MS}>
              <ProjectCard project={project} position={i + 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

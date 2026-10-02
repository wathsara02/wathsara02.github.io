import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import { sectionIndex } from '@/lib/sections'
import { safeUrl } from '@/lib/url'
import type { Project } from '@/types/portfolio'

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

/** The right-hand visual: a screenshot when there is one, otherwise the headline numbers. */
function ProjectVisual({ project }: { project: Project }) {
  const image = safeUrl(project.image)
  if (image) {
    return (
      <div className="aspect-video overflow-hidden border-2 border-border bg-surface2">
        <img src={image} alt={`Screenshot of ${project.title}`} loading="lazy" decoding="async" className="size-full object-cover" />
      </div>
    )
  }
  return (
    <dl className="border-2 border-border bg-surface">
      {project.metrics.map(({ value, label }) => (
        <div key={label} className="flex flex-col-reverse border-b-2 border-border p-5 last:border-b-0">
          <dt className="eyebrow text-faint">{label}</dt>
          <dd className="mb-1 font-display text-4xl font-bold leading-none text-accent">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

function ProjectRow({ project, position }: { project: Project; position: number }) {
  const liveUrl = safeUrl(project.liveUrl)
  const githubUrl = safeUrl(project.githubUrl)
  const hasVisual = !!safeUrl(project.image) || project.metrics.length > 0

  return (
    <Reveal>
      <article className="group relative grid gap-6 border-b-2 border-border py-10 md:grid-cols-12 md:gap-8 md:py-14">
        <span aria-hidden="true" className="absolute -left-gutter top-0 h-full w-1 origin-top scale-y-0 bg-accent transition-transform duration-300 ease-out-expo group-hover:scale-y-100" />

        <p aria-hidden="true" className="font-mono text-sm tracking-widest text-faint transition-colors group-hover:text-accent md:col-span-1">
          {String(position).padStart(2, '0')}
        </p>

        <div className={hasVisual ? 'md:col-span-6' : 'md:col-span-11'}>
          <h3 className="font-display text-title font-bold uppercase">{project.title}</h3>
          <p className="mt-4 max-w-3xl leading-relaxed text-secondary">{project.description}</p>

          <ul aria-label="Technologies" className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className="border border-border px-2.5 py-1 font-mono text-xs text-secondary">{tag}</li>
            ))}
          </ul>

          {(liveUrl || githubUrl) && (
            <div className="mt-8 flex flex-wrap gap-6">
              {liveUrl && <ProjectLink href={liveUrl} label="Live" projectTitle={project.title} />}
              {githubUrl && <ProjectLink href={githubUrl} label="Code" projectTitle={project.title} />}
            </div>
          )}
        </div>

        {hasVisual && (
          <div className="md:col-span-5">
            <ProjectVisual project={project} />
          </div>
        )}
      </article>
    </Reveal>
  )
}

export function Projects() {
  const { projects } = usePortfolioData().portfolioData

  return (
    <section id="projects" className="py-section">
      <div className="shell">
        <SectionHeader index={sectionIndex('projects')} title="Projects" subtitle="Things I've designed, trained and shipped." />
        <div>
          {projects.map((project, i) => (
            <ProjectRow key={project.id} project={project} position={i + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

import { Reveal } from './Reveal'

export type TimelineItem = {
  id: number
  period: string
  heading: string
  organisation: string
  location: string
  description: string
  highlights?: string[]
}

const ROW_STAGGER_MS = 80

export function Timeline({ items }: { items: readonly TimelineItem[] }) {
  return (
    <ol>
      {items.map((item, i) => (
        <li key={item.id}>
          <Reveal delay={i * ROW_STAGGER_MS} className="grid gap-3 border-b-2 border-border py-8 md:grid-cols-12 md:gap-8 md:py-10">
            <p className="font-mono text-sm uppercase tracking-widest text-accent md:col-span-3">{item.period}</p>

            <div className="md:col-span-9">
              <h3 className="font-display text-title font-bold uppercase">{item.heading}</h3>
              <p className="mt-2 font-mono text-sm text-secondary">
                {item.organisation}
                {item.location && <span className="text-faint"> · {item.location}</span>}
              </p>
              <p className="mt-5 max-w-3xl whitespace-pre-line leading-relaxed text-secondary">{item.description}</p>

              {item.highlights && item.highlights.length > 0 && (
                <ul className="mt-5 space-y-2">
                  {item.highlights.map((highlight, j) => (
                    <li key={`${j}-${highlight}`} className="flex gap-3 leading-relaxed text-secondary">
                      <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 bg-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}

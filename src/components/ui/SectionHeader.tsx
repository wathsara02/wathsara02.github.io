import { Reveal } from './Reveal'

type Props = {
  /** Two-digit position shown beside the title, e.g. "02". */
  index: string
  title: string
  subtitle?: string
}

export function SectionHeader({ index, title, subtitle }: Props) {
  return (
    <Reveal className="grid gap-4 border-b-2 border-border pb-8 md:grid-cols-12 md:items-end">
      <h2 className="font-display text-display font-bold uppercase md:col-span-8">
        <span className="mr-4 align-top font-mono text-sm font-medium tracking-[0.2em] text-accent">{index}</span>
        {title}
      </h2>
      {subtitle && (
        <p className="font-mono text-sm leading-relaxed text-secondary md:col-span-4 md:text-right">{subtitle}</p>
      )}
    </Reveal>
  )
}

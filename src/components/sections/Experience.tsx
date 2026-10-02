import { SectionHeader } from '@/components/ui/SectionHeader'
import { Timeline } from '@/components/ui/Timeline'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import { sortNewestFirst } from '@/lib/period'
import { sectionIndex } from '@/lib/sections'

export function Experience() {
  const { experience } = usePortfolioData().portfolioData
  const items = sortNewestFirst(experience).map((entry) => ({
    ...entry,
    heading: entry.role,
    organisation: entry.company,
  }))

  return (
    <section id="experience" className="border-y-2 border-border bg-base py-section">
      <div className="shell">
        <SectionHeader index={sectionIndex('experience')} title="Experience" />
        <Timeline items={items} />
      </div>
    </section>
  )
}

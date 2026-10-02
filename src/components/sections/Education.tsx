import { SectionHeader } from '@/components/ui/SectionHeader'
import { Timeline } from '@/components/ui/Timeline'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import { sortNewestFirst } from '@/lib/period'
import { sectionIndex } from '@/lib/sections'

export function Education() {
  const { education } = usePortfolioData().portfolioData
  const items = sortNewestFirst(education).map((entry) => ({
    ...entry,
    heading: entry.degree,
    organisation: entry.institution,
  }))

  return (
    <section id="education" className="py-section">
      <div className="shell">
        <SectionHeader index={sectionIndex('education')} title="Education" />
        <Timeline items={items} />
      </div>
    </section>
  )
}

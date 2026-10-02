import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SKILL_ICONS } from '@/data/skillIcons'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import { sectionIndex } from '@/lib/sections'

const ICON_SIZE = 16
const ROW_STAGGER_MS = 60

export function Skills() {
  const { skills } = usePortfolioData().portfolioData

  return (
    <section id="skills" className="border-y-2 border-border bg-base py-section">
      <div className="shell">
        <SectionHeader index={sectionIndex('skills')} title="Skills" subtitle="The stack, grouped by where it sits in the pipeline." />

        <dl>
          {skills.map(({ category, items }, i) => (
            <Reveal key={category} delay={i * ROW_STAGGER_MS} className="grid gap-4 border-b-2 border-border py-6 md:grid-cols-12 md:gap-8">
              <dt className="flex items-baseline gap-3 font-mono text-sm uppercase tracking-widest text-primary md:col-span-3">
                <span className="text-xs text-accent">{String(items.length).padStart(2, '0')}</span>
                {category}
              </dt>
              <dd className="md:col-span-9">
                <ul className="flex flex-wrap gap-2">
                  {items.map((skill) => {
                    const Icon = SKILL_ICONS[skill]
                    return (
                      <li
                        key={skill}
                        className="flex items-center gap-2 border-2 border-border bg-bg px-3 py-2 font-mono text-sm text-secondary transition-colors duration-150 hover:border-accent hover:text-accent"
                      >
                        {Icon && <Icon size={ICON_SIZE} />}
                        {skill}
                      </li>
                    )
                  })}
                </ul>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}

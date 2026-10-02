import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import { sectionIndex } from '@/lib/sections'
import { safeUrl } from '@/lib/url'

// Intrinsic size of public/about.webp; reserves space so the layout never shifts.
const AVATAR_WIDTH = 768
const AVATAR_HEIGHT = 960

export function About() {
  const { about, meta, stats } = usePortfolioData().portfolioData
  const avatar = safeUrl(meta.avatar)
  const initials = meta.name.split(' ').map((part) => part[0]).join('')
  const paragraphs = about.bio.split('\n\n')

  return (
    <section id="about" className="py-section">
      <div className="shell">
        <SectionHeader index={sectionIndex('about')} title="About" />

        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <figure className="group relative mr-3">
              <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 border-2 border-accent" />
              <div className="relative aspect-[4/5] overflow-hidden border-2 border-border bg-surface2">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={`Portrait of ${meta.name}`}
                    width={AVATAR_WIDTH}
                    height={AVATAR_HEIGHT}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                  />
                ) : (
                  <span aria-hidden="true" className="flex size-full items-center justify-center font-display text-8xl font-bold text-faint">
                    {initials}
                  </span>
                )}
              </div>
            </figure>
          </Reveal>

          <div className="md:col-span-7">
            <Reveal className="space-y-6" delay={100}>
              {paragraphs.map((paragraph, i) => (
                <p key={`${i}-${paragraph}`} className="text-lead text-secondary first:text-primary">{paragraph}</p>
              ))}
            </Reveal>

            {stats.length > 0 && (
              <Reveal delay={200}>
                <dl className="mt-12 grid border-2 border-border sm:grid-cols-3">
                  {stats.map(({ value, label }) => (
                    <div key={label} className="flex flex-col-reverse justify-end border-b-2 border-border p-6 last:border-b-0 sm:border-b-0 sm:border-r-2 sm:last:border-r-0">
                      <dt className="eyebrow text-faint">{label}</dt>
                      <dd className="mb-2 font-display text-5xl font-bold leading-none text-accent">{value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { TimelineItem } from "@/components/ui/TimelineItem"
import { usePortfolioData } from "@/hooks/usePortfolioData"

function parseYear(item) {
  if (item.startYear) return parseInt(item.startYear) || 0
  const match = item.period?.match(/\d{4}/)
  return match ? parseInt(match[0]) : 0
}

export function Experience() {
  const { portfolioData } = usePortfolioData()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8","end 0.3"] })
  const scaleY = useTransform(scrollYProgress, [0,1], [0,1])

  const sorted = [...(portfolioData.experience ?? [])].sort((a, b) => parseYear(b) - parseYear(a))

  return (
    <section id="experience" className="py-32 md:py-40 bg-base">
      <div className="max-w-7xl mx-auto px-8">
        <SectionHeading title="Experience" subtitle="Companies I've built things at" />
        <div ref={ref} className="relative mt-14 pl-5">
          <motion.div style={{ scaleY, transformOrigin:"top" }}
            className="absolute left-1.5 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent via-accent/40 to-transparent origin-top" />
          <div className="space-y-7">
            {sorted.map((item, i) => (
              <TimelineItem key={item.id} item={item} variant="experience" index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { TimelineItem } from "@/components/ui/TimelineItem"
import { usePortfolioData } from "@/hooks/usePortfolioData"

export function Education() {
  const { portfolioData } = usePortfolioData()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8","end 0.3"] })
  const scaleY = useTransform(scrollYProgress, [0,1], [0,1])

  return (
    <section id="education" className="py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-8">
        <SectionHeading title="Education" />
        <div ref={ref} className="relative mt-14 pl-5">
          <motion.div style={{ scaleY, transformOrigin:"top" }}
            className="absolute left-1.5 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent/50 via-accent/20 to-transparent origin-top" />
          <div className="space-y-7">
            {portfolioData.education.map((item, i) => (
              <TimelineItem key={item.id} item={item} variant="education" index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

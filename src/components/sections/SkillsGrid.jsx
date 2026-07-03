import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import { SKILL_ICONS } from "@/data/skillIcons"

export function SkillsGrid() {
  const { portfolioData } = usePortfolioData()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const allSkills = (portfolioData.skills ?? []).flatMap((cat) => cat.items)

  return (
    <section ref={ref} className="border-t-2 border-border">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="flex flex-wrap gap-4 justify-center">
          {allSkills.map((skill, i) => {
            const entry = SKILL_ICONS[skill]
            const Icon  = entry?.icon
            const color = entry?.color ?? "#DFE104"

            return (
              <motion.div
                key={skill}
                className="group flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: i * 0.025, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="w-14 h-14 border-2 border-border flex items-center justify-center"
                  whileHover={{
                    borderColor: color,
                    backgroundColor: `${color}12`,
                    boxShadow: `0 0 18px ${color}40`,
                    y: -4,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {Icon && <Icon size={26} color={color} />}
                </motion.div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-faint opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-center leading-tight max-w-[60px]">
                  {skill}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

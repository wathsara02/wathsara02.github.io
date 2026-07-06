import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import { SKILL_ICONS } from "@/data/skillIcons"

const CARD_SIZE = 64
const ICON_SIZE = 28

export function SkillsGrid() {
  const { portfolioData } = usePortfolioData()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const allSkills = (portfolioData.skills ?? []).flatMap((cat) => cat.items)

  return (
    <section ref={ref} className="border-t-2 border-border">
      <div className="max-w-7xl mx-auto px-8 py-16">

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-faint mb-3">Arsenal</p>
          <h2 className="font-display text-5xl md:text-6xl font-black uppercase leading-none tracking-tight">
            Tech <span style={{ color: "#DFE104" }}>Stack.</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap gap-4 justify-center">
          {allSkills.map((skill, i) => {
            const entry = SKILL_ICONS[skill]
            const Icon = entry?.icon
            const color = entry?.color ?? "#DFE104"

            return (
              <motion.div
                key={skill}
                className="flex flex-col items-center gap-1.5"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.025, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="flex items-center justify-center border-2 border-border bg-bg"
                  style={{ width: CARD_SIZE, height: CARD_SIZE }}
                  whileHover={{
                    scale: 1.2,
                    borderColor: color,
                    backgroundColor: "#111",
                    boxShadow: `0 0 20px ${color}55`,
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 18 }}
                  aria-label={skill}
                >
                  {Icon && <Icon size={ICON_SIZE} color={color} />}
                </motion.div>
                <span
                  className="font-mono text-center leading-tight select-none"
                  style={{ fontSize: 9, letterSpacing: "0.06em", color: "#A1A1AA", maxWidth: CARD_SIZE }}
                >
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

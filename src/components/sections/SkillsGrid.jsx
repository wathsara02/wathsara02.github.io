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
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-faint mb-3">Arsenal</p>
          <h2 className="font-display text-5xl md:text-6xl font-black uppercase leading-none tracking-tight">
            Tech{" "}
            <span style={{ color: "#DFE104" }}>Stack.</span>
          </h2>
        </motion.div>
        <div className="flex flex-wrap gap-5 justify-center">
          {allSkills.map((skill, i) => {
            const entry = SKILL_ICONS[skill]
            const Icon  = entry?.icon
            const color = entry?.color ?? "#DFE104"

            return (
              <motion.div
                key={skill}
                className="group flex flex-col items-center gap-2.5"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="flex items-center justify-center w-24 h-24 cursor-default border-2 border-border bg-bg"
                  whileHover={{
                    borderColor: color,
                    backgroundColor: "#111",
                    boxShadow: `0 0 20px ${color}55`,
                    y: -6,
                    scale: 1.04,
                  }}
                  transition={{ type: "spring", stiffness: 360, damping: 22 }}
                  aria-label={skill}
                >
                  {Icon && <Icon size={40} color={color} strokeWidth={1.5} />}
                </motion.div>

                <span className="font-mono text-[10px] uppercase tracking-widest text-faint opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center leading-tight max-w-[88px]">
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

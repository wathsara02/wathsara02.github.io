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
                  className="relative w-24 h-24 cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4)",
                  }}
                  whileHover={{
                    background: `${color}0d`,
                    border: `1px solid ${color}40`,
                    boxShadow: `inset 0 1px 0 ${color}20, 0 0 28px ${color}30, 0 8px 32px rgba(0,0,0,0.5)`,
                    y: -6,
                    scale: 1.04,
                  }}
                  transition={{ type: "spring", stiffness: 360, damping: 22 }}
                  aria-label={skill}
                >
                  {/* top-edge highlight */}
                  <div
                    className="absolute inset-x-0 top-0 h-px pointer-events-none"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}
                  />
                  {/* icon isolated from backdrop-filter blur */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ isolation: "isolate", transform: "translateZ(0)" }}
                  >
                    {Icon && <Icon size={40} color={color} strokeWidth={1.5} />}
                  </div>
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

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
                  className="relative w-24 h-24 cursor-default overflow-hidden"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                  whileHover={{
                    borderColor: `${color}40`,
                    y: -6,
                    scale: 1.04,
                  }}
                  transition={{ type: "spring", stiffness: 360, damping: 22 }}
                  aria-label={skill}
                >
                  {/* blur + tint on its own layer — never a parent of the icon */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      background: "rgba(255,255,255,0.03)",
                    }}
                  />
                  {/* hover glow — also a sibling, not a parent */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    style={{ background: `${color}0d`, boxShadow: `0 0 28px ${color}30` }}
                  />
                  {/* top-edge shimmer */}
                  <div
                    className="absolute inset-x-0 top-0 h-px pointer-events-none"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}
                  />
                  {/* icon is a sibling of all blur layers — completely unaffected */}
                  <div className="absolute inset-0 flex items-center justify-center">
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

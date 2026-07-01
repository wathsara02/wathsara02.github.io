import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import { SKILL_ICONS } from "@/data/skillIcons"

function IconPill({ label, index }) {
  const [hovered, setHovered] = useState(false)
  const entry = SKILL_ICONS[label]
  const Icon  = entry?.icon ?? null
  const color = entry?.color ?? "#DFE104"

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex items-center gap-3 border-2 border-border px-4 py-2.5 overflow-hidden cursor-default"
    >
      <motion.div
        className="absolute inset-0 bg-accent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0 }}
      />
      {Icon && (
        <Icon size={16} color={hovered ? "#09090B" : color}
          className="relative z-10 shrink-0 transition-colors duration-150" />
      )}
      <span
        className="relative z-10 font-mono text-xs uppercase tracking-widest whitespace-nowrap transition-colors duration-150"
        style={{ color: hovered ? "#09090B" : "#FAFAFA" }}
      >
        {label}
      </span>
    </motion.div>
  )
}

export function SkillsIcons() {
  const { portfolioData } = usePortfolioData()
  const cats = portfolioData.skills ?? []
  const [openIndex, setOpenIndex] = useState(0)

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const snapped = Math.round(v * (cats.length - 1))
    setOpenIndex(Math.min(Math.max(snapped, 0), cats.length - 1))
  })

  return (
    <section ref={containerRef} id="skills-icons" style={{ height: `${cats.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

        {/* heading */}
        <div className="shrink-0 pt-28 pb-6 max-w-7xl mx-auto w-full px-8 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-4">✦ Tech Stack</p>
            <h2 className="font-display font-extrabold text-5xl md:text-7xl text-primary uppercase leading-none">
              Technologies I<br />Work With Everyday
            </h2>
          </div>
          <p className="font-mono text-xs text-faint uppercase tracking-widest hidden md:block pb-2">
            Scroll to explore
          </p>
        </div>

        {/* accordion */}
        <div className="flex-1 overflow-hidden max-w-7xl mx-auto w-full px-8 pb-8">
          <div className="border-t-2 border-border h-full overflow-hidden flex flex-col">
            {cats.map((cat, i) => {
              const isOpen = openIndex === i
              return (
                <div key={cat.category} className="border-b-2 border-border flex-shrink-0">
                  {/* header */}
                  <div className="relative flex items-center gap-8 px-8 py-5 overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-accent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{ originX: 0 }}
                    />
                    <span
                      className="relative z-10 font-mono text-sm tracking-widest w-8 shrink-0 transition-colors duration-200"
                      style={{ color: isOpen ? "#09090B60" : "#52525B" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="relative z-10 font-display font-extrabold text-2xl md:text-4xl uppercase tracking-tight flex-1 leading-none transition-colors duration-200"
                      style={{ color: isOpen ? "#09090B" : "#FAFAFA" }}
                    >
                      {cat.category}
                    </span>
                    <span
                      className="relative z-10 font-mono text-sm tracking-widest hidden md:block transition-colors duration-200"
                      style={{ color: isOpen ? "#09090B60" : "#52525B" }}
                    >
                      {cat.items.length} tools
                    </span>
                  </div>

                  {/* expandable pills */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 py-4 flex flex-wrap gap-3 border-t-2 border-border bg-surface2">
                          {cat.items.map((label, pi) => (
                            <IconPill key={label} label={label} index={pi} />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}


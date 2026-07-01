import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
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

  /* one ref per row header */
  const headerRefs = useRef([])

  const onScroll = useCallback(() => {
    const trigger = window.innerHeight * 0.35 // 35% from top of viewport

    let best = 0
    let bestDist = Infinity

    headerRefs.current.forEach((el, i) => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const mid = rect.top + rect.height / 2
      const dist = Math.abs(mid - trigger)
      if (dist < bestDist) {
        bestDist = dist
        best = i
      }
    })

    setOpenIndex(best)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll() // run once on mount
    return () => window.removeEventListener("scroll", onScroll)
  }, [onScroll])

  return (
    <section id="skills-icons" className="border-t-2 border-border">
      <div className="max-w-7xl mx-auto px-8 py-10 flex items-center justify-between">
        <p className="font-mono text-xs text-accent uppercase tracking-[0.2em]">✦ Tech Stack</p>
        <p className="font-mono text-xs text-faint uppercase tracking-widest hidden md:block">
          Scroll to explore
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-8 pb-20">
        <div className="border-t-2 border-border">
          {cats.map((cat, i) => {
            const isOpen = openIndex === i

            return (
              <div key={cat.category} className="border-b-2 border-border">
                {/* header — ref stored for scroll tracking */}
                <div
                  ref={el => { headerRefs.current[i] = el }}
                  className="relative flex items-center gap-8 px-8 py-6 overflow-hidden"
                >
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
                    className="relative z-10 font-display font-extrabold text-3xl md:text-5xl uppercase tracking-tight flex-1 leading-none transition-colors duration-200"
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
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 py-6 flex flex-wrap gap-3 border-t-2 border-border bg-surface2">
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
    </section>
  )
}

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { usePortfolioData } from "@/hooks/usePortfolioData"

const BENTO_LAYOUT = [
  { span: "md:col-span-2 md:row-span-2", accent: true },  // Languages — big
  { span: "md:col-span-1 md:row-span-1" },                // ML/DL — medium
  { span: "md:col-span-1 md:row-span-1" },                // MLOps — medium
  { span: "md:col-span-1 md:row-span-2" },                // Cloud — tall
  { span: "md:col-span-2 md:row-span-1" },                // Data Eng — wide
  { span: "md:col-span-1 md:row-span-1" },                // Viz — medium
]

function BentoCell({ category, items, span, accent, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      className={`${span} relative border-2 border-border p-6 flex flex-col gap-4 overflow-hidden group cursor-default
        ${accent ? "bg-accent" : "bg-bg hover:bg-surface"} transition-colors duration-300`}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* category label */}
      <div className="flex items-center justify-between">
        <span className={`font-mono text-xs uppercase tracking-[0.2em] ${accent ? "text-bg/60" : "text-accent"}`}>
          {category}
        </span>
        <span className={`font-mono text-xs ${accent ? "text-bg/40" : "text-faint/40"}`}>
          {String(items.length).padStart(2, "0")}
        </span>
      </div>

      {/* divider */}
      <div className={`h-px ${accent ? "bg-bg/20" : "bg-border"}`} />

      {/* skill tags */}
      <div className="flex flex-wrap gap-2 flex-1 content-start">
        {items.map((skill, i) => (
          <motion.span
            key={skill}
            className={`font-mono text-xs px-2.5 py-1 border uppercase tracking-wide
              ${accent
                ? "border-bg/30 text-bg group-hover:border-bg/60"
                : "border-border text-secondary group-hover:border-accent group-hover:text-primary"
              } transition-colors duration-200`}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.08 + i * 0.04, duration: 0.3 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>

      {/* corner decoration */}
      <div className={`absolute bottom-4 right-4 font-display font-extrabold text-7xl leading-none select-none pointer-events-none
        ${accent ? "text-bg/5" : "text-accent/5"}`}>
        {String(index + 1).padStart(2, "0")}
      </div>
    </motion.div>
  )
}

export function SkillsMarquee() {
  const { portfolioData } = usePortfolioData()
  const skills = portfolioData.skills ?? []
  const headingRef = useRef(null)
  const inView = useInView(headingRef, { once: true, margin: "-80px" })

  return (
    <section id="skills-bento" className="py-24 border-t-2 border-border">
      <div className="max-w-7xl mx-auto px-8">

        {/* heading */}
        <div ref={headingRef} className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent block mb-3">Stack Overview</span>
            <h2 className="font-display font-extrabold text-5xl md:text-7xl leading-none uppercase text-primary">
              Full<br />Arsenal
            </h2>
          </motion.div>
          <motion.p
            className="font-body text-secondary text-base max-w-xs leading-relaxed"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Every tool, library, and platform I reach for when building intelligent systems.
          </motion.p>
        </div>

        {/* bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-[minmax(160px,auto)]">
          {skills.slice(0, BENTO_LAYOUT.length).map((cat, i) => (
            <BentoCell
              key={cat.category}
              category={cat.category}
              items={cat.items}
              span={BENTO_LAYOUT[i]?.span ?? ""}
              accent={BENTO_LAYOUT[i]?.accent ?? false}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

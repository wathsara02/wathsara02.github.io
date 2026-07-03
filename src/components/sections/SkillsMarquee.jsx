import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import { SKILL_ICONS } from "@/data/skillIcons"

const RING_CONFIG = [
  { radius: 140, duration: 22, cw: true,  color: "#DFE104" },
  { radius: 250, duration: 38, cw: false, color: "#A78BFA" },
  { radius: 360, duration: 55, cw: true,  color: "#34D399" },
  { radius: 470, duration: 74, cw: false, color: "#F97316" },
]

const ICON_SIZE = 64

function Ring({ skills, radius, duration, cw, color }) {
  const rotateTo = cw ? 360 : -360
  const size = radius * 2

  return (
    <motion.div
      className="absolute rounded-full border border-dashed border-border pointer-events-none"
      style={{
        width: size, height: size,
        top: "50%", left: "50%",
        marginTop: -radius, marginLeft: -radius,
      }}
      animate={{ rotate: rotateTo }}
      transition={{ duration, ease: "linear", repeat: Infinity }}
    >
      {skills.map((skill, i) => {
        const entry     = SKILL_ICONS[skill]
        const Icon      = entry?.icon
        const iconColor = entry?.color ?? color
        const angleDeg  = (i / skills.length) * 360
        const rad       = (angleDeg * Math.PI) / 180
        const x         = Math.round(radius + radius * Math.sin(rad) - ICON_SIZE / 2)
        const y         = Math.round(radius - radius * Math.cos(rad) - ICON_SIZE / 2)

        return (
          <div
            key={skill}
            className="absolute pointer-events-auto"
            style={{ left: x, top: y, width: ICON_SIZE, height: ICON_SIZE + 20 }}
          >
            {/* counter-rotate so icon stays upright */}
            <motion.div
              animate={{ rotate: -rotateTo }}
              transition={{ duration, ease: "linear", repeat: Infinity }}
              className="flex flex-col items-center gap-1"
            >
              <motion.div
                className="flex items-center justify-center border-2 border-border bg-bg"
                style={{ width: ICON_SIZE, height: ICON_SIZE }}
                whileHover={{
                  scale: 1.35,
                  borderColor: iconColor,
                  backgroundColor: "#111111",
                  boxShadow: `0 0 24px ${iconColor}55`,
                }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
              >
                {Icon && <Icon size={30} color={iconColor} />}
              </motion.div>
              <span
                className="font-mono text-center leading-tight whitespace-nowrap select-none"
                style={{ fontSize: 8, letterSpacing: "0.1em", color: "#71717A" }}
              >
                {skill}
              </span>
            </motion.div>
          </div>
        )
      })}
    </motion.div>
  )
}

export function SkillsMarquee() {
  const { portfolioData } = usePortfolioData()
  const skills = portfolioData.skills ?? []
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const rings = RING_CONFIG.map((cfg, i) => ({ ...cfg, skills: skills[i]?.items ?? [] }))

  return (
    <section id="skills-orbit" className="py-24 border-t-2 border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div ref={ref} className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent block mb-3">In Orbit</span>
            <h2 className="font-display font-extrabold text-5xl md:text-7xl leading-none uppercase text-primary">
              Stack<br />System
            </h2>
          </motion.div>
          <motion.div
            className="flex flex-col gap-2.5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {rings.map((r, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-px shrink-0" style={{ backgroundColor: r.color }} />
                <span className="font-mono text-xs uppercase tracking-widest text-faint">
                  {skills[i]?.category ?? ""}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto"
          style={{ width: "100%", maxWidth: 1060, aspectRatio: "1 / 1" }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* center glow */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 180, height: 180,
              top: "50%", left: "50%",
              marginTop: -90, marginLeft: -90,
              background: "radial-gradient(circle, rgba(223,225,4,0.08) 0%, transparent 70%)",
            }}
          />
          {rings.map((ring, i) => <Ring key={i} {...ring} />)}
        </motion.div>
      </div>
    </section>
  )
}

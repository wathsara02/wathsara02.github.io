import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import { SKILL_ICONS } from "@/data/skillIcons"

const RING_CONFIG = [
  { radius: 150, duration: 25, cw: true,  color: "#DFE104" },
  { radius: 270, duration: 42, cw: false, color: "#A78BFA" },
  { radius: 390, duration: 60, cw: true,  color: "#34D399" },
  { radius: 510, duration: 80, cw: false, color: "#F97316" },
]

const ICON_SIZE  = 68
const ICON_HALF  = ICON_SIZE / 2

function Ring({ skills, radius, duration, cw, color }) {
  const ringKey = cw ? "cw"  : "ccw"
  const iconKey = cw ? "ccw" : "cw"
  const size    = radius * 2

  return (
    <div
      className="absolute rounded-full border border-dashed border-border pointer-events-none"
      style={{
        width: size, height: size,
        top: "50%", left: "50%",
        marginTop: -radius, marginLeft: -radius,
        animation: `orbit-${ringKey} ${duration}s linear infinite`,
      }}
    >
      {skills.map((skill, i) => {
        const entry     = SKILL_ICONS[skill]
        const Icon      = entry?.icon
        const iconColor = entry?.color ?? color
        const angleDeg  = (i / skills.length) * 360
        const rad       = (angleDeg * Math.PI) / 180
        const x         = Math.round(radius + radius * Math.sin(rad) - ICON_HALF)
        const y         = Math.round(radius - radius * Math.cos(rad) - ICON_HALF)

        return (
          <div
            key={skill}
            className="absolute pointer-events-auto"
            style={{ left: x, top: y }}
          >
            <div style={{ animation: `orbit-${iconKey} ${duration}s linear infinite` }}>
              <motion.div
                className="flex flex-col items-center gap-1.5"
                whileHover="hovered"
                initial="idle"
              >
                <motion.div
                  className="flex items-center justify-center border-2 border-border bg-bg cursor-default"
                  style={{ width: ICON_SIZE, height: ICON_SIZE }}
                  variants={{
                    idle:    { scale: 1,   borderColor: "#27272A", boxShadow: "0 0 0px transparent" },
                    hovered: { scale: 1.3, borderColor: iconColor, boxShadow: `0 0 22px ${iconColor}55` },
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 18 }}
                >
                  {Icon && <Icon size={32} color={iconColor} />}
                </motion.div>

                {/* name tag */}
                <motion.span
                  className="font-mono text-center leading-tight pointer-events-none whitespace-nowrap"
                  style={{ fontSize: 9, letterSpacing: "0.12em" }}
                  variants={{
                    idle:    { opacity: 0.35, color: "#71717A", y: 0  },
                    hovered: { opacity: 1,    color: iconColor,  y: -2 },
                  }}
                  transition={{ duration: 0.15 }}
                >
                  {skill}
                </motion.span>
              </motion.div>
            </div>
          </div>
        )
      })}
    </div>
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
      <style>{`
        @keyframes orbit-cw  { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg);  } }
        @keyframes orbit-ccw { 0% { transform: rotate(0deg); } 100% { transform: rotate(-360deg); } }
        @media (prefers-reduced-motion: reduce) {
          [style*="orbit-"] { animation: none !important; }
        }
      `}</style>

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
          style={{ width: "100%", maxWidth: 1140, aspectRatio: "1 / 1" }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 220, height: 220,
              top: "50%", left: "50%",
              marginTop: -110, marginLeft: -110,
              background: "radial-gradient(circle, rgba(223,225,4,0.07) 0%, transparent 70%)",
            }}
          />
          {rings.map((ring, i) => <Ring key={i} {...ring} />)}
        </motion.div>
      </div>
    </section>
  )
}

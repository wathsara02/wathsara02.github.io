import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import { SKILL_ICONS } from "@/data/skillIcons"

const RING_CONFIG = [
  { radius: 130, duration: 22, cw: true,  color: "#DFE104" },
  { radius: 230, duration: 38, cw: false, color: "#A78BFA" },
  { radius: 330, duration: 55, cw: true,  color: "#34D399" },
  { radius: 430, duration: 74, cw: false, color: "#F97316" },
]

function Ring({ skills, radius, duration, cw, color }) {
  const ringKey  = cw ? "cw"  : "ccw"
  const iconKey  = cw ? "ccw" : "cw"
  const size     = radius * 2

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
        const x         = Math.round(radius + radius * Math.sin(rad) - 28)
        const y         = Math.round(radius - radius * Math.cos(rad) - 28)

        return (
          <div
            key={skill}
            className="absolute pointer-events-auto"
            style={{ left: x, top: y, width: 56, height: 56 }}
          >
            {/* counter-rotate so icon stays upright */}
            <div style={{ animation: `orbit-${iconKey} ${duration}s linear infinite`, width: 56, height: 56 }}>
              <motion.div
                className="w-14 h-14 flex items-center justify-center border-2 border-border bg-bg cursor-default"
                whileHover={{
                  scale: 1.4,
                  borderColor: iconColor,
                  backgroundColor: "#131313",
                  boxShadow: `0 0 20px ${iconColor}66`,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 18 }}
              >
                {Icon && <Icon size={26} color={iconColor} />}
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
          .orbit-ring, .orbit-icon { animation: none !important; }
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
          style={{ width: "100%", maxWidth: 980, aspectRatio: "1 / 1" }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 200, height: 200,
              top: "50%", left: "50%",
              marginTop: -100, marginLeft: -100,
              background: "radial-gradient(circle, rgba(223,225,4,0.07) 0%, transparent 70%)",
            }}
          />
          {rings.map((ring, i) => <Ring key={i} {...ring} />)}
        </motion.div>
      </div>
    </section>
  )
}

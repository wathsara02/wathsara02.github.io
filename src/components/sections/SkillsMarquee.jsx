import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import { SKILL_ICONS } from "@/data/skillIcons"

const RING_CONFIG = [
  { radius: 100, duration: 20, cw: true,  color: "#DFE104" },
  { radius: 185, duration: 36, cw: false, color: "#A78BFA" },
  { radius: 268, duration: 54, cw: true,  color: "#34D399" },
]

const ICON_SIZE = 52

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
            style={{ left: x, top: y }}
          >
            <motion.div
              animate={{ rotate: -rotateTo }}
              transition={{ duration, ease: "linear", repeat: Infinity }}
              className="flex flex-col items-center gap-1"
            >
              <motion.div
                className="flex items-center justify-center border-2 border-border bg-bg"
                style={{ width: ICON_SIZE, height: ICON_SIZE }}
                whileHover={{
                  scale: 1.3,
                  borderColor: iconColor,
                  backgroundColor: "#111",
                  boxShadow: `0 0 20px ${iconColor}55`,
                }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
              >
                {Icon && <Icon size={24} color={iconColor} />}
              </motion.div>
              <span
                className="font-mono text-center leading-tight whitespace-nowrap select-none"
                style={{ fontSize: 7, letterSpacing: "0.08em", color: "#71717A" }}
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
  const inView = useInView(ref, { once: true, margin: "-60px" })

  // 3 rings: first 2 categories as-is, 3rd ring merges remaining
  const merged3 = [
    ...(skills[2]?.items ?? []),
    ...(skills[3]?.items ?? []),
  ].slice(0, 10)

  const rings = [
    { ...RING_CONFIG[0], skills: skills[0]?.items ?? [] },
    { ...RING_CONFIG[1], skills: skills[1]?.items ?? [] },
    { ...RING_CONFIG[2], skills: merged3 },
  ]

  const legendItems = [
    { color: RING_CONFIG[0].color, label: skills[0]?.category ?? "" },
    { color: RING_CONFIG[1].color, label: skills[1]?.category ?? "" },
    { color: RING_CONFIG[2].color, label: `${skills[2]?.category ?? ""} + ${skills[3]?.category ?? ""}` },
  ]

  return (
    <section id="skills-orbit" className="border-t-2 border-border">
      <div className="max-w-7xl mx-auto px-8 py-16 flex flex-col lg:flex-row items-center gap-12">

        {/* left: heading + legend */}
        <div ref={ref} className="shrink-0 lg:w-56">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent block mb-3">In Orbit</span>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-none uppercase text-primary mb-8">
              Stack<br />System
            </h2>
          </motion.div>
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {legendItems.map((r, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-5 h-px shrink-0" style={{ backgroundColor: r.color }} />
                <span className="font-mono text-[10px] uppercase tracking-widest text-faint leading-tight">
                  {r.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* right: orbit — capped to 80vh so it fits on screen */}
        <motion.div
          className="relative flex-1 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="relative"
            style={{ width: "min(80vh, 620px)", height: "min(80vh, 620px)" }}
          >
            {/* center glow */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 140, height: 140,
                top: "50%", left: "50%",
                marginTop: -70, marginLeft: -70,
                background: "radial-gradient(circle, rgba(223,225,4,0.09) 0%, transparent 70%)",
              }}
            />
            {rings.map((ring, i) => <Ring key={i} {...ring} />)}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

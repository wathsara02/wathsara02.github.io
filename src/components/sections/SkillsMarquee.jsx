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

function IconNode({ skill, iconColor, duration, cw, allStopped }) {
  const entry = SKILL_ICONS[skill]
  const Icon  = entry?.icon
  const iconAnim = cw ? "ispin-ccw" : "ispin-cw"

  return (
    <div
      style={{
        animationName: iconAnim,
        animationDuration: `${duration}s`,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
        animationPlayState: allStopped ? "paused" : "running",
      }}
    >
      <motion.div
        className="w-14 h-14 flex items-center justify-center border-2 border-border bg-bg cursor-default"
        whileHover={{
          scale: 1.35,
          borderColor: iconColor,
          backgroundColor: "#131313",
          boxShadow: `0 0 18px ${iconColor}55`,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {Icon && <Icon size={28} color={iconColor} />}
      </motion.div>
    </div>
  )
}

function Ring({ skills, radius, duration, cw, color }) {
  const ringAnim = cw ? "rspin-cw" : "rspin-ccw"
  const size     = radius * 2

  return (
    <div
      className="absolute rounded-full border border-dashed border-border pointer-events-none"
      style={{
        width: size, height: size,
        top: "50%", left: "50%",
        marginTop: -radius, marginLeft: -radius,
        animationName: ringAnim,
        animationDuration: `${duration}s`,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
      }}
    >
      {skills.map((skill, i) => {
        const entry     = SKILL_ICONS[skill]
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
            <IconNode
              skill={skill}
              iconColor={iconColor}
              duration={duration}
              cw={cw}
              allStopped={false}
            />
          </div>
        )
      })}
    </div>
  )
}

export function SkillsMarquee() {
  const { portfolioData } = usePortfolioData()
  const skills = portfolioData.skills ?? []
  const ref  = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const rings = RING_CONFIG.map((cfg, i) => ({ ...cfg, skills: skills[i]?.items ?? [] }))

  return (
    <section id="skills-orbit" className="py-24 border-t-2 border-border overflow-hidden">
      <style>{`
        @keyframes rspin-cw  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes rspin-ccw { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
        @keyframes ispin-cw  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes ispin-ccw { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
        @media (prefers-reduced-motion: reduce) {
          [style*="rspin"], [style*="ispin"] { animation: none !important; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-8">
        {/* heading */}
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

        {/* orbit stage */}
        <motion.div
          className="relative mx-auto"
          style={{ width: "100%", maxWidth: 980, aspectRatio: "1 / 1" }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* subtle glow at center */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 200, height: 200,
              top: "50%", left: "50%",
              marginTop: -100, marginLeft: -100,
              background: "radial-gradient(circle, rgba(223,225,4,0.06) 0%, transparent 70%)",
            }}
          />

          {rings.map((ring, i) => (
            <Ring key={i} {...ring} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

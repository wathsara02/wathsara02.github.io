import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import { SKILL_ICONS } from "@/data/skillIcons"

const RING_CONFIG = [
  { radius: 110, duration: 20, cw: true,  color: "#DFE104" },
  { radius: 192, duration: 34, cw: false, color: "#A78BFA" },
  { radius: 274, duration: 50, cw: true,  color: "#34D399" },
  { radius: 356, duration: 68, cw: false, color: "#F97316" },
]

function Ring({ skills, radius, duration, cw, color, onHover, onLeave, allPaused }) {
  const ringAnim  = cw ? "rspin-cw"  : "rspin-ccw"
  const iconAnim  = cw ? "ispin-ccw" : "ispin-cw"
  const paused    = allPaused ? "paused" : "running"
  const size      = radius * 2

  return (
    <div
      className="absolute rounded-full border border-dashed border-border"
      style={{
        width: size, height: size,
        top: "50%", left: "50%",
        animation: `${ringAnim} ${duration}s linear infinite`,
        animationPlayState: paused,
      }}
    >
      {skills.map((skill, i) => {
        const entry = SKILL_ICONS[skill]
        const Icon  = entry?.icon
        const iconColor = entry?.color ?? color
        const angleDeg  = (i / skills.length) * 360

        return (
          <div
            key={skill}
            className="absolute"
            style={{
              top: "50%", left: "50%",
              width: 0, height: 0,
              transform: `rotate(${angleDeg}deg) translateX(${radius}px)`,
            }}
          >
            <div
              style={{
                animation: `${iconAnim} ${duration}s linear infinite`,
                animationPlayState: paused,
              }}
            >
              <button
                className="flex items-center justify-center border-2 border-border bg-bg transition-all duration-150 hover:border-accent hover:bg-surface"
                style={{ width: 40, height: 40, transform: "translate(-50%, -50%)" }}
                onMouseEnter={() => onHover(skill, iconColor)}
                onMouseLeave={onLeave}
                aria-label={skill}
              >
                {Icon && <Icon size={20} color={iconColor} />}
              </button>
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
  const [hovered, setHovered] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const totalSkills = skills.reduce((s, c) => s + c.items.length, 0)

  const rings = RING_CONFIG.map((cfg, i) => ({
    ...cfg,
    skills: skills[i]?.items ?? [],
  }))

  return (
    <section id="skills-orbit" className="py-24 border-t-2 border-border overflow-hidden">
      <style>{`
        @keyframes rspin-cw  {
          from { transform: translate(-50%,-50%) rotate(0deg);    }
          to   { transform: translate(-50%,-50%) rotate(360deg);  }
        }
        @keyframes rspin-ccw {
          from { transform: translate(-50%,-50%) rotate(0deg);    }
          to   { transform: translate(-50%,-50%) rotate(-360deg); }
        }
        @keyframes ispin-cw  { from { transform: rotate(0deg);    } to { transform: rotate(360deg);  } }
        @keyframes ispin-ccw { from { transform: rotate(0deg);    } to { transform: rotate(-360deg); } }
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
          style={{ width: "100%", maxWidth: 840, aspectRatio: "1 / 1" }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {rings.map((ring, i) => (
            <Ring
              key={i}
              {...ring}
              allPaused={hovered !== null}
              onHover={(skill, col) => setHovered({ skill, color: col })}
              onLeave={() => setHovered(null)}
            />
          ))}

          {/* center */}
          <div
            className="absolute border-2 border-border bg-bg flex flex-col items-center justify-center"
            style={{
              width: 120, height: 120,
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              boxShadow: "0 0 60px rgba(223,225,4,0.07)",
            }}
          >
            <div className="absolute border border-dashed" style={{ inset: 8, borderColor: "#DFE10440" }} />
            {hovered ? (
              <span
                className="relative font-mono text-[10px] uppercase tracking-widest text-center px-3 leading-snug"
                style={{ color: hovered.color }}
              >
                {hovered.skill}
              </span>
            ) : (
              <>
                <span className="relative font-display font-extrabold text-3xl text-accent leading-none">{totalSkills}</span>
                <span className="relative font-mono text-[9px] uppercase tracking-[0.25em] text-faint mt-1">tools</span>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

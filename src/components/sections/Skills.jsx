import { useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import { SKILL_ICONS } from "@/data/skillIcons"

const CATEGORY_WEIGHT = [1.0, 0.9, 0.8, 0.7, 0.6, 0.55]

function getWeight(catIndex, itemIndex, total) {
  const catW = CATEGORY_WEIGHT[catIndex] ?? 0.5
  const posW = 1 - (itemIndex / total) * 0.55
  return catW * posW
}

function sizeFromWeight(w) {
  if (w > 0.85) return { fontSize: "clamp(2rem, 4vw, 3.5rem)",     fontWeight: "700" }
  if (w > 0.70) return { fontSize: "clamp(1.5rem, 3vw, 2.5rem)",   fontWeight: "600" }
  if (w > 0.55) return { fontSize: "clamp(1.2rem, 2.2vw, 1.8rem)", fontWeight: "500" }
  if (w > 0.40) return { fontSize: "clamp(1rem, 1.8vw, 1.4rem)",   fontWeight: "400" }
  return           { fontSize: "clamp(0.85rem, 1.4vw, 1.1rem)",   fontWeight: "400" }
}

function opacityFromWeight(w) {
  return 0.35 + w * 0.65
}

function SkillWord({ label, color, weight, index, inView, hovered, onHover, onLeave, reduced }) {
  const { fontSize, fontWeight } = sizeFromWeight(weight)
  const baseOpacity = opacityFromWeight(weight)

  /* directional entrance based on position */
  const dir = index % 3
  const hiddenX = dir === 0 ? -28 : dir === 2 ? 12 : 0
  const hiddenY = dir === 1 ? 24 : 0
  const delay   = (1 - weight) * 0.35

  /* spotlight dimming */
  const spotOpacity = hovered === null
    ? baseOpacity
    : hovered === label ? 1 : baseOpacity * 0.25

  const isHovered = hovered === label

  return (
    <motion.span
      initial={{ opacity: 0, x: hiddenX, y: hiddenY, filter: "blur(6px)" }}
      animate={inView
        ? {
            opacity: spotOpacity,
            x: 0, y: 0,
            filter: "blur(0px)",
            color: isHovered ? color : "#FAFAFA",
            scale: isHovered ? 1.08 : 1,
          }
        : { opacity: 0, x: hiddenX, y: hiddenY, filter: "blur(6px)" }
      }
      transition={{
        opacity:   { duration: 0.5,  delay: inView ? delay : 0, ease: [0.16, 1, 0.3, 1] },
        x:         { duration: 0.55, delay: inView ? delay : 0, ease: [0.16, 1, 0.3, 1] },
        y:         { duration: 0.55, delay: inView ? delay : 0, ease: [0.16, 1, 0.3, 1] },
        filter:    { duration: 0.5,  delay: inView ? delay : 0 },
        color:     { duration: 0.15 },
        scale:     { duration: 0.15 },
      }}
      onHoverStart={() => onHover(label)}
      onHoverEnd={onLeave}
      className="font-display tracking-tight cursor-default select-none relative inline-block"
      style={{ fontSize, fontWeight, lineHeight: 1.15 }}
      title={label}
    >
      {label}
      {/* underline sweep */}
      <motion.span
        className="absolute left-0 bottom-0 h-[2px] bg-accent w-full pointer-events-none"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0 }}
      />
    </motion.span>
  )
}

export function Skills() {
  const { portfolioData } = usePortfolioData()
  const ref     = useRef(null)
  const inView  = useInView(ref, { once: false, margin: "-80px" })
  const reduced = useReducedMotion()
  const [hovered, setHovered] = useState(null)

  const weightedSkills = portfolioData.skills.flatMap((cat, ci) =>
    cat.items.map((label, ii) => ({
      label,
      color:  SKILL_ICONS[label]?.color || "#DFE104",
      weight: getWeight(ci, ii, cat.items.length),
    }))
  )

  return (
    <section id="skills" className="py-32 md:py-40 bg-base overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <SectionHeading title="Skills" subtitle="Technologies I build with every day" />

        <div ref={ref} className="mt-16 flex flex-wrap gap-x-6 gap-y-3 items-baseline">
          {weightedSkills.map(({ label, color, weight }, i) => (
            <SkillWord
              key={label}
              label={label}
              color={color}
              weight={weight}
              index={i}
              inView={inView}
              hovered={hovered}
              onHover={setHovered}
              onLeave={() => setHovered(null)}
              reduced={reduced}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import {
  Brain, Eye, Settings2, SearchCode,
  Radio, Dna, BookOpen, Globe
} from "lucide-react"
import { usePortfolioData } from "@/hooks/usePortfolioData"

const ICONS = [Brain, Eye, Settings2, SearchCode, Radio, Dna, BookOpen, Globe]
const ITEM_HEIGHT = 100

function ActiveItem({ item, index, activeIndex }) {
  const offset      = useTransform(activeIndex, v => index - v)
  const rotateX     = useTransform(offset, v => v * -22)
  const scale       = useTransform(offset, v => Math.max(0.72, 1 - Math.abs(v) * 0.13))
  const opacity     = useTransform(offset, v => Math.max(0, 1 - Math.abs(v) * 0.38))
  const y           = useTransform(offset, v => v * ITEM_HEIGHT)
  const titleColor  = useTransform(offset, v => Math.abs(v) < 0.5 ? "#FAFAFA" : "#3F3F46")
  const iconColor   = useTransform(offset, v => Math.abs(v) < 0.5 ? "#DFE104" : "#52525B")
  const numColor    = useTransform(offset, v => Math.abs(v) < 0.5 ? "#DFE104" : "#52525B")
  const descOpacity = useTransform(offset, v => Math.abs(v) < 0.5 ? 1 : 0)
  const fontSize    = useTransform(offset, v => Math.abs(v) < 0.5 ? "clamp(2rem,5vw,4rem)" : "clamp(1.25rem,3vw,2rem)")
  const Icon = ICONS[item._idx % ICONS.length]

  return (
    <motion.div
      style={{
        position: "absolute",
        top: "50%", left: 0, right: 0,
        translateY: "-50%",
        y, rotateX, scale, opacity,
        transformStyle: "preserve-3d",
      }}
      className="flex items-center gap-8 px-4 md:px-16"
    >
      <motion.span className="font-mono text-sm tracking-widest shrink-0 w-8" style={{ color: numColor }}>
        {String(item._idx + 1).padStart(2, "0")}
      </motion.span>
      <motion.div style={{ color: iconColor, flexShrink: 0 }}>
        <Icon size={24} strokeWidth={2} />
      </motion.div>
      <motion.h3
        className="font-display font-extrabold uppercase tracking-tight leading-none flex-1"
        style={{ fontSize, color: titleColor }}
      >
        {item.title}
      </motion.h3>
      <motion.p
        className="hidden md:block font-body text-sm text-secondary leading-relaxed max-w-xs text-right shrink-0"
        style={{ opacity: descOpacity }}
      >
        {item.description}
      </motion.p>
    </motion.div>
  )
}

export function Interests() {
  const { portfolioData } = usePortfolioData()
  const raw       = portfolioData.interests ?? []
  const interests = raw.map((item, i) => ({ ...item, _idx: i }))

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Snap to nearest integer index, then spring toward it
  const rawIndex    = useTransform(scrollYProgress, [0, 1], [0, interests.length - 1])
  const snappedIndex = useTransform(rawIndex, v => Math.round(v))
  const activeIndex = useSpring(snappedIndex, { stiffness: 300, damping: 30, mass: 0.5 })

  return (
    <section ref={containerRef} style={{ height: `${interests.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

        {/* heading */}
        <div className="shrink-0 pt-28 pb-6 max-w-7xl mx-auto w-full px-8 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-2">✦ Passions</p>
            <h2 className="font-display font-extrabold text-5xl md:text-6xl text-primary uppercase leading-none">
              What I Like<br />to Work On
            </h2>
          </div>
          <p className="font-mono text-xs text-faint uppercase tracking-widest hidden md:block pb-2">
            Scroll to explore
          </p>
        </div>

        {/* drum viewport */}
        <div className="flex-1 relative border-t-2 border-border mx-8 max-w-7xl md:mx-auto w-full"
          style={{ perspective: "1200px", perspectiveOrigin: "50% 50%" }}>

          {/* center bracket */}
          <div className="absolute left-0 right-0 pointer-events-none"
            style={{
              top: "50%", transform: "translateY(-50%)",
              height: ITEM_HEIGHT,
              borderTop: "2px solid #27272A",
              borderBottom: "2px solid #27272A",
            }}
          />

          {/* items */}
          <div className="absolute inset-0">
            {interests.map((item, i) => (
              <ActiveItem key={i} item={item} index={i} activeIndex={activeIndex} />
            ))}
          </div>

          {/* fades */}
          <div className="absolute inset-x-0 top-0 h-32 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, #09090B, transparent)" }} />
          <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
            style={{ background: "linear-gradient(to top, #09090B, transparent)" }} />
        </div>

        {/* bottom strip */}
        <div className="shrink-0 py-3 px-8 border-t-2 border-border flex items-center justify-between max-w-7xl mx-auto w-full">
          <p className="font-mono text-xs text-faint uppercase tracking-widest">{interests.length} areas of focus</p>
        </div>

      </div>
    </section>
  )
}

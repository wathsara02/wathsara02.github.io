import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { usePortfolioData } from "@/hooks/usePortfolioData"

function Chip({ label, accent }) {
  return (
    <motion.span
      className="inline-flex items-center shrink-0 px-5 py-2.5 mx-3 border-2 border-border font-mono text-sm uppercase tracking-widest text-faint cursor-default select-none"
      whileHover={{
        backgroundColor: "#DFE104",
        borderColor: "#DFE104",
        color: "#09090B",
        scale: 1.06,
      }}
      transition={{ duration: 0.15 }}
    >
      {label}
    </motion.span>
  )
}

function MarqueeRow({ items, reverse, speed = 40, label }) {
  const doubled = [...items, ...items, ...items]
  const duration = (items.length * speed) / 10

  return (
    <div className="flex items-center gap-0 border-b-2 border-border group overflow-hidden">
      {/* sticky category label */}
      <div className="shrink-0 w-40 md:w-52 px-6 py-4 border-r-2 border-border bg-bg z-10 relative">
        <span className="font-mono text-xs uppercase tracking-widest text-accent block leading-tight">
          {label}
        </span>
      </div>

      {/* scrolling track */}
      <div
        className="flex-1 overflow-hidden py-4"
        style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)" }}
      >
        <div
          className="flex items-center group-hover:[animation-play-state:paused]"
          style={{
            animation: `marquee-${reverse ? "reverse" : "forward"} ${duration}s linear infinite`,
            width: "max-content",
          }}
        >
          {doubled.map((item, i) => (
            <Chip key={`${item}-${i}`} label={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function SkillsMarquee() {
  const { portfolioData } = usePortfolioData()
  const skills = portfolioData.skills ?? []
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" })

  return (
    <section id="skills-marquee" className="relative overflow-hidden border-t-2 border-border">
      <style>{`
        @keyframes marquee-forward {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
      `}</style>

      {/* heading row */}
      <div ref={headingRef} className="max-w-7xl mx-auto px-8 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent block mb-3">
              Full Roster
            </span>
            <h2 className="font-display font-extrabold text-5xl md:text-7xl leading-none uppercase text-primary">
              Everything<br />I Reach For
            </h2>
          </div>
          <p className="font-body text-secondary text-base md:text-lg max-w-xs leading-relaxed md:text-right">
            Hover any skill to inspect it. Hover a row to freeze the tape.
          </p>
        </motion.div>
      </div>

      {/* divider */}
      <div className="border-t-2 border-border" />

      {/* marquee rows */}
      {skills.map((cat, i) => (
        <MarqueeRow
          key={cat.category}
          label={cat.category}
          items={cat.items}
          reverse={i % 2 !== 0}
          speed={35 + i * 4}
        />
      ))}

      {/* bottom accent bar */}
      <motion.div
        className="h-1.5 bg-accent"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />
    </section>
  )
}

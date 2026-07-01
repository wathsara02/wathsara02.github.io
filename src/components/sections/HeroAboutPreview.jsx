import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { usePortfolioData } from "@/hooks/usePortfolioData"

export function HeroAboutPreview() {
  const { portfolioData } = usePortfolioData()
  const { meta, stats } = portfolioData

  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: "-80px" })
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

  // pick 3 most impactful stats
  const keyStats = stats.slice(0, 3)
  const initials = meta.name.split(" ").map(n => n[0]).join("")

  return (
    <section ref={ref} className="border-t-2 border-b-2 border-border overflow-hidden">

      {/* ── top label bar ── */}
      <div className="border-b-2 border-border px-8 py-3 flex items-center justify-between">
        <span className="font-mono text-xs text-accent uppercase tracking-[0.2em]">✦ Identity</span>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green animate-pulse" />
          <span className="font-mono text-xs text-faint uppercase tracking-widest">Open to work</span>
        </div>
      </div>

      {/* ── asymmetric editorial grid ── */}
      <div className="grid lg:grid-cols-[2fr_3fr]">

        {/* LEFT — avatar */}
        <div className="border-r-2 border-border overflow-hidden relative" style={{ minHeight: "520px" }}>
          <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
            {meta.avatar
              ? <img src={meta.avatar} alt={meta.name}
                  className="w-full h-full object-cover object-top" />
              : <div className="w-full h-full bg-surface2 flex items-center justify-center">
                  <span className="font-display font-extrabold text-[12rem] text-faint/15 select-none leading-none">
                    {initials}
                  </span>
                </div>
            }
            {/* bottom fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
          </motion.div>
        </div>

        {/* RIGHT — editorial content */}
        <div className="flex flex-col">

          {/* name block */}
          <div className="border-b-2 border-border px-10 py-10">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.4 }}
              className="font-mono text-xs text-faint uppercase tracking-[0.2em] mb-4"
            >
              {meta.title}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.55, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-extrabold uppercase leading-none"
              style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)" }}
            >
              <span className="text-gradient">{meta.name.split(" ")[0]}</span>
              {" "}
              <span className="text-gradient-accent">{meta.name.split(" ").slice(1).join(" ")}</span>
            </motion.h2>
          </div>

          {/* tagline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="border-b-2 border-border px-10 py-8"
          >
            <p className="font-body text-2xl text-secondary leading-[1.6] max-w-lg">
              {meta.tagline}
            </p>
          </motion.div>

          {/* stats row */}
          <div className="grid grid-cols-3 border-b-2 border-border flex-1">
            {keyStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.4, delay: 0.22 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`px-8 py-8 ${i < keyStats.length - 1 ? "border-r-2 border-border" : ""}`}
              >
                <p className="font-display font-extrabold text-5xl text-accent leading-none mb-2">
                  {s.value}<span className="text-primary text-3xl">+</span>
                </p>
                <p className="font-mono text-xs text-faint uppercase tracking-widest leading-snug">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="px-10 py-7 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-faint uppercase tracking-widest">Location</span>
              <span className="font-mono text-sm text-primary">{meta.location}</span>
            </div>
            <span className="font-mono text-xs text-accent uppercase tracking-widest">{meta.email}</span>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

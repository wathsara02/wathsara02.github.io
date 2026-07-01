import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { StatCounter } from "@/components/ui/StatCounter"
import { usePortfolioData } from "@/hooks/usePortfolioData"

function AvatarParallax({ children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])
  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y, scale: 1.18 }}>{children}</motion.div>
    </div>
  )
}


export function About() {
  const { portfolioData } = usePortfolioData()
  const { about, meta, stats } = portfolioData

  const sectionRef = useRef(null)
  const avatarRef = useRef(null)
  const bioRef = useRef(null)

  const avatarInView = useInView(avatarRef, { once: false, margin: "-80px" })
  const bioInView = useInView(bioRef, { once: false, margin: "-80px" })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"])

  const bioParagraphs = about.bio.split("\n\n")

  return (
    <section ref={sectionRef} id="about" className="py-32 md:py-40 relative overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-gradient-radial from-accent/[0.03] via-transparent to-transparent pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8">

        {/* stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-2 border-border mb-20">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`p-8 ${i < stats.length - 1 ? "border-r-2 border-border" : ""} ${i >= 2 ? "border-t-2 border-border md:border-t-0" : ""}`}
            >
              <StatCounter value={s.value} label={s.label} />
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-16 items-start">

          {/* avatar */}
          <div ref={avatarRef} className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -48 }}
              animate={avatarInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -48 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <AvatarParallax>
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface2 border-2 border-border">
                  {meta.avatar
                    ? <img src={meta.avatar} alt={meta.name} className="w-full h-full object-cover" loading="lazy" />
                    : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface2 to-bg">
                        <span className="font-display font-extrabold text-[8rem] text-faint/50 select-none">
                          {meta.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                    )
                  }
                </div>
              </AvatarParallax>

              {/* status badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-surface border-2 border-accent px-5 py-3 z-10"
              >
                <p className="font-mono text-xs text-faint uppercase tracking-widest">Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-green animate-pulse" />
                  <p className="font-mono font-semibold text-primary text-sm uppercase tracking-wide">Open to work</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* bio */}
          <div ref={bioRef} className="lg:col-span-3">
            <SectionHeading title="About" />
            <motion.div
              className="mt-8 space-y-6"
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
              initial="hidden"
              animate={bioInView ? "visible" : "hidden"}
            >
              {bioParagraphs.map((p, i) => (
                <motion.p
                  key={i}
                  variants={{
                    hidden:  { opacity: 0, x: 32, filter: "blur(4px)" },
                    visible: { opacity: 1, x: 0,  filter: "blur(0px)", transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  className="font-body text-xl text-secondary leading-[1.8]"
                >
                  {p}
                </motion.p>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

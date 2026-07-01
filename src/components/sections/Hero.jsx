import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Download, ArrowDown, Zap } from "lucide-react"
import { GlowButton } from "@/components/ui/GlowButton"
import { usePortfolioData } from "@/hooks/usePortfolioData"

const FadeUp = ({ children, delay = 0, blur = true }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, filter: blur ? "blur(10px)" : "none" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}>
    {children}
  </motion.div>
)

function RoleText({ roles }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % roles.length), 2600)
    return () => clearInterval(id)
  }, [roles.length])

  const role = roles[index] ?? ""

  return (
    <div style={{ perspective: "600px", display: "flex", alignItems: "center", height: "2.8rem", position: "relative" }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          style={{ position: "absolute", display: "flex", alignItems: "center" }}
          className="font-mono text-3xl text-accent"
        >
          {role.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: "80%", opacity: 0, rotateX: -70 }}
              animate={{ y: "0%", opacity: 1, rotateX: 0 }}
              exit={{ y: "-80%", opacity: 0, rotateX: 70 }}
              transition={{
                duration: 0.35,
                delay: i * 0.028,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                display: "inline-block",
                transformOrigin: "center center",
                whiteSpace: "pre",
                transformStyle: "preserve-3d",
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export function Hero() {
  const { portfolioData } = usePortfolioData()
  const { meta } = portfolioData
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden grain-overlay">
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full pointer-events-none
        bg-gradient-radial from-accent/8 via-accent/[0.02] to-transparent blur-[100px] animate-float" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none
        bg-gradient-radial from-green/6 via-green/[0.01] to-transparent blur-[80px] animate-float-r" />

      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-8 pt-32 pb-20">
        <FadeUp delay={0}>
          <div className="flex items-center gap-3 mb-8" />
        </FadeUp>

        <div className="overflow-hidden mb-4">
          <FadeUp delay={0.1} blur={false}>
            <h1 className="font-display font-extrabold text-hero text-gradient leading-none">
              {meta.name.split(" ")[0]}
            </h1>
          </FadeUp>
        </div>
        <div className="overflow-hidden mb-10">
          <FadeUp delay={0.18} blur={false}>
            <h1 className="font-display font-extrabold text-hero text-gradient-accent leading-none">
              {meta.name.split(" ").slice(1).join(" ")}
            </h1>
          </FadeUp>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-end">
          <div>
            <FadeUp delay={0.35}>
              <div className="flex items-center gap-3 mb-6">
                <RoleText roles={meta.roles} />
              </div>
            </FadeUp>
            <FadeUp delay={0.45}>
              <p className="font-body text-xl text-secondary leading-[1.75] max-w-lg mb-10">
                {meta.tagline}
              </p>
            </FadeUp>
            <FadeUp delay={0.58}>
              <div className="flex flex-wrap gap-4">
                <GlowButton onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                  <Zap size={17} /> View My Work
                </GlowButton>
                {meta.resumeUrl
                  ? <GlowButton variant="outline" href={meta.resumeUrl} download><Download size={17} /> Download CV</GlowButton>
                  : <GlowButton variant="outline" onClick={() => {}}><Download size={17} /> Download CV</GlowButton>
                }
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.65}>
            <motion.div
              className="flex flex-col gap-5 border-l border-border pl-10"
              variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.7 } } }}
              initial="hidden"
              animate="visible"
            >
              {[
                { label: "Based in",        value: meta.location, mono: false },
                { label: "Specialising in", value: meta.title,    mono: false },
                { label: "Contact",         value: meta.email,    mono: true  },
              ].map(({ label, value, mono }) => (
                <motion.div
                  key={label}
                  variants={{
                    hidden:  { opacity: 0, x: -16 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  <p className="font-mono text-sm text-faint uppercase tracking-widest mb-1">{label}</p>
                  <p className={`font-bold text-xl ${mono ? "font-mono text-accent" : "font-display text-primary"}`}>{value}</p>
                </motion.div>
              ))}
            </motion.div>
          </FadeUp>
        </div>
      </motion.div>

      <motion.div className="absolute bottom-10 left-8 flex items-center gap-3"
        animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.2 }}>
        <ArrowDown size={16} className="text-faint" />
        <span className="font-mono text-sm text-faint tracking-widest uppercase">Scroll</span>
      </motion.div>
    </section>
  )
}

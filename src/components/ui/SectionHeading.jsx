import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ScrollReveal } from "./ScrollReveal"

function WordReveal({ text, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: "-60px" })
  const words = text.split(" ")

  return (
    <h2 ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </h2>
  )
}

export function SectionHeading({ title, subtitle, center = false, light = false }) {
  return (
    <div className={center ? "text-center" : ""}>
      <ScrollReveal>
        <p className="font-mono text-sm text-accent uppercase tracking-[0.25em] mb-3">{title}</p>
      </ScrollReveal>
      <WordReveal
        text={title}
        className={`font-display font-bold text-display tracking-tight leading-tight mb-4 ${light ? "text-bg" : "text-primary"}`}
      />
      {subtitle && (
        <ScrollReveal delay={0.15}>
          <p className={`font-body text-lg2 leading-relaxed max-w-xl ${light ? "text-bg/70" : "text-secondary"} ${center ? "mx-auto" : ""}`}>
            {subtitle}
          </p>
        </ScrollReveal>
      )}
    </div>
  )
}


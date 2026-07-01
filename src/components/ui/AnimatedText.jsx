import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }
const word = { hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
               visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45 } } }

export function AnimatedText({ text, as: Tag = "p", className = "", delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: "-60px" })
  const prefersReduced = useReducedMotion()
  const words = text.split(" ")

  if (prefersReduced) return <Tag className={className}>{text}</Tag>

  return (
    <motion.div ref={ref} variants={container} initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delayChildren: delay }} style={{ display: "inline" }}>
      <Tag className={className} style={{ display: "inline" }}>
        {words.map((w, i) => (
          <motion.span key={i} variants={word} style={{ display: "inline-block", marginRight: "0.3em" }}>
            {w}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  )
}


import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

export function ScrollReveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: "-80px" })
  const prefersReduced = useReducedMotion()

  if (prefersReduced) return <div ref={ref} className={className}>{children}</div>

  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay }}>
      {children}
    </motion.div>
  )
}


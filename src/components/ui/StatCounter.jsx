import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

export function StatCounter({ value, label, suffix = "+" }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: false })

  useEffect(() => {
    if (!inView) return
    const steps = 60; const inc = value / steps; let cur = 0
    const t = setInterval(() => { cur += inc; if (cur >= value) { setCount(value); clearInterval(t) } else setCount(Math.floor(cur)) }, 1400 / steps)
    return () => clearInterval(t)
  }, [inView, value])

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <span className="font-display font-extrabold text-5xl md:text-6xl text-gradient-cyan leading-none">
        {count}<span className="text-accent">{suffix}</span>
      </span>
      <span className="font-mono text-sm text-faint uppercase tracking-[0.18em]">{label}</span>
    </div>
  )
}



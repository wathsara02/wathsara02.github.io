import { useRef } from "react"
import { motion, useScroll, useVelocity, useTransform, useSpring, useAnimationFrame } from "framer-motion"
import { useRef as useRefVal, useState } from "react"

function wrap(min, max, v) {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

export function ScrollMarquee({ text, repeat = 6, baseSpeed = 2 }) {
  const baseX = useRefVal(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false })

  const [x, setX] = useState(0)
  const directionFactor = useRef(1)

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseSpeed * (delta / 1000)
    if (velocityFactor.get() < 0) directionFactor.current = -1
    else if (velocityFactor.get() > 0) directionFactor.current = 1
    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.current += moveBy
    setX(wrap(-100 / repeat, 0, baseX.current))
  })

  const items = Array.from({ length: repeat }, (_, i) => i)

  return (
    <div className="overflow-hidden py-5 border-y border-border bg-surface select-none">
      <motion.div
        className="flex whitespace-nowrap gap-0"
        style={{ x: `${x}%` }}
      >
        {items.map(i => (
          <span key={i} className="font-display font-extrabold text-3xl md:text-4xl uppercase tracking-tight text-border px-8">
            {text} <span className="text-accent">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

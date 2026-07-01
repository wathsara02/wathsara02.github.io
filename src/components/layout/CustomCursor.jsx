import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const [hov, setHov] = useState(false)
  const [vis, setVis] = useState(false)
  const mx = useMotionValue(-200); const my = useMotionValue(-200)
  const sx = useSpring(mx, { damping: 22, stiffness: 280 })
  const sy = useSpring(my, { damping: 22, stiffness: 280 })

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return
    const onMove = e => { mx.set(e.clientX); my.set(e.clientY); setVis(true) }
    const onOver = e => setHov(!!e.target.closest("a,button,.cursor-hover"))
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseover", onOver)
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseover", onOver) }
  }, [mx, my])

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null

  return (
    <>
      <motion.div
        style={{ position:"fixed",top:0,left:0,x:sx,y:sy,translateX:"-50%",translateY:"-50%",
          pointerEvents:"none",zIndex:9999,opacity:vis?1:0 }}
        animate={{ width:hov?40:28, height:hov?40:28,
          borderColor: hov?"#DFE104":"rgba(250,250,250,0.22)" }}
        transition={{ duration: 0.15 }}
        className="rounded-full border"
      />
      <motion.div
        style={{ position:"fixed",top:0,left:0,x:mx,y:my,translateX:"-50%",translateY:"-50%",
          pointerEvents:"none",zIndex:9999,opacity:vis?1:0 }}
        animate={{ width:hov?8:4, height:hov?8:4, backgroundColor:hov?"#DFE104":"#FAFAFA" }}
        transition={{ duration: 0.1 }}
        className="rounded-full"
      />
    </>
  )
}







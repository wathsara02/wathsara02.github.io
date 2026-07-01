import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useScrollProgress } from "@/hooks/useScrollProgress"
import { usePortfolioData } from "@/hooks/usePortfolioData"

const NAV_LINKS = ["About","Skills","Interests","Projects","Experience","Education","Contact"]

export function Navbar() {
  const { scrolled, progress } = useScrollProgress()
  const [active, setActive] = useState("")
  const [open, setOpen] = useState(false)
  const { portfolioData } = usePortfolioData()
  const location = useLocation()
  const [first] = portfolioData.meta.name.split(" ")

  useEffect(() => {
    const obs = NAV_LINKS.map(s => {
      const el = document.getElementById(s.toLowerCase())
      if (!el) return null
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(s) }, { rootMargin: "-40% 0px -55% 0px" })
      o.observe(el); return o
    })
    return () => obs.forEach(o => o?.disconnect())
  }, [location])

  const goto = id => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); setOpen(false) }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled ? "bg-bg/90 backdrop-blur-md border-b-2 border-border" : "bg-transparent"}`}>
        <div className="absolute top-0 left-0 h-[2px] bg-accent transition-all duration-150"
          style={{ width: `${progress * 100}%` }} />
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display font-extrabold text-xl text-primary tracking-tight">
            {first}<span className="text-accent">.</span>
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => goto(l)}
                className="relative font-mono text-sm uppercase tracking-widest font-medium transition-colors pb-1"
                style={{ color: active === l ? "#DFE104" : "#A1A1AA" }}>
                {l}
                {active === l && (
                  <motion.div layoutId="nav-ul"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
              </button>
            ))}
          </nav>
          <button className="md:hidden text-secondary" onClick={() => setOpen(v => !v)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg/97 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
            {NAV_LINKS.map((l, i) => (
              <motion.button key={l}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                onClick={() => goto(l)}
                className="font-display font-extrabold text-5xl text-primary hover:text-accent transition-colors uppercase">
                {l}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}



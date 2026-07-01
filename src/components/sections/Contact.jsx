import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Copy, Check, Mail } from "lucide-react"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { usePortfolioData } from "@/hooks/usePortfolioData"

const LABELS = { github:"GitHub", linkedin:"LinkedIn", twitter:"Twitter / X", kaggle:"Kaggle" }

const socialContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}
const socialItem = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

export function Contact() {
  const { portfolioData } = usePortfolioData()
  const { meta, contact } = portfolioData
  const [copied, setCopied] = useState(false)
  const [hoveredSocial, setHoveredSocial] = useState(null)

  const copy = () => { navigator.clipboard.writeText(meta.email); setCopied(true); setTimeout(() => setCopied(false), 2200) }
  const socials = Object.entries(meta.socials).filter(([, v]) => v)

  return (
    <section id="contact" className="py-32 md:py-40 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]
        bg-gradient-radial from-accent/8 via-transparent to-transparent blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-8">

        {/* two-col layout */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* LEFT — heading + email */}
          <div>
            <ScrollReveal>
              <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-4">✦ Contact</p>
              <h2 className="font-display font-extrabold text-display text-primary leading-tight mb-6 uppercase">
                {contact.heading}
              </h2>
              <p className="font-body text-xl text-secondary mb-12 leading-relaxed">{contact.subtext}</p>
            </ScrollReveal>

            {/* email — flood fill */}
            <ScrollReveal delay={0.1}>
              <motion.button
                onClick={copy}
                className="group relative w-full flex items-center gap-6 border-2 border-border px-8 py-6 overflow-hidden hover:border-accent transition-colors duration-200"
                whileTap={{ scale: 0.99 }}
              >
                <motion.div
                  className="absolute inset-0 bg-accent"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originX: 0 }}
                />
                <div className="relative z-10 border-2 border-border group-hover:border-black w-12 h-12 flex items-center justify-center transition-colors duration-200">
                  <Mail size={20} className="text-accent group-hover:text-black transition-colors duration-200" />
                </div>
                <div className="relative z-10 text-left flex-1 min-w-0">
                  <p className="font-mono text-xs text-faint group-hover:text-black/60 uppercase tracking-widest mb-1 transition-colors duration-200">Email</p>
                  <p className="font-display font-bold text-xl text-primary group-hover:text-black transition-colors duration-200 truncate">
                    {meta.email}
                  </p>
                </div>
                <div className="relative z-10 text-faint group-hover:text-black transition-colors duration-200 shrink-0">
                  <AnimatePresence mode="wait">
                    {copied
                      ? <motion.div key="check" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}><Check size={22} /></motion.div>
                      : <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Copy size={22} /></motion.div>
                    }
                  </AnimatePresence>
                </div>
              </motion.button>
            </ScrollReveal>
          </div>

          {/* RIGHT — social links */}
          <div>
            <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-6">✦ Find Me Online</p>
            <motion.div
              className="border-t-2 border-border"
              variants={socialContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-60px" }}
            >
              {socials.map(([k, url]) => (
                <motion.a
                  key={k}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialItem}
                  onMouseEnter={() => setHoveredSocial(k)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  className="group relative flex items-center justify-between border-b-2 border-border px-2 py-6 overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-accent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredSocial === k ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    style={{ originX: 0 }}
                  />
                  <span className="relative z-10 font-display font-bold text-2xl text-primary group-hover:text-black transition-colors duration-200 uppercase">
                    {LABELS[k] || k}
                  </span>
                  <span className="relative z-10 font-mono text-sm text-faint group-hover:text-black/60 uppercase tracking-widest transition-colors duration-200 flex items-center gap-2">
                    {url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                    <ExternalLink size={14} />
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed bottom-8 right-8 flex items-center gap-3 bg-accent border-2 border-accent
              px-5 py-3.5 font-mono font-bold text-black text-sm uppercase tracking-widest z-50"
          >
            <Check size={16} /> Copied!
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}


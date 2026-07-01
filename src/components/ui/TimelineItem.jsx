import { motion } from "framer-motion"
import { ScrollReveal } from "./ScrollReveal"

const highlightVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}
const bulletVariant = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
}

export function TimelineItem({ item, variant = "experience", index = 0 }) {
  const isExp = variant === "experience"
  return (
    <ScrollReveal delay={index * 0.08}>
      <div className="relative pl-12">
        {/* dot */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false }}
          transition={{ delay: index * 0.08 + 0.2, type: "spring", stiffness: 400, damping: 20 }}
          className={`absolute left-0 top-2 w-4 h-4 rounded-full border-2 border-accent flex items-center justify-center
            ${isExp ? "bg-accent" : "bg-bg"}`}
        >
          {isExp && <div className="w-1.5 h-1.5 rounded-full bg-bg" />}
        </motion.div>

        {/* card */}
        <motion.div
          whileHover={{ y: -3, borderColor: "#DFE104" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-surface border border-border rounded-3xl p-7 group transition-colors duration-200"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="font-display font-bold text-title text-primary group-hover:text-accent transition-colors">
                {isExp ? item.role : item.degree}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className="font-body text-lg2 text-secondary">{isExp ? item.company : item.institution}</span>
                {item.location && <span className="font-mono text-sm text-faint">· {item.location}</span>}
              </div>
            </div>
            <span className="font-mono text-sm text-accent bg-accentSoft border border-borderHover px-4 py-1.5 rounded-full shrink-0">
              {item.period}
            </span>
          </div>
          <p className="font-body text-lg2 text-secondary leading-relaxed">{item.description}</p>

          {isExp && item.highlights?.length > 0 && (
            <motion.ul
              className="mt-5 space-y-2.5"
              variants={highlightVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-40px" }}
            >
              {item.highlights.map((h, i) => (
                <motion.li key={i} variants={bulletVariant} className="flex gap-3 font-body text-lg2 text-secondary">
                  <span className="text-accent mt-1 shrink-0 text-xs">◆</span>{h}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </motion.div>
      </div>
    </ScrollReveal>
  )
}


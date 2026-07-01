import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { usePortfolioData } from "@/hooks/usePortfolioData"

export function Projects() {
  const { portfolioData } = usePortfolioData()
  const [filter, setFilter] = useState("All")
  const projects = filter === "Featured"
    ? portfolioData.projects.filter(p => p.featured)
    : portfolioData.projects

  return (
    <section id="projects" className="py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <SectionHeading title="Projects" subtitle="Systems I've built and deployed to production" />
          {/* sharp brutalist tab toggle */}
          <div className="flex border-2 border-border w-fit shrink-0">
            {["All","Featured"].map(tab => (
              <button key={tab} onClick={() => setFilter(tab)}
                className="relative px-8 py-3 font-mono text-sm uppercase tracking-widest transition-colors duration-200 overflow-hidden"
                style={{ color: filter === tab ? "#000" : "#A1A1AA" }}>
                {filter === tab && (
                  <motion.div layoutId="ptab"
                    className="absolute inset-0 bg-accent"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {projects.map((p, i) => <ProjectCard key={p.id} project={p} wide={!!p.wide} index={i} />)}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

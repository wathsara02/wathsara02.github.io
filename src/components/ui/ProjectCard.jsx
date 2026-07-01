import { useRef } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Link2, ExternalLink, ArrowUpRight } from "lucide-react"

export function ProjectCard({ project, wide = false, index = 0 }) {
  const hasImage = !!project.image
  const cardRef = useRef(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      style={{ perspective: "900px" }}
      className={wide ? "md:col-span-2" : ""}
    >
      <motion.div
        ref={cardRef}
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative bg-surface border-2 border-border flex flex-col
          hover:border-accent transition-colors duration-200 h-full"
      >
        {/* shine layer */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(223,225,4,0.06) 0%, transparent 60%)",
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
        />

        {/* image */}
        {hasImage && (
          <div className={`overflow-hidden border-b-2 border-border ${wide ? "h-56" : "h-40"}`}>
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}

        {!hasImage && wide && (
          <div className="h-32 border-b-2 border-border bg-surface2 flex items-center justify-center">
            <span className="font-mono text-xs text-faint uppercase tracking-widest">No image</span>
          </div>
        )}

        <div className="p-7 flex flex-col gap-4 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="flex gap-2 flex-wrap">
              {project.featured && (
                <span className="font-mono text-xs text-black bg-accent px-3 py-1 uppercase tracking-widest">
                  Featured
                </span>
              )}
              {wide && (
                <span className="font-mono text-xs text-accent border border-accent px-3 py-1 uppercase tracking-widest">
                  Showcase
                </span>
              )}
            </div>
            <motion.div
              whileHover={{ rotate: 45 }}
              transition={{ duration: 0.2 }}
              className="w-9 h-9 border-2 border-border flex items-center justify-center text-faint
                group-hover:border-accent group-hover:text-accent transition-all shrink-0">
              <ArrowUpRight size={16} />
            </motion.div>
          </div>

          <h3 className="font-display font-bold text-title text-primary group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="font-body text-lg2 text-secondary leading-relaxed flex-1">{project.description}</p>

          <motion.div
            className="flex flex-wrap gap-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
          >
            {project.tags.map(tag => (
              <motion.span
                key={tag}
                variants={{
                  hidden: { opacity: 0, scale: 0.85 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
                }}
                className="font-mono text-sm text-faint border border-border px-3 py-1
                  group-hover:border-faint transition-colors">
                {tag}
              </motion.span>
            ))}
          </motion.div>

          <div className="flex gap-5 pt-3 border-t-2 border-border">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-ui text-sm text-faint hover:text-accent transition-colors">
                <Link2 size={13} /> Source
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-ui text-sm text-faint hover:text-accent transition-colors">
                <ExternalLink size={13} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}


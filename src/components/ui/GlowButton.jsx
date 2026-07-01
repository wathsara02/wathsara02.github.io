import { motion } from "framer-motion"

export function GlowButton({ children, variant = "primary", onClick, href, className = "", download }) {
  const base = "inline-flex items-center gap-2.5 font-ui font-bold rounded-none px-7 py-3.5 text-lg2 transition-all duration-100 relative border-2 uppercase tracking-wider"
  const primary = "bg-accent text-black border-accent hover:bg-accentDim hover:shadow-acid-md"
  const outline = "bg-transparent text-primary border-border hover:border-accent hover:text-accent"
  const ghost   = "border-transparent text-secondary hover:text-primary"
  const map = { primary, outline, ghost }
  const cls = `${base} ${map[variant] || outline} ${className}`
  const mp  = { whileHover: { scale: 1.02 }, whileTap: { scale: 0.97 }, className: cls }
  if (href) return <motion.a href={href} download={download} target={download ? undefined : "_blank"} rel="noopener noreferrer" {...mp}>{children}</motion.a>
  return <motion.button onClick={onClick} {...mp}>{children}</motion.button>
}

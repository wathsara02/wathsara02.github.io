export function SkillBadge({ label }) {
  return (
    <span className="inline-flex items-center font-mono text-sm px-3 py-1.5 rounded-lg
      border border-border text-secondary bg-surface hover:border-borderHover hover:text-primary transition-all">
      {label}
    </span>
  )
}

import { usePortfolioData } from "@/hooks/usePortfolioData"
import { ArrowUpRight } from "lucide-react"

const SOCIAL_LABELS = { github: "GitHub", linkedin: "LinkedIn", twitter: "Twitter / X", kaggle: "Kaggle" }

export function Footer() {
  const { portfolioData } = usePortfolioData()
  const { meta } = portfolioData
  const socials = Object.entries(meta.socials).filter(([, v]) => v)
  const year = new Date().getFullYear()

  return (
    <footer className="border-t-2 border-border mt-0">
      {/* big name strip */}
      {/* main footer body */}
      <div className="max-w-7xl mx-auto px-8 py-16 grid md:grid-cols-3 gap-12 border-b-2 border-border">
        {/* brand */}
        <div>
          <p className="font-display font-extrabold text-3xl text-primary mb-3">
            {meta.name.split(" ")[0]}<span className="text-accent">.</span>
          </p>
          <p className="font-mono text-sm text-faint uppercase tracking-widest mb-1">{meta.title}</p>
          <p className="font-mono text-sm text-faint">{meta.location}</p>
        </div>

        {/* nav */}
        <div>
          <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-5">Navigate</p>
          <div className="flex flex-col gap-2">
            {["About","Skills","Interests","Projects","Experience","Contact"].map(l => (
              <button key={l}
                onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                className="font-mono text-sm text-secondary hover:text-accent transition-colors uppercase tracking-widest text-left w-fit">
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* contact */}
        <div>
          <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-5">Get in Touch</p>
          <a href={`mailto:${meta.email}`}
            className="font-display font-bold text-xl text-primary hover:text-accent transition-colors block mb-6 break-all">
            {meta.email}
          </a>
          <div className="flex flex-col gap-2">
            {socials.map(([k, url]) => (
              <a key={k} href={url} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-2 font-mono text-sm text-secondary hover:text-accent transition-colors uppercase tracking-widest w-fit">
                {SOCIAL_LABELS[k] || k}
                <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="font-mono text-xs text-faint uppercase tracking-widest">
          © {year} {meta.name}. All rights reserved.
        </p>
        <p className="font-mono text-xs text-faint uppercase tracking-widest">
          Built with React + Framer Motion
        </p>
      </div>
    </footer>
  )
}


import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { Menu, X } from 'lucide-react'
import { useActiveSection } from '@/hooks/useActiveSection'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import { useScrolled } from '@/hooks/useScrolled'
import { SECTIONS } from '@/lib/sections'

const SCROLLED_THRESHOLD_PX = 60
const MOBILE_MENU_ID = 'mobile-menu'
// Matches Tailwind's md breakpoint, where the desktop nav takes over.
const DESKTOP_QUERY = '(min-width: 768px)'

/** Locks the page behind the open menu: no scroll, no focus, Escape closes. */
function useModalMenu(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return
    const background = document.querySelectorAll<HTMLElement>('main, footer')
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    const desktop = window.matchMedia(DESKTOP_QUERY)
    desktop.addEventListener('change', onClose)
    background.forEach((element) => { element.inert = true })
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      background.forEach((element) => { element.inert = false })
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
      desktop.removeEventListener('change', onClose)
    }
  }, [isOpen, onClose])
}

export function Navbar() {
  const { portfolioData } = usePortfolioData()
  const active = useActiveSection()
  const isScrolled = useScrolled(SCROLLED_THRESHOLD_PX)
  const [isOpen, setIsOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstName = portfolioData.meta.name.split(' ')[0]

  const closeMenu = useCallback(() => {
    setIsOpen(false)
    toggleRef.current?.focus()
  }, [])
  useModalMenu(isOpen, closeMenu)

  const headerSurface = isScrolled || isOpen ? 'border-border bg-bg/90 backdrop-blur-md' : 'border-transparent'

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 border-b-2 transition-colors duration-300 ${headerSurface}`}>
        <div className="shell flex h-[--header-height] items-center justify-between">
          <a href="#top" className="font-display text-xl font-bold tracking-tight" onClick={() => setIsOpen(false)}>
            {firstName}<span className="text-accent">.</span>
          </a>

          <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
            {SECTIONS.map(({ id, label }) => {
              const isActive = active === id
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group relative pb-1 font-mono text-sm uppercase tracking-widest transition-colors hover:text-primary ${isActive ? 'text-accent' : 'text-secondary'}`}
                >
                  {label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent transition-transform duration-300 ease-out-expo ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                  />
                </a>
              )
            })}
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 p-2 text-primary md:hidden"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls={MOBILE_MENU_ID}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {isOpen && (
        <nav
          id={MOBILE_MENU_ID}
          aria-label="Mobile navigation"
          className="fixed inset-0 z-40 flex flex-col justify-center bg-bg px-gutter pt-[--header-height] md:hidden"
        >
          {SECTIONS.map(({ id, label }, i) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setIsOpen(false)}
              className="rise flex items-baseline gap-4 border-b-2 border-border py-4 font-display text-4xl font-bold uppercase hover:text-accent"
              style={{ '--rise-delay': `${i * 40}ms` } as CSSProperties}
            >
              <span className="font-mono text-xs tracking-widest text-accent">{String(i + 1).padStart(2, '0')}</span>
              {label}
            </a>
          ))}
        </nav>
      )}
    </>
  )
}

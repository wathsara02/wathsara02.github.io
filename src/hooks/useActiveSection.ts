import { useEffect, useState } from 'react'
import { SECTIONS, type SectionId } from '@/lib/sections'

// A section counts as active while it crosses a thin band just above mid-viewport.
const ACTIVE_BAND = '-40% 0px -55% 0px'

export function useActiveSection(): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActive(visible.target.id as SectionId)
      },
      { rootMargin: ACTIVE_BAND },
    )
    for (const { id } of SECTIONS) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [])

  return active
}

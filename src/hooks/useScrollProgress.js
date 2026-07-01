import { useState, useEffect } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let rafId = null

    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        setProgress(docHeight > 0 ? scrollTop / docHeight : 0)
        setScrolled(scrollTop > 60)
        rafId = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { progress, scrolled }
}

import { useEffect } from 'react'

export function useSmoothScroll() {
  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const id = anchor.getAttribute('href').slice(1)
      if (!id) return
      e.preventDefault()
      const target = document.getElementById(id)
      if (!target) return

      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72
      const start = window.scrollY
      const end = target.getBoundingClientRect().top + window.scrollY - navH
      const duration = 1100
      let startTime = null

      const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

      const step = ts => {
        if (!startTime) startTime = ts
        const p = Math.min((ts - startTime) / duration, 1)
        window.scrollTo(0, start + (end - start) * ease(p))
        if (p < 1) requestAnimationFrame(step)
      }

      requestAnimationFrame(step)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])
}

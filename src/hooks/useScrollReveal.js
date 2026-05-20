import { useEffect } from 'react'

export function useScrollReveal(selector) {
  useEffect(() => {
    const els = document.querySelectorAll(selector)
    if (!els.length) return

    els.forEach(el => el.classList.add('reveal'))

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')]
          const idx = siblings.indexOf(entry.target)
          setTimeout(() => entry.target.classList.add('visible'), idx * 80)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })

    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

import { useEffect } from 'react'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const normalizeDelta = (event) => {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 18
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return event.deltaY * window.innerHeight
  return event.deltaY
}

const getMaxScroll = () => (
  Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
  ) - window.innerHeight
)

const hasScrollableParent = (node) => {
  let current = node

  while (current && current !== document.body && current !== document.documentElement) {
    const style = window.getComputedStyle(current)
    const overflowY = style.overflowY
    const canScroll = /(auto|scroll)/.test(overflowY) && current.scrollHeight > current.clientHeight

    if (canScroll) return true
    current = current.parentElement
  }

  return false
}

export function useSmoothWheelScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    if (prefersReducedMotion || !hasFinePointer) return undefined

    let targetY = window.scrollY
    let currentY = window.scrollY
    let frame = 0
    let animating = false

    const stopAnimation = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      animating = false
    }

    const step = () => {
      currentY += (targetY - currentY) * 0.13

      if (Math.abs(targetY - currentY) < 0.45) {
        currentY = targetY
        window.scrollTo(0, currentY)
        stopAnimation()
        return
      }

      window.scrollTo(0, currentY)
      frame = requestAnimationFrame(step)
    }

    const onWheel = (event) => {
      if (document.body.style.overflow === 'hidden') return
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
      if (hasScrollableParent(event.target)) return

      const maxScroll = getMaxScroll()
      if (maxScroll <= 0) return

      event.preventDefault()

      if (!animating) {
        currentY = window.scrollY
        targetY = currentY
      }

      targetY = clamp(targetY + normalizeDelta(event), 0, maxScroll)

      if (!animating) {
        animating = true
        frame = requestAnimationFrame(step)
      }
    }

    const syncScrollPosition = () => {
      if (animating) return
      currentY = window.scrollY
      targetY = currentY
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', syncScrollPosition, { passive: true })

    return () => {
      stopAnimation()
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', syncScrollPosition)
    }
  }, [])
}

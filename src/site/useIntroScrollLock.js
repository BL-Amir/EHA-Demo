import { useLayoutEffect } from 'react'

export function useIntroScrollLock(locked) {
  useLayoutEffect(() => {
    if (!locked) return
    const root = document.documentElement
    const overflow = root.style.overflow
    const touchAction = root.style.touchAction
    root.style.overflow = 'hidden'
    root.style.touchAction = 'none'
    const preventScroll = (event) => {
      if (event.type === 'keydown' && !['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(event.key)) return
      event.preventDefault()
      event.stopImmediatePropagation()
    }
    const options = { capture: true, passive: false }
    window.addEventListener('wheel', preventScroll, options)
    window.addEventListener('touchmove', preventScroll, options)
    window.addEventListener('keydown', preventScroll, options)
    return () => {
      root.style.overflow = overflow
      root.style.touchAction = touchAction
      window.removeEventListener('wheel', preventScroll, true)
      window.removeEventListener('touchmove', preventScroll, true)
      window.removeEventListener('keydown', preventScroll, true)
    }
  }, [locked])
}

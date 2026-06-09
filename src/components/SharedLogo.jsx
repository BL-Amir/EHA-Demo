import { useEffect, useLayoutEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import LogoReveal from './LogoReveal'

const wordmarkHref = '/assets/images/logos/main-logo-square-alpha%20(no%20logomark).svg'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function SharedLogo({
  phase,
  navLogoSlotRef,
  drawn,
  navScrolled = false,
  onDrawn,
  onDocked,
}) {
  const logoRef = useRef(null)
  const baseRectRef = useRef(null)
  const dockedMetricsRef = useRef(null)
  const dockTimelineRef = useRef(null)
  const location = useLocation()

  const getDockedMetrics = () => {
    const logo = logoRef.current
    const target = navLogoSlotRef.current
    if (!logo || !target) return null

    const baseRect = baseRectRef.current || logo.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    const scale = (targetRect.height * 0.8) / baseRect.height
    const width = baseRect.width * scale
    const height = baseRect.height * scale

    return {
      left: targetRect.left + (targetRect.width - width) / 2,
      top: targetRect.top + (targetRect.height - height) / 2,
      width: baseRect.width,
      scale,
    }
  }

  const placeDocked = (metricsOverride = null, animate = false) => {
    const logo = logoRef.current
    const metrics = metricsOverride || getDockedMetrics()
    if (!logo || !metrics) return

    const nextState = {
      left: metrics.left,
      top: metrics.top,
      width: metrics.width,
      x: 0,
      y: 0,
      scale: metrics.scale,
      transformOrigin: 'top left',
    }

    if (animate && !prefersReducedMotion()) {
      gsap.to(logo, {
        ...nextState,
        duration: 0.55,
        ease: 'power3.out',
        overwrite: 'auto',
      })
      return
    }

    gsap.set(logo, nextState)
  }

  useLayoutEffect(() => {
    if (phase !== 'docking') return

    let frame = 0
    let secondFrame = 0

    frame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        const logo = logoRef.current
        const target = navLogoSlotRef.current
        if (!logo || !target) return

        dockTimelineRef.current?.kill()

        const fromRect = logo.getBoundingClientRect()
        baseRectRef.current = fromRect

        gsap.set(logo, {
          left: fromRect.left,
          top: fromRect.top,
          width: fromRect.width,
          x: 0,
          y: 0,
          scale: 1,
          transform: 'none',
          transformOrigin: 'top left',
        })

        const metrics = getDockedMetrics()
        if (!metrics) return
        dockedMetricsRef.current = metrics

        if (prefersReducedMotion()) {
          placeDocked(metrics)
          onDocked?.()
          return
        }

        dockTimelineRef.current = gsap.timeline({
          defaults: { ease: 'power3.inOut' },
          onComplete: () => {
            placeDocked(dockedMetricsRef.current)
            onDocked?.()
          },
        })

        dockTimelineRef.current.to(logo, {
          left: metrics.left,
          top: metrics.top,
          scale: metrics.scale,
          duration: 0.95,
        })
      })
    })

    return () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(secondFrame)
    }
  }, [phase, navLogoSlotRef, onDocked])

  useLayoutEffect(() => {
    if (phase !== 'docked') return

    let frame = 0
    let secondFrame = 0

    const schedulePlaceDocked = (animate = false) => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(secondFrame)

      frame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(() => {
          const nextMetrics = getDockedMetrics()
          dockedMetricsRef.current = nextMetrics
          placeDocked(nextMetrics, animate)
        })
      })
    }

    schedulePlaceDocked()

    const target = navLogoSlotRef.current
    const nav = document.querySelector('.nav')
    const resizeObserver = target ? new ResizeObserver(schedulePlaceDocked) : null
    const mutationObserver = new MutationObserver(schedulePlaceDocked)
    const navObserver = nav ? new MutationObserver(() => schedulePlaceDocked(true)) : null
    const handleScroll = () => schedulePlaceDocked(true)

    resizeObserver?.observe(target)
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-style', 'data-route', 'data-nav-scrolled'],
    })
    navObserver?.observe(nav, {
      attributes: true,
      attributeFilter: ['class'],
    })
    window.addEventListener('resize', schedulePlaceDocked)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(secondFrame)
      resizeObserver?.disconnect()
      mutationObserver.disconnect()
      navObserver?.disconnect()
      window.removeEventListener('resize', schedulePlaceDocked)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [phase, navLogoSlotRef, location.pathname])

  useLayoutEffect(() => {
    if (phase !== 'docked') return

    let frame = 0
    let secondFrame = 0

    frame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        const nextMetrics = getDockedMetrics()
        dockedMetricsRef.current = nextMetrics
        placeDocked(nextMetrics, true)
      })
    })

    return () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(secondFrame)
    }
  }, [phase, navScrolled])

  useEffect(() => {
    return () => dockTimelineRef.current?.kill()
  }, [])

  return (
    <div
      ref={logoRef}
      className={`shared-logo shared-logo--${phase}${drawn ? ' shared-logo--drawn' : ''}`}
      data-shared-logo
    >
      <Link to="/" className="shared-logo__link" aria-label="EH Architects home">
        <div className={`loading-brand${drawn ? ' loading-brand--drawn' : ''}`}>
          <LogoReveal
            className={`loading-screen__svg loading-logo${drawn ? ' loading-logo--drawn' : ''}`}
            revealMode="sequential"
            onComplete={onDrawn}
          />
          <div className="loading-brand__wordmark-wrap" aria-hidden="true">
            <img
              className="loading-brand__wordmark"
              src={wordmarkHref}
              alt=""
            />
          </div>
        </div>
      </Link>
    </div>
  )
}

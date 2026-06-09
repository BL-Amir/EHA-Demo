import { forwardRef, useEffect, useId, useImperativeHandle, useRef } from 'react'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

gsap.registerPlugin(DrawSVGPlugin)

const logoRevealPaths = [
  {
    id: 'reveal-1',
    label: 'Base stroke',
    width: 74,
    duration: 0.7,
    start: 0,
    cap: 'square',
    d: 'M 107 709 L 423 709',
  },
  {
    id: 'reveal-2',
    label: 'Left diagonal',
    width: 76,
    duration: 0.9,
    start: 0.7,
    cap: 'square',
    d: 'M 139 709 L 398 -6',
  },
  {
    id: 'reveal-3',
    label: 'Inner diagonal',
    width: 76,
    duration: 0.95,
    start: 1.6,
    cap: 'square',
    d: 'M 346 -7 L 583 709',
  },
  {
    id: 'reveal-5',
    label: 'Right diagonal',
    width: 76,
    duration: 0.95,
    start: 1.6,
    cap: 'square',
    d: 'M 500 -6 L 785 709',
  },
  {
    id: 'reveal-4',
    label: 'Crossbar',
    width: 74,
    duration: 0.75,
    start: 2.55,
    cap: 'square',
    d: 'M 100 475.5 L 793 475.5',
  },
]

const canUseDrawSVG = () => Boolean(gsap.plugins?.drawSVG)

const prepareFallbackStroke = (path) => {
  const length = path.getTotalLength()
  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
  })
}

const revealFallbackStroke = (path) => ({
  strokeDashoffset: 0,
})

const revealModes = {
  sequential: 'sequential',
  together: 'together',
}

const revealPathById = Object.fromEntries(logoRevealPaths.map((path) => [path.id, path]))

function RevealMaskPath({ revealId }) {
  const path = revealPathById[revealId]

  return (
    <path
      className="logo-reveal__stroke-path"
      data-reveal-id={path.id}
      aria-label={path.label}
      d={path.d}
      stroke="white"
      strokeWidth={path.width}
      strokeLinecap={path.cap}
      strokeLinejoin="miter"
      fill="none"
    />
  )
}

function buildLogoRevealTimeline(paths, animatedLayer, onComplete, revealMode = revealModes.sequential) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const useDrawSVG = canUseDrawSVG()

  gsap.set(animatedLayer, { opacity: 1 })

  paths.forEach((path) => {
    gsap.set(path, {
      drawSVG: useDrawSVG ? '0%' : undefined,
      opacity: 0,
      visibility: 'hidden',
    })

    if (!useDrawSVG) {
      prepareFallbackStroke(path)
    }
  })

  if (prefersReducedMotion) {
    gsap.set(paths, {
      drawSVG: useDrawSVG ? '0% 100%' : undefined,
      opacity: 1,
      strokeDashoffset: useDrawSVG ? undefined : 0,
      visibility: 'visible',
    })
    onComplete?.()
    return null
  }

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    onComplete,
  })

  let endTime = 0

  logoRevealPaths.forEach(({ id, duration, start }) => {
    const path = paths.find((item) => item.dataset.revealId === id)
    if (!path) return

    const position = revealMode === revealModes.together ? 0 : start

    tl.set(path, { opacity: 1, visibility: 'visible' }, position)
    tl.to(
      path,
      {
        ...(useDrawSVG ? { drawSVG: '0% 100%' } : revealFallbackStroke(path)),
        duration,
      },
      position,
    )

    endTime = Math.max(endTime, position + duration)
  })

  tl.set(animatedLayer, { opacity: 1 }, endTime + 0.01)

  return tl
}

const LogoReveal = forwardRef(function LogoReveal({
  className = '',
  onComplete,
  revealMode = revealModes.sequential,
}, ref) {
  const maskId = `logo-reveal-${useId().replace(/:/g, '')}`
  const svgRef = useRef(null)
  const timelineRef = useRef(null)

  const replay = () => {
    timelineRef.current?.kill()
    const paths = gsap.utils.toArray(svgRef.current.querySelectorAll('.logo-reveal__stroke-path'))
    const animatedLayer = svgRef.current.querySelector('.logo-reveal__animated-layer')
    timelineRef.current = buildLogoRevealTimeline(paths, animatedLayer, onComplete, revealMode)
  }

  useImperativeHandle(ref, () => ({ replay }))

  useEffect(() => {
    replay()

    return () => {
      timelineRef.current?.kill()
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      className={`logo-reveal ${className}`.trim()}
      viewBox="0 0 920 760"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="EH Architects"
    >
      <defs>
        <mask id={`${maskId}-base`} maskUnits="userSpaceOnUse" x="0" y="0" width="920" height="760">
          <rect width="920" height="760" fill="black" />
          <RevealMaskPath revealId="reveal-1" />
        </mask>
        <mask id={`${maskId}-left`} maskUnits="userSpaceOnUse" x="0" y="0" width="920" height="760">
          <rect width="920" height="760" fill="black" />
          <RevealMaskPath revealId="reveal-2" />
        </mask>
        <mask id={`${maskId}-slants`} maskUnits="userSpaceOnUse" x="0" y="0" width="920" height="760">
          <rect width="920" height="760" fill="black" />
          <RevealMaskPath revealId="reveal-3" />
          <RevealMaskPath revealId="reveal-5" />
        </mask>
        <mask id={`${maskId}-crossbar`} maskUnits="userSpaceOnUse" x="0" y="0" width="920" height="760">
          <rect width="920" height="760" fill="black" />
          <RevealMaskPath revealId="reveal-4" />
        </mask>
      </defs>
      <g className="logo-reveal__art logo-reveal__animated-layer" aria-hidden="true">
        <g id="stroke-1" mask={`url(#${maskId}-base)`}>
          <polygon points="118,683 412,683 434,735 96,735" />
        </g>
        <g id="stroke-2" mask={`url(#${maskId}-left)`}>
          <polygon points="96,735 366,69 376,69 404,135 182,682" />
        </g>
        <g id="stroke-3" mask={`url(#${maskId}-slants)`}>
          <polygon points="366,69 376,69 612,735 555,735 340,135" />
          <polygon points="503,69 557,69 813,735 758,735" />
        </g>
        <g id="stroke-4" mask={`url(#${maskId}-crossbar)`}>
          <polygon points="110,449 782,449 804,502 91,502" />
        </g>
      </g>
    </svg>
  )
})

export { logoRevealPaths, revealModes }
export default LogoReveal

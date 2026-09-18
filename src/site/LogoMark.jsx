export const LOGO_MARK_VIEWBOX = '0 0 920 760'

export const logoMarkGroups = [
  {
    id: 'base',
    label: 'Base stroke',
    points: '118,683 412,683 434,735 96,735',
  },
  {
    id: 'left-diagonal',
    label: 'Left diagonal',
    points: '96,735 366,69 376,69 404,135 182,682',
  },
  {
    id: 'inner-diagonal',
    label: 'Inner diagonal',
    points: '366,69 376,69 612,735 555,735 340,135',
  },
  {
    id: 'right-diagonal',
    label: 'Right diagonal',
    points: '503,69 557,69 813,735 758,735',
  },
  {
    id: 'crossbar',
    label: 'Crossbar',
    points: '110,449 782,449 804,502 91,502',
  },
]

export function LogoMarkShapes({ groupProps }) {
  return logoMarkGroups.map(group => (
    <g key={group.id} {...groupProps?.(group)}><polygon points={group.points} /></g>
  ))
}

export default function LogoMark({
  className = '',
  decorative = false,
  label = 'EH Architects',
}) {
  return (
    <svg
      className={className}
      viewBox={LOGO_MARK_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? 'true' : undefined}
      aria-label={decorative ? undefined : label}
      focusable="false"
    >
      <g fill="currentColor">
        <LogoMarkShapes />
      </g>
    </svg>
  )
}

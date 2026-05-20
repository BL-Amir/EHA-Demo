import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

const leftProjects = [projects[0], projects[2]]
const rightProjects = [projects[1], projects[3]]

export default function SelectedWork() {
  const rightColRef = useRef(null)

  useEffect(() => {
    const rightCol = rightColRef.current
    if (!rightCol) return

    const baseOffset = 80

    const onScroll = () => {
      const section = rightCol.closest('.work')
      if (!section) return
      const rect = section.getBoundingClientRect()
      const windowH = window.innerHeight
      const progress = Math.max(0, Math.min(1, (windowH - rect.top) / (windowH + rect.height)))
      rightCol.style.transform = `translateY(${baseOffset - progress * 60}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="work" id="work">
      <div className="work__header">
        <span className="section-label">Selected Work</span>
        <Link to="/work" className="work__view-all">View all</Link>
      </div>
      <div className="work__columns">
        <div className="work__col work__col--left">
          {leftProjects.map(p => (
            <Link to={`/work/${p.slug}`} className="work__item" key={p.code}>
              <div className="work__img-wrap">
                <img src={p.coverImg} alt={p.code} className="work__img" />
              </div>
              <div className="work__meta">
                <span className="work__title">{p.code}</span>
                <span className="work__type">{p.category}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="work__col work__col--right" ref={rightColRef}>
          {rightProjects.map(p => (
            <Link to={`/work/${p.slug}`} className="work__item" key={p.code}>
              <div className="work__img-wrap">
                <img src={p.coverImg} alt={p.code} className="work__img" />
              </div>
              <div className="work__meta">
                <span className="work__title">{p.code}</span>
                <span className="work__type">{p.category}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

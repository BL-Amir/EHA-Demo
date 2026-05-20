import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { projects } from '../data/projects'

export default function Work() {
  useScrollReveal('.work-grid__item, .work-page__header')

  return (
    <div className="work-page">
      <div className="work-page__header">
        <h1 className="work-page__title">Work</h1>
      </div>

      <div className="work-grid">
        {projects.map(p => (
          <Link to={`/work/${p.slug}`} className="work-grid__item" key={p.code}>
            <div className="work-grid__img-wrap">
              <img src={p.coverImg} alt={p.code} className="work-grid__img" />
              <div className="work-grid__overlay">
                <span className="work-grid__overlay-title">{p.code}</span>
              </div>
            </div>
            <div className="work-grid__meta">
              <span className="work-grid__title">{p.code}</span>
              <span className="work-grid__info">{p.category}</span>
            </div>
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  )
}

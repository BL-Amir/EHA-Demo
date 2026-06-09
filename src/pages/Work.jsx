import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { projects } from '../data/projects'

function WorkGridCard({ project }) {
  if (project.placeholder) {
    return (
      <article className="work-grid__item work-grid__item--placeholder" aria-label={`${project.code} forthcoming`}>
        <div className="work-grid__img-wrap work-grid__placeholder-img" aria-hidden="true"></div>
        <div className="work-grid__meta">
          <span className="work-grid__title">{project.code}</span>
          <span className="work-grid__info">{project.category}</span>
        </div>
      </article>
    )
  }

  return (
    <Link to={`/work/${project.slug}`} className="work-grid__item">
      <div className="work-grid__img-wrap">
        <img src={project.coverImg} alt={project.code} className="work-grid__img" />
        <div className="work-grid__overlay">
          <span className="work-grid__overlay-title">{project.code}</span>
        </div>
      </div>
      <div className="work-grid__meta">
        <span className="work-grid__title">{project.code}</span>
        <span className="work-grid__info">{project.category}</span>
      </div>
    </Link>
  )
}

export default function Work() {
  useScrollReveal('.work-grid__item, .work-page__header')

  return (
    <div className="work-page">
      <div className="work-page__header">
        <h1 className="work-page__title">Portfolio</h1>
      </div>

      <div className="work-grid">
        {projects.map(p => <WorkGridCard project={p} key={p.code} />)}
      </div>

      <Footer />
    </div>
  )
}

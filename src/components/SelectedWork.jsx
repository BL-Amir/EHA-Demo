import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

function WorkCard({ project }) {
  if (project.placeholder) {
    return (
      <article className="work__item work__item--placeholder" aria-label={`${project.code} forthcoming`}>
        <div className="work__img-wrap work__placeholder-img" aria-hidden="true"></div>
        <div className="work__meta">
          <span className="work__title">{project.code}</span>
          <span className="work__type">{project.category}</span>
        </div>
      </article>
    )
  }

  return (
    <Link to={`/work/${project.slug}`} className="work__item">
      <div className="work__img-wrap">
        <img src={project.coverImg} alt={project.code} className="work__img" />
      </div>
      <div className="work__meta">
        <span className="work__title">{project.code}</span>
        <span className="work__type">{project.category}</span>
      </div>
    </Link>
  )
}

export default function SelectedWork() {
  return (
    <section className="work" id="work">
      <div className="work__header">
        <Link to="/work" className="work__view-all">View all</Link>
      </div>
      <div className="work__grid">
        {projects.map(p => <WorkCard project={p} key={p.code} />)}
      </div>
    </section>
  )
}

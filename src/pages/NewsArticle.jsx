import { useParams, Link, Navigate } from 'react-router-dom'
import { articles } from '../data/articles'
import Footer from '../components/Footer'

export default function NewsArticle() {
  const { slug } = useParams()
  const idx = articles.findIndex(a => a.slug === slug)

  if (idx === -1) return <Navigate to="/news" replace />

  const article = articles[idx]
  const prev = idx > 0 ? articles[idx - 1] : null
  const next = idx < articles.length - 1 ? articles[idx + 1] : null

  return (
    <div className="article-page">
      <div className="article-header">
        <span className="article-header__date">{article.date}</span>
        <h1 className="article-header__title">{article.title}</h1>
        <Link to="/news" className="article-header__back">← All News</Link>
      </div>

      <div className="article-body">
        {article.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <nav className="project-nav">
        <div className="project-nav__inner">
          {prev
            ? <Link to={`/news/${prev.slug}`} className="project-nav__link project-nav__link--prev">
                <span className="project-nav__dir">← Previous</span>
                <span className="project-nav__name">{prev.title}</span>
              </Link>
            : <span />
          }
          {next &&
            <Link to={`/news/${next.slug}`} className="project-nav__link project-nav__link--next">
              <span className="project-nav__dir">Next →</span>
              <span className="project-nav__name">{next.title}</span>
            </Link>
          }
        </div>
      </nav>

      <Footer />
    </div>
  )
}

import { Link } from 'react-router-dom'
import { articles } from '../data/articles'

export default function News() {
  return (
    <section className="news" id="news">
      <div className="news__header">
        <span className="section-label">News</span>
      </div>
      <div className="news__grid">
        {articles.map(a => (
          <Link to={`/news/${a.slug}`} className="news__item" key={a.slug}>
            <span className="news__date">{a.date}</span>
            <h3 className="news__title">{a.title}</h3>
            <p className="news__excerpt">{a.excerpt}</p>
            <span className="news__read">Read more</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

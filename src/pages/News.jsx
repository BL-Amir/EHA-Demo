import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { articles } from '../data/articles'

export default function News() {
  useScrollReveal('.news-page__item')

  return (
    <div className="news-page">
      <div className="news-page__header reveal">
        <h1 className="news-page__title">News</h1>
      </div>

      <div className="news-page__list">
        {articles.map(a => (
          <Link to={`/news/${a.slug}`} className="news-page__item reveal" key={a.slug}>
            <span className="news-page__date">{a.date}</span>
            <div className="news-page__body">
              <h2 className="news-page__item-title">{a.title}</h2>
              <p className="news-page__excerpt">{a.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  )
}

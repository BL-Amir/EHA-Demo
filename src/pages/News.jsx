import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import NewsMedia from '../components/NewsMedia'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { articles } from '../data/articles'

export default function News() {
  const [featured, ...supporting] = articles

  useScrollReveal('.news-page__header, .news-page__feature')

  return (
    <div className="news-page">
      <div className="news-page__header reveal">
        <h1 className="news-page__title">News</h1>
      </div>

      <Link to={`/news/${featured.slug}`} className="news-page__feature reveal">
        <div className="news-page__feature-copy">
          <span className="news-page__date">{featured.date}</span>
          <h2 className="news-page__feature-title">{featured.title}</h2>
          <p className="news-page__feature-excerpt">{featured.excerpt}</p>
          <span className="news__read">Read more</span>
        </div>
        <NewsMedia article={featured} className="news-page__feature-visual" />
      </Link>

      <div className="news-page__list">
        {supporting.map(a => (
          <Link to={`/news/${a.slug}`} className="news-page__item" key={a.slug}>
            <NewsMedia article={a} className="news-page__item-media" />
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

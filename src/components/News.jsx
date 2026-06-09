import { Link } from 'react-router-dom'
import { articles } from '../data/articles'
import NewsMedia from './NewsMedia'

export default function News() {
  const [featured, ...supporting] = articles

  return (
    <section className="news" id="news">
      <div className="news__editorial">
        <Link to={`/news/${featured.slug}`} className="news__feature">
          <div className="news__feature-copy">
            <span className="news__date">{featured.date}</span>
            <h3 className="news__feature-title">{featured.title}</h3>
            <p className="news__feature-excerpt">{featured.excerpt}</p>
            <span className="news__read">Read more</span>
          </div>
          <NewsMedia article={featured} className="news__feature-visual" />
        </Link>

        <div className="news__supporting">
          {supporting.map(a => (
            <Link to={`/news/${a.slug}`} className="news__item" key={a.slug}>
              <NewsMedia article={a} className="news__item-media" />
              <span className="news__date">{a.date}</span>
              <h3 className="news__title">{a.title}</h3>
              <p className="news__excerpt">{a.excerpt}</p>
              <span className="news__read">Read more</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { articles } from '../data/articles'
import Footer from '../components/Footer'
import NewsMedia from '../components/NewsMedia'

export default function NewsArticle() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [transitionState, setTransitionState] = useState('entering')
  const [transitionDirection, setTransitionDirection] = useState('next')
  const transitionTimerRef = useRef(null)
  const idx = articles.findIndex(a => a.slug === slug)

  useEffect(() => {
    setTransitionState('entering')
    const frame = requestAnimationFrame(() => setTransitionState('idle'))

    return () => {
      cancelAnimationFrame(frame)
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current)
      }
    }
  }, [slug])

  if (idx === -1) return <Navigate to="/news" replace />

  const article = articles[idx]
  const prev = idx > 0 ? articles[idx - 1] : null
  const next = idx < articles.length - 1 ? articles[idx + 1] : null

  const handleArticleNav = (event, targetSlug, direction) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return
    }

    event.preventDefault()

    if (transitionState === 'exiting') return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      navigate(`/news/${targetSlug}`)
      return
    }

    setTransitionDirection(direction)
    setTransitionState('exiting')

    transitionTimerRef.current = setTimeout(() => {
      navigate(`/news/${targetSlug}`)
    }, 320)
  }

  return (
    <div className="article-page">
      <div
        className={`article-transition article-transition--${transitionState} article-transition--${transitionDirection}`}
        key={article.slug}
      >
        <NewsMedia article={article} className="article-media" />

        <div className="article-header">
          <Link to="/news" className="article-header__back">&larr; All News</Link>
          <span className="article-header__date">{article.date}</span>
          <h1 className="article-header__title">{article.title}</h1>
        </div>

        <div className="article-body">
          {article.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <nav className="project-nav">
          <div className="project-nav__inner">
            {prev
              ? <Link
                  to={`/news/${prev.slug}`}
                  className="project-nav__link project-nav__link--prev"
                  onClick={(event) => handleArticleNav(event, prev.slug, 'prev')}
                >
                  <span className="project-nav__dir">&larr; Previous</span>
                  <span className="project-nav__name">{prev.title}</span>
                </Link>
              : <span />
            }
            {next &&
              <Link
                to={`/news/${next.slug}`}
                className="project-nav__link project-nav__link--next"
                onClick={(event) => handleArticleNav(event, next.slug, 'next')}
              >
                <span className="project-nav__dir">Next &rarr;</span>
                <span className="project-nav__name">{next.title}</span>
              </Link>
            }
          </div>
        </nav>
      </div>

      <Footer />
    </div>
  )
}

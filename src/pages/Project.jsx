import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { realProjects } from '../data/projects'
import Footer from '../components/Footer'
import Lightbox from '../components/Lightbox'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Project() {
  const { slug } = useParams()
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [moreOpen, setMoreOpen] = useState(false)

  const idx = realProjects.findIndex(p => p.slug === slug)

  if (idx === -1) {
    return <Navigate to="/work" replace />
  }

  const project = realProjects[idx]
  const prev = idx > 0 ? realProjects[idx - 1] : null
  const next = idx < realProjects.length - 1 ? realProjects[idx + 1] : null

  const hero = project.images[0]
  const rest = project.images.slice(1)

  const blocks = []
  let i = 0
  while (i < rest.length) {
    if (rest.length - i <= 3 || blocks.length >= 4) {
      blocks.push({ type: 'grid', imgs: rest.slice(i), startIdx: i + 1 })
      break
    }
    if (i + 1 < rest.length) {
      blocks.push({ type: 'pair', imgs: [rest[i], rest[i + 1]], startIdx: i + 1 })
      i += 2
    }
    if (i < rest.length && blocks.length < 4) {
      blocks.push({ type: 'full', imgs: [rest[i]], startIdx: i + 1 })
      i += 1
    }
  }

  const openLightbox = imgIndex => setLightboxIndex(imgIndex)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => setLightboxIndex(i => Math.max(0, i - 1))
  const nextImage = () => setLightboxIndex(i => Math.min(project.images.length - 1, i + 1))

  useScrollReveal('.project-gallery__pair, .project-gallery__full, .project-gallery__grid')

  return (
    <div className="project-page">
      <div className="project-hero" onClick={() => openLightbox(0)}>
        <img src={hero} alt={project.code} className="project-hero__img" />
      </div>

      <div className="project-info">
        <div className="project-info__left">
          <h1 className="project-info__code">{project.code}</h1>
          <span className="project-info__category">{project.category}</span>
        </div>
        <Link to="/work" className="project-info__back">&larr; All Portfolio</Link>
      </div>

      <div className="project-brief">
        <p className="project-brief__text">{project.brief}</p>

        {project.collaborators?.length > 0 && (
          <div className="project-more-info">
            <button
              className="project-more-info__toggle"
              onClick={() => setMoreOpen(o => !o)}
            >
              {moreOpen ? '- Less Info' : '+ More Info'}
            </button>
            <div className={`project-more-info__panel${moreOpen ? ' open' : ''}`}>
              <dl className="project-collaborators">
                {project.collaborators.map((c, i) => (
                  <div className="project-collaborators__row" key={i}>
                    <dt>{c.role}</dt>
                    <dd>{c.name}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}
      </div>

      <div className="project-gallery">
        {blocks.map((block, bi) => {
          if (block.type === 'pair') {
            return (
              <div className="project-gallery__pair reveal" key={bi}>
                {block.imgs.map((src, ii) => (
                  <div
                    className="project-gallery__pair-img"
                    key={ii}
                    onClick={() => openLightbox(block.startIdx + ii)}
                  >
                    <img src={src} alt={`${project.code} ${bi}-${ii}`} loading="lazy" />
                  </div>
                ))}
              </div>
            )
          }
          if (block.type === 'full') {
            return (
              <div
                className="project-gallery__full reveal"
                key={bi}
                onClick={() => openLightbox(block.startIdx)}
              >
                <img src={block.imgs[0]} alt={`${project.code} ${bi}`} loading="lazy" />
              </div>
            )
          }
          return (
            <div className="project-gallery__grid reveal" key={bi}>
              {block.imgs.map((src, ii) => (
                <div
                  className="project-gallery__grid-img"
                  key={ii}
                  onClick={() => openLightbox(block.startIdx + ii)}
                >
                  <img src={src} alt={`${project.code} ${bi}-${ii}`} loading="lazy" />
                </div>
              ))}
            </div>
          )
        })}
      </div>

      <nav className="project-nav">
        <div className="project-nav__inner">
          {prev
            ? <Link to={`/work/${prev.slug}`} className="project-nav__link project-nav__link--prev">
                <span className="project-nav__dir">&larr; Previous</span>
                <span className="project-nav__name">{prev.code}</span>
              </Link>
            : <span />
          }
          {next &&
            <Link to={`/work/${next.slug}`} className="project-nav__link project-nav__link--next">
              <span className="project-nav__dir">Next &rarr;</span>
              <span className="project-nav__name">{next.code}</span>
            </Link>
          }
        </div>
      </nav>

      <Footer />

      {lightboxIndex !== null && (
        <Lightbox
          images={project.images}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  )
}

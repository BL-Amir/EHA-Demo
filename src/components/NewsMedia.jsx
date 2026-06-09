import NewsFeatureGraphic from './NewsFeatureGraphic'

export default function NewsMedia({ article, className = '' }) {
  if (!article?.image) {
    return <NewsFeatureGraphic className={className} />
  }

  return (
    <figure className={`news-media ${className}`.trim()}>
      <img
        src={article.image}
        alt={article.imageAlt || ''}
        loading="lazy"
        style={{ objectPosition: article.imagePosition || 'center' }}
      />
    </figure>
  )
}

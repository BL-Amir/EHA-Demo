export default function NewsFeatureGraphic({ className = '' }) {
  return (
    <figure className={`news-feature-graphic ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 640 480" focusable="false">
        <rect className="news-feature-graphic__wash" x="0" y="0" width="640" height="480" />
        <path className="news-feature-graphic__line news-feature-graphic__line--soft" d="M80 66 H562" />
        <path className="news-feature-graphic__line news-feature-graphic__line--soft" d="M80 414 H562" />
        <path className="news-feature-graphic__line news-feature-graphic__line--soft" d="M104 66 V414" />
        <path className="news-feature-graphic__line news-feature-graphic__line--soft" d="M508 66 V414" />
        <path className="news-feature-graphic__line" d="M156 360 L302 112 L442 360" />
        <path className="news-feature-graphic__line news-feature-graphic__line--strong" d="M168 304 H498" />
        <path className="news-feature-graphic__line" d="M348 112 L486 360" />
        <path className="news-feature-graphic__line news-feature-graphic__line--fine" d="M104 238 H508" />
        <path className="news-feature-graphic__line news-feature-graphic__line--fine" d="M236 66 V414" />
        <path className="news-feature-graphic__line news-feature-graphic__line--fine" d="M372 66 V414" />
      </svg>
    </figure>
  )
}

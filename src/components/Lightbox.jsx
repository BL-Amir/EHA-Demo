import { useEffect, useCallback } from 'react'

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const hasPrev = index > 0
  const hasNext = index < images.length - 1

  const handleKey = useCallback(e => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft' && hasPrev) onPrev()
    if (e.key === 'ArrowRight' && hasNext) onNext()
  }, [onClose, onPrev, onNext, hasPrev, hasNext])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox__close" onClick={onClose} aria-label="Close">&#x2715;</button>

      {hasPrev && (
        <button
          className="lightbox__arrow lightbox__arrow--prev"
          onClick={e => { e.stopPropagation(); onPrev() }}
          aria-label="Previous"
        >
          <span className="lightbox__bar" />
        </button>
      )}

      <div className="lightbox__img-wrap" onClick={e => e.stopPropagation()}>
        <img
          src={images[index]}
          alt={`Image ${index + 1}`}
          className="lightbox__img"
        />
      </div>

      {hasNext && (
        <button
          className="lightbox__arrow lightbox__arrow--next"
          onClick={e => { e.stopPropagation(); onNext() }}
          aria-label="Next"
        >
          <span className="lightbox__bar" />
        </button>
      )}

      <span className="lightbox__counter">{index + 1} / {images.length}</span>
    </div>
  )
}

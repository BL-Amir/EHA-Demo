import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__image-wrap">
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/images/18 WHG/_DSC4340.jpg"
        >
          <source src="/assets/video/fireplace.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="hero__text">
        <span className="hero__label">Architects, Masterplanners &amp; Designers</span>
        <div className="hero__statement">
          <a href="#work" className="hero__scroll-cue" aria-label="Scroll down">
            <span className="hero__scroll-line"></span>
          </a>
          <h1 className="hero__heading">Architecture<br />with Intention.</h1>
        </div>
        <Link to="/work" className="hero__cta">View Portfolio</Link>
      </div>
    </section>
  )
}

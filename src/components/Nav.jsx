import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    document.body.style.overflow = ''
    window.scrollTo(0, 0)
  }, [location.pathname])

  const toggleMenu = () => {
    const next = !menuOpen
    setMenuOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  const spanStyle = (i) => menuOpen
    ? { transform: i === 0 ? 'translateY(3.5px) rotate(45deg)' : 'translateY(-3.5px) rotate(-45deg)' }
    : {}

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <Link to="/" className="nav__logo">
          {logoError
            ? <span className="nav__logo-fallback">EHARCHITECTS</span>
            : <img
                src="/assets/images/logos/main-logo-square-alpha.png"
                alt="EH Architects"
                className="nav__logo-img"
                onError={() => setLogoError(true)}
              />
          }
        </Link>
        <ul className="nav__links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/work">Work</Link></li>
          <li><Link to="/news">News</Link></li>
          <li><Link to="/#contact">Contact</Link></li>
        </ul>
        <button className="nav__burger" aria-label="Menu" onClick={toggleMenu}>
          <span style={spanStyle(0)}></span>
          <span style={spanStyle(1)}></span>
        </button>
      </nav>

      <div className={`nav__mobile-menu${menuOpen ? ' open' : ''}`}>
        <ul>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/work" onClick={closeMenu}>Work</Link></li>
          <li><Link to="/#news" onClick={closeMenu}>News</Link></li>
          <li><Link to="/#contact" onClick={closeMenu}>Contact</Link></li>
        </ul>
      </div>
    </>
  )
}

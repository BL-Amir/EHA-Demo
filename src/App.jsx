import { useCallback, useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import ThemeSwitcher from './components/ThemeSwitcher'
import LoadingScreen from './components/LoadingScreen'
import SharedLogo from './components/SharedLogo'
import Home from './pages/Home'
import Work from './pages/Work'
import Project from './pages/Project'
import AboutPage from './pages/About'
import NewsPage from './pages/News'
import NewsArticle from './pages/NewsArticle'
import { useSmoothWheelScroll } from './hooks/useSmoothWheelScroll'

export default function App() {
  const [introPhase, setIntroPhase] = useState('active')
  const [logoDrawn, setLogoDrawn] = useState(false)
  const [logoPhase, setLogoPhase] = useState('loading')
  const [navScrolled, setNavScrolled] = useState(false)
  const navLogoSlotRef = useRef(null)
  const location = useLocation()
  useSmoothWheelScroll()

  const handleLogoDocked = useCallback(() => {
    setIntroPhase('done')
    setLogoPhase('docked')
  }, [])

  const handleEnter = () => {
    if (!logoDrawn || logoPhase !== 'loading') return

    setIntroPhase('exiting')
    setLogoPhase('docking')
  }

  const showIntro = introPhase !== 'done'
  const isProjectRoute = /^\/work\/[^/]+/.test(location.pathname)

  useEffect(() => {
    const root = document.documentElement
    const storedTheme = localStorage.getItem('eh-theme')
    const theme = ['light', 'dark', 'classic-dark'].includes(storedTheme)
      ? storedTheme
      : 'classic-dark'

    if (theme === 'light') {
      delete root.dataset.theme
    } else {
      root.dataset.theme = theme
    }

    root.dataset.style = 'architectural'
  }, [])

  useEffect(() => {
    const root = document.documentElement

    if (isProjectRoute) {
      root.dataset.route = 'project'
    } else {
      delete root.dataset.route
    }
  }, [isProjectRoute])

  return (
    <>
      <SharedLogo
        phase={logoPhase}
        navLogoSlotRef={navLogoSlotRef}
        drawn={logoDrawn}
        navScrolled={navScrolled}
        onDrawn={() => setLogoDrawn(true)}
        onDocked={handleLogoDocked}
      />
      {showIntro && (
        <LoadingScreen
          drawn={logoDrawn}
          exiting={introPhase === 'exiting'}
          onEnter={handleEnter}
        />
      )}
      <Nav
        introPhase={introPhase}
        logoSlotRef={navLogoSlotRef}
        sharedLogoActive
        onScrolledChange={setNavScrolled}
      />
      {!showIntro && (
        <div className={`switcher-dock${isProjectRoute ? ' switcher-dock--project' : ''}`} aria-label="Display controls">
          <div className="switcher-control">
            <span className="switcher-control__label">Palette</span>
            <ThemeSwitcher />
          </div>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<Project />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:slug" element={<NewsArticle />} />
      </Routes>
    </>
  )
}

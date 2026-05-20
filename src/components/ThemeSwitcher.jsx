import { useState, useEffect } from 'react'

const THEMES = ['light', 'dark', 'warm', 'bold']

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('eh-theme') || 'light'
  )

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      delete root.dataset.theme
    } else {
      root.dataset.theme = theme
    }
    localStorage.setItem('eh-theme', theme)
  }, [theme])

  const cycle = () => {
    const next = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length]
    setTheme(next)
  }

  return (
    <button className="theme-switcher" onClick={cycle} aria-label="Switch theme">
      {theme}
    </button>
  )
}

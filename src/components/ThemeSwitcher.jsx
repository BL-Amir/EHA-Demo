import { useState, useEffect, useRef } from 'react'

const themes = ['light', 'dark', 'classic-dark']
const themeLabels = {
  light: 'Light',
  dark: 'Brown',
  'classic-dark': 'Dark',
}

function getInitialTheme() {
  const stored = localStorage.getItem('eh-theme')
  if (themes.includes(stored)) return stored
  return 'classic-dark'
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      delete root.dataset.theme
    } else {
      root.dataset.theme = theme
    }
    localStorage.setItem('eh-theme', theme)
  }, [theme])

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const selectTheme = (value) => {
    setTheme(value)
    setOpen(false)
  }

  return (
    <div className="theme-switcher-wrap" ref={menuRef}>
      <button
        type="button"
        className={`theme-switcher${open ? ' theme-switcher--open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select colour palette"
        onClick={() => setOpen((next) => !next)}
      >
        {themeLabels[theme]}
      </button>

      {open && (
        <div className="theme-switcher__menu" role="listbox" aria-label="Colour palette">
          {themes.map((value) => (
            <button
              type="button"
              className={`theme-switcher__option${theme === value ? ' theme-switcher__option--active' : ''}`}
              role="option"
              aria-selected={theme === value}
              key={value}
              onClick={() => selectTheme(value)}
            >
              {themeLabels[value]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

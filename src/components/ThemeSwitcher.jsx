import { useEffect, useRef, useState } from 'react'
import themes from '../data/themes.js'

const STORAGE_KEY = 'tri-grid-theme'

function getInitialTheme() {
  const storedTheme = window.localStorage.getItem(STORAGE_KEY)
  return themes.some((theme) => theme.id === storedTheme)
    ? storedTheme
    : themes[0].id
}

function ThemeSwitcher({ mobile = false }) {
  const [themeId, setThemeId] = useState(getInitialTheme)
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)
  const current = themes.find((theme) => theme.id === themeId) || themes[0]

  useEffect(() => {
    document.documentElement.dataset.theme = themeId
    window.localStorage.setItem(STORAGE_KEY, themeId)
    window.dispatchEvent(new CustomEvent('tri-grid-theme-change', { detail: themeId }))
  }, [themeId])

  useEffect(() => {
    function syncTheme(event) {
      if (themes.some((theme) => theme.id === event.detail)) {
        setThemeId(event.detail)
      }
    }

    window.addEventListener('tri-grid-theme-change', syncTheme)
    return () => window.removeEventListener('tri-grid-theme-change', syncTheme)
  }, [])

  useEffect(() => {
    function onClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function selectTheme(nextTheme) {
    setThemeId(nextTheme)
    setOpen(false)
  }

  if (mobile) {
    return (
      <div className="mobile-nav__themes" aria-label="Theme">
        {themes.map((theme) => (
          <button
            type="button"
            key={theme.id}
            className={theme.id === themeId ? 'is-active' : ''}
            onClick={() => selectTheme(theme.id)}
          >
            {theme.name}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="dropdown" ref={wrapperRef}>
      <button
        type="button"
        className="dropdown__toggle"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Theme: ${current.name}`}
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        {current.label}
        <svg className="dropdown__chevron" viewBox="0 0 12 8" aria-hidden="true">
          <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <ul className={`dropdown__menu ${open ? 'is-open' : ''}`} role="listbox">
        {themes.map((theme) => (
          <li key={theme.id} role="option" aria-selected={theme.id === themeId}>
            <button
              type="button"
              className={theme.id === themeId ? 'is-active' : ''}
              onClick={() => selectTheme(theme.id)}
            >
              {theme.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ThemeSwitcher

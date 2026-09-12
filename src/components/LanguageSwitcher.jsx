import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import languages from '../data/languages.js'

const langCodes = languages.map((l) => l.code)
const langPathRegex = new RegExp(`^/(${langCodes.join('|')})`)

function LanguageSwitcher({ mobile = false }) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)
  const location = useLocation()
  const { lang } = useParams()

  const current = languages.find((l) => l.code === lang) || languages[0]
  const restOfPath = location.pathname.replace(langPathRegex, '')

  // Zavřít při navigaci (výběr jazyka, tlačítko zpět...)
  useEffect(() => {
    setOpen(false)
  }, [location])

  // Zavřít při kliknutí mimo dropdown
  useEffect(() => {
    function onClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  if (mobile) {
    return (
      <div className="mobile-nav__langs" aria-label="Language">
        {languages.map((l) => (
          <Link
            key={l.code}
            to={`/${l.code}${restOfPath}${location.hash}`}
            className={l.code === lang ? 'is-active' : ''}
          >
            <span aria-hidden="true">{l.flag}</span>{' '}
            {l.label}
          </Link>
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
        onClick={() => setOpen((o) => !o)}
      >
        <span aria-hidden="true">{current.flag}</span>
        {current.label}
      </button>

      <ul className={`dropdown__menu ${open ? 'is-open' : ''}`} role="listbox">
        {languages.map((l) => (
          <li key={l.code} role="option" aria-selected={l.code === lang}>
            <Link
              to={`/${l.code}${restOfPath}${location.hash}`}
              className={l.code === lang ? 'is-active' : ''}
            >
              <span aria-hidden="true">{l.flag}</span>{' '}
              {l.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LanguageSwitcher

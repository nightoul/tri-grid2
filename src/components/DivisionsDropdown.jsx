import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import divisions from '../data/divisions.js'

function DivisionsDropdown() {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)
  const location = useLocation()
  const { lang } = useParams()
  const { t } = useTranslation()

  // Zavřít při navigaci (výběr divize, tlačítko zpět...)
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

  return (
    <div className="dropdown" ref={wrapperRef}>
      <button
        type="button"
        className="dropdown__toggle"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {t('nav.divisions')}
      </button>

      <ul className={`dropdown__menu dropdown__menu--left ${open ? 'is-open' : ''}`} role="listbox">
        {divisions.map((d) => (
          <li key={d.id} role="option">
            <Link to={`/${lang}/divize/${d.id}`}>
              {t(`divisionsData.${d.id}.label`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DivisionsDropdown

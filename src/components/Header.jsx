import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logoFullCz from '../assets/logo-full-cz.svg'
import logoFullEn from '../assets/logo-full-en.svg'
import divisions from '../data/divisions.js'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import DivisionsDropdown from './DivisionsDropdown.jsx'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24)
  const location = useLocation()
  const { lang } = useParams()
  const isHomepage = location.pathname.replace(/\/$/, '') === `/${lang}`
  const isDivisionPage = divisions.some(
    ({ id }) => location.pathname.replace(/\/$/, '') === `/${lang}/divize/${id}`
  )
  const { t } = useTranslation()
  const logoFullWeb = lang === 'en' ? logoFullEn : logoFullCz
  const logoAlt = lang === 'en'
    ? 'Tri-Grid s.r.o. — Electrical, Metalworking, Construction'
    : 'Tri-Grid s.r.o. — Elektrotechnika, Kovovýroba, Stavebnictví'

  // Zavřít menu při každé navigaci (klik na odkaz, tlačítko zpět v prohlížeči...)
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 24)
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    return () => window.removeEventListener('scroll', updateScroll)
  }, [])

  // Poskládá odkaz s aktuálním jazykem vpředu, např. langPath('/o-nas') -> '/cs/o-nas'
  const langPath = (path = '') => `/${lang}${path}`

  return (
    <header className={`site-header ${(isHomepage || isDivisionPage) && !scrolled && !menuOpen ? 'site-header--transparent' : ''} ${menuOpen ? 'is-menu-open' : ''}`}>
      <div className="site-header__strip" aria-hidden="true">
        {divisions.map((division) => (
          <span
            key={division.id}
            className={`site-header__strip-seg site-header__strip-seg--${division.accent}${location.pathname.replace(/\/$/, '') === langPath(`/divize/${division.id}`) ? ' is-active' : ''}`}
          />
        ))}
      </div>
      <div className="container site-header__inner">
        <Link to={langPath()} className="logo-mark">
          <img src={logoFullWeb} alt={logoAlt} className="logo-mark__image" />
        </Link>

        <nav className="nav">
          <DivisionsDropdown />
          <Link to={langPath('/o-nas')}>{t('nav.about')}</Link>
          <Link to={langPath('#kontakt')}>{t('nav.contact')}</Link>
          <LanguageSwitcher />
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="menu-toggle__bar" />
          <span className="menu-toggle__bar" />
          <span className="menu-toggle__bar" />
        </button>
      </div>

      <nav className="mobile-nav" aria-hidden={!menuOpen}>
        {divisions.map((d) => (
          <Link key={d.id} to={langPath(`/divize/${d.id}`)}>
            {t(`divisionsData.${d.id}.label`)}
          </Link>
        ))}
        <Link to={langPath('/o-nas')}>{t('nav.about')}</Link>
        <Link to={langPath('#kontakt')}>{t('nav.contact')}</Link>
        <LanguageSwitcher mobile />
      </nav>
    </header>
  )
}

export default Header

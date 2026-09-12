import { useEffect } from 'react'
import { Outlet, useLocation, useParams, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import languages from '../data/languages.js'
import themes from '../data/themes.js'

const SUPPORTED_LANGS = languages.map((l) => l.code)
const THEME_STORAGE_KEY = 'tri-grid-theme'

function Layout() {
  const { lang } = useParams()
  const location = useLocation()
  const { i18n } = useTranslation()

  // Keep the selected/default theme applied even though its picker is hidden.
  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
    document.documentElement.dataset.theme = themes.some((theme) => theme.id === storedTheme)
      ? storedTheme
      : themes[0].id
  }, [])

  // Přepnout i18next na jazyk z URL, kdykoliv se změní
  useEffect(() => {
    if (SUPPORTED_LANGS.includes(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang)
    }
  }, [lang, i18n])

  useEffect(() => {
    if (location.hash) {
      // Malé zpoždění — po přechodu na jinou stránku musí být sekce
      // nejdřív vykreslená, než k ní můžeme plynule scrollovat.
      const id = location.hash.slice(1)
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
      return () => clearTimeout(timer)
    }
    window.scrollTo(0, 0)
  }, [location])

  // Neznámý/nepodporovaný jazyk v URL -> zpět na výchozí (první v seznamu)
  if (!SUPPORTED_LANGS.includes(lang)) {
    return <Navigate to={`/${SUPPORTED_LANGS[0]}`} replace />
  }

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout

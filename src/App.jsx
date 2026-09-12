import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Homepage from './pages/Homepage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ElektrotechnikaPage from './pages/ElektrotechnikaPage.jsx'
import KovovyrobaPage from './pages/KovovyrobaPage.jsx'
import StavebnictviPage from './pages/StavebnictviPage.jsx'
import languages from './data/languages.js'

const defaultLang = languages[0].code

function App() {
  return (
    <Routes>
      {/* Kořen webu přesměruje na výchozí jazyk (první v seznamu languages.js) */}
      <Route path="/" element={<Navigate to={`/${defaultLang}`} replace />} />

      <Route path=":lang" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="o-nas" element={<AboutPage />} />
        <Route path="divize/elektrotechnika" element={<ElektrotechnikaPage />} />
        <Route path="divize/kovovyroba" element={<KovovyrobaPage />} />
        <Route path="divize/stavebnictvi" element={<StavebnictviPage />} />
        {/* Další stránky se přidávají sem, např.:
        <Route path="kontakt" element={<ContactPage />} />
        */}
      </Route>

      {/* Neznámá cesta -> zpět na výchozí jazyk */}
      <Route path="*" element={<Navigate to={`/${defaultLang}`} replace />} />
    </Routes>
  )
}

export default App

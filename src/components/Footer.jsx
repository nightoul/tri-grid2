import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <span>© {new Date().getFullYear()} Tri-Grid s.r.o.</span>
        <span className="site-footer__divisions">
          {t('footer.divisions')}
        </span>
      </div>
    </footer>
  )
}

export default Footer

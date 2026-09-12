import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function AboutPage() {
  const { t } = useTranslation()
  const { lang } = useParams()
  const values = t('aboutPage.values', { returnObjects: true })

  return (
    <>
      <section className="division-page-hero">
        <div className="division-page-hero__overlay division-page-hero__overlay--neutral" aria-hidden="true" />
        <div className="container division-page-hero__inner">
          <div className="division-page-hero__head">
            <div>
              <p className="eyebrow">{t('aboutPage.hero.eyebrow')}</p>
              <h1>{t('aboutPage.hero.title')}</h1>
            </div>
          </div>
          <p className="hero__lede">{t('aboutPage.hero.lede')}</p>
        </div>
      </section>

      <section className="division-overview">
        <div className="container division-overview__inner">
          <div className="division-overview__text">
            <p className="eyebrow">{t('aboutPage.story.eyebrow')}</p>
            <h2>{t('aboutPage.story.heading')}</h2>
            <p>{t('aboutPage.story.text')}</p>
          </div>
          <div className="division-overview__media">
            <img
              src="https://picsum.photos/seed/trigrid-about-story/640/760"
              alt=""
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="service-section service-section--blue">
        <div className="container">
          <p className="eyebrow">{t('aboutPage.why.eyebrow')}</p>
          <h2>{t('aboutPage.why.heading')}</h2>
          <div className="values-grid">
            {values.map((v, i) => (
              <div className="process-step" key={v.title}>
                <span className="process-step__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="division-page-body division-page-body--blue">
        <div className="container division-page-cta">
          <p>{t('aboutPage.cta.text')}</p>
          <Link to={`/${lang}#kontakt`} className="division-page-cta__link">{t('common.ctaContact')}</Link>
        </div>
      </section>
    </>
  )
}

export default AboutPage

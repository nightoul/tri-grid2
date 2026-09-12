import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import HexIcon from '../components/HexIcon.jsx'
import ServiceIcon from '../components/ServiceIcon.jsx'
import kovovyroba1 from '../assets/images/kovovyroba1.jpg'
import kovovyrobaBg from '../assets/images/Kovovyroba_bg.jpg'
import kovovyroba2 from '../assets/images/kovovyroba2.jpg'
import kovovyroba3 from '../assets/images/kovovyroba3.jpg'
import svarovaniNaMiru from '../assets/images/kovovyroba-svarovani-na-miru.jpg'

const serviceIcons = ['design', 'wrench', 'weld']
const galleryImages = [kovovyroba2, kovovyroba3, svarovaniNaMiru]

function KovovyrobaPage() {
  const { t } = useTranslation()
  const { lang } = useParams()

  const services = t('divisionsData.kovovyroba.services', { returnObjects: true })
  const steps = t('divisionsData.kovovyroba.steps', { returnObjects: true })
  const galleryCaptions = t('divisionsData.kovovyroba.galleryCaptions', { returnObjects: true })

  return (
    <div className="division-page division-page--bright-canvas">
      <section className="division-page-hero">
        {/* Zatím placeholder — nahraď souborem stejného jména
            (src/assets/images/Kovovyroba_bg.jpg) za reálnou fotku. */}
        <div className="division-page-hero__bg division-page-hero__bg--steel" style={{ backgroundImage: `url(${kovovyrobaBg})` }} />
        <div className="division-page-hero__overlay division-page-hero__overlay--steel" aria-hidden="true" />
        <div className="container division-page-hero__inner">
          <div className="division-page-hero__head">
            <HexIcon id="page-kovovyroba" accent="steel" type="gear" />
            <div>
              <h1>{t('divisionsData.kovovyroba.label')}</h1>
            </div>
          </div>
          <p className="hero__lede">{t('divisionsData.kovovyroba.heroLede')}</p>
        </div>
      </section>

      <section className="division-overview division-overview--steel">
        <div className="container division-overview__inner">
          <div className="division-overview__text">
            <p className="eyebrow">{t('common.whatWeDoEyebrow')}</p>
            <h2>{t('divisionsData.kovovyroba.overviewHeading')}</h2>
            <p>{t('divisionsData.kovovyroba.overviewText')}</p>
          </div>
          <div className="division-overview__media">
            {/* Zatím placeholder — nahraď souborem stejného jména
                (src/assets/images/kovovyroba1.jpg) za reálnou fotku. */}
            <img src={kovovyroba1} alt="" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="service-section service-section--steel">
        <div className="container">
          <p className="eyebrow">{t('common.ourServicesEyebrow')}</p>
          <h2>{t('divisionsData.kovovyroba.servicesHeading')}</h2>
          <div className="service-cards">
            {services.map((s, i) => (
              <div className="service-card" key={s.title}>
                <ServiceIcon variant={serviceIcons[i]} />
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section process-section--steel">
        <div className="container">
          <p className="eyebrow">{t('common.howWeWorkEyebrow')}</p>
          <h2>{t('common.howWeWorkHeading')}</h2>
          <div className="process-steps">
            {steps.map((s, i) => (
              <div className="process-step" key={s.title}>
                <span className="process-step__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-section gallery-section--steel">
        <div className="container">
          <p className="eyebrow">{t('common.workSamplesEyebrow')}</p>
          <h2>{t('divisionsData.kovovyroba.galleryHeading')}</h2>
          <div className="gallery-grid">
            {galleryCaptions.map((caption, i) => (
              <figure className="gallery-item" key={caption}>
                <img src={galleryImages[i]} alt={caption} loading="lazy" />
                <figcaption>{caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="division-page-body division-page-body--steel">
        <div className="container division-page-cta">
          <p>{t('divisionsData.kovovyroba.ctaQuestion')}</p>
          <Link to={`/${lang}#kontakt`} className="division-page-cta__link">{t('common.ctaContact')}</Link>
        </div>
      </section>
    </div>
  )
}

export default KovovyrobaPage

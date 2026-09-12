import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import HexIcon from '../components/HexIcon.jsx'
import ServiceIcon from '../components/ServiceIcon.jsx'
import smartHome from '../assets/images/elektrotechnika-smart-home.jpg'
import elektrotechnikaBg from '../assets/images/Elektrotechnika_bg.jpg'
import rozvadec from '../assets/images/elektrotechnika-rozvadec.jpg'
import rozvodyNovostavba from '../assets/images/elektrotechnika-rozvody-novostavba.jpg'
import revizeMereni from '../assets/images/elektrotechnika-revize-mereni.jpg'

// Ikony a obrázky jsou strukturální (nejsou to texty), takže zůstávají tady,
// ne v překladovém slovníku. Pořadí musí sedět s polem services/gallery v JSON.
const serviceIcons = ['install', 'inspect', 'lowvoltage']
const galleryImages = [rozvadec, rozvodyNovostavba, revizeMereni]

function ElektrotechnikaPage() {
  const { t } = useTranslation()
  const { lang } = useParams()

  const services = t('divisionsData.elektrotechnika.services', { returnObjects: true })
  const steps = t('divisionsData.elektrotechnika.steps', { returnObjects: true })
  const galleryCaptions = t('divisionsData.elektrotechnika.galleryCaptions', { returnObjects: true })

  return (
    <div className="division-page division-page--bright-canvas">
      <section className="division-page-hero">
        {/* Zatím placeholder — nahraď souborem stejného jména
            (src/assets/images/Elektrotechnika_bg.jpg) za reálnou fotku. */}
        <div className="division-page-hero__bg division-page-hero__bg--blue" style={{ backgroundImage: `url(${elektrotechnikaBg})` }} />
        <div className="division-page-hero__overlay division-page-hero__overlay--blue" aria-hidden="true" />
        <div className="container division-page-hero__inner">
          <div className="division-page-hero__head">
            <HexIcon id="page-elektrotechnika" accent="blue" type="bolt" />
            <div>
              <h1>{t('divisionsData.elektrotechnika.label')}</h1>
            </div>
          </div>
          <p className="hero__lede">{t('divisionsData.elektrotechnika.heroLede')}</p>
        </div>
      </section>

      <section className="division-overview">
        <div className="container division-overview__inner">
          <div className="division-overview__text">
            <p className="eyebrow">{t('common.whatWeDoEyebrow')}</p>
            <h2>{t('divisionsData.elektrotechnika.overviewHeading')}</h2>
            <p>{t('divisionsData.elektrotechnika.overviewText')}</p>
          </div>
          <div className="division-overview__media">
            <img src={smartHome} alt="" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="service-section service-section--blue">
        <div className="container">
          <p className="eyebrow">{t('common.ourServicesEyebrow')}</p>
          <h2>{t('divisionsData.elektrotechnika.servicesHeading')}</h2>
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

      <section className="process-section process-section--blue">
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

      <section className="gallery-section">
        <div className="container">
          <p className="eyebrow">{t('common.workSamplesEyebrow')}</p>
          <h2>{t('divisionsData.elektrotechnika.galleryHeading')}</h2>
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

      <section className="division-page-body division-page-body--blue">
        <div className="container division-page-cta">
          <p>{t('divisionsData.elektrotechnika.ctaQuestion')}</p>
          <Link to={`/${lang}#kontakt`} className="division-page-cta__link">{t('common.ctaContact')}</Link>
        </div>
      </section>
    </div>
  )
}

export default ElektrotechnikaPage

import iconWand from './media/icon-wand.gif'
import iconBook from './media/icon-book.gif'
import iconEye from './media/icon-eye.gif'
import iconFinalVideo from './media/icon-final-video.svg'
import heroMark from './media/mealkea/hero.png'
import burgerGrid from './media/mealkea/burger-grid.png'
import ramenGrid from './media/mealkea/ramen-grid.png'
import bentoIkea from './media/mealkea/bento-ikea.jpg'
import bentoMealkea from './media/mealkea/bento-mealkea.png'
import adCar from './media/mealkea/ad-car.png'
import { CaseStudyNav, SectionHead } from './chrome'

const summary =
  'Mealkea is a modular food brand concept based on the principles of assembly, choice, and flexibility associated with IKEA. Instead of receiving a fixed meal, users build their own meal from a variety of components, according to their personal taste, portion, and needs. The visual language translates the DIY concept from the world of furniture into the world of food, extending it into the packaging as well: a modular lunch box made of separate compartments that can be connected into one larger box or used as individual units. The project explores how product design, packaging, and user experience can come together as one system that allows people to build their\u00A0own\u00A0meal.'

const brief =
  "The student will select an existing and well-known brand. They will research, study, and map the components of the brand's packaging. The student will develop a new brand experience extension for the existing brand and design it in alignment with the established design system of the selected brand. The student will present a name and logotype, a central product, and at least one additional item as part of the extended brand experience."

const building =
  'MEALKEA is an experiential food brand offering modular, build-your-own meals that combine simplicity, control, and a sense of personal creation. The brand sits at the intersection of fast food and DIY experiences, targeting a young, urban audience looking not only to eat, but also to build and experiment. Instead of passive food consumption, MEALKEA offers an active user experience that empowers the customer and makes them feel involved in creating their meal, even when it is purchased rather than prepared from scratch.'

const bento =
  'I created a visual bento of the original brand to use as a reference when developing my rebranding.'

const presentation = 'https://www.figma.com/deck/IoQe8CJmNr18IH6b5X9Z43'
const commercial = '/mealkea/video/MEALKEA%20commorcial.MP4'

type Props = {
  onProjects: () => void
}

export function MealkeaCaseStudy({ onProjects }: Props) {
  return (
    <article className="cs" data-theme="mealkea">
      <section className="cs-hero mk-hero">
        <img className="mk-hero-mark" src={heroMark} alt="MEALKEA" />
      </section>

      <section>
        <div className="cs-wrap cs-intro">
          <div className="cs-intro-grid">
            <img className="cs-wand" src={iconWand} alt="" />
            <h1 className="cs-title">MEALKEA</h1>
            <div className="cs-intro-meta">
              <p className="cs-year">2026</p>
              <div className="cs-meta">
                <p>
                  <small>Design Field</small>
                  Branding
                </p>
                <p>
                  <small>Team</small>
                  myself:)
                </p>
              </div>
            </div>
          </div>
          <div className="cs-intro-right">
            <p className="cs-copy">{summary}</p>
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-wrap cs-brief">
          <SectionHead icon={iconBook} title="The brief" />
          <div className="cs-indent">
            <div className="cs-indent-space" aria-hidden="true" />
            <div className="cs-indent-body cs-brief-copy">
              <p>{brief}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-wrap mk-building">
          <SectionHead icon={iconBook} title="Brand building" />
          <div className="cs-indent">
            <div className="cs-indent-space" aria-hidden="true" />
            <div className="cs-indent-body">
              <p className="cs-copy mk-lead">{building}</p>
            </div>
          </div>
          <div className="mk-stack">
            <img className="mk-board" src={burgerGrid} alt="Bita burger kit, bags, and assembled meal" />
            <img className="mk-board" src={ramenGrid} alt="Löpa ramen kit, bag, ingredients, and bowl" />
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-wrap mk-bento">
          <SectionHead icon={iconEye} title="Bento" />
          <div className="cs-indent">
            <div className="cs-indent-space" aria-hidden="true" />
            <div className="cs-indent-body">
              <p className="cs-copy mk-lead">{bento}</p>
            </div>
          </div>
          <div className="mk-bento-row">
            <img className="mk-board" src={bentoIkea} alt="IKEA visual bento" />
            <img className="mk-board" src={bentoMealkea} alt="MEALKEA visual bento" />
          </div>
        </div>
      </section>

      <section className="cs-section mk-ad-head">
        <div className="cs-wrap">
          <SectionHead icon={iconFinalVideo} title="Brand advertisement" />
        </div>
      </section>
      <section className="mk-ad">
        {commercial ? (
          <video
            className="mk-ad-media"
            src={commercial}
            poster={adCar}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            className="mk-ad-media"
            src={adCar}
            alt="Mealkea advertisement, a burger held over a steering wheel"
          />
        )}
        <a className="mk-ad-link" href={presentation} target="_blank" rel="noreferrer">
          presentation link
        </a>
        <CaseStudyNav onProjects={onProjects} />
      </section>
    </article>
  )
}

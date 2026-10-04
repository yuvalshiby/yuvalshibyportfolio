import iconWand from './media/icon-wand.gif'
import iconBook from './media/icon-book.gif'
import iconEye from './media/icon-eye.gif'
import iconPhotos from './media/icon-photos.svg'
import iconCamera from './media/icon-camera.svg'
import hero from './media/yashka/hero.jpg'
import pov from './media/yashka/pov.jpg'
import inspiration from './media/yashka/inspiration.jpg'
import postcardsShop from './media/yashka/postcards-shop.jpg'
import postcardsDesk from './media/yashka/postcards-desk.jpg'
import cardsLinen from './media/yashka/cards-linen.jpg'
import cardsFlatlay from './media/yashka/cards-flatlay.jpg'
import paperWraps from './media/yashka/paper-wraps.jpg'
import eventPostcards from './media/yashka/event-postcards.jpg'
import eventSpread from './media/yashka/event-spread.jpg'
import eventTable from './media/yashka/event-table.jpg'
import { CaseStudyNav, SectionHead } from './chrome'

const summary =
  "The project is a rebranding of Yashka, with the aim of expanding the brand's identity from a fast-food spot rooted in contemporary Tel Aviv culture into a place that creates a sense of belonging and connection. The new concept focuses on warmth, nostalgia, and family, bringing generations together through food, memories, and traditions passed down over time. Instead of simply grabbing a meal and leaving, Yashka becomes a place to stay, gather, and create new memories."

const briefLines = [
  'New Branding for a Food\u00a0Business',
  'There are dozens of food businesses around\u00a0us, including cafés, fast\u2011food spots, restaurants, delis, and\u00a0more.',
  'Choose one such place and define its uniqueness, both in terms of the type of food it offers and the story behind\u00a0it.',
  'Develop a new visual experience for the chosen\u00a0place.',
  'There is no need to change the name unless you feel that doing so is necessary for the new positioning of the\u00a0brand.',
]

const povCopy =
  'When approaching this project, I wanted to bring a meaningful memory back to life. The first food place that came to mind and immediately touched my heart was Yashka, a shawarma place where I would eat every Friday with my late grandmother, until the last day of her life. I immediately began thinking about how I would design the space in a way that she would have loved and that would have brought a smile to her face. I drew inspiration from her history as a young athlete, documented in black-and-white photographs alongside members of the HaNoar HaOved movement, as well as from the work of Israeli graphic designer David Tartakov, whose art was a beloved part of our home. From there, I began exploring how to bring these two worlds together.'

type Props = {
  onProjects: () => void
}

export function YashkaCaseStudy({ onProjects }: Props) {
  return (
    <article className="cs" data-theme="yashka">
      <section className="cs-hero yk-hero">
        <img className="yk-hero-media" src={hero} alt="Yashka triptych of girls picking fruit, a fountain square, and a man with a shovel" />
      </section>

      <section>
        <div className="cs-wrap cs-intro">
          <div className="cs-intro-grid">
            <img className="cs-wand" src={iconWand} alt="" />
            <h1 className="cs-title">Yashka</h1>
            <div className="cs-intro-meta">
              <p className="cs-year">2025</p>
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
              <p>
                {briefLines.map((line, index) => (
                  <span key={line}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-wrap">
          <SectionHead icon={iconEye} title="Personal point of view" />
          <div className="yk-pov">
            <img src={pov} alt="Friday lunch at Yashka with my grandmother" />
            <p className="cs-copy">{povCopy}</p>
          </div>
          <img className="yk-inspire" src={inspiration} alt="Black-and-white family photographs beside Tartakov illustrations" />
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-wrap">
          <SectionHead icon={iconPhotos} title="The products I chose to produce" />
          <div className="yk-products">
            <h3 className="cs-subhead">Postcards</h3>
            <div className="yk-pair">
              <img src={postcardsShop} alt="Yashka postcards in a wooden stand at the shawarma counter" />
              <img src={postcardsDesk} alt="Three Yashka postcards on a wooden desk" />
            </div>
            <h3 className="cs-subhead">Business card</h3>
            <div className="yk-pair">
              <img src={cardsLinen} alt="Yashka business cards on linen with a fountain pen" />
              <img src={cardsFlatlay} alt="Yashka business cards, front and back, with a wallet" />
            </div>
            <h3 className="cs-subhead">Food service paper</h3>
            <img className="yk-wide" src={paperWraps} alt="Shawarma wraps and trays lined with Yashka paper" />
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-wrap">
          <SectionHead icon={iconCamera} title="Photos from the event" />
          <div className="yk-event">
            <img src={eventPostcards} alt="Three Yashka postcards on a wooden table" />
            <img src={eventSpread} alt="Yashka prints arranged on a table" />
            <img src={eventTable} alt="Yashka poster and prints displayed at the event" />
          </div>
        </div>
      </section>

      <CaseStudyNav onProjects={onProjects} />
    </article>
  )
}

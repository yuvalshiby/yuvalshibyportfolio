import iconWand from './media/icon-wand.gif'
import iconBook from './media/icon-book.gif'
import iconPostcard from './media/iconPostcard.gif'
import hero from './media/deadly-hero-optimized.webp'
import bundyCard from './media/deadly-bundy-card-4ab0ae.webp'
import bundyCollage from './media/deadly-bundy-collage-2aa8e4.webp'
import btkCard from './media/deadly-btk-card-24f53f.webp'
import btkCollage from './media/deadly-btk-collage-7e10bd.webp'
import dahmerCard from './media/deadly-dahmer-card-57b4a0.webp'
import dahmerCollage from './media/deadly-dahmer-collage-356635.webp'
import kemperCard from './media/deadly-kemper-card-17ad28.webp'
import kemperCollage from './media/deadly-kemper-collage-563ab3.webp'
import gacyCard from './media/deadly-gacy-card-7b8cc3.webp'
import gacyCollage from './media/deadly-gacy-collage-6963b9.webp'
import { CaseStudyNav, SectionHead } from './chrome'

const summary =
  'Deadly Greetings is a conceptual postcard series that uses dark humor to subvert the familiar format of celebratory greeting cards. Each card presents a common occasion, but reveals a morbid illustration and phrase inspired by a serial killer associated with the theme.'

const brief = [
  'The brief explored the relationship between humans and nature, from which I chose to focus on human nature itself, particularly its darker and more extreme aspects.',
  'The project centers on serial killers, whose actions are perceived as inhuman, yet remain a part of human reality.',
]

const postcards = [
  {
    title: 'The Ted Bundy postcard',
    description:
      'Bundy would approach women using his car, often asking for help carrying something, using this as a way to lure them before murdering them.',
    cover: bundyCard,
    collage: bundyCollage,
    background: '#F4E1D1',
    tone: 'bundy',
  },
  {
    title: 'The B.T.K postcard',
    description:
      'B.T.K targeted victims in their own homes, often gaining control through surprise and manipulation, using restraint to overpower them before killing them.',
    cover: btkCard,
    collage: btkCollage,
    background: '#F7DCDD',
    tone: 'btk',
  },
  {
    title: 'The Jeffrey Dahmer postcard',
    description:
      'Dahmer would target marginalized young men, offering them money to come to his apartment for photoshoots, using this as a way to lure them before killing them.',
    cover: dahmerCard,
    collage: dahmerCollage,
    background: '#E7EFEF',
    tone: 'dahmer',
  },
  {
    title: 'The Ed Kemper postcard',
    description:
      'Kemper harbored deep resentment toward women, shaped by his relationship with his mother. Before turning himself in, he murdered and decapitated her, his final act, which he saw as closing a\u00A0personal\u00A0cycle.',
    cover: kemperCard,
    collage: kemperCollage,
    background: '#F7EAEE',
    tone: 'kemper',
  },
  {
    title: 'The John Wayne Gacy postcard',
    description:
      'Gacy performed as a birthday clown, using this persona to attract young boys to his home, where he would murder them, echoing the unsettling image of a clown seen in horror fiction “IT”.',
    cover: gacyCard,
    collage: gacyCollage,
    background: '#F8F5E4',
    tone: 'gacy',
  },
]

type Props = {
  onProjects: () => void
}

function PostcardDeck() {
  return (
    <div className="cs-postcards">
      {postcards.map((card) => (
        <article
          key={card.title}
          className={`cs-postcard cs-card-${card.tone}`}
          style={{ background: card.background }}
        >
          <div className="cs-postcard-copy">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
          <div className="cs-postcard-art">
            <div className="cs-postcard-cover-wrap">
              <img className="cs-postcard-cover" src={card.cover} alt="" />
            </div>
            <div className="cs-postcard-collage-wrap">
              <img className="cs-postcard-collage" src={card.collage} alt="" />
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export function DeadlyGreetingsCaseStudy({ onProjects }: Props) {
  return (
    <article className="cs" data-theme="deadly">
      <section className="cs-hero" style={{ background: '#f7f4ef' }}>
        <img className="cs-hero-media" src={hero} alt="Deadly Greetings cards" />
      </section>

      <section>
        <div className="cs-wrap cs-intro">
          <div className="cs-intro-grid">
            <img className="cs-wand" src={iconWand} alt="" />
            <h1 className="cs-title">Deadly Greetings</h1>
            <div className="cs-intro-meta">
              <p className="cs-year">2024</p>
              <div className="cs-meta">
                <p>
                  <small>Design Field</small>
                  personal project
                </p>
                <p>
                  <small>Team</small>
                  myself
                </p>
              </div>
            </div>
          </div>
          <div className="cs-intro-right cs-intro-right-tight">
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
              {brief.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-wrap cs-cards">
          <SectionHead icon={iconPostcard} title="The postcards" />
          <PostcardDeck />
        </div>
      </section>
      <CaseStudyNav onProjects={onProjects} />
    </article>
  )
}

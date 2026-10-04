import { useLiveIndex } from './motion'
import iconWand from './media/icon-wand.gif'
import iconPhotos from './media/icon-photos.svg'
import iconBook from './media/icon-book.gif'
import iconEye from './media/icon-eye.gif'
import iconComputer from './media/icon-computer.gif'
import hero from './media/catalog/hero-full.jpg'
import event1 from './media/catalog/event-1.jpg'
import event2 from './media/catalog/event-2.jpg'
import event3 from './media/catalog/event-3.jpg'
import event4 from './media/catalog/event-4.jpg'
import event5 from './media/catalog/event-5.jpg'
import event6 from './media/catalog/event-6.jpg'
import passion from './media/catalog/chapter-passion.jpg'
import fear from './media/catalog/chapter-fear.jpg'
import memory from './media/catalog/chapter-memory.jpg'
import magritte from './media/catalog/artist-magritte.jpg'
import dali from './media/catalog/artist-dali.webp'
import frida from './media/catalog/artist-frida.jpg'
import ernst from './media/catalog/artist-ernst.jpg'
import delvaux from './media/catalog/artist-delvaux.jpg'
import websiteFrame from './media/catalog/website-frame.jpg'
import websiteVideo from './media/catalog/website.mp4'
import { CaseStudyNav, SectionHead } from './chrome'

const proto =
  'https://www.figma.com/proto/1j3bpDkgb4IWR4ViZ4ot5R/%D7%90%D7%AA%D7%A8-%D7%9C%D7%A7%D7%98%D7%9C%D7%95%D7%92?node-id=1-2&viewport=792%2C286%2C0.07&t=qVwYTvCl7pntvVVB-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=1%3A2&page-id=0%3A1'

const summary =
  'Surreal Love is a catalog exploring Surrealist art through three central themes: Desire, Fear, and Memory. Works from the Surrealist period are divided between the three chapters according to the ways in which they express these themes, creating a journey through emotions, imagery, and experiences that exist somewhere between reality and the subconscious. The catalog’s visual language was developed to translate the surreal nature of the content into a cohesive visual system, through an interplay of typography, composition, and imagery.'

const eventPhotos = [event1, event2, event3, event4, event5, event6]

const chapters = [
  {
    title: 'Passion',
    image: passion,
    alt: 'Surreal painting of a reclining figure',
    copy: 'Passion in surrealism is depicted as a powerful, irrational force, often portrayed through dreamlike and symbolic imagery. Artists explore desire, obsession, and emotional intensity, using distorted figures and surreal landscapes to convey the subconscious nature of passion. It’s portrayed as both exhilarating and unsettling, reflecting its primal and enigmatic qualities.',
  },
  {
    title: 'Fear',
    image: fear,
    alt: 'Surreal painting of figures in a room',
    copy: 'Fear in surrealism is portrayed as an unsettling and irrational force, often emerging through distorted figures, unfamiliar spaces, and dreamlike imagery. Artists explore anxiety, vulnerability, and the unknown, transforming inner fears into strange and disorienting visual worlds. Fear becomes a reflection of the subconscious, blurring the line between reality and nightmare.',
    flip: true,
  },
  {
    title: 'Memory',
    image: memory,
    alt: 'A rose floating over a landscape',
    copy: 'Memory in surrealism is portrayed as fragmented and elusive, often expressed through dreamlike imagery, distorted forms, and unexpected juxtapositions. Artists explore the way memories shift, overlap, and transform over time, blending personal experiences with imagination and the subconscious. Memory is presented as something fluid and unreliable, existing somewhere between what was experienced and what is remembered.',
  },
]

const artists = [
  {
    name: 'Rene Magritte',
    image: magritte,
    copy: 'Rene Magritte was a Belgian painter and one of the artists most closely associated with Surrealism. In his works, he combined familiar, everyday objects with impossible contexts, challenging the way we understand reality, language, and perception. His work is characterized by the tension between what appears familiar and what defies logic.',
  },
  {
    name: 'Salvador Dali',
    image: dali,
    copy: 'Salvador Dali was a Spanish artist and one of the most prominent figures of Surrealism. He became known for his highly realistic paintings depicting distorted dreamlike worlds, where objects and bodies transform and no longer follow the laws of reality. His work frequently explored dreams, fears, desires, and the subconscious.',
  },
  {
    name: 'Frida Kahlo',
    image: frida,
    copy: 'Frida Kahlo was a Mexican painter whose work focused on the body, identity, pain, and personal experience. Although she is often associated with Surrealism, Kahlo rejected the label, stating that she did not paint dreams but her own reality. Her paintings combine symbolic imagery, Mexican folklore, and elements drawn from her personal life.',
  },
  {
    name: 'Max Ernst',
    image: ernst,
    copy: 'Max Ernst was a German-French artist who played a major role in the development of both Dada and Surrealism. He sought ways to bypass rational thought and create imagery through chance and intuition. Among the techniques associated with his work is Frottage, in which random textures become the basis for new images, alongside collage and fantastical scenes.',
  },
  {
    name: 'Paul Delvaux',
    image: delvaux,
    copy: 'Paul Delvaux was a Belgian painter associated with Surrealism, while maintaining a distinctive personal style. His works often feature quiet and mysterious spaces, female figures, classical architecture, and dreamlike scenes. The combination of realistic detail with impossible situations creates a sense of memory, mystery, and unease.',
  },
]

type Props = {
  onProjects: () => void
}

function CatalogChapters() {
  const { index, held, choose } = useLiveIndex(chapters.length, 5600)
  const chapter = chapters[index] ?? chapters[0]

  return (
    <div className="cat-pages">
      <div className="cat-page-tabs" role="tablist" aria-label="Catalog chapters">
        {chapters.map((item, step) => (
          <button
            key={item.title}
            type="button"
            role="tab"
            aria-selected={step === index}
            className={step === index ? 'is-on' : ''}
            onClick={() => choose(step)}
          >
            {item.title}
          </button>
        ))}
      </div>
      <article className={`cat-chapter cat-page${chapter.flip ? ' cat-chapter-flip' : ''}`} key={chapter.title}>
        <img src={chapter.image} alt={chapter.alt} />
        <p>{chapter.copy}</p>
      </article>
      {held ? null : <p className="cs-hint">Turn the page</p>}
    </div>
  )
}

export function CatalogCaseStudy({ onProjects }: Props) {
  return (
    <article className="cs" data-theme="catalog">
      <section className="cs-hero cat-hero">
        <img className="cs-hero-media" src={hero} alt="Surreal Love catalog cover" />
      </section>

      <section>
        <div className="cs-wrap cs-intro cat-intro">
          <img className="cs-wand" src={iconWand} alt="" />
          <h1 className="cs-title">SURREAL LOVE</h1>
          <div className="cs-intro-meta">
            <p className="cs-year">2025</p>
            <div className="cs-meta">
              <p>
                <small>Design Field</small>
                Print
              </p>
              <p>
                <small>Team</small>
                myself:)
              </p>
            </div>
          </div>
          <p className="cs-copy cat-intro-copy">{summary}</p>
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-wrap cat-events">
          <SectionHead icon={iconPhotos} title="Photos from the event" />
          <div className="cs-indent">
            <div className="cs-indent-space" aria-hidden="true" />
            <div className="cs-indent-body">
              <div className="cat-event-grid">
                {eventPhotos.map((src, index) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Catalog event photo ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-wrap cat-chapters">
          <SectionHead icon={iconBook} title="The Chapters" />
          <div className="cs-indent">
            <div className="cs-indent-space" aria-hidden="true" />
            <div className="cs-indent-body">
              <CatalogChapters />
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-wrap cat-artists">
          <SectionHead icon={iconEye} title="The Artists In The Catalog" />
          <div className="cs-indent">
            <div className="cs-indent-space" aria-hidden="true" />
            <div className="cs-indent-body">
              <div className="cat-artist-list">
                {artists.map((artist) => (
                  <article key={artist.name} className="cat-artist">
                    <h3>{artist.name}</h3>
                    <div className="cat-artist-row">
                      <img src={artist.image} alt={artist.name} />
                      <p>{artist.copy}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section cat-web-head">
        <div className="cs-wrap">
          <SectionHead icon={iconComputer} title="The catalog website" />
        </div>
      </section>

      <section className="cat-web">
        <video
          className="cat-web-video"
          src={websiteVideo}
          poster={websiteFrame}
          autoPlay
          loop
          muted
          playsInline
        />
        <a
          className="cat-web-proto"
          href={proto}
          target="_blank"
          rel="noreferrer"
        >
          Explore Prototype »
        </a>
        <CaseStudyNav onProjects={onProjects} />
      </section>
    </article>
  )
}

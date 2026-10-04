import { useEffect, useRef, useState, type RefObject } from 'react'
import iconWand from './media/icon-wand.gif'
import iconBook from './media/icon-book.gif'
import iconEdit from './media/icon-edit.gif'
import iconPhotos from './media/icon-photos.svg'
import iconFinalVideo from './media/icon-final-video.svg'
import phoneFrame from './media/breather-ui/parameters-3.svg'
import websiteVideo from './media/asayan/video/website.mp4'
import socialVideo from './media/asayan/video/social.mp4'
import hero from './media/asayan/hero.jpg'
import mark from './media/asayan/mark.png'
import wordmark from './media/asayan/wordmark.png'
import symbols from './media/asayan/symbols.png'
import product1 from './media/asayan/product-1.jpg'
import product2 from './media/asayan/product-2.jpg'
import product3 from './media/asayan/product-3.jpg'
import lolipopPattern from './media/asayan/lolipop-pattern.png'
import lolipopFront from './media/asayan/lolipop-front.png'
import cigFrontBrown from './media/asayan/cig-front-brown.png'
import cigFrontCream from './media/asayan/cig-front-cream.png'
import cigPatternBrown from './media/asayan/cig-pattern-brown.png'
import cigPatternCream from './media/asayan/cig-pattern-cream.png'
import bubblesFront from './media/asayan/bubbles-front.png'
import bubblesPattern from './media/asayan/bubbles-pattern.png'
import store2 from './media/asayan/store-2.jpg'
import websiteStill from './media/asayan/website.jpg'
import socialPoster from './media/asayan/social-poster.jpg'
import event1 from './media/asayan/event-1.jpg'
import event2 from './media/asayan/event-2.jpg'
import event3 from './media/asayan/event-3.jpg'
import event4 from './media/asayan/event-4.jpg'
import event5 from './media/asayan/event-5.jpg'
import { CaseStudyNav, SectionHead } from './chrome'

const summary =
  'ASAYAN is a brand created from the desire to give people the ability to choose how they regulate themselves during altered states of consciousness. The brand offers a range of oral products designed to support the need for regulation and create a sense of control within an experience that can feel unpredictable. Rather than positioning the user as passive, ASAYAN puts the choice in their hands, allowing them to recognize their needs and choose what works for them in that moment. The project explores the intersection of choice, control, and personal experience, turning an intuitive action into a conscious part of a self-regulation\u00A0ritual.'

const briefLines = [
  'As part of this assignment, students are required to develop a new product or service within the “candy” category for the Israeli and/or international\u00A0market.',
  'The process will be based on in-depth research and analysis of the market and category, identifying key trends, and understanding potential target\u00A0audiences.',
]

const whoWeAreLead =
  'A brand that defines a new category of “oral fuel” products. The products are built around an oral sensory experience. Unlike existing products such as candy, gum, or cigarettes, which involve the mouth but are not branded around the emotional experience they create, ASAYAN places the focus on a specifically tailored experience. The brand’s products are small, personal, and portable objects that are placed in the mouth and trigger an immediate response: taste, tingling, dissolving, chewing, or a shift in\u00A0sensation.'

const whoWeAreTail =
  'People are already using mind-altering substances, but often do so without control and with a sense of guilt. Now, as the conversation around these experiences is more open than ever, there is still no brand that gives them a conscious framework. We create tools for the experience that allow you to take responsibility for your state in a clear, precise, and unapologetic way. For us, success means transforming the experience from something chaotic into a conscious choice that people can stand\u00A0behind.'

const logoCopy =
  'The brand name ASAYAN is taken from the Yorùbá language, one of the languages spoken in Nigeria, and means “choice.” The logo is composed of elements inspired by African symbols, each representing one of the brand’s core values, such as knowledge, inner strength, and mental resilience. By combining these elements, the symbols come together to form one strong, unified mark that is integrated into the Yorùbá word\u00A0itself.'

const colorCopy =
  'The choice of earthy tones came from the desire to create a grounded, tribal feeling of security and a connection to the earth, where we feel most\u00A0stable.'

const swatches = [
  { hex: '742622', color: '#742622' },
  { hex: '3A2417', color: '#3A2417' },
  { hex: 'B27F2E', color: '#B27F2E' },
  { hex: 'D2B27F', color: '#D2B27F' },
]

type Props = {
  onProjects: () => void
}

function useInViewPlay(ref: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = ref.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) void video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.28 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [ref])
}

function SocialPhone() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  useInViewPlay(videoRef)

  function toggleSound() {
    setMuted((on) => !on)
    void videoRef.current?.play().catch(() => {})
  }

  return (
    <div className="asy-social">
      <button
        type="button"
        className="cs-phone asy-phone"
        onClick={toggleSound}
        aria-label={muted ? 'Play social video with sound' : 'Mute social video'}
      >
        <img src={phoneFrame} alt="" />
        <video
          ref={videoRef}
          src={socialVideo}
          poster={socialPoster}
          autoPlay
          loop
          muted={muted}
          playsInline
        />
      </button>
      <p className="asy-sound-hint">{muted ? 'Tap for sound' : 'Sound on'}</p>
    </div>
  )
}

export function AsayanCaseStudy({ onProjects }: Props) {
  const websiteRef = useRef<HTMLVideoElement>(null)
  useInViewPlay(websiteRef)

  return (
    <article className="cs" data-theme="asayan">
      <section className="cs-hero asy-hero">
        <img className="asy-hero-media" src={hero} alt="Festival crowd with the ASAYAN wordmark" />
      </section>

      <section>
        <div className="cs-wrap cs-intro">
          <div className="cs-intro-grid">
            <img className="cs-wand" src={iconWand} alt="" />
            <h1 className="cs-title">ASAYAN</h1>
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
          <SectionHead icon={iconEdit} title="Who are we?" />
          <div className="cs-indent">
            <div className="cs-indent-space" aria-hidden="true" />
            <div className="cs-indent-body asy-who">
              <img className="asy-mark" src={mark} alt="ASAYAN symbol" />
              <div className="asy-who-copy">
                <p className="cs-copy">{whoWeAreLead}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-wrap cs-design">
          <SectionHead icon={iconEdit} title="Design System" />
          <div className="cs-indent">
            <div className="cs-indent-space" aria-hidden="true" />
            <div className="cs-indent-body asy-design">
              <div className="asy-logo-copy">
                <h3 className="cs-subhead">Our Logo</h3>
                <p className="cs-copy">{logoCopy}</p>
              </div>
              <div className="asy-logo-marks">
                <img src={wordmark} alt="ASAYAN wordmark" />
                <img src={symbols} alt="ASAYAN symbol lockup" />
              </div>
              <h3 className="cs-subhead asy-color-title">colorfulness</h3>
              <p className="cs-copy asy-color-text">{colorCopy}</p>
              <div className="asy-palette" aria-label="ASAYAN color palette">
                {swatches.map((swatch) => (
                  <div key={swatch.hex} className="asy-swatch" style={{ background: swatch.color }}>
                    {swatch.hex}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-wrap">
          <SectionHead icon={iconPhotos} title="Our products" />
          <div className="cs-indent">
            <div className="cs-indent-space" aria-hidden="true" />
            <div className="cs-indent-body asy-products">
              <div className="asy-lifestyle">
                <img src={product1} alt="ASAYAN pouch and soap bubbles" />
                <img src={product2} alt="ASAYAN pouch, bubbles, and cigarette box" />
                <img src={product3} alt="ASAYAN cigarette box and lolipops" />
              </div>
              <div className="asy-line">
                <h3 className="cs-subhead">Lolipops</h3>
                <div className="asy-shelf asy-shelf-lolipops">
                  <img src={lolipopPattern} alt="ASAYAN lolipops pouch, pattern side" />
                  <img src={lolipopFront} alt="ASAYAN lolipops pouch, front" />
                </div>
              </div>
              <div className="asy-line">
                <h3 className="cs-subhead">Cigarettes</h3>
                <div className="asy-shelf asy-shelf-cigs">
                  <img src={cigFrontBrown} alt="ASAYAN cigarettes box, brown front" />
                  <img src={cigFrontCream} alt="ASAYAN cigarettes box, cream front" />
                  <img src={cigPatternBrown} alt="ASAYAN cigarettes box, brown pattern" />
                  <img src={cigPatternCream} alt="ASAYAN cigarettes box, cream pattern" />
                </div>
              </div>
              <div className="asy-line">
                <h3 className="cs-subhead">Soap bubbles</h3>
                <div className="asy-shelf asy-shelf-bubbles">
                  <img src={bubblesFront} alt="ASAYAN soap bubbles, front" />
                  <img src={bubblesPattern} alt="ASAYAN soap bubbles, pattern side" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-wrap">
          <SectionHead icon={iconPhotos} title="Our Store" />
          <div className="cs-indent">
            <div className="cs-indent-space" aria-hidden="true" />
            <div className="cs-indent-body asy-store">
              <img src={store2} alt="ASAYAN store interior with sculpture and counter" />
              <p className="cs-copy">{whoWeAreTail}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section asy-web-head">
        <div className="cs-wrap">
          <SectionHead icon={iconPhotos} title="Our website" />
        </div>
      </section>
      <section className="asy-web">
        <video
          ref={websiteRef}
          className="asy-web-video"
          src={websiteVideo}
          poster={websiteStill}
          autoPlay
          loop
          muted
          playsInline
        />
      </section>

      <section className="cs-section asy-social-head">
        <div className="cs-wrap">
          <SectionHead icon={iconFinalVideo} title="Social Media Video" />
          <div className="cs-indent">
            <div className="cs-indent-space" aria-hidden="true" />
            <div className="cs-indent-body">
              <SocialPhone />
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-wrap">
          <SectionHead icon={iconPhotos} title="Photos from the event" />
          <div className="cs-indent">
            <div className="cs-indent-space" aria-hidden="true" />
            <div className="cs-indent-body asy-event">
              <img src={event1} alt="ASAYAN exhibition corner with boards and products" />
              <img src={event2} alt="Yuval presenting the ASAYAN table" />
              <img src={event3} alt="Close-up of ASAYAN bag, bubbles, lolipops, and cigarettes" />
              <img src={event4} alt="ASAYAN table with pattern packaging and logo cutout" />
              <img src={event5} alt="ASAYAN table with bag, lolipops pouch, and cigarette box" />
            </div>
          </div>
        </div>
      </section>

      <div className="cs-wrap">
        <CaseStudyNav onProjects={onProjects} />
      </div>
    </article>
  )
}

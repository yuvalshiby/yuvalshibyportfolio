import { useEffect, useRef } from 'react'
import iconWand from './media/icon-wand.gif'
import iconJoystick from './media/iconJoystick.gif'
import iconEdit from './media/icon-edit.gif'
import iconComputer from './media/icon-computer.gif'
import iconEye from './media/icon-eye.gif'
import cycleIcon from './media/cycle.gif'
import hero from './media/bojack/hero.gif'
import logo from './media/bojack/logo.png'
import aboutArt from './media/bojack/about-cereal.png'
import icons from './media/bojack/icons.png'
import uiHome from './media/bojack/ui-home.png'
import uiAlarm from './media/bojack/ui-alarm.png'
import uiTimer from './media/bojack/ui-timer.png'
import uiStartOver from './media/bojack/ui-start-over.png'
import protoVideo from './media/bojack/prototype.mp4'
import protoPoster from './media/bojack/prototype-poster.jpg'
import { CaseStudyNav, SectionHead } from './chrome'

const summary =
  'The project explores the creation of a new app for a well-known character, using an existing mobile app as a starting point. The goal was to take a familiar everyday digital system and create a new experience shaped by the character’s personality, world, and defining traits. I chose BoJack Horseman and the phone’s alarm clock app, creating an interface that transforms a simple everyday action into an experience that feels as though it belongs to the character’s\u00a0world.'

const about =
  'BoJack Horseman is a former star who reached the peak of his career with Horsin’ Around and has been trying to recreate that success ever since. Behind his confident exterior is an insecure character driven by a need for validation, often turning to addiction and self-destructive behavior as an escape. The series explores cycles of trauma, addiction, and shame, while criticizing a culture that values fame and success over meaning.'

const typeNoteLead =
  'I chose to use the Ness font as the official font of the TV show online.'
const typeNoteTail = 'To keep the authentics of the series.'

const proto =
  'https://www.figma.com/proto/6hLli4WqYVWQ90UndnKKy4/Bojack-horseman-app?node-id=443-1059&scaling=scale-down&content-scaling=fixed&starting-point-node-id=443%3A1059&page-id=0%3A1'

const presentation = 'https://www.figma.com/deck/w1Q4BPg592xR6peF3O7g8q/Bojack-Horseman'

type Props = {
  onProjects: () => void
}

function BojackUserflow() {
  return (
    <svg className="bj-userflow" viewBox="0 0 920 520" fill="none" aria-label="Set and regret userflow">
      <defs>
        <marker id="bj-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#7a63f2" />
        </marker>
      </defs>
      <g stroke="#7a63f2" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round">
        <rect x="248" y="18" width="138" height="56" rx="8" />
        <rect x="402" y="18" width="118" height="56" rx="8" />
        <rect x="536" y="18" width="158" height="56" rx="8" />
        <rect x="168" y="148" width="148" height="118" rx="10" />
        <rect x="386" y="148" width="148" height="118" rx="10" />
        <rect x="604" y="148" width="148" height="118" rx="10" />
        <rect x="386" y="348" width="148" height="138" rx="10" />
        <rect x="786" y="88" width="108" height="52" rx="8" />
        <path d="M460 348 V 312" />
        <path d="M242 312 H 678" />
        <path d="M242 312 V 276" markerEnd="url(#bj-arrow)" />
        <path d="M460 312 V 276" markerEnd="url(#bj-arrow)" />
        <path d="M678 312 V 276" markerEnd="url(#bj-arrow)" />
        <path d="M460 148 V 116" />
        <path d="M317 116 H 615" />
        <path d="M317 116 V 84" markerEnd="url(#bj-arrow)" />
        <path d="M461 116 V 84" markerEnd="url(#bj-arrow)" />
        <path d="M615 116 V 84" markerEnd="url(#bj-arrow)" />
        <path d="M752 178 C 790 178 790 114 776 114" markerEnd="url(#bj-arrow)" />
      </g>
      <g className="bj-userflow-labels" textAnchor="middle">
        <text x="317" y="50">Edit your alarm</text>
        <text x="461" y="50">Set an alarm</text>
        <text x="615" y="50">Your sleeping habits</text>
        <text x="242" y="214">Timer</text>
        <text x="460" y="214">Alarm</text>
        <text x="678" y="214">Token</text>
        <text x="460" y="424">HOME PAGE</text>
        <text x="840" y="118">Start over</text>
      </g>
    </svg>
  )
}

export function BojackHorsemanCaseStudy({ onProjects }: Props) {
  const protoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = protoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) void video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.35 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <article className="cs" data-theme="bojack">
      <section className="cs-hero bj-hero">
        <img className="cs-hero-media" src={hero} alt="BoJack Horseman waking up in bed" />
      </section>

      <section>
        <div className="cs-wrap cs-intro">
          <div className="cs-intro-grid">
            <img className="cs-wand" src={iconWand} alt="" />
            <h1 className="cs-title bj-logo-wrap">
              <img className="bj-logo" src={logo} alt="BoJack Horseman" />
            </h1>
            <div className="cs-intro-meta">
              <p className="cs-year">2025</p>
              <div className="cs-meta">
                <p>
                  <small>Design Field</small>
                  UX. UI
                </p>
                <p>
                  <small>Team</small>
                  myself:)
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
        <div className="cs-wrap">
          <SectionHead icon={iconEye} title="About Bojack" />
          <div className="bj-about">
            <img src={aboutArt} alt="BoJack at the table with a box of Wheat Lumps" />
            <p className="cs-copy">{about}</p>
          </div>
        </div>
      </section>

      <section className="cs-section cs-userflow">
        <div className="cs-wrap">
          <SectionHead icon={iconJoystick} title="Userflow" />
          <div className="cs-userflow-frame">
            <BojackUserflow />
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-wrap cs-design">
          <SectionHead icon={iconEdit} title="Design System" />
          <div className="cs-indent">
            <div className="cs-indent-space" aria-hidden="true" />
            <div className="cs-indent-body">
              <h3 className="cs-subhead">Typography</h3>
              <p className="cs-copy bj-type-note">
                <span className="bj-type-note-lead">{typeNoteLead}</span>
                <br />
                {typeNoteTail}
              </p>
              <div className="bj-type-spec">
                <div className="bj-type-aa" aria-hidden="true">
                  <span className="bj-A">A</span>
                  <span className="bj-a">a</span>
                </div>
                <div className="bj-type-meta">
                  <p className="bj-type-name">Ness</p>
                  <p className="bj-type-alpha">
                    A B C D E F G H I J K L M N
                    <br />
                    O P Q R S T U V W X Y Z
                  </p>
                  <div className="bj-type-sizes">
                    <strong>Medium</strong>
                    <ul>
                      <li>24 pt</li>
                      <li>28 pt</li>
                      <li>32 pt</li>
                      <li>36 pt</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="cs-palette-block">
                <h3 className="cs-subhead">colourfulness</h3>
                <div className="bj-palette">
                  <div className="bj-swatch bj-swatch-a3">A3E5F1</div>
                  <div className="bj-swatch bj-swatch-70">70C7E3</div>
                  <div className="bj-swatch bj-swatch-white">70C7E3</div>
                  <div className="bj-swatch bj-swatch-019">019932</div>
                  <div className="bj-swatch bj-swatch-4ce">4CEB28</div>
                  <div className="bj-swatch bj-swatch-986">986830</div>
                  <div className="bj-swatch bj-swatch-000">000000</div>
                </div>
              </div>
              <div className="bj-icons-block">
                <h3 className="cs-subhead">icons</h3>
                <img className="bj-icons" src={icons} alt="Hand-drawn app icons" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="cs" data-theme="bojack-dark">
        <section className="cs-section">
          <div className="cs-wrap cs-ui">
            <SectionHead icon={iconComputer} title="UI Screens" />
            <div className="bj-ui-grid">
              <img className="bj-ui-home" src={uiHome} alt="Home screen, wake the fuck up" />
              <img className="bj-ui-alarm" src={uiAlarm} alt="Set an alarm at 8:00" />
              <img className="bj-ui-fail" src={uiStartOver} alt="Failed recovery, start over" />
              <img className="bj-ui-timer" src={uiTimer} alt="Timer screen" />
            </div>
          </div>
        </section>

        <section className="cs-section">
          <div className="cs-wrap cs-flow-section">
            <SectionHead icon={cycleIcon} title="Let’s look at our main flow" />
            <div className="cs-indent">
              <div className="cs-indent-space" aria-hidden="true" />
              <div className="cs-indent-body">
                <div className="cs-flow">
                  <video
                    ref={protoRef}
                    className="bj-proto-video"
                    src={protoVideo}
                    poster={protoPoster}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <div className="cs-flow-copy">
                    <a className="cs-link" href={proto} target="_blank" rel="noreferrer">
                      Explore Prototype <span aria-hidden="true">»</span>
                    </a>
                    <a className="cs-link" href={presentation} target="_blank" rel="noreferrer">
                      Explore character presentation <span aria-hidden="true">»</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <CaseStudyNav onProjects={onProjects} />
    </article>
  )
}

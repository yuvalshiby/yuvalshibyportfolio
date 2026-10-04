import { LiveSteps, useLiveIndex } from './motion'
import iconWand from './media/icon-wand.gif'
import iconJoystick from './media/iconJoystick.gif'
import iconEdit from './media/icon-edit.gif'
import iconComputer from './media/icon-computer.gif'
import cycleIcon from './media/cycle.gif'
import userflow from './media/deprogram-u.svg'
import typeSpecimen from './media/deprogram-type.svg'
import palette from './media/deprogram-cp.svg'
import uiScreens from './media/group-45.webp'
import recording from './media/deprogram-recording.mp4'
import captionLoop from './media/deprogram-caption-loop-optimized.mp4'
import flowVideo from './media/deprogram-flow-optimized.mp4'
import { CaseStudyNav, SectionHead } from './chrome'

const summary =
  'DEPROGRAM is a website for exploring Consciousness Engineering and its impact on how we perceive reality. Through thought provoking content and a community space for sharing, the site invites users to pause, ask questions, and realize they are not alone.'

const typeNote =
  'The typography system for DEPROGRAM is intentionally sharp and editorial. It uses clear hierarchy, compact spacing, and strong contrast to keep long-form ideas readable while still carrying the project’s bold, questioning tone.'

const steps = [
  'Welcome to DEPROGRAM.',
  'Scroll through the home page where you can discover how mind engineering shapes what we go through, and learn about the site and the rules it upholds.',
  'Discover the emotional effects of mind engineering on your brain and mind.',
  'Read what you can do about it, with steps that can help you control your exposure to everyday mind engineering.',
  'Share your feelings in our community forum, get feedback from other users, and feel less alone.',
]

const proto =
  'https://www.figma.com/proto/KmDsDIOjRhbG4OnmRmb2D1/DEPROGRAM?page-id=0%3A1&node-id=27-38&viewport=7908%2C-2528%2C0.37&t=WtuLZQcKfaLBXj9l-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=143%3A223'

const questions = ['Is this your thought?', 'Who put it there?', 'You are not alone.']

type Props = {
  onProjects: () => void
}

function DeprogramHero() {
  const { index, held, choose } = useLiveIndex(questions.length, 2800)
  const line = questions[index] ?? questions[0]

  return (
    <section className="cs-hero cs-ask" style={{ background: '#000' }}>
      <div className="cs-hero-stack">
        <div className="cs-hero-record">
          <video src={recording} autoPlay loop muted playsInline />
        </div>
        <div className="cs-hero-caption">
          <video src={captionLoop} autoPlay loop muted playsInline />
        </div>
      </div>
      <button
        type="button"
        className="cs-ask-line"
        key={line}
        onClick={() => choose(held ? (index + 1) % questions.length : index)}
      >
        {line}
      </button>
      {held ? null : <p className="cs-hint">Question it</p>}
    </section>
  )
}

export function DeprogramCaseStudy({ onProjects }: Props) {
  return (
    <article className="cs" data-theme="deprogram">
      <DeprogramHero />

      <section>
        <div className="cs-wrap cs-intro">
          <div className="cs-intro-grid">
            <img className="cs-wand" src={iconWand} alt="" />
            <h1 className="cs-title">DEPROGRAM</h1>
            <div className="cs-intro-meta">
              <p className="cs-year">2026</p>
              <div className="cs-meta">
                <p>
                  <small>Design Field</small>
                  UX.UI
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
            <a className="cs-link" href={proto} target="_blank" rel="noreferrer">
              Show Prototype <span aria-hidden="true">»</span>
            </a>
          </div>
        </div>
      </section>

      <section className="cs-section cs-userflow">
        <div className="cs-wrap">
          <SectionHead icon={iconJoystick} title="Userflow" />
          <div className="cs-userflow-frame">
            <img src={userflow} alt="Deprogram userflow" />
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
              <p className="cs-copy">{typeNote}</p>
              <img className="cs-type-art" src={typeSpecimen} alt="Deprogram typography" />
              <div className="cs-palette-block">
                <h3 className="cs-subhead">colourfulness</h3>
                <img className="cs-palette-art" src={palette} alt="Deprogram color palette" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="cs" data-theme="deprogram-dark">
        <section className="cs-section">
          <div className="cs-wrap cs-ui">
            <SectionHead icon={iconComputer} title="UI Screens" />
            <div className="cs-ui-art">
              <img src={uiScreens} alt="Deprogram UI screens" />
            </div>
          </div>
        </section>

        <section className="cs-section">
          <div className="cs-wrap cs-flow-section">
            <SectionHead icon={cycleIcon} title="Let's look at our main flow" />
            <div className="cs-indent">
              <div className="cs-indent-space" aria-hidden="true" />
              <div className="cs-indent-body">
                <div className="cs-flow cs-flow-laptop">
                  <video className="cs-laptop" src={flowVideo} autoPlay loop muted playsInline />
                  <div className="cs-flow-copy">
                    <LiveSteps steps={steps} interval={5200} hint="Stay on a step" />
                    <a className="cs-link" href={proto} target="_blank" rel="noreferrer">
                      Explore Prototype <span aria-hidden="true">»</span>
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

import { useEffect, useState } from 'react'
import { LiveSteps } from './motion'
import iconWand from './media/icon-wand.gif'
import iconJoystick from './media/iconJoystick.gif'
import iconEdit from './media/icon-edit.gif'
import iconComputer from './media/icon-computer.gif'
import cycleIcon from './media/cycle.gif'
import userflow from './media/breather-userflow.svg'
import typeSpecimen from './media/breather-type.svg'
import palette from './media/breather-cp.svg'
import uiScreens from './media/Group 44-new.png'
import phoneFrame from './media/breather-ui/parameters-3.svg'
import flowVideo from './media/breather-flow-optimized.mp4'
import { CaseStudyNav, SectionHead } from './chrome'

const summary =
  'Breather is an interactive concept product for emotional regulation, designed to help users cope with anxiety through guided breathing and sensory experience. Alongside the physical object, a companion app provides visual breathing guidance and usage tracking. The project explores how the combination of a physical product and a digital interface can create a non-pharmacological calming experience and small moments of balance in everyday life.'

const typeNote =
  'We chose the Ploni typeface for our app to support a calm, human, and accessible user experience. Ploni combines soft, rounded forms with a sense of stability and clarity, creating a feeling of trust and reassurance. It feels relaxed yet professional much like the product itself.'

const steps = [
  'Welcome to Breather.',
  'Start Breathing - the app main feature. Breathe according to the guidance of the app and the pulses you receive from the jewelry.',
  'Check out your parameters and monitor your causes of anxiety and stress.',
  'Choose your relaxing visuals to make your breathing session calmer.',
  'Make your Breathers fashionable, and upgrade your look by completing the jewelry set you need.',
]

const proto =
  'https://www.figma.com/proto/pVHYg0DQ9n7SMV2eqMVoco/Kamil?page-id=2235%3A920&node-id=2496-436&p=f&viewport=573%2C392%2C0.03&t=i1Gx1ykbNZF17Tey-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2829%3A2124'

type Props = {
  onProjects: () => void
}

const BREATH_MS = 4400

function BreatherHero() {
  const [phase, setPhase] = useState<'in' | 'out'>('out')

  useEffect(() => {
    let current: 'in' | 'out' = 'out'
    const tick = () => {
      current = current === 'in' ? 'out' : 'in'
      setPhase(current)
    }
    const start = window.setTimeout(tick, 360)
    const id = window.setInterval(tick, BREATH_MS)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(id)
    }
  }, [])

  const label = phase === 'in' ? 'Breathe in' : 'Breathe out'

  return (
    <section className={`cs-hero cs-breath${phase === 'in' ? ' is-in' : ' is-out'}`}>
      <div className="cs-breath-stage">
        <div className="cs-breath-ring" aria-hidden="true" />
        <div className="cs-orb" aria-hidden="true" />
      </div>
      <p className="cs-breath-label">{label}</p>
      <p className="cs-breath-hint">Follow the circle</p>
    </section>
  )
}

function BreatherFlow() {
  return (
    <div className="cs-flow">
      <div className="cs-phone">
        <img src={phoneFrame} alt="" />
        <video src={flowVideo} autoPlay loop muted playsInline />
      </div>
      <div className="cs-flow-copy">
        <LiveSteps steps={steps} interval={BREATH_MS} />
        <a className="cs-link" href={proto} target="_blank" rel="noreferrer">
          Explore Prototype <span aria-hidden="true">»</span>
        </a>
      </div>
    </div>
  )
}

export function BreatherCaseStudy({ onProjects }: Props) {
  return (
    <article className="cs" data-theme="breather">
      <BreatherHero />

      <section>
        <div className="cs-wrap cs-intro">
          <div className="cs-intro-grid">
            <img className="cs-wand" src={iconWand} alt="" />
            <h1 className="cs-title">Breather</h1>
            <div className="cs-intro-meta">
              <p className="cs-year">2025</p>
              <div className="cs-meta">
                <p>
                  <small>Design Field</small>
                  UX.UI
                </p>
                <p>
                  <small>Team</small>
                  Kamil fogel + myself
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
            <img src={userflow} alt="Breather userflow" />
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
              <img className="cs-type-art" src={typeSpecimen} alt="Breather typography" />
              <div className="cs-palette-block">
                <h3 className="cs-subhead">colourfulness</h3>
                <img className="cs-palette-art" src={palette} alt="Breather color palette" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-wrap cs-ui">
          <SectionHead icon={iconComputer} title="UI Screens" />
          <div className="cs-ui-art">
            <img src={uiScreens} alt="Breather UI screens" />
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-wrap cs-flow-section">
          <SectionHead icon={cycleIcon} title="Let's look at our main flow" />
          <div className="cs-indent">
            <div className="cs-indent-space" aria-hidden="true" />
            <div className="cs-indent-body">
              <BreatherFlow />
            </div>
          </div>
        </div>
      </section>
      <CaseStudyNav onProjects={onProjects} />
    </article>
  )
}

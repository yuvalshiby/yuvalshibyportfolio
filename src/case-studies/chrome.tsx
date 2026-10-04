import { useEffect, useRef, type ReactNode } from 'react'
import { useCaseMotion, useHeroIntroScroll } from './motion'

const LEAVE_MS = 680

function Chevron({ direction }: { direction: 'left' | 'up' }) {
  const d =
    direction === 'left' ? 'M14.5 4.5 6.5 12l8 7.5' : 'M4.5 14.5 12 6.5l7.5 8'
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

type CaseStudyChromeProps = {
  onBack: () => void
  children: ReactNode
}

export function CaseStudyChrome({ onBack, children }: CaseStudyChromeProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLButtonElement>(null)
  useCaseMotion(stageRef)
  useHeroIntroScroll(stageRef)

  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')

    function checkEnd() {
      const button = topRef.current
      if (!button || still.matches) return
      const reached =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 88
      button.classList.toggle('is-end', reached)
    }

    checkEnd()
    window.addEventListener('scroll', checkEnd, { passive: true })
    window.addEventListener('resize', checkEnd)
    return () => {
      window.removeEventListener('scroll', checkEnd)
      window.removeEventListener('resize', checkEnd)
    }
  }, [])

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <button
        type="button"
        className="cs-arrow cs-arrow-back"
        onClick={onBack}
        aria-label="Back to projects"
      >
        <Chevron direction="left" />
      </button>
      <div className="cs-stage" ref={stageRef}>
        {children}
      </div>
      <button
        type="button"
        className="cs-arrow cs-arrow-top"
        ref={topRef}
        onClick={scrollTop}
        aria-label="Scroll to top"
      >
        <Chevron direction="up" />
      </button>
    </>
  )
}

type CaseStudyNavProps = {
  onProjects: () => void
}

export function CaseStudyNav({ onProjects }: CaseStudyNavProps) {
  const leaving = useRef(false)

  function leave() {
    if (leaving.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onProjects()
      return
    }

    const stage =
      document.querySelector<HTMLElement>('.project-case') ??
      document.querySelector<HTMLElement>('.cs') ??
      document.querySelector<HTMLElement>('.project')

    if (!stage) {
      onProjects()
      return
    }

    leaving.current = true
    stage.classList.add('is-leaving')
    window.setTimeout(onProjects, LEAVE_MS)
  }

  return (
    <div className="cs-footer-nav">
      <button type="button" className="cs-back-projects" onClick={leave}>
        BACK TO PROJECTS
      </button>
    </div>
  )
}

type SectionHeadProps = {
  icon: string
  title: string
}

export function SectionHead({ icon, title }: SectionHeadProps) {
  return (
    <header className="cs-head">
      <img src={icon} alt="" />
      <h2>{title}</h2>
      <hr className="cs-rule" />
    </header>
  )
}

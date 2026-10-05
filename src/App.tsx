import { useCallback, useEffect, useState } from 'react'
import './App.css'
import heroCover from './assets/hero-cover.jpg'
import { About } from './About'
import { Contact } from './Contact'
import { CaseStudy, hasCaseStudy } from './case-studies/CaseStudy'
import { CoverLinks } from './CoverLinks'
import { HeroLetters } from './HeroLetters'
import { YearNotes } from './YearNotes'
import { CaseStudyNav } from './case-studies/chrome'
import { PageLoader } from './PageLoader'
import { getProject, projects } from './projects'
import { WorkGallery } from './WorkGallery'

type Page = 'home' | 'about' | 'work' | 'contact' | 'privacy' | 'year'
type Dive = 'in' | 'out' | null

function App() {
  const [page, setPage] = useState<Page>('home')
  const [projectSlug, setProjectSlug] = useState<string | null>(null)
  const [dive, setDive] = useState<Dive>(null)
  const [loaderKey, setLoaderKey] = useState(0)
  const clearLoader = useCallback(() => setLoaderKey(0), [])
  const project = projectSlug ? getProject(projectSlug) : undefined
  const showingCase = Boolean(project && hasCaseStudy(project.slug))
  const onWork = page === 'work' || Boolean(project) || dive === 'in'
  const showingHome = page === 'home' && !project && dive !== 'in'
  const showingAbout = page === 'about'
  const showingWork = (page === 'work' || dive === 'in') && !project
  const showPortal = !project && (page === 'home' || page === 'work')
  const fittingPage = showPortal || page === 'contact'

  useEffect(() => {
    document.documentElement.classList.toggle('home-fit', fittingPage)
    return () => document.documentElement.classList.remove('home-fit')
  }, [fittingPage])

  useEffect(() => {
    if (showPortal) return
    window.scrollTo(0, 0)
  }, [page, projectSlug, showPortal])

  useEffect(() => {
    if (!showPortal || dive) return
    const phone = window.matchMedia('(max-width: 800px)')

    function go() {
      if (phone.matches) return
      setDive(page === 'home' ? 'in' : 'out')
    }

    function onWheel(event: WheelEvent) {
      if (phone.matches || event.deltaY <= 28) return
      event.preventDefault()
      go()
    }

    let startY = 0
    function onTouchStart(event: TouchEvent) {
      startY = event.touches[0]?.clientY ?? 0
    }
    function onTouchEnd(event: TouchEvent) {
      const endY = event.changedTouches[0]?.clientY ?? startY
      if (startY - endY > 56) go()
    }

    window.addEventListener('wheel', onWheel, { passive: false, capture: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel, { capture: true })
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [showPortal, dive, page])

  function finishDive(direction: 'in' | 'out') {
    setPage(direction === 'in' ? 'work' : 'home')
    setDive(null)
  }

  // The scroll gesture keeps its own dive animation, so it skips the loader.
  function withLoader(target: string, change: () => void) {
    if ((projectSlug ? `project:${projectSlug}` : page) === target) return
    change()
    setLoaderKey((key) => key + 1)
  }

  function openHome() {
    withLoader('home', () => {
      setProjectSlug(null)
      setDive(null)
      setPage('home')
    })
  }

  function openAbout() {
    withLoader('about', () => {
      setProjectSlug(null)
      setDive(null)
      setPage('about')
    })
  }

  function openWork() {
    withLoader('work', () => {
      setProjectSlug(null)
      setDive(null)
      setPage('work')
    })
  }

  function openProject(slug: string) {
    withLoader(`project:${slug}`, () => {
      setDive(null)
      setPage('work')
      setProjectSlug(slug)
    })
  }

  function openYear() {
    withLoader('year', () => {
      setProjectSlug(null)
      setDive(null)
      setPage('year')
    })
  }

  function openContact() {
    withLoader('contact', () => {
      setProjectSlug(null)
      setDive(null)
      setPage('contact')
    })
  }

  return (
    <div
      className={`site${showingHome ? ' site-home' : ''}${showingAbout ? ' site-about' : ''}${showingWork ? ' site-work' : ''}${showingCase ? ' site-case' : ''}${page === 'contact' ? ' site-contact' : ''}${page === 'year' ? ' site-year' : ''}`}
    >
      <header className="header">
        <nav className="nav" aria-label="Primary">
          <button
            type="button"
            className={showingHome ? 'active' : ''}
            onClick={openHome}
          >
            Home
          </button>
          <button
            type="button"
            className={page === 'about' ? 'active' : ''}
            onClick={openAbout}
          >
            About
          </button>
          <button
            type="button"
            className={onWork ? 'active' : ''}
            onClick={openWork}
          >
            Projects
          </button>
          <button
            type="button"
            className={page === 'contact' ? 'active' : ''}
            onClick={openContact}
          >
            Contact
          </button>
        </nav>
      </header>

      {showPortal ? (
        <div
          className={`portal${page === 'work' && !dive ? ' is-work' : ''}${page === 'home' && !dive ? ' is-home' : ''}${dive ? ` dive-${dive}` : ''}`}
        >
          <div
            className="portal-layer portal-home"
            onAnimationEnd={(event) => {
              if (event.target !== event.currentTarget) return
              if (event.animationName === 'dive-away') finishDive('in')
              if (event.animationName === 'dive-return') finishDive('out')
            }}
          >
            <section className="cover" aria-label="Portfolio cover">
              <div className="cover-frame">
                <img className="cover-photo" src={heroCover} alt="" />
                <HeroLetters />
                <CoverLinks onAbout={openAbout} onYear={openYear} />
                <h1 className="cover-title">Yuval Shiby Portfolio</h1>
              </div>
            </section>
          </div>
          <div className="portal-layer portal-work">
            <WorkGallery projects={projects} onOpen={openProject} />
          </div>
          <div className="scroll-cue" aria-hidden="true">
            <span className="scroll-cue-mouse">
              <span />
            </span>
            <small>SCROLL</small>
          </div>
        </div>
      ) : null}

      {showingHome ? (
        <section className="home-rail" aria-label="Work">
          {projects.map((project) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => openProject(project.slug)}
            >
              <img src={project.image} alt="" />
              <span>{project.title}</span>
            </button>
          ))}
        </section>
      ) : null}

      {showingAbout ? <About /> : null}

      {page === 'contact' ? <Contact /> : null}

      {page === 'year' ? <YearNotes onHome={openHome} /> : null}

      {page === 'privacy' ? (
        <main className="placeholder">
          <h1>Privacy policy</h1>
          <p>Privacy policy content will go here.</p>
        </main>
      ) : null}

      {project && hasCaseStudy(project.slug) ? (
        <main className="project-case">
          <CaseStudy slug={project.slug} onProjects={openWork} />
        </main>
      ) : project ? (
        <main className="project">
          <button type="button" className="back" onClick={openWork}>
            All work
          </button>
          <h1>{project.title}</h1>
          <img src={project.image} alt={project.title} />
          <CaseStudyNav onProjects={openWork} />
        </main>
      ) : null}

      {loaderKey > 0 ? (
        <PageLoader key={loaderKey} onDone={clearLoader} />
      ) : null}

      <footer className="footer">
        <div className="footer-contact">
          <a href="mailto:yuvalshiby4@gmail.com">yuvalshiby4@gmail.com</a>
          <a href="tel:+972544277351">+972 544277351</a>
        </div>
        <span className="footer-privacy">privacy policy</span>
      </footer>
    </div>
  )
}

export default App

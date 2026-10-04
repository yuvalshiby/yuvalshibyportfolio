import { useEffect, useState, type RefObject } from 'react'

export function usePrefersStill() {
  const [still, setStill] = useState(false)

  useEffect(() => {
    setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return still
}

export function useLiveIndex(length: number, interval: number) {
  const [index, setIndex] = useState(0)
  const [held, setHeld] = useState(false)

  useEffect(() => {
    if (held || length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % length)
    }, interval)
    return () => window.clearInterval(id)
  }, [held, interval, length])

  function choose(next: number) {
    setIndex(next)
    setHeld(true)
  }

  return { index, held, choose }
}

export function LiveSteps({
  steps,
  interval,
  hint,
}: {
  steps: string[]
  interval: number
  hint?: string
}) {
  const { index, held, choose } = useLiveIndex(steps.length, interval)

  return (
    <>
      <ol className="cs-steps cs-steps-live">
        {steps.map((text, step) => {
          const on = step === index
          return (
            <li key={text} className={on ? 'is-on' : ''}>
              <button
                type="button"
                aria-current={on ? 'step' : undefined}
                onClick={() => choose(step)}
              >
                <span className="cs-step-mark" aria-hidden="true">
                  {step + 1}
                </span>
                <span>{text}</span>
              </button>
            </li>
          )
        })}
      </ol>
      {hint && !held ? <p className="cs-hint">{hint}</p> : null}
    </>
  )
}

const HINT_AFTER_MS = 3000
const HINT_AFTER_MEALKEA_MS = 1000
const HINT_DURATION_MS = 2600
const HINT_TITLE_GAP = 18

const SCROLL_KEYS = new Set([
  ' ',
  'Spacebar',
  'PageDown',
  'PageUp',
  'ArrowDown',
  'ArrowUp',
  'Home',
  'End',
])

function alreadyAtTitle(root: HTMLElement) {
  return window.scrollY >= titleHintTarget(root) - 8
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2
}

function headerOffset() {
  const header = document.querySelector<HTMLElement>('.header')
  return Math.round(header?.getBoundingClientRect().height ?? 64)
}

function titleHintTarget(root: HTMLElement) {
  const title = root.querySelector<HTMLElement>('.cs-title')
  if (!title) {
    const intro = root.querySelector<HTMLElement>('section:not(.cs-hero)')
    if (!intro) return window.scrollY
    return Math.max(0, window.scrollY + intro.getBoundingClientRect().top - headerOffset() - HINT_TITLE_GAP)
  }
  return Math.max(
    0,
    Math.round(window.scrollY + title.getBoundingClientRect().top - headerOffset() - HINT_TITLE_GAP),
  )
}

export function useHeroIntroScroll(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let timeoutId = 0
    let frame = 0
    let stopped = false

    function stopListening() {
      window.removeEventListener('wheel', onUserScroll)
      window.removeEventListener('touchmove', onUserScroll)
      window.removeEventListener('keydown', onKeyScroll)
    }

    function abort() {
      stopped = true
      if (timeoutId) window.clearTimeout(timeoutId)
      timeoutId = 0
      if (frame) window.cancelAnimationFrame(frame)
      frame = 0
      stopListening()
    }

    function onUserScroll() {
      abort()
    }

    function onKeyScroll(event: KeyboardEvent) {
      if (!SCROLL_KEYS.has(event.key)) return
      abort()
    }

    function nudgeFromHero() {
      timeoutId = 0
      if (stopped || alreadyAtTitle(root)) {
        stopListening()
        return
      }

      root.querySelector<HTMLElement>('section:not(.cs-hero)')?.classList.add('is-shown')

      const from = window.scrollY
      const to = titleHintTarget(root)
      if (to <= from + 8) {
        stopListening()
        return
      }
      const started = performance.now()

      function tick(now: number) {
        if (stopped) return
        const t = Math.min(1, (now - started) / HINT_DURATION_MS)
        window.scrollTo(0, from + (to - from) * easeInOutCubic(t))
        if (t < 1) {
          frame = window.requestAnimationFrame(tick)
          return
        }
        frame = 0
        stopListening()
      }

      frame = window.requestAnimationFrame(tick)
    }

    window.addEventListener('wheel', onUserScroll, { passive: true })
    window.addEventListener('touchmove', onUserScroll, { passive: true })
    window.addEventListener('keydown', onKeyScroll)

    function waitUntilShown() {
      if (stopped) return
      if (document.querySelector('.page-loader')) {
        frame = window.requestAnimationFrame(waitUntilShown)
        return
      }
      const mealkea = Boolean(root.querySelector('[data-theme="mealkea"]'))
      timeoutId = window.setTimeout(nudgeFromHero, mealkea ? HINT_AFTER_MEALKEA_MS : HINT_AFTER_MS)
    }

    frame = window.requestAnimationFrame(waitUntilShown)
    return abort
  }, [rootRef])
}

export function useCaseMotion(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const sections = [...root.querySelectorAll<HTMLElement>('section:not(.cs-hero)')]
    if (reduce) {
      sections.forEach((section) => section.classList.add('is-shown'))
      return
    }

    const reveal = () => {
      const view = window.innerHeight
      for (const section of sections) {
        if (section.classList.contains('is-shown')) continue
        const rect = section.getBoundingClientRect()
        if (rect.top < view * 0.88 && rect.bottom > 48) {
          section.classList.add('is-shown')
        }
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-shown')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -6% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    root.dataset.motion = 'on'

    const hero = root.querySelector<HTMLElement>('.cs-hero')
    let frame = 0
    const shift = () => {
      frame = 0
      reveal()
      if (!hero) return
      const rect = hero.getBoundingClientRect()
      const passed = Math.min(1, Math.max(0, -rect.top / (rect.height || 1)))
      hero.style.setProperty('--hero-shift', `${Math.round(passed * 48)}px`)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(shift)
    }
    shift()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [rootRef])
}

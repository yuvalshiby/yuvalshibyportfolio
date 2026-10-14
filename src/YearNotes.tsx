import { useEffect, useRef, useState } from 'react'

const TITLE = '26 things that happened in the world of culture in 2026'

const facts = [
  'Barcelona became the World Capital of Architecture.',
  "Taylor Swift's 1989 album was added to the U.S. National Recording Registry.",
  "Dataland opened in Los Angeles, presented as the world's first AI art museum.",
  'KPop Demon Hunters won the Oscar for Best Animated Feature.',
  'Fashion brand Sézane revealed a new visual identity for the first time in 13 years.',
  'The iPhone 18 Pro introduced a variable aperture system in its main camera for the first time.',
  'Taylor Swift became the artist with the most wins in MTV VMA history.',
  'The David Geffen Galleries opened at LACMA in Los Angeles, designed by architect Peter Zumthor.',
  'Advertising agency BBH unveiled its first new branding in 44 years.',
  "Cristian Mungiu's FJORD won the Palme d'Or at the Cannes Film Festival.",
  'The Doom soundtrack was added to the U.S. National Recording Registry.',
  'The Israel Museum presented its first exhibition dedicated entirely to works centered around sound.',
  'Madonna won seven MTV VMA awards in a single night.',
  'The Getty unveiled a refreshed visual identity featuring a redesigned geometric G symbol.',
  'The video game Silent Hill was inducted into the World Video Game Hall of Fame.',
  'The Design Museum in London opened the first major retrospective of NIGO, featuring more than 700 objects.',
  'Bad Bunny won the Grammy Award for Album of the Year.',
  'The Eurovision stage featured a curved, leaf-shaped LED surface, while ARRI cameras were used in the contest for the first time.',
  'Frida Escobedo Studio won the Cooper Hewitt National Design Award for Architecture.',
  "Tyler, the Creator's CHROMAKOPIA won the Grammy for Best Album Cover.",
  'Ghent Design Museum reopened with an entrance wing built using recycled construction materials.',
  'Bulgaria won the Eurovision Song Contest for the first time with DARA\'s "Bangaranga."',
  "The Metropolitan Museum of Art's fashion exhibition featured nearly 400 objects in its new galleries.",
  'V&A East opened The Music Is Black, an exhibition exploring the development of Black music in Britain.',
  "Jackson Pollock's Number 7A, 1948 sold for approximately $181 million, setting a new auction record for the artist.",
  'Cooper Hewitt presented Art of Noise, an exhibition featuring more than 300 works exploring the relationship between design, music, and sound.',
]

const COLUMN_SIZE = 13

const TITLE_CHAR_MS = 34
const FACT_CHAR_MS = 16
const FACT_PAUSE = 280

function factStarts() {
  const starts: number[] = []
  let cursor = TITLE.length * TITLE_CHAR_MS + 460
  for (const fact of facts) {
    starts.push(cursor)
    cursor += fact.length * FACT_CHAR_MS + FACT_PAUSE
  }
  return starts
}

type YearNotesProps = {
  onHome: () => void
}

export function YearNotes({ onHome }: YearNotesProps) {
  const [writing, setWriting] = useState(false)
  const [titleCount, setTitleCount] = useState(0)
  const [counts, setCounts] = useState<Array<number | null>>(() =>
    facts.map(() => null),
  )
  const followRef = useRef(true)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!writing) return

    const starts = factStarts()
    const titleDone = TITLE.length * TITLE_CHAR_MS
    const last = facts.length - 1
    const allDone = starts[last] + facts[last].length * FACT_CHAR_MS
    let origin = 0
    let frame = 0

    function tick(now: number) {
      if (!origin) origin = now
      const elapsed = now - origin
      setTitleCount(Math.min(TITLE.length, Math.floor(elapsed / TITLE_CHAR_MS)))
      setCounts(
        facts.map((fact, index) => {
          const local = elapsed - starts[index]
          if (local < 0) return null
          return Math.min(fact.length, Math.floor(local / FACT_CHAR_MS))
        }),
      )
      if (elapsed < Math.max(titleDone, allDone)) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [writing])

  useEffect(() => {
    function onScroll() {
      const gap = document.documentElement.scrollHeight - window.scrollY - window.innerHeight
      followRef.current = gap < 140
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const started = counts.filter((count) => count !== null).length

  useEffect(() => {
    if (!writing || !followRef.current) return
    const items = listRef.current?.querySelectorAll('li')
    items?.[items.length - 1]?.scrollIntoView({ block: 'nearest' })
  }, [started, writing])

  if (!writing) {
    return (
      <main className="year-notes is-year">
        <BackHome onHome={onHome} />
        <h1
          className="year-notes-mark"
          onAnimationEnd={(event) => {
            if (event.animationName !== 'year-notes-out') return
            setWriting(true)
          }}
        >
          2026
        </h1>
      </main>
    )
  }

  const titleTyping = titleCount < TITLE.length

  return (
    <main className="year-notes is-list">
      <BackHome onHome={onHome} />
      <h1 className="year-notes-title">
        {TITLE.slice(0, titleCount)}
        {titleTyping ? <span className="year-caret" /> : null}
      </h1>
      <div className="year-notes-columns" ref={listRef}>
        {[0, COLUMN_SIZE].map((start) => (
          <ol className="year-notes-list" key={start}>
            {facts.slice(start, start + COLUMN_SIZE).map((fact, offset) => {
              const index = start + offset
              const count = counts[index]
              if (count === null) return null
              const typing = count < fact.length
              return (
                <li key={fact}>
                  <span className="year-notes-index">{String(index + 1).padStart(2, '0')}</span>
                  <p>
                    {fact.slice(0, count)}
                    {typing ? <span className="year-caret" /> : null}
                  </p>
                </li>
              )
            })}
          </ol>
        ))}
      </div>
    </main>
  )
}

function BackHome({ onHome }: YearNotesProps) {
  return (
    <button type="button" className="cs-arrow cs-arrow-back" onClick={onHome} aria-label="Back">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.5 4.5 6.5 12l8 7.5" />
      </svg>
    </button>
  )
}
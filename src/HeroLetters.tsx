import { useEffect, useRef } from 'react'
import letterP from './assets/letters/0-P.png'
import letterO1 from './assets/letters/1-O1.png'
import letterR from './assets/letters/2-R.png'
import letterT from './assets/letters/3-T.png'
import letterF from './assets/letters/4-F.png'
import letterO2 from './assets/letters/5-O2.png'
import letterL from './assets/letters/6-L.png'
import letterI from './assets/letters/7-I.png'
import letterO3 from './assets/letters/8-O3.png'

type Stroke = {
  d: string
  width: number
  duration: number
}

type Letter = {
  id: string
  src: string
  x: number
  y: number
  w: number
  h: number
  strokes: Stroke[]
}

const O_RING = 'M 58 5 C 24 5 6 34 7 56 C 9 82 30 97 50 96 C 78 94 94 70 93 45 C 92 20 80 5 55 7'

const letters: Letter[] = [
  {
    id: 'P',
    src: letterP,
    x: 12.305,
    y: 29.34,
    w: 12.402,
    h: 38.715,
    strokes: [
      { d: 'M 34 14 C 31 42 30 70 34 97', width: 40, duration: 0.34 },
      { d: 'M 30 20 C 55 12 88 18 88 40 C 88 58 66 64 34 60', width: 30, duration: 0.36 },
      { d: 'M 4 26 L 56 22 M 30 2 L 32 44 M 10 6 L 52 40 M 52 6 L 8 42', width: 16, duration: 0.3 },
    ],
  },
  {
    id: 'O1',
    src: letterO1,
    x: 23.853,
    y: 33.854,
    w: 10.034,
    h: 34.418,
    strokes: [{ d: O_RING, width: 38, duration: 0.6 }],
  },
  {
    id: 'R',
    src: letterR,
    x: 33.008,
    y: 32.769,
    w: 11.084,
    h: 35.2,
    strokes: [
      { d: 'M 22 5 C 19 38 17 68 15 97', width: 38, duration: 0.32 },
      { d: 'M 20 9 C 50 2 86 10 84 30 C 82 48 60 55 30 55', width: 30, duration: 0.34 },
      { d: 'M 40 50 C 60 64 78 80 90 97', width: 34, duration: 0.28 },
    ],
  },
  {
    id: 'T',
    src: letterT,
    x: 43.164,
    y: 30.035,
    w: 8.203,
    h: 36.936,
    strokes: [
      { d: 'M 1 17 C 30 11 70 6 99 7', width: 22, duration: 0.26 },
      { d: 'M 48 22 C 45 50 40 75 38 98', width: 48, duration: 0.34 },
    ],
  },
  {
    id: 'F',
    src: letterF,
    x: 50.415,
    y: 33.333,
    w: 8.569,
    h: 33.854,
    strokes: [
      { d: 'M 30 8 C 24 40 17 70 14 98', width: 44, duration: 0.34 },
      { d: 'M 8 16 C 40 10 70 6 97 5', width: 22, duration: 0.24 },
      { d: 'M 10 30 C 40 26 70 22 94 20', width: 18, duration: 0.22 },
      { d: 'M 8 43 C 35 39 58 37 82 36', width: 22, duration: 0.22 },
    ],
  },
  {
    id: 'O2',
    src: letterO2,
    x: 57.568,
    y: 34.418,
    w: 10.425,
    h: 33.984,
    strokes: [{ d: O_RING, width: 38, duration: 0.6 }],
  },
  {
    id: 'L',
    src: letterL,
    x: 66.992,
    y: 29.34,
    w: 8.008,
    h: 38.845,
    strokes: [
      { d: 'M 52 10 C 46 40 36 70 24 94', width: 48, duration: 0.34 },
      { d: 'M 14 91 C 45 87 75 82 99 79', width: 22, duration: 0.24 },
      { d: 'M 4 18 L 72 6 M 36 0 L 40 32 M 4 4 L 62 30', width: 14, duration: 0.26 },
    ],
  },
  {
    id: 'I',
    src: letterI,
    x: 73.438,
    y: 33.767,
    w: 5.859,
    h: 33.377,
    strokes: [
      { d: 'M 50 1 C 26 2 24 15 46 16 C 72 17 76 3 50 2', width: 20, duration: 0.24 },
      { d: 'M 46 19 C 46 45 43 70 41 96', width: 50, duration: 0.3 },
    ],
  },
  {
    id: 'O3',
    src: letterO3,
    x: 77.539,
    y: 36.762,
    w: 9.058,
    h: 31.076,
    strokes: [{ d: O_RING, width: 38, duration: 0.6 }],
  },
]

const START_DELAY = 0.12
const STROKE_SPEED = 0.55
const LEAD_GAP = 0.045
const STROKE_OVERLAP = 0.03
const NEXT_LETTER_AT = 0.5
const FINISH_DURATION = 0.2

function strokeTime(stroke: Stroke) {
  return stroke.duration * STROKE_SPEED
}

const schedule = (() => {
  let cursor = START_DELAY
  return letters.map((letter) => {
    const starts: number[] = []
    const letterStart = cursor
    let t = cursor
    letter.strokes.forEach((stroke) => {
      starts.push(t)
      t += strokeTime(stroke) - STROKE_OVERLAP
    })
    const end = t + STROKE_OVERLAP + LEAD_GAP
    cursor = letterStart + (end - letterStart) * NEXT_LETTER_AT
    return { starts, end }
  })
})()

const TOTAL = Math.max(...schedule.map((item) => item.end)) + FINISH_DURATION

function handEase(progress: number) {
  if (progress <= 0) return 0
  if (progress >= 1) return 1
  return 0.5 - Math.cos(Math.PI * progress) / 2
}

export function HeroLetters() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const inkNodes = [...root.querySelectorAll<HTMLElement>('.hero-letter-ink')]
    const start = performance.now()
    let frame = 0
    let frameId = 0

    function tick(now: number) {
      const t = (now - start) / 1000

      inkNodes.forEach((ink, letterIndex) => {
        const { starts, end } = schedule[letterIndex]
        const strokes = letters[letterIndex].strokes
        const leads = ink.querySelectorAll<SVGPathElement>('.hero-letter-lead')
        const fills = ink.querySelectorAll<SVGPathElement>('.hero-letter-stroke')

        strokes.forEach((stroke, index) => {
          const duration = strokeTime(stroke)
          const lead = handEase((t - starts[index]) / duration)
          const fill = handEase((t - starts[index] - LEAD_GAP) / duration)
          leads[index].style.strokeDashoffset = String(1 - lead)
          fills[index].style.strokeDashoffset = String(1 - fill)
        })

        const finish = ink.querySelector<SVGRectElement>('.hero-letter-finish')
        if (finish) {
          const fade = Math.min(1, Math.max(0, (t - end) / FINISH_DURATION))
          finish.style.opacity = String(fade)
        }

        const mask = ink.querySelector('mask')
        if (mask) mask.setAttribute('x', frame % 2 === 0 ? '-10' : '-10.001')
      })

      frame += 1
      if (t < TOTAL) frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <div className="hero-letters" aria-hidden="true" ref={rootRef}>
      {letters.map((letter) => (
        <div key={`cover-${letter.id}`} className="hero-letter" style={boxStyle(letter)}>
          <svg className="hero-letter-draw" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <filter id={`cover-${letter.id}`} x="-25%" y="-25%" width="150%" height="150%">
                <feMorphology operator="dilate" radius="7" in="SourceAlpha" result="grown" />
                <feFlood floodColor="#fefefe" result="paper" />
                <feComposite in="paper" in2="grown" operator="in" />
              </filter>
            </defs>
            <image
              href={letter.src}
              width="100"
              height="100"
              preserveAspectRatio="none"
              filter={`url(#cover-${letter.id})`}
            />
          </svg>
        </div>
      ))}

      {letters.map((letter) => {
        const maskId = `write-${letter.id}`

        return (
          <div key={letter.id} className="hero-letter hero-letter-ink" style={boxStyle(letter)}>
            <svg className="hero-letter-draw" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <mask
                  id={maskId}
                  maskUnits="userSpaceOnUse"
                  x="-10"
                  y="-10"
                  width="120"
                  height="120"
                >
                  <rect width="100" height="100" fill="black" />
                  {letter.strokes.map((stroke, index) => (
                    <g key={index} fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">
                      <path
                        className="hero-letter-lead"
                        d={stroke.d}
                        strokeWidth={stroke.width * 0.35}
                        transform="translate(1.5 -1)"
                        pathLength={1}
                      />
                      <path
                        className="hero-letter-stroke"
                        d={stroke.d}
                        strokeWidth={stroke.width}
                        pathLength={1}
                      />
                    </g>
                  ))}
                  <rect className="hero-letter-finish" width="100" height="100" fill="white" />
                </mask>
              </defs>
              <image
                href={letter.src}
                width="100"
                height="100"
                preserveAspectRatio="none"
                mask={`url(#${maskId})`}
              />
            </svg>
          </div>
        )
      })}
    </div>
  )
}

function boxStyle(letter: Letter) {
  return {
    left: `${letter.x}%`,
    top: `${letter.y}%`,
    width: `${letter.w}%`,
    height: `${letter.h}%`,
  }
}

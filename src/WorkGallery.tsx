import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { folderArtFor } from './folderArts'
import type { Project } from './projects'

type Spot = {
  x: number
  y: number
  rot: number
  delay: number
  dur: number
}

function seededRandom(seed: number) {
  let value = seed
  return () => {
    value = (value * 16807) % 2147483647
    return (value - 1) / 2147483646
  }
}

function scatter(count: number): Spot[] {
  const rand = seededRandom(91)
  const spots: Spot[] = []
  const minX = 11
  const maxX = 89
  const minY = 22
  const maxY = 80
  const gapX = 18
  const gapY = 24

  function clearance(x: number, y: number) {
    if (spots.length === 0) return Infinity
    return Math.min(
      ...spots.map((spot) => {
        const dx = (x - spot.x) / gapX
        const dy = (y - spot.y) / gapY
        return Math.hypot(dx, dy)
      }),
    )
  }

  for (let index = 0; index < count; index += 1) {
    let bestX = minX
    let bestY = minY
    let bestClearance = -1

    for (let attempt = 0; attempt < 36; attempt += 1) {
      const x = minX + rand() * (maxX - minX)
      const y = minY + rand() * (maxY - minY)
      const space = clearance(x, y)
      if (space > bestClearance) {
        bestClearance = space
        bestX = x
        bestY = y
      }
    }

    spots.push({
      x: bestX,
      y: bestY,
      rot: (rand() - 0.5) * 16,
      delay: rand() * 2.4,
      dur: 4.8 + rand() * 2.2,
    })
  }

  return spots
}

const topics = [
  {
    id: 'branding',
    label: 'Branding',
    slugs: ['ASAYAN', 'MEALKEA', 'YASHKA'],
  },
  {
    id: 'ux',
    label: 'UX UI',
    slugs: ['BREATHER', 'DEPROGRAM', 'BOJACK HORSEMAN'],
  },
  {
    id: 'print',
    label: 'Print',
    slugs: ['CATALOG', 'DEADLY GREETING'],
  },
  {
    id: 'motion',
    label: 'Motion',
    slugs: ['THE SILENT PATIENT'],
  },
] as const

type GalleryView = 'scatter' | 'topics'
type PoseMode = 'live' | 'locked' | 'move'

type Pose = {
  x: number
  y: number
  w: number
  rot: number
}

const MOVE_MS = 880
const STAGGER_MS = 28

type WorkGalleryProps = {
  projects: Project[]
  onOpen: (slug: string) => void
}

function FolderCard({
  project,
  index,
  spot,
  pose,
  moving,
  placed,
  delay,
  onOpen,
}: {
  project: Project
  index: number
  spot: Spot
  pose: Pose | null
  moving: boolean
  placed: boolean
  delay: number
  onOpen: (slug: string) => void
}) {
  const style = {
    left: pose ? `${pose.x}px` : `${spot.x}%`,
    top: pose ? `${pose.y}px` : `${spot.y}%`,
    width: pose ? `${pose.w}px` : undefined,
    transform: `translate(-50%, -50%) rotate(${pose ? pose.rot : spot.rot}deg)`,
    transitionDelay: moving ? `${delay}ms` : '0ms',
    '--folder-delay': `${spot.delay}s`,
    '--folder-dur': `${spot.dur}s`,
  } as CSSProperties

  return (
    <button
      type="button"
      className={`folder-card${placed ? ' is-placed' : ''}${moving ? ' is-move' : ''}`}
      data-slug={project.slug}
      style={style}
      onClick={() => onOpen(project.slug)}
    >
      <span className="folder-bob">
        <span className="folder-visual">
          <img className="folder-art" src={folderArtFor(index)} alt="" />
          <span
            className={`folder-photo folder-photo-${project.slug.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <img src={project.image} alt="" />
          </span>
        </span>
        <span className="folder-name">{project.title}</span>
      </span>
    </button>
  )
}

function centerOf(rect: DOMRect, origin: DOMRect): { x: number; y: number } {
  return {
    x: rect.left - origin.left + rect.width / 2,
    y: rect.top - origin.top + rect.height / 2,
  }
}

export function WorkGallery({ projects, onOpen }: WorkGalleryProps) {
  const [view, setView] = useState<GalleryView>('topics')
  const [poseMode, setPoseMode] = useState<PoseMode>('live')
  const [targets, setTargets] = useState<Record<string, Pose>>({})
  const spots = useMemo(() => scatter(projects.length), [projects.length])
  const bySlug = useMemo(
    () => new Map(projects.map((project, index) => [project.slug, { project, index }])),
    [projects],
  )
  const fieldRef = useRef<HTMLDivElement>(null)
  const slotRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const lockedRef = useRef<Record<string, Pose>>({})
  const settleTimer = useRef(0)

  function scatterPose(): Record<string, Pose> {
    const field = fieldRef.current
    const width = field?.clientWidth ?? 1
    const height = field?.clientHeight ?? 1
    const cardWidth = Math.min(150, width * 0.145)
    return Object.fromEntries(
      projects.map((project, index) => {
        const spot = spots[index] ?? spots[0]
        return [
          project.slug,
          {
            x: (spot.x / 100) * width,
            y: (spot.y / 100) * height,
            w: cardWidth,
            rot: spot.rot,
          },
        ]
      }),
    )
  }

  function topicPose(): Record<string, Pose> {
    const field = fieldRef.current
    if (!field) return {}
    const origin = field.getBoundingClientRect()
    const next: Record<string, Pose> = {}
    for (const topic of topics) {
      for (const slug of topic.slugs) {
        const slot = slotRefs.current[slug]
        if (!slot) continue
        const center = centerOf(slot.getBoundingClientRect(), origin)
        next[slug] = { x: center.x, y: center.y, w: slot.offsetWidth, rot: 0 }
      }
    }
    return next
  }

  function currentPose(): Record<string, Pose> {
    const field = fieldRef.current
    if (!field) return {}
    const origin = field.getBoundingClientRect()
    const next: Record<string, Pose> = {}
    for (const project of projects) {
      const card = field.querySelector<HTMLElement>(`[data-slug="${CSS.escape(project.slug)}"]`)
      if (!card) continue
      const center = centerOf(card.getBoundingClientRect(), origin)
      const rot = Number.parseFloat(card.style.transform.match(/rotate\(([-\d.]+)deg\)/)?.[1] ?? '0')
      next[project.slug] = { x: center.x, y: center.y, w: card.offsetWidth, rot }
    }
    return next
  }

  function toggleView() {
    const next = view === 'topics' ? 'scatter' : 'topics'
    window.clearTimeout(settleTimer.current)
    lockedRef.current = currentPose()
    setPoseMode('locked')
    setView(next)
  }

  useEffect(() => {
    if (poseMode !== 'locked') return
    let second = 0
    const first = window.requestAnimationFrame(() => {
      second = window.requestAnimationFrame(() => {
        setTargets(view === 'topics' ? topicPose() : scatterPose())
        setPoseMode('move')
        settleTimer.current = window.setTimeout(
          () => setPoseMode('live'),
          MOVE_MS + Math.max(projects.length - 1, 0) * STAGGER_MS + 60,
        )
      })
    })
    return () => {
      window.cancelAnimationFrame(first)
      window.cancelAnimationFrame(second)
    }
  }, [poseMode, view, projects.length])

  useLayoutEffect(() => {
    if (view !== 'topics' || poseMode !== 'live') return
    const measure = () => setTargets(topicPose())
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [view, poseMode, projects])

  const shownPose = poseMode === 'locked' ? lockedRef.current : poseMode === 'move' ? targets : view === 'topics' ? targets : null

  return (
    <main className="work-gallery">
      <button
        type="button"
        className={view === 'topics' ? 'sort-sign is-topics' : 'sort-sign'}
        aria-pressed={view === 'topics'}
        aria-label={view === 'topics' ? 'Show the scattered folders' : 'Sort the folders by topic'}
        onClick={toggleView}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 4.5h18L14.2 12v6.2L9.8 20v-8L3 4.5z" />
        </svg>
      </button>

      <div className={view === 'topics' ? 'topic-board is-on' : 'topic-board'} aria-hidden={view !== 'topics'}>
        {topics.map((topic) => (
          <section key={topic.id} className="topic-column">
            <h2 className="topic-label">{topic.label}</h2>
            <div className="topic-folders">
              {topic.slugs.map((slug) =>
                bySlug.has(slug) ? (
                  <div
                    key={slug}
                    className="topic-slot"
                    ref={(node) => {
                      slotRefs.current[slug] = node
                    }}
                  />
                ) : null,
              )}
            </div>
          </section>
        ))}
      </div>

      <div className="folder-field" ref={fieldRef}>
        {projects.map((project, index) => (
          <FolderCard
            key={project.slug}
            project={project}
            index={index}
            spot={spots[index] ?? spots[0]}
            pose={shownPose?.[project.slug] ?? null}
            moving={poseMode !== 'live'}
            placed={view === 'topics' && poseMode !== 'locked'}
            delay={index * STAGGER_MS}
            onOpen={onOpen}
          />
        ))}
      </div>
    </main>
  )
}

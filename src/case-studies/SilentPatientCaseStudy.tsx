import { useEffect, useRef } from 'react'
import { useLiveIndex } from './motion'
import iconWand from './media/icon-wand.gif'
import iconEye from './media/icon-eye.gif'
import iconBook from './media/icon-book.gif'
import iconFinalVideo from './media/icon-final-video.svg'
import heroVideo from './media/silent-patient-chair-optimized.mp4'
import inspirationVideo from './media/silent-patient-inspiration-optimized.mp4'
import finalVideo from './media/silent-patient-sophie-sequence-optimized.mp4'
import portrait from './media/silent/silent-inspiration-plain.png'
import poster from './media/silent/silent-reference-plain.png'
import { CaseStudyNav, SectionHead } from './chrome'

const styleFrames = Object.entries(
  import.meta.glob('./media/silent/silent-style-*-plain.png', {
    eager: true,
    import: 'default',
  }),
)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, src]) => src as string)

const aiFrames = Object.entries(
  import.meta.glob('./media/silent/silent-ai-*-optimized.webp', {
    eager: true,
    import: 'default',
  }),
)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, src]) => src as string)

const summary =
  'A motion opening created for the book "The Silent Patient". The piece translates the psychological tension of the story into a visual language, creating an opening that draws the viewer into the mysterious atmosphere of the\u00A0narrative.'

type Props = {
  onProjects: () => void
}

function FrameReel({ frames }: { frames: string[] }) {
  const { index, held, choose } = useLiveIndex(frames.length, 2200)
  const frame = frames[index]

  return (
    <div className="cs-reel">
      {frame ? <img className="cs-reel-stage" src={frame} alt="" key={frame} /> : null}
      <div className="cs-reel-thumbs">
        {frames.map((src, step) => (
          <button
            key={src}
            type="button"
            className={step === index ? 'is-on' : ''}
            aria-label={`Style frame ${step + 1}`}
            aria-current={step === index ? 'true' : undefined}
            onClick={() => choose(step)}
          >
            <img src={src} alt="" />
          </button>
        ))}
      </div>
      {held ? null : <p className="cs-hint">Hold a frame</p>}
    </div>
  )
}

export function SilentPatientCaseStudy({ onProjects }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) void video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.4 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <article className="cs" data-theme="silent">
      <section className="cs-hero" style={{ background: '#000' }}>
        <video
          className="cs-hero-media"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
      </section>

      <section>
        <div className="cs-wrap cs-intro">
          <div className="cs-intro-grid">
            <img className="cs-wand" src={iconWand} alt="" />
            <h1 className="cs-title">The Silent Patient</h1>
            <div className="cs-intro-meta">
              <p className="cs-year">2026</p>
              <div className="cs-meta">
                <p>
                  <small>Design Field</small>
                  Animated title sequence
                </p>
                <p>
                  <small>Team</small>
                  myself
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
        <div className="cs-wrap cs-inspire">
          <SectionHead icon={iconEye} title="Inspiration" />
          <div className="cs-indent">
            <div className="cs-indent-space" aria-hidden="true" />
            <div className="cs-indent-body">
              <div className="cs-inspire-top">
                <img className="cs-inspire-portrait" src={portrait} alt="Saul Bass portrait" />
                <div className="cs-inspire-side">
                  <p className="cs-copy">
                    Soul Bass was my inspiration for creating the video because of
                    his line style and his way of creating that doesn't pretend to
                    be overly complicated.
                  </p>
                  <img
                    className="cs-inspire-poster"
                    src={poster}
                    alt="Saul Bass poster references"
                  />
                </div>
              </div>
              <div className="cs-inspire-rest">
                <div className="cs-grid-3">
                  {styleFrames.map((frame) => (
                    <img key={frame} src={frame} alt="" />
                  ))}
                </div>
                <p className="cs-copy">
                  After I made my first sketches, I came across this video, which
                  completely changed my way of thinking about what the film should
                  look like.
                </p>
                <video
                  className="cs-inspire-clip"
                  src={inspirationVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <p className="cs-copy">
                  From here on, I decided to create my images with the help of
                  Gemini pro and Animate the film with AI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-wrap cs-frames">
          <SectionHead icon={iconBook} title="Style Frames" />
          <div className="cs-indent">
            <div className="cs-indent-space" aria-hidden="true" />
            <div className="cs-indent-body cs-frames-body">
              <FrameReel frames={aiFrames} />
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-wrap cs-final">
          <SectionHead icon={iconFinalVideo} title="Final Video" />
          <div className="cs-indent">
            <div className="cs-indent-space" aria-hidden="true" />
            <div className="cs-indent-body cs-final-body">
              <video
                className="cs-final-video"
                ref={videoRef}
                src={finalVideo}
                controls
                playsInline
              />
            </div>
          </div>
        </div>
      </section>
      <CaseStudyNav onProjects={onProjects} />
    </article>
  )
}

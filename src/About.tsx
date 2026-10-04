import { useLayoutEffect, useRef, useState } from 'react'
import portrait from './assets/about-portrait.jpg'
import speechBubble from './assets/about-speech-bubble.png'
import { Hobbies } from './Hobbies'

export function About() {
  const stageRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [textBox, setTextBox] = useState({ top: 80, height: 0, contactHeight: 0 })
  const [showHobbies, setShowHobbies] = useState(false)
  const [returned, setReturned] = useState(false)

  useLayoutEffect(() => {
    const stage = stageRef.current
    const image = imageRef.current

    function measure() {
      if (!stage || !image) return
      const stageBox = stage.getBoundingClientRect()
      const imageBox = image.getBoundingClientRect()
      const headOffset = imageBox.height * 0.12
      const clothingBottom = imageBox.height * 0.816
      setTextBox({
        top: imageBox.top - stageBox.top + headOffset,
        height: imageBox.height - headOffset,
        contactHeight: clothingBottom - headOffset,
      })
    }

    measure()
    image?.addEventListener('load', measure)
    window.addEventListener('resize', measure)
    return () => {
      image?.removeEventListener('load', measure)
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <main className={`about${showHobbies ? ' is-hobbies' : ''}${returned ? ' is-returned' : ''}`}>
      {showHobbies ? (
        <button
          type="button"
          className="cs-arrow cs-arrow-back"
          aria-label="Back"
          onClick={() => {
            setShowHobbies(false)
            setReturned(true)
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14.5 4.5 6.5 12l8 7.5" />
          </svg>
        </button>
      ) : null}
      <div className="about-stage" ref={stageRef}>
        <div className="about-portrait-wrap">
          <button
            type="button"
            className="about-portrait-hit"
            aria-label="Yuval Shiby"
            onClick={() => {
              setReturned(false)
              setShowHobbies(true)
            }}
          >
            <img
              ref={imageRef}
              className="about-portrait"
              src={portrait}
              alt=""
            />
          </button>
          <div className="about-bubble">
            <img src={speechBubble} alt="" />
            <div className="about-bubble-copy">
              <p>Lets dive in even more!</p>
              <p>click on me</p>
            </div>
          </div>
        </div>
        <div
          className="about-copy"
          style={{ top: textBox.top, height: textBox.contactHeight }}
        >
          <h1>So.. Who am I?</h1>
          <p>
            I am a multidisciplinary designer and artist with a strong interest
            in the emotional and psychological impact of design.
          </p>
          <p>
            My work often explores the relationship between people and
            technology, focusing on sensory experience, interaction, and
            attention to small details.
          </p>
          <p>
            I am drawn to projects that combine concept and aesthetics, and I
            enjoy moving between digital and physical mediums from interactive
            concepts to visual experiments. Much of my work begins with
            curiosity, how design makes us feel, how it influences our
            behavior, and how small experiences can become meaningful ones.
          </p>
          <p>
            I believe good design tells a story, and great design makes people
            pause
            <br />
            for a moment and feel something.
          </p>
        </div>
        <div
          className="about-contact"
          style={{ top: textBox.top, height: textBox.contactHeight }}
        >
          <a href="mailto:yuvalshiby4@gmail.com">yuvalshiby4@gmail.com</a>
          <a href="tel:+972544277351">+972 544277351</a>
          <a
            href="https://www.instagram.com/yuvalshiby14/"
            target="_blank"
            rel="noreferrer"
          >
            @yuvalshiby14
          </a>
          <a
            href="https://photos.app.goo.gl/U1R2viAdmnzS9hE37"
            target="_blank"
            rel="noreferrer"
          >
            https://photos.app.goo.gl/U1R2viAdmnzS9hE37
          </a>
        </div>
        <Hobbies />
      </div>
    </main>
  )
}

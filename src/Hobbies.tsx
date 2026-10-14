import { useEffect, useState } from 'react'
import paint1 from './assets/hobbies/paint-1.jpg'
import paint2 from './assets/hobbies/paint-2.jpg'
import paint3 from './assets/hobbies/paint-3.jpg'
import paint4 from './assets/hobbies/paint-4.jpg'
import cook1 from './assets/hobbies/cook-1.jpg'
import cook2 from './assets/hobbies/cook-2.jpg'
import cook3 from './assets/hobbies/cook-3.jpg'
import cook4 from './assets/hobbies/cook-4.jpg'
import cook5 from './assets/hobbies/cook-5.jpg'
import bake1 from './assets/hobbies/bake-1.jpg'
import bake2 from './assets/hobbies/bake-2.jpg'
import bake3 from './assets/hobbies/bake-3.jpg'
import sculpture1 from './assets/hobbies/sculpture-1.jpg'
import sculpture2 from './assets/hobbies/sculpture-2.jpg'
import sculpture3 from './assets/hobbies/sculpture-3.jpg'

const hobbies = [
  { name: 'painting', images: [paint1, paint2, paint3, paint4], delay: 0 },
  { name: 'cooking', images: [cook1, cook2, cook3, cook4, cook5], delay: 700 },
  { name: 'baking', images: [bake1, bake2, bake3], delay: 1400 },
  { name: 'sculpting', images: [sculpture1, sculpture2, sculpture3], delay: 2100 },
]

const HOLD_MS = 2800

export function Hobbies() {
  return (
    <section className="about-hobbies" aria-label="things i like to do">
      <h1>things i like to do</h1>
      <div className="about-hobbies-row">
        {hobbies.map((hobby) => (
          <HobbyStack
            key={hobby.name}
            name={hobby.name}
            images={hobby.images}
            delay={hobby.delay}
          />
        ))}
      </div>
    </section>
  )
}

function HobbyStack({
  name,
  images,
  delay,
}: {
  name: string
  images: string[]
  delay: number
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length < 2) return

    let interval = 0
    const start = window.setTimeout(() => {
      setIndex((current) => (current + 1) % images.length)
      interval = window.setInterval(() => {
        setIndex((current) => (current + 1) % images.length)
      }, HOLD_MS)
    }, delay + HOLD_MS)

    return () => {
      window.clearTimeout(start)
      window.clearInterval(interval)
    }
  }, [delay, images.length])

  return (
    <figure className="hobby">
      <div className="hobby-stack">
        <div className="hobby-frame">
          {images.map((src, imageIndex) => (
            <img
              key={src}
              src={src}
              alt=""
              className={imageIndex === index ? 'is-on' : ''}
            />
          ))}
        </div>
      </div>
      <figcaption>{name}</figcaption>
    </figure>
  )
}

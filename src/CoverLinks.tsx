import yearMark from './assets/cover-2026.png'
import nameMark from './assets/cover-yuval.png'

type CoverLinksProps = {
  onAbout: () => void
  onYear: () => void
}

export function CoverLinks({ onAbout, onYear }: CoverLinksProps) {
  return (
    <>
      <span className="cover-mark cover-mark-year" aria-hidden="true" />
      <span className="cover-mark cover-mark-name" aria-hidden="true" />
      <button
        type="button"
        className="cover-link cover-link-year"
        aria-label="2026"
        onClick={onYear}
      >
        <img src={yearMark} alt="" />
      </button>
      <button
        type="button"
        className="cover-link cover-link-name"
        aria-label="Yuval Shiby"
        onClick={onAbout}
      >
        <img src={nameMark} alt="" />
      </button>
    </>
  )
}

import { useEffect } from 'react'
import logo from './assets/logo.png'

export function PageLoader({ onDone }: { onDone: () => void }) {
  // The veil covers the whole site, so never let it outlive its animation.
  useEffect(() => {
    const timer = window.setTimeout(onDone, 900)
    return () => window.clearTimeout(timer)
  }, [onDone])

  return (
    <div
      className="page-loader"
      aria-hidden="true"
      onAnimationEnd={(event) => {
        if (event.target !== event.currentTarget) return
        onDone()
      }}
    >
      <div className="page-loader-inner">
        <img className="page-loader-logo" src={logo} alt="" />
        <span className="page-loader-note">preparing the next page</span>
      </div>
    </div>
  )
}

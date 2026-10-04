import { useState, type FormEvent } from 'react'
import contactArt from './assets/contact-me.jpg'

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const subject = name.trim() ? `Hello from ${name.trim()}` : 'Hello'
    const lines = [message.trim(), email.trim() && `Email: ${email.trim()}`].filter(
      Boolean,
    )
    window.location.href = `mailto:yuvalshiby4@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n\n'))}`
  }

  return (
    <main className="contact">
      <h1 className="visually-hidden">Contact me</h1>
      <div className="contact-frame">
        <img className="contact-art" src={contactArt} alt="" />
        <form className="contact-form" onSubmit={onSubmit}>
          <label className="contact-field contact-field-name">
            <span className="visually-hidden">Name</span>
            <input
              name="name"
              autoComplete="name"
              placeholder="My name.."
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
          <label className="contact-field contact-field-email">
            <span className="visually-hidden">Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="My mail is.."
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="contact-field contact-field-message">
            <span className="visually-hidden">Message</span>
            <textarea
              name="message"
              rows={5}
              placeholder="I have something jucie to say.."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
            />
          </label>
          <div className="contact-submit-slot">
            <button className="contact-submit" type="submit">
              <span className="contact-submit-label">I’d love to hear from you</span>
              <span className="contact-submit-fill" aria-hidden="true">
                <span className="contact-submit-label">I’d love to hear from you</span>
              </span>
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

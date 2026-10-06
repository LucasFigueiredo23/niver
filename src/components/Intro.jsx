import { useCallback, useEffect, useRef, useState } from 'react'
import './Intro.css'

/* Abertura curta (< 2 s). Pode pular com o botão, Enter ou Esc. */
const SEQUENCE = [
  { at: 0, label: 'Iniciando a experiência', pct: 1 },
  { at: 300, label: 'Carregando Celina', pct: 33 },
  { at: 640, label: 'Carregando 20 anos', pct: 77 },
  { at: 960, label: 'Carregando 20 anos', pct: 100 },
  { at: 1200, ready: true },
]
const LEAVE_AT = 1600
const LEAVE_DURATION = 380

export function Intro({ onDone }) {
  const [index, setIndex] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const done = useRef(onDone)
  done.current = onDone

  const leave = useCallback(() => setLeaving(true), [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('is-locked')
    const timers = SEQUENCE.map((step, i) => window.setTimeout(() => setIndex(i), step.at))
    timers.push(window.setTimeout(leave, LEAVE_AT))
    const onKey = (event) => (event.key === 'Escape' || event.key === 'Enter') && leave()
    window.addEventListener('keydown', onKey)
    return () => {
      timers.forEach(window.clearTimeout)
      window.removeEventListener('keydown', onKey)
      root.classList.remove('is-locked')
    }
  }, [leave])

  useEffect(() => {
    if (!leaving) return
    const id = window.setTimeout(() => done.current(), LEAVE_DURATION)
    return () => window.clearTimeout(id)
  }, [leaving])

  const step = SEQUENCE[index]

  return (
    <div className={`intro ${leaving ? 'is-leaving' : ''}`}>
      <div className="intro__box" aria-hidden="true">
        {step.ready ? (
          <p className="intro__ready">Bora?</p>
        ) : (
          <>
            <p className="intro__pct">
              {String(step.pct).padStart(2, '0')}
              <span>%</span>
            </p>
            <p className="hud intro__label">{step.label}…</p>
            <div className="intro__bar">
              <span style={{ transform: `scaleX(${step.pct / 100})` }} />
            </div>
          </>
        )}
      </div>
      <button type="button" className="intro__skip" onClick={leave}>
        Pular intro
      </button>
    </div>
  )
}

import { useRef, useState } from 'react'
import { hero, photos, surprise } from '../data/celina'
import { useCelebration } from '../context/CelebrationContext'
import { useMouseParallax } from '../hooks/useMouseParallax'
import { CONFETTI_COLORS } from '../lib/confetti'
import { Button } from './ui/Button'
import { CourtLines } from './ui/CourtLines'
import { Icon } from './ui/Icon'
import { Modal } from './ui/Modal'
import { Photo } from './ui/Photo'
import './Hero.css'

const NAME = 'Celina'
const TRIPLE_TAP_WINDOW = 700

export function Hero({ ready }) {
  const { celebrate, sfx, secret, setSecret, showToast, reduced } = useCelebration()
  const sceneRef = useMouseParallax()
  const [surpriseOpen, setSurpriseOpen] = useState(false)
  const taps = useRef({ count: 0, last: 0 })
  const [tapCount, setTapCount] = useState(0)

  function startCelebration(event) {
    celebrate({ from: event.currentTarget })
    window.setTimeout(
      () => document.getElementById('identidade')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }),
      reduced ? 0 : 750,
    )
  }

  function openSurprise() {
    sfx('pop')
    setSurpriseOpen(true)
  }

  // Easter egg: 3 cliques seguidos no 333 ligam/desligam o modo secreto.
  function tapNumber(event) {
    const now = performance.now()
    const t = taps.current
    t.count = now - t.last < TRIPLE_TAP_WINDOW ? t.count + 1 : 1
    t.last = now
    setTapCount((n) => n + 1)
    if (t.count < 3) {
      sfx('tick')
      return
    }
    t.count = 0
    const unlocking = !secret
    setSecret(unlocking)
    showToast(unlocking ? 'Modo secreto liberado' : 'Modo secreto desligado')
    celebrate(
      unlocking
        ? { size: 'big', colors: CONFETTI_COLORS.lime, sound: 'unlock' }
        : { from: event.currentTarget, size: 'small', colors: CONFETTI_COLORS.purple, sound: 'tick' },
    )
  }

  return (
    <section id="topo" ref={sceneRef} className="hero" data-ready={ready} aria-labelledby="hero-title">
      <div className="hero__scene" aria-hidden="true">
        <div className="hero__glow hero__glow--a" />
        <div className="hero__glow hero__glow--b" />
        <div className="hero__beam" />
        <CourtLines className="hero__court" />
      </div>

      <div className="container hero__inner">
        <h1 id="hero-title" className="hero__title">
          <span className="sr-only">Celina, {hero.ageLine}</span>
          <span className="hero__name" aria-hidden="true">
            {NAME.split('').map((char, i) => (
              <span key={i} className="hero__char" style={{ '--i': i }}>
                {char}
              </span>
            ))}
          </span>
          <span className="hero__day hero__fade" style={{ '--d': 1 }} aria-hidden="true">
            {hero.ageLine}
          </span>
        </h1>

        <div className="hero__pass">
          <Photo src={photos.hero.src} alt={photos.hero.alt} eager className="hero__photo" />
          <div className="hero__pass-meta">
            <span>{hero.passLabel}</span>
            <span>{hero.passNumber}</span>
          </div>
        </div>

        <div className="hero__copy">
          <p className="hero__subtitle hero__fade" style={{ '--d': 2 }}>
            {hero.subtitle.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <div className="hero__actions hero__fade" style={{ '--d': 3 }}>
            <Button magnetic icon="arrow" onClick={startCelebration}>
              Começar a festa
            </Button>
            <Button variant="ghost" iconStart="gift" onClick={openSurprise}>
              Tenho uma surpresa
            </Button>
          </div>
          <ul className="hero__tags hero__fade" style={{ '--d': 4 }} aria-label="Celina em quatro palavras">
            {hero.tags.map((tag) => (
              <li key={tag.label}>
                <Icon name={tag.icon} size={14} />
                {tag.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__number-wrap hero__fade" style={{ '--d': 5 }}>
          <button
            type="button"
            className={`hero__number ${secret ? 'is-on' : ''}`}
            data-tap={tapCount ? tapCount % 2 : undefined}
            onClick={tapNumber}
            aria-label="333"
          >
            <span>3</span>
            <span>3</span>
            <span>3</span>
          </button>
        </div>
      </div>

      <Modal open={surpriseOpen} onClose={() => setSurpriseOpen(false)} title={surprise.title}>
        <div className="modal__body">
          {surprise.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="modal__signature">{surprise.signature}</p>
        </div>
      </Modal>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import { photos, track } from '../data/celina'
import { useCelebration } from '../context/CelebrationContext'
import { createBirthdayTrack, TRACK_DURATION } from '../lib/audio/birthdayTrack'
import { createFilePlayer } from '../lib/audio/filePlayer'
import { Icon } from './ui/Icon'
import { Photo } from './ui/Photo'
import { SectionTitle } from './ui/SectionTitle'
import './Tracklist.css'

const BANDS = 20
const STATUS_TEXT = {
  idle: 'Ready',
  playing: 'Now playing…',
  paused: 'Paused',
  ended: 'Acabou. De novo?',
  error: 'Este navegador não liberou o áudio',
}
const IS_IOS =
  typeof navigator !== 'undefined' &&
  (/iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))

const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`

function createEngine(onEnded) {
  const engine = track.audioSrc ? createFilePlayer(track.audioSrc) : createBirthdayTrack()
  engine.onEnded = onEnded
  return engine
}

export function Tracklist() {
  const { celebrate } = useCelebration()
  const [status, setStatus] = useState('idle')
  const statusRef = useRef(status)
  statusRef.current = status

  const engineRef = useRef(null)
  const eqRef = useRef(null)
  const progressRef = useRef(null)
  const timeRef = useRef(null)
  const durationRef = useRef(null)
  const glowRef = useRef(null)

  async function start(fresh) {
    try {
      if (fresh || !engineRef.current) {
        engineRef.current?.destroy()
        engineRef.current = createEngine(() => setStatus('ended'))
      }
      await engineRef.current.play()
      setStatus('playing')
    } catch {
      setStatus('error')
    }
  }

  function toggle(event) {
    if (status === 'playing') {
      engineRef.current?.pause()
      setStatus('paused')
      return
    }
    if (status === 'idle') celebrate({ from: event.currentTarget, size: 'small', sound: null })
    start(status === 'ended' || status === 'error')
  }

  // Desenha equalizador, glow e progresso direto no DOM (sem re-render a 60fps).
  useEffect(() => {
    const bars = Array.from(eqRef.current.children)
    const engine = engineRef.current

    if (status !== 'playing' || !engine) {
      bars.forEach((bar) => (bar.style.transform = 'scaleY(0.08)'))
      glowRef.current.style.opacity = '0.25'
      if (status === 'ended') progressRef.current.style.transform = 'scaleX(1)'
      return
    }

    const levels = new Array(BANDS).fill(0)
    let raf = 0
    const render = () => {
      engine.readLevels(levels)
      bars.forEach((bar, i) => (bar.style.transform = `scaleY(${0.08 + levels[i] * 0.92})`))
      glowRef.current.style.opacity = String(0.25 + ((levels[0] + levels[1] + levels[2]) / 3) * 0.75)
      const time = engine.getTime()
      const duration = engine.duration
      progressRef.current.style.transform = `scaleX(${duration ? time / duration : 0})`
      timeRef.current.textContent = formatTime(time)
      if (duration) durationRef.current.textContent = formatTime(duration)
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)
    return () => cancelAnimationFrame(raf)
  }, [status])

  // Pausa se a pessoa trocar de aba; libera o áudio ao sair da página.
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && statusRef.current === 'playing') {
        engineRef.current?.pause()
        setStatus('paused')
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      engineRef.current?.destroy()
      engineRef.current = null
    }
  }, [])

  const playing = status === 'playing'
  const playLabel = playing ? 'Pausar' : 'Tocar'

  return (
    <section id="tracklist" className="section tracklist" aria-labelledby="tracklist-title">
      <div className="container">
        <SectionTitle id="tracklist-title" title={track.title}>
          Uma faixa original, feita pra hoje. Aperta o play.
        </SectionTitle>

        <div className="tracklist__layout">
          <article className={`player is-${status}`} aria-label="Player">
            <div ref={glowRef} className="player__glow" aria-hidden="true" />
            <div className="player__cover">
              <Photo src={photos.cover.src} alt={photos.cover.alt} />
              <div className="player__cover-type" aria-hidden="true">
                <span>777</span>
                <strong>
                  Celina&apos;s
                  <br />
                  version
                </strong>
              </div>
            </div>

            <div className="player__main">
              <p className="hud player__status" aria-live="polite">
                {STATUS_TEXT[status]}
              </p>
              <h3 className="player__title">
                {track.songTitle} <span>({track.songVersion})</span>
              </h3>
              <p className="player__artist">{track.artist}</p>

              <div ref={eqRef} className="eq" aria-hidden="true">
                {Array.from({ length: BANDS }, (_, i) => (
                  <span key={i} />
                ))}
              </div>

              <div className="progress" aria-hidden="true">
                <span ref={progressRef} />
              </div>
              <div className="player__times">
                <span ref={timeRef}>0:00</span>
                <span ref={durationRef}>{track.audioSrc ? '--:--' : formatTime(TRACK_DURATION)}</span>
              </div>

              <div className="player__controls">
                <button
                  type="button"
                  className="player__btn"
                  onClick={() => start(true)}
                  disabled={status === 'idle'}
                  aria-label="Tocar do começo"
                >
                  <Icon name="restart" />
                </button>
                <button type="button" className="player__btn player__btn--play" onClick={toggle} aria-label={playLabel}>
                  <Icon name={playing ? 'pause' : 'play'} size={26} />
                </button>
              </div>
            </div>
          </article>

          <div className="tracklist__side">
            <ol className="tracks">
              {track.tracklist.map((item, i) => {
                const number = String(i + 1).padStart(2, '0')
                if (!item.playable) {
                  return (
                    <li key={item.title} className="track">
                      <span className="track__n">{number}</span>
                      <span className="track__title">{item.title}</span>
                      <span className="track__time">{item.time}</span>
                    </li>
                  )
                }
                return (
                  <li key={item.title}>
                    <button
                      type="button"
                      className={`track track--playable ${playing ? 'is-active' : ''}`}
                      onClick={toggle}
                      aria-label={`${playLabel}: ${item.title}`}
                    >
                      <span className="track__n">{number}</span>
                      <span className="track__title">{item.title}</span>
                      <span className="track__time">
                        <Icon name={playing ? 'pause' : 'play'} size={14} />
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
            <p className="tracklist__credit">{track.credit}</p>
            {IS_IOS && playing && (
              <p className="tracklist__credit tracklist__hint">Sem som? Confira se o iPhone não está no modo silencioso.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

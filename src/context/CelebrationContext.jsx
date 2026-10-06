import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { CONFETTI_COLORS, createConfetti } from '../lib/confetti'
import { playSfx } from '../lib/audio/sfx'
import { readJSON, writeJSON } from '../lib/storage'
import { useReducedMotion } from '../hooks/useMediaQuery'
import { Toast } from '../components/ui/Toast'

/* Tudo que é "momento de festa" passa por aqui: confete, som, toast e o modo secreto. */

const CelebrationContext = createContext(null)
const SOUND_KEY = 'celinas-day:sound'

function centerOf(element) {
  if (!element) return {}
  const rect = element.getBoundingClientRect()
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
}

export function CelebrationProvider({ children }) {
  const canvasRef = useRef(null)
  const confetti = useRef(null)
  const reduced = useReducedMotion()
  const [soundOn, setSoundOn] = useState(() => readJSON(SOUND_KEY, true))
  const [secret, setSecret] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const engine = createConfetti(canvasRef.current)
    confetti.current = engine
    const onResize = () => engine.resize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      engine.destroy()
      confetti.current = null
    }
  }, [])

  useEffect(() => {
    writeJSON(SOUND_KEY, soundOn)
  }, [soundOn])

  useEffect(() => {
    document.documentElement.dataset.secret = secret ? 'on' : 'off'
  }, [secret])

  useEffect(() => {
    if (!toast) return
    const id = window.setTimeout(() => setToast(null), 2600)
    return () => window.clearTimeout(id)
  }, [toast])

  const sfx = useCallback((name) => soundOn && playSfx(name), [soundOn])

  const pulse = useCallback(() => {
    const root = document.documentElement
    root.classList.remove('is-celebrating')
    void root.offsetWidth // reinicia a animação se clicarem várias vezes
    root.classList.add('is-celebrating')
    window.setTimeout(() => root.classList.remove('is-celebrating'), 1100)
  }, [])

  /* size: 'small' | 'medium' | 'big' */
  const celebrate = useCallback(
    ({ from, size = 'medium', colors = CONFETTI_COLORS.mixed, sound = 'pop' } = {}) => {
      pulse()
      if (sound) sfx(sound)
      const engine = confetti.current
      if (reduced || !engine) return

      if (size === 'big') {
        const { innerWidth: w, innerHeight: h } = window
        engine.rain({ count: 130, colors })
        engine.burst({ x: w * 0.08, y: h, direction: -62, spread: 18, power: 1.25, count: 60, colors })
        engine.burst({ x: w * 0.92, y: h, direction: -118, spread: 18, power: 1.25, count: 60, colors })
        return
      }
      engine.burst({ ...centerOf(from), count: size === 'small' ? 40 : 90, colors })
    },
    [pulse, reduced, sfx],
  )

  const showToast = useCallback((message) => setToast({ id: Date.now(), message }), [])

  const value = useMemo(
    () => ({ celebrate, sfx, soundOn, setSoundOn, secret, setSecret, showToast, reduced }),
    [celebrate, sfx, soundOn, secret, showToast, reduced],
  )

  return (
    <CelebrationContext.Provider value={value}>
      {children}
      <div className="flash" aria-hidden="true" />
      <canvas ref={canvasRef} className="confetti-canvas" aria-hidden="true" />
      <Toast toast={toast} />
    </CelebrationContext.Provider>
  )
}

export function useCelebration() {
  const context = useContext(CelebrationContext)
  if (!context) throw new Error('useCelebration precisa estar dentro de <CelebrationProvider>')
  return context
}

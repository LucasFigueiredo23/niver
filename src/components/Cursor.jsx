import { useEffect, useRef, useState } from 'react'
import { FINE_POINTER, useMediaQuery, useReducedMotion } from '../hooks/useMediaQuery'

/* Cursor personalizado: anel que segue com atraso + ponto exato.
   Cresce sobre links/botões e mais ainda sobre [data-cursor="card"]. */
export function Cursor() {
  const finePointer = useMediaQuery(FINE_POINTER)
  const reduced = useReducedMotion()
  const enabled = finePointer && !reduced
  const ringRef = useRef(null)
  const dotRef = useRef(null)
  const [mode, setMode] = useState('default')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement
    root.classList.add('has-cursor')

    let x = 0
    let y = 0
    let ringX = 0
    let ringY = 0
    let raf = 0
    let currentMode = 'default'

    const follow = () => {
      ringX += (x - ringX) * 0.2
      ringY += (y - ringY) * 0.2
      ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      const settled = Math.abs(x - ringX) < 0.1 && Math.abs(y - ringY) < 0.1
      raf = settled ? 0 : requestAnimationFrame(follow)
    }

    const onMove = (event) => {
      x = event.clientX
      y = event.clientY
      dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      setVisible(true)
      const target = event.target instanceof Element ? event.target.closest('a, button, [data-cursor]') : null
      const nextMode = target ? target.dataset.cursor || 'link' : 'default'
      if (nextMode !== currentMode) {
        currentMode = nextMode
        setMode(nextMode)
      }
      if (!raf) raf = requestAnimationFrame(follow)
    }
    const onLeave = () => setVisible(false)

    document.addEventListener('pointermove', onMove, { passive: true })
    root.addEventListener('mouseleave', onLeave)
    return () => {
      document.removeEventListener('pointermove', onMove)
      root.removeEventListener('mouseleave', onLeave)
      root.classList.remove('has-cursor')
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className={`cursor is-${mode} ${visible ? 'is-visible' : ''}`} aria-hidden="true">
      <div ref={ringRef} className="cursor__pos">
        <span className="cursor__ring" />
      </div>
      <div ref={dotRef} className="cursor__pos">
        <span className="cursor__dot" />
      </div>
    </div>
  )
}

import { useEffect, useRef } from 'react'
import { FINE_POINTER, matches, REDUCED_MOTION } from './useMediaQuery'

/* Escreve --mx e --my (-1 a 1) no elemento, seguindo o mouse com suavização.
   Cada camada define a própria profundidade no CSS. Desligado no touch. */
export function useMouseParallax() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !matches(FINE_POINTER) || matches(REDUCED_MOTION)) return

    let targetX = 0
    let targetY = 0
    let x = 0
    let y = 0
    let raf = 0

    const tick = () => {
      x += (targetX - x) * 0.07
      y += (targetY - y) * 0.07
      el.style.setProperty('--mx', x.toFixed(4))
      el.style.setProperty('--my', y.toFixed(4))
      const settled = Math.abs(targetX - x) < 0.001 && Math.abs(targetY - y) < 0.001
      raf = settled ? 0 : requestAnimationFrame(tick)
    }

    const onMove = (event) => {
      targetX = (event.clientX / window.innerWidth) * 2 - 1
      targetY = (event.clientY / window.innerHeight) * 2 - 1
      if (!raf) raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return ref
}

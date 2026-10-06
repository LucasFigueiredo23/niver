import { useEffect, useState } from 'react'
import { matches, REDUCED_MOTION } from './useMediaQuery'

const easeOutCubic = (t) => 1 - (1 - t) ** 3

/* Conta de 0 até `target` quando `active` vira true. */
export function useCountUp(target, active, { duration = 1400, delay = 0 } = {}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    if (matches(REDUCED_MOTION)) {
      setValue(target)
      return
    }
    let raf = 0
    let start = 0
    const step = (now) => {
      if (!start) start = now + delay
      const t = Math.min(1, Math.max(0, (now - start) / duration))
      setValue(Math.round(easeOutCubic(t) * target))
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, active, duration, delay])

  return value
}

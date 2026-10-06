import { useEffect, useState } from 'react'

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
export const FINE_POINTER = '(hover: hover) and (pointer: fine)'

export const matches = (query) => typeof window !== 'undefined' && window.matchMedia(query).matches

export function useMediaQuery(query) {
  const [value, setValue] = useState(() => matches(query))

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setValue(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return value
}

export const useReducedMotion = () => useMediaQuery(REDUCED_MOTION)

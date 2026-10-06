import { useEffect, useRef } from 'react'

/* Dispara `onMatch` quando a pessoa digita `word` em qualquer lugar da página
   (fora de campos de texto). */
export function useSecretWord(word, onMatch) {
  const callback = useRef(onMatch)
  callback.current = onMatch

  useEffect(() => {
    const target = word.toLowerCase()
    let buffer = ''

    const onKey = (event) => {
      const el = event.target
      if (el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return
      if (event.key.length !== 1) return
      buffer = (buffer + event.key.toLowerCase()).slice(-target.length)
      if (buffer === target) {
        buffer = ''
        callback.current()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [word])
}

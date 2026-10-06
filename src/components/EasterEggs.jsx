import { useEffect, useState } from 'react'
import { useCelebration } from '../context/CelebrationContext'
import { useSecretWord } from '../hooks/useSecretWord'
import { CONFETTI_COLORS } from '../lib/confetti'
import { Icon } from './ui/Icon'
import './EasterEggs.css'

/* Easter egg: digitar "celina" em qualquer lugar da página = ACE! */
export function EasterEggs() {
  const { celebrate, showToast } = useCelebration()
  const [aceId, setAceId] = useState(0)

  useSecretWord('celina', () => {
    setAceId(Date.now())
    showToast('🏐 Ace!')
    celebrate({ size: 'big', colors: CONFETTI_COLORS.lime, sound: 'ace' })
  })

  useEffect(() => {
    if (!aceId) return
    const id = window.setTimeout(() => setAceId(0), 1500)
    return () => window.clearTimeout(id)
  }, [aceId])

  if (!aceId) return null

  return (
    <div key={aceId} className="ace" aria-hidden="true">
      <span className="ace__ball">
        <Icon name="volleyball" size={64} />
      </span>
      <p className="ace__text">Ace!</p>
    </div>
  )
}

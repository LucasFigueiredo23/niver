import { useEffect, useState } from 'react'
import { useCelebration } from '../context/CelebrationContext'
import { Icon } from './ui/Icon'

export function Header({ ready }) {
  const { soundOn, setSoundOn } = useCelebration()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`} data-ready={ready}>
      <div className="container site-header__inner">
        <a href="#topo" className="wordmark" aria-label="Celina's Day, voltar ao topo">
          Celina&apos;s Day <small>777</small>
        </a>
        <button
          type="button"
          className="sound-toggle"
          aria-pressed={soundOn}
          aria-label="Efeitos sonoros"
          onClick={() => setSoundOn((on) => !on)}
        >
          <Icon name={soundOn ? 'soundOn' : 'soundOff'} size={18} />
          <span aria-hidden="true">{soundOn ? 'Som on' : 'Som off'}</span>
        </button>
      </div>
    </header>
  )
}

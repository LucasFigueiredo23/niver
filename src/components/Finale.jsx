import { finale } from '../data/celina'
import { useCelebration } from '../context/CelebrationContext'
import { Button } from './ui/Button'
import { CourtLines } from './ui/CourtLines'
import './Finale.css'

export function Finale() {
  const { celebrate, reduced } = useCelebration()

  function celebrateAgain() {
    celebrate({ size: 'big' })
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }), reduced ? 0 : 1500)
  }

  return (
    <section id="final" className="finale" aria-labelledby="finale-title">
      <div className="finale__beam" aria-hidden="true" />
      <CourtLines className="finale__court" />
      <div className="container finale__inner">
        <h2 id="finale-title" className="finale__title">
          {finale.title}
        </h2>
        <p className="lede">{finale.text}</p>
        <Button magnetic onClick={celebrateAgain}>
          {finale.cta} 🎉
        </Button>
      </div>
    </section>
  )
}

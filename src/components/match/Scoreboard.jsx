import { useInView } from '../../hooks/useInView'
import { useCountUp } from '../../hooks/useCountUp'
import { CourtLines } from '../ui/CourtLines'

export function Scoreboard({ label, home, away, result, footnote }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const score = useCountUp(home.score, inView, { duration: 1600, delay: 250 })
  const done = inView && score === home.score

  return (
    <div ref={ref} className={`scoreboard ${done ? 'is-done' : ''}`} role="group" aria-label="Placar final">
      <CourtLines className="scoreboard__court" />
      <p className="hud scoreboard__label">
        <span className="scoreboard__live" aria-hidden="true" />
        {label}
      </p>
      <div className="score-row is-home">
        <span className="score-row__name">{home.name}</span>
        <span className="score-row__score">{score}</span>
      </div>
      <div className="score-row is-away">
        <span className="score-row__name">{away.name}</span>
        <span className="score-row__score">{away.score}</span>
      </div>
      <div className="scoreboard__end">
        <p className="scoreboard__result">{result}</p>
        <p className="scoreboard__foot">{footnote}</p>
      </div>
    </div>
  )
}

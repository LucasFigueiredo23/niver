import { matchPoint } from '../data/celina'
import { MvpCard } from './match/MvpCard'
import { Scoreboard } from './match/Scoreboard'
import { StatList } from './match/StatList'
import { SectionTitle } from './ui/SectionTitle'
import './MatchPoint.css'

export function MatchPoint() {
  return (
    <section id="match-point" className="section match" aria-labelledby="match-title">
      <div className="container">
        <SectionTitle id="match-title" title={matchPoint.title}>
          {matchPoint.subtitle}
        </SectionTitle>
        <div className="match__grid">
          <MvpCard />
          <StatList stats={matchPoint.stats} />
        </div>
        <Scoreboard {...matchPoint.scoreboard} />
      </div>
    </section>
  )
}

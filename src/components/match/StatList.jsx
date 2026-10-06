import { useInView } from '../../hooks/useInView'
import { useCountUp } from '../../hooks/useCountUp'

function StatRow({ stat, active, index }) {
  const infinite = stat.value === Infinity
  const target = infinite ? 100 : stat.value
  const value = useCountUp(target, active, { duration: target > 100 ? 1900 : 1300, delay: index * 120 })
  const done = active && value === target
  const overflow = Math.max(0, value - 100)

  return (
    <li className={`stat ${overflow ? 'is-overflow' : ''}`}>
      <div className="stat__head">
        <span className="stat__label">{stat.label}</span>
        <span className="stat__value" aria-hidden="true">
          {infinite && done ? <span className="stat__inf">∞</span> : value}
          <small>/100</small>
        </span>
        <span className="sr-only">{infinite ? 'infinito' : stat.value} de 100</span>
      </div>
      <div className="stat__bar" aria-hidden="true">
        <span className="stat__fill" style={{ transform: `scaleX(${Math.min(value, 100) / 100})` }} />
        {overflow > 0 && <span className="stat__overflow">+{overflow}</span>}
      </div>
      <p className="stat__note">{stat.note}</p>
    </li>
  )
}

export function StatList({ stats }) {
  const [ref, inView] = useInView({ threshold: 0.3 })
  return (
    <ul ref={ref} className="stats">
      {stats.map((stat, i) => (
        <StatRow key={stat.label} stat={stat} active={inView} index={i} />
      ))}
    </ul>
  )
}

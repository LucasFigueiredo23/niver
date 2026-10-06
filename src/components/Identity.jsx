import { identity } from '../data/celina'
import { useInView } from '../hooks/useInView'
import { Icon } from './ui/Icon'
import { SectionTitle } from './ui/SectionTitle'
import './Identity.css'

export function Identity() {
  const [listRef, inView] = useInView({ threshold: 0.15 })

  return (
    <section id="identidade" className="section identity" aria-labelledby="identity-title">
      <div className="container">
        <SectionTitle id="identity-title" title={identity.title}>
          {identity.intro}
        </SectionTitle>
        <ul ref={listRef} className="traits">
          {identity.traits.map((trait, i) => (
            <li key={trait.label} className={`trait reveal ${inView ? 'is-visible' : ''}`} style={{ '--i': i }}>
              <span className="trait__icon" aria-hidden="true">
                <Icon name={trait.icon} size={22} />
              </span>
              <h3 className="trait__label">{trait.label}</h3>
              <p className="trait__line">{trait.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

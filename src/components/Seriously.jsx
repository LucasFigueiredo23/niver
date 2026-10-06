import { photos, seriously } from '../data/celina'
import { useInView } from '../hooks/useInView'
import { Photo } from './ui/Photo'
import './Seriously.css'

/* Momento de respiro: menos efeito, mais texto. As frases acendem uma a uma. */
export function Seriously() {
  const [ref, inView] = useInView({ threshold: 0.35 })

  return (
    <section id="falando-serio" className="section seriously" aria-labelledby="seriously-title">
      <div className="container seriously__inner">
        <Photo src={photos.closing.src} alt={photos.closing.alt} className="seriously__photo" />
        <div ref={ref} className={`seriously__text ${inView ? 'is-visible' : ''}`}>
          <h2 id="seriously-title" className="title-xl">
            {seriously.title}
          </h2>
          {seriously.lines.map((line, i) => (
            <p key={line} className="seriously__line" style={{ '--i': i }}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

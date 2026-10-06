import { useRef } from 'react'
import { celina, matchPoint, photos } from '../../data/celina'
import { matches, REDUCED_MOTION } from '../../hooks/useMediaQuery'
import { Photo } from '../ui/Photo'

/* Card estilo "ultimate team": inclina em 3D e reflete luz seguindo o mouse. */
export function MvpCard() {
  const { mvp } = matchPoint
  const ref = useRef(null)

  const setTilt = (rx, ry, px, py) => {
    const style = ref.current.style
    style.setProperty('--rx', `${rx}deg`)
    style.setProperty('--ry', `${ry}deg`)
    style.setProperty('--px', `${px}%`)
    style.setProperty('--py', `${py}%`)
  }

  const onMove = (event) => {
    if (event.pointerType !== 'mouse' || matches(REDUCED_MOTION)) return
    const rect = ref.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    setTilt((0.5 - y) * 12, (x - 0.5) * 14, x * 100, y * 100)
  }

  return (
    <div className="mvp" ref={ref} onPointerMove={onMove} onPointerLeave={() => setTilt(0, 0, 50, 30)} data-cursor="card">
      <article className="mvp__card" aria-label={`Card de MVP: ${celina.fullName}, nota ${mvp.rating}`}>
        <div className="mvp__inner">
          <Photo src={photos.mvp.src} alt={photos.mvp.alt} className="mvp__photo" />
          <div className="mvp__rating">
            <strong>{mvp.rating}</strong>
            <span>{mvp.badge}</span>
          </div>
          <div className="mvp__body">
            <p className="mvp__name">{celina.fullName}</p>
            <p className="mvp__position">{mvp.position}</p>
            <dl className="mvp__stats">
              {mvp.stats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mvp__signature">{mvp.signature}</p>
          </div>
          <div className="mvp__sheen" aria-hidden="true" />
        </div>
      </article>
    </div>
  )
}

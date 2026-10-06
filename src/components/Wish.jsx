import { useState } from 'react'
import { wish } from '../data/celina'
import { useCelebration } from '../context/CelebrationContext'
import { Button } from './ui/Button'
import { SectionTitle } from './ui/SectionTitle'
import './Wish.css'

const allLit = () => Array(wish.candles).fill(true)

/* Bolo com velas: cada toque apaga uma. Quando a última apaga, festa. */
export function Wish() {
  const { celebrate, sfx } = useCelebration()
  const [lit, setLit] = useState(allLit)
  const remaining = lit.filter(Boolean).length

  function blowOut(index) {
    const next = lit.map((on, i) => (i === index ? false : on))
    setLit(next)
    if (next.some(Boolean)) sfx('tick')
    else celebrate({ size: 'big', sound: 'unlock' })
  }

  return (
    <section id="pedido" className="section wish" aria-labelledby="wish-title">
      <div className="container wish__inner">
        <SectionTitle id="wish-title" title={wish.title} className="wish__head">
          {wish.text}
        </SectionTitle>

        <div className={`cake ${remaining ? '' : 'is-done'}`}>
          <div className="cake__candles">
            {lit.map((on, i) => (
              <button
                key={i}
                type="button"
                className={`candle ${on ? 'is-lit' : 'is-out'}`}
                style={{ '--i': i }}
                onClick={() => blowOut(i)}
                disabled={!on}
                aria-label={on ? `Apagar vela ${i + 1}` : `Vela ${i + 1} apagada`}
              >
                <span className="candle__flame" aria-hidden="true" />
                <span className="candle__smoke" aria-hidden="true" />
                <span className="candle__stick" aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className="cake__body" aria-hidden="true">
            <span className="cake__label">20</span>
          </div>
        </div>

        <p className="wish__status" aria-live="polite">
          {remaining ? `${remaining} ${remaining === 1 ? 'vela acesa' : 'velas acesas'}` : wish.done}
        </p>
        {!remaining && (
          <Button variant="ghost" iconStart="restart" onClick={() => setLit(allLit())}>
            {wish.relight}
          </Button>
        )}
      </div>
    </section>
  )
}

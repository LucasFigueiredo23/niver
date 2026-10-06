import { celina, photos, sayHi } from '../data/celina'
import { Button } from './ui/Button'
import { Photo } from './ui/Photo'
import './SayHi.css'

export function SayHi() {
  const { handle, url } = celina.instagram

  return (
    <section id="instagram" className="section say-hi" aria-labelledby="sayhi-title">
      <div className="container say-hi__inner">
        <div className="say-hi__ring">
          <Photo src={photos.avatar.src} alt={photos.avatar.alt} className="say-hi__photo" />
        </div>
        <h2 id="sayhi-title" className="title-xl">
          {sayHi.title}
        </h2>
        <p className="lede">{sayHi.text}</p>
        <Button
          as="a"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          iconStart="instagram"
          icon="arrowUpRight"
          magnetic
          aria-label={`Abrir o Instagram @${handle} em nova aba`}
        >
          @{handle}
        </Button>
      </div>
    </section>
  )
}

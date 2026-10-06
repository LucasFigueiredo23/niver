import { useState } from 'react'
import { CelebrationProvider } from './context/CelebrationContext'
import { matches, REDUCED_MOTION } from './hooks/useMediaQuery'
import { Intro } from './components/Intro'
import { Cursor } from './components/Cursor'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Identity } from './components/Identity'
import { Tracklist } from './components/Tracklist'
import { MatchPoint } from './components/MatchPoint'
import { Seriously } from './components/Seriously'
import { Wish } from './components/Wish'
import { SayHi } from './components/SayHi'
import { Finale } from './components/Finale'
import { Footer } from './components/Footer'
import { EasterEggs } from './components/EasterEggs'

export default function App() {
  // Quem prefere menos movimento pula a intro direto.
  const [introDone, setIntroDone] = useState(() => matches(REDUCED_MOTION))

  return (
    <CelebrationProvider>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      {!introDone && <Intro onDone={() => setIntroDone(true)} />}
      <Cursor />
      <Header ready={introDone} />
      <main id="conteudo">
        <Hero ready={introDone} />
        <Identity />
        <Tracklist />
        <MatchPoint />
        <Seriously />
        <Wish />
        <SayHi />
        <Finale />
      </main>
      <Footer />
      <EasterEggs />
    </CelebrationProvider>
  )
}

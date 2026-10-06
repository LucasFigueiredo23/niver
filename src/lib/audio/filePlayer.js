/* Player para um arquivo de áudio seu (ex.: /audio/parabens.mp3).
   Mesma interface do beat sintetizado, então o componente não muda. */
import { createLevelReader, getAudioContextClass } from './levels'

export function createFilePlayer(src) {
  const AudioCtx = getAudioContextClass()
  if (!AudioCtx) throw new Error('web-audio-unsupported')

  const ctx = new AudioCtx()
  const audio = new Audio(src)
  audio.preload = 'auto'

  const analyser = ctx.createAnalyser()
  analyser.fftSize = 256
  analyser.smoothingTimeConstant = 0.75
  ctx.createMediaElementSource(audio).connect(analyser).connect(ctx.destination)

  const api = {
    onEnded: null,
    get duration() {
      return Number.isFinite(audio.duration) ? audio.duration : 0
    },
    async play() {
      if (ctx.state === 'suspended') await ctx.resume()
      await audio.play()
    },
    async pause() {
      audio.pause()
    },
    destroy() {
      audio.pause()
      audio.removeAttribute('src')
      ctx.close().catch(() => {})
    },
    getTime: () => audio.currentTime,
    readLevels: createLevelReader(analyser),
  }

  audio.addEventListener('ended', () => api.onEnded?.())
  return api
}

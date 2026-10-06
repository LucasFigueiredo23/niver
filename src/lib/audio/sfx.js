/* Efeitos sonoros curtos, sintetizados na hora. Só tocam depois de um clique. */
import { getAudioContextClass } from './levels'

let ctx = null

function getContext() {
  const AudioCtx = getAudioContextClass()
  if (!AudioCtx) return null
  if (!ctx) ctx = new AudioCtx()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function blip(c, { freq, to, at = 0, dur = 0.15, type = 'sine', gain = 0.1 }) {
  const t = c.currentTime + at
  const osc = c.createOscillator()
  const amp = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t)
  if (to) osc.frequency.exponentialRampToValueAtTime(to, t + dur)
  amp.gain.setValueAtTime(0.0001, t)
  amp.gain.exponentialRampToValueAtTime(gain, t + 0.01)
  amp.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  osc.connect(amp).connect(c.destination)
  osc.start(t)
  osc.stop(t + dur + 0.05)
}

const arpeggio = (c, notes, gap, gain) =>
  notes.forEach((freq, i) => blip(c, { freq, at: i * gap, dur: 0.4, type: 'triangle', gain }))

const SOUNDS = {
  pop: (c) => arpeggio(c, [784, 988, 1175, 1568], 0.05, 0.07),
  tick: (c) => blip(c, { freq: 1400, dur: 0.05, type: 'square', gain: 0.025 }),
  unlock: (c) => arpeggio(c, [523, 659, 784, 1047, 1319], 0.06, 0.07),
  ace: (c) => {
    blip(c, { freq: 220, to: 1400, dur: 0.32, type: 'sawtooth', gain: 0.035 })
    blip(c, { freq: 1568, at: 0.3, dur: 0.6, type: 'triangle', gain: 0.08 })
    blip(c, { freq: 2093, at: 0.34, dur: 0.6, gain: 0.05 })
  },
}

export function playSfx(name) {
  const c = getContext()
  if (c) SOUNDS[name]?.(c)
}

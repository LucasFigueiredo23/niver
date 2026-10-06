/* ==========================================================================
   "HAPPY BIRTHDAY (CELINA'S VERSION)"
   Beat trap original sintetizado ao vivo com Web Audio — nenhum arquivo,
   nenhuma música protegida. A melodia é a tradicional de parabéns
   (domínio público), adaptada para 4/4 sobre uma harmonia mais "noturna".
   ========================================================================== */
import { createLevelReader, getAudioContextClass } from './levels'

const BPM = 140
const STEP = 60 / BPM / 4 // semicolcheia
const BAR_STEPS = 16
const BAR = BAR_STEPS * STEP
const BARS = 22
export const TRACK_DURATION = BARS * BAR

const mtof = (note) => 440 * 2 ** ((note - 69) / 12)

/* Melodia: [nota MIDI, passo em que começa, duração em passos] */
const PICKUP = [
  [67, 12, 1.5],
  [67, 14, 1.5],
]
const MELODY = [
  [[69, 0, 3], [67, 4, 3], [72, 8, 7]],
  [[71, 0, 10], ...PICKUP],
  [[69, 0, 3], [67, 4, 3], [74, 8, 7]],
  [[72, 0, 10], ...PICKUP],
  [[79, 0, 3], [76, 4, 3], [72, 8, 7]],
  [[71, 0, 3], [69, 4, 6], [77, 12, 1.5], [77, 14, 1.5]],
  [[76, 0, 3], [72, 4, 3], [74, 8, 7]],
  [[72, 0, 14]],
]
const LAST_BAR_INTO_REPEAT = [[72, 0, 10], ...PICKUP]

/* Harmonia: [raiz do 808, notas do pad] */
const CHORDS = [
  [41, [53, 57, 60, 64]], // Fmaj7
  [40, [52, 55, 59, 62]], // Em7
  [38, [50, 53, 57, 60]], // Dm7
  [45, [57, 60, 64, 67]], // Am7
  [45, [57, 60, 64, 67]], // Am7
  [41, [53, 57, 60, 64]], // Fmaj7
  [38, [50, 53, 57, 60, 64]], // Dm9
  [36, [55, 59, 60, 64]], // Cmaj7
]

/* Estrutura: intro (4 compassos) → parte A (8) → parte B (8) → final (2) */
function arrangement(bar) {
  if (bar < 4) return { part: 'intro', chord: CHORDS[bar], melody: bar === 3 ? PICKUP : null }
  if (bar < 12) {
    const i = bar - 4
    return { part: 'a', chord: CHORDS[i], melody: i === 7 ? LAST_BAR_INTO_REPEAT : MELODY[i] }
  }
  if (bar < 20) {
    const i = bar - 12
    return { part: 'b', chord: CHORDS[i], melody: MELODY[i] }
  }
  return { part: 'outro', chord: bar === 20 ? CHORDS[7] : null, melody: null }
}

function softClipCurve(amount = 1.8) {
  const curve = new Float32Array(1024)
  for (let i = 0; i < curve.length; i++) {
    const x = (i * 2) / curve.length - 1
    curve[i] = Math.tanh(amount * x) / Math.tanh(amount)
  }
  return curve
}

function impulse(ctx, seconds = 2.4) {
  const length = Math.round(ctx.sampleRate * seconds)
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate)
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch)
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 2.6
  }
  return buffer
}

export function createBirthdayTrack() {
  const AudioCtx = getAudioContextClass()
  if (!AudioCtx) throw new Error('web-audio-unsupported')
  const ctx = new AudioCtx()

  /* ---------- Mixagem ---------- */
  const bus = ctx.createGain()
  const compressor = ctx.createDynamicsCompressor()
  compressor.threshold.value = -14
  compressor.knee.value = 10
  compressor.ratio.value = 4
  compressor.attack.value = 0.003
  compressor.release.value = 0.25
  const master = ctx.createGain()
  master.gain.value = 0.85
  const analyser = ctx.createAnalyser()
  analyser.fftSize = 256
  analyser.smoothingTimeConstant = 0.72
  bus.connect(compressor).connect(master).connect(analyser).connect(ctx.destination)

  const delayIn = ctx.createGain()
  const delay = ctx.createDelay(1)
  const feedback = ctx.createGain()
  const delayTone = ctx.createBiquadFilter()
  const delayOut = ctx.createGain()
  delay.delayTime.value = STEP * 3
  feedback.gain.value = 0.3
  delayTone.type = 'lowpass'
  delayTone.frequency.value = 3200
  delayOut.gain.value = 0.22
  delayIn.connect(delay).connect(delayTone).connect(delayOut).connect(compressor)
  delayTone.connect(feedback).connect(delay)

  const reverbIn = ctx.createGain()
  const reverb = ctx.createConvolver()
  const reverbOut = ctx.createGain()
  reverb.buffer = impulse(ctx)
  reverbOut.gain.value = 0.26
  reverbIn.connect(reverb).connect(reverbOut).connect(compressor)

  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate)
  const noise = noiseBuffer.getChannelData(0)
  for (let i = 0; i < noise.length; i++) noise[i] = Math.random() * 2 - 1
  const clipCurve = softClipCurve()

  const send = (node, target, amount) => {
    const g = ctx.createGain()
    g.gain.value = amount
    node.connect(g).connect(target)
  }

  /* ---------- Instrumentos ---------- */
  function noiseHit(t, { filter = 'highpass', freq = 7000, q = 0.7, dur = 0.05, gain = 0.2, verb = 0 }) {
    const src = ctx.createBufferSource()
    const f = ctx.createBiquadFilter()
    const amp = ctx.createGain()
    src.buffer = noiseBuffer
    f.type = filter
    f.frequency.value = freq
    f.Q.value = q
    amp.gain.setValueAtTime(gain, t)
    amp.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    src.connect(f).connect(amp).connect(bus)
    if (verb) send(amp, reverbIn, verb)
    src.start(t, Math.random() * 1.5)
    src.stop(t + dur + 0.02)
  }

  function kick(t) {
    const osc = ctx.createOscillator()
    const amp = ctx.createGain()
    osc.frequency.setValueAtTime(150, t)
    osc.frequency.exponentialRampToValueAtTime(50, t + 0.11)
    amp.gain.setValueAtTime(0.0001, t)
    amp.gain.exponentialRampToValueAtTime(0.9, t + 0.004)
    amp.gain.exponentialRampToValueAtTime(0.0001, t + 0.38)
    osc.connect(amp).connect(bus)
    osc.start(t)
    osc.stop(t + 0.42)
    noiseHit(t, { freq: 3500, dur: 0.012, gain: 0.25 })
  }

  const hat = (t, v = 1) => noiseHit(t, { freq: 7600, dur: 0.045, gain: 0.15 * v })
  const openHat = (t) => noiseHit(t, { freq: 7000, dur: 0.24, gain: 0.09 })

  function clap(t) {
    ;[0, 0.011, 0.023].forEach((offset, i) =>
      noiseHit(t + offset, {
        filter: 'bandpass',
        freq: 1600,
        q: 1.1,
        dur: i === 2 ? 0.2 : 0.03,
        gain: 0.42,
        verb: i === 2 ? 0.35 : 0,
      }),
    )
    const body = ctx.createOscillator()
    const amp = ctx.createGain()
    body.type = 'triangle'
    body.frequency.setValueAtTime(190, t)
    body.frequency.exponentialRampToValueAtTime(140, t + 0.05)
    amp.gain.setValueAtTime(0.22, t)
    amp.gain.exponentialRampToValueAtTime(0.0001, t + 0.08)
    body.connect(amp).connect(bus)
    body.start(t)
    body.stop(t + 0.1)
  }

  function bass808(t, note, dur) {
    const f = mtof(note)
    const sub = ctx.createOscillator()
    const harmonic = ctx.createOscillator()
    const harmonicGain = ctx.createGain()
    const shaper = ctx.createWaveShaper()
    const amp = ctx.createGain()
    sub.frequency.setValueAtTime(f * 1.12, t)
    sub.frequency.exponentialRampToValueAtTime(f, t + 0.07)
    harmonic.type = 'triangle'
    harmonic.frequency.value = f * 2 // harmônico para o grave aparecer em caixinha de celular
    harmonicGain.gain.value = 0.18
    shaper.curve = clipCurve
    amp.gain.setValueAtTime(0.0001, t)
    amp.gain.exponentialRampToValueAtTime(0.5, t + 0.008)
    amp.gain.exponentialRampToValueAtTime(0.22, t + dur * 0.7)
    amp.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    sub.connect(shaper)
    harmonic.connect(harmonicGain).connect(shaper)
    shaper.connect(amp).connect(bus)
    for (const osc of [sub, harmonic]) {
      osc.start(t)
      osc.stop(t + dur + 0.05)
    }
  }

  function pad(t, notes, dur, cutoff) {
    const filter = ctx.createBiquadFilter()
    const amp = ctx.createGain()
    const level = 0.11 / notes.length
    filter.type = 'lowpass'
    filter.frequency.value = cutoff
    filter.Q.value = 0.6
    amp.gain.setValueAtTime(0.0001, t)
    amp.gain.linearRampToValueAtTime(level, t + 0.18)
    amp.gain.setValueAtTime(level, t + dur - 0.05)
    amp.gain.linearRampToValueAtTime(0.0001, t + dur + 0.35)
    filter.connect(amp).connect(bus)
    send(amp, reverbIn, 0.6)
    for (const note of notes) {
      for (const detune of [-7, 7]) {
        const osc = ctx.createOscillator()
        osc.type = 'sawtooth'
        osc.frequency.value = mtof(note)
        osc.detune.value = detune
        osc.connect(filter)
        osc.start(t)
        osc.stop(t + dur + 0.4)
      }
    }
  }

  function bell(t, freq, dur, velocity = 1) {
    const body = ctx.createOscillator()
    const shimmer = ctx.createOscillator()
    const shimmerGain = ctx.createGain()
    const amp = ctx.createGain()
    const peak = 0.2 * velocity
    const length = Math.max(0.3, dur)
    body.type = 'triangle'
    body.frequency.value = freq
    shimmer.frequency.value = freq * 2
    shimmerGain.gain.value = 0.3
    amp.gain.setValueAtTime(0.0001, t)
    amp.gain.exponentialRampToValueAtTime(peak, t + 0.008)
    amp.gain.exponentialRampToValueAtTime(peak * 0.35, t + 0.18)
    amp.gain.exponentialRampToValueAtTime(0.0001, t + length + 0.3)
    body.connect(amp)
    shimmer.connect(shimmerGain).connect(amp)
    amp.connect(bus)
    send(amp, delayIn, 0.35)
    send(amp, reverbIn, 0.3)
    for (const osc of [body, shimmer]) {
      osc.start(t)
      osc.stop(t + length + 0.35)
    }
  }

  function riser(t, dur) {
    const src = ctx.createBufferSource()
    const filter = ctx.createBiquadFilter()
    const amp = ctx.createGain()
    src.buffer = noiseBuffer
    src.loop = true
    filter.type = 'bandpass'
    filter.Q.value = 1.4
    filter.frequency.setValueAtTime(300, t)
    filter.frequency.exponentialRampToValueAtTime(7000, t + dur)
    amp.gain.setValueAtTime(0.0001, t)
    amp.gain.linearRampToValueAtTime(0.12, t + dur * 0.95)
    amp.gain.linearRampToValueAtTime(0.0001, t + dur)
    src.connect(filter).connect(amp).connect(bus)
    src.start(t)
    src.stop(t + dur + 0.02)
  }

  /* ---------- Sequenciador ---------- */
  function drums(part, bar, step, t) {
    if (part === 'intro') {
      if (bar >= 2 && step % 2 === 0) hat(t, step % 4 === 0 ? 0.9 : 0.6)
      if (bar === 3 && step >= 12) hat(t + STEP / 2, 0.5 + (step - 12) * 0.12)
      return
    }
    if (part === 'outro') {
      if (bar === 20 && step === 0) kick(t)
      return
    }
    const rollBar = bar % 4 === 3
    if (step === 0 || step === 10 || (part === 'b' && step === 13 && bar % 2 === 1)) kick(t)
    if (step === 8) clap(t)
    if (rollBar && step >= 12) {
      hat(t, 0.75)
      hat(t + STEP / 2, 0.55)
    } else if (part === 'b' && bar % 2 === 0 && step === 6) {
      for (let i = 0; i < 3; i++) hat(t + (i * 2 * STEP) / 3, 0.65) // tercina
    } else if (step % 2 === 0) {
      hat(t, step % 4 === 0 ? 0.85 : 0.55)
    }
    if (part === 'b' && step === 14 && !rollBar) openHat(t)
  }

  function scheduleStep(index, t) {
    const bar = Math.floor(index / BAR_STEPS)
    const step = index % BAR_STEPS
    const { part, chord, melody } = arrangement(bar)

    if (step === 0 && chord) {
      const cutoff = part === 'intro' ? 450 + bar * 320 : part === 'b' ? 1900 : 1400
      pad(t, chord[1], part === 'outro' ? BAR * 2 : BAR, cutoff)
    }
    if (bar === 3 && step === 0) riser(t, BAR)
    if (bar === 11 && step === 8) riser(t, BAR / 2)

    drums(part, bar, step, t)

    if ((part === 'a' || part === 'b') && chord) {
      const root = chord[0]
      if (step === 0) bass808(t, root, STEP * 9)
      if (step === 10) bass808(t, root, STEP * 5)
      if (part === 'b' && step === 14 && bar % 2 === 1) bass808(t, root + 12, STEP * 2)
    }

    if (part === 'outro' && bar === 20 && step === 0) {
      bass808(t, 36, BAR)
      ;[84, 88, 91].forEach((note, i) => bell(t + i * STEP, mtof(note), STEP * 8, 0.5))
    }

    melody?.forEach(([note, at, length]) => {
      if (at !== step) return
      bell(t, mtof(note), length * STEP, part === 'b' ? 0.85 : 1)
      if (part === 'b') bell(t, mtof(note + 12), length * STEP, 0.4)
    })
  }

  const totalSteps = BARS * BAR_STEPS
  let startTime = 0
  let nextStep = 0
  let timer = 0
  let started = false
  let finished = false

  function tick() {
    while (nextStep < totalSteps && startTime + nextStep * STEP < ctx.currentTime + 0.12) {
      scheduleStep(nextStep, startTime + nextStep * STEP)
      nextStep += 1
    }
    if (!finished && ctx.currentTime >= startTime + TRACK_DURATION) {
      finished = true
      clearInterval(timer)
      timer = 0
      api.onEnded?.()
    }
  }

  const api = {
    duration: TRACK_DURATION,
    onEnded: null,
    async play() {
      if (ctx.state === 'suspended') await ctx.resume()
      if (!started) {
        started = true
        startTime = ctx.currentTime + 0.06
      }
      if (!timer) timer = setInterval(tick, 25)
      tick()
    },
    async pause() {
      clearInterval(timer)
      timer = 0
      if (ctx.state === 'running') await ctx.suspend()
    },
    destroy() {
      clearInterval(timer)
      timer = 0
      finished = true
      ctx.close().catch(() => {})
    },
    getTime: () => (started ? Math.min(TRACK_DURATION, Math.max(0, ctx.currentTime - startTime)) : 0),
    readLevels: createLevelReader(analyser),
  }

  return api
}

/* Lê o analisador de frequências e devolve N faixas (0–1) em escala
   logarítmica — é isso que alimenta o equalizador do player. */

export function createLevelReader(analyser, bands = 20) {
  const data = new Uint8Array(analyser.frequencyBinCount)
  const top = data.length * 0.7
  const edges = Array.from({ length: bands + 1 }, (_, i) => Math.max(1, Math.round(top ** (i / bands))))

  return function read(out) {
    analyser.getByteFrequencyData(data)
    for (let b = 0; b < bands; b++) {
      const lo = edges[b]
      const hi = Math.max(edges[b + 1], lo + 1)
      let sum = 0
      for (let i = lo; i < hi; i++) sum += data[i]
      out[b] = sum / (hi - lo) / 255
    }
    return out
  }
}

export function getAudioContextClass() {
  return window.AudioContext || window.webkitAudioContext || null
}

/* Motor de confete em canvas: um único loop, limite de partículas,
   desliga sozinho quando não há nada na tela. */

export const CONFETTI_COLORS = {
  mixed: ['#a855f7', '#8b5cf6', '#a3e635', '#d9f99d', '#f8fafc'],
  lime: ['#a3e635', '#d9f99d', '#f8fafc'],
  purple: ['#a855f7', '#8b5cf6', '#f8fafc'],
}

const GRAVITY = 0.22
const DRAG = 0.985

export function createConfetti(canvas) {
  const ctx = canvas.getContext('2d')
  let particles = []
  let raf = 0
  let width = 0
  let height = 0

  const maxParticles = () => (width < 640 ? 220 : 420)

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  function spawn(p) {
    if (particles.length >= maxParticles()) particles.shift()
    particles.push(p)
  }

  function particle(x, y, angle, speed, colors) {
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 5 + Math.random() * 6,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      flip: Math.random() * Math.PI,
      color: colors[(Math.random() * colors.length) | 0],
      round: Math.random() < 0.28,
      life: 0,
      ttl: 120 + Math.random() * 70,
    }
  }

  /* Explosão a partir de um ponto. direction em graus (-90 = para cima). */
  function burst({ x = width / 2, y = height * 0.6, count = 80, direction = -90, spread = 75, power = 1, colors = CONFETTI_COLORS.mixed } = {}) {
    const total = width < 640 ? Math.round(count * 0.6) : count
    for (let i = 0; i < total; i++) {
      const angle = ((direction + (Math.random() - 0.5) * spread * 2) * Math.PI) / 180
      spawn(particle(x, y, angle, (7 + Math.random() * 9) * power, colors))
    }
    start()
  }

  /* Chuva do topo da tela, para os momentos grandes. */
  function rain({ count = 120, colors = CONFETTI_COLORS.mixed } = {}) {
    const total = width < 640 ? Math.round(count * 0.55) : count
    for (let i = 0; i < total; i++) {
      const p = particle(Math.random() * width, -20 - Math.random() * height * 0.4, Math.PI / 2, 2 + Math.random() * 3, colors)
      p.vx = (Math.random() - 0.5) * 2
      p.ttl = 220 + Math.random() * 80
      spawn(p)
    }
    start()
  }

  function start() {
    if (!raf) raf = requestAnimationFrame(tick)
  }

  function tick() {
    ctx.clearRect(0, 0, width, height)
    particles = particles.filter((p) => p.life < p.ttl && p.y < height + 40)

    for (const p of particles) {
      p.vy += GRAVITY
      p.vx *= DRAG
      p.vy *= DRAG
      p.x += p.vx + Math.sin(p.life * 0.08 + p.flip) * 0.6
      p.y += p.vy
      p.rot += p.vr
      p.life += 1

      ctx.globalAlpha = Math.max(0, Math.min(1, (p.ttl - p.life) / 30))
      ctx.fillStyle = p.color
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      if (p.round) {
        ctx.beginPath()
        ctx.arc(0, 0, p.size * 0.42, 0, Math.PI * 2)
        ctx.fill()
      } else {
        ctx.scale(1, Math.cos(p.life * 0.15 + p.flip))
        ctx.fillRect(-p.size / 2, -p.size * 0.3, p.size, p.size * 0.6)
      }
      ctx.restore()
    }
    ctx.globalAlpha = 1

    raf = particles.length ? requestAnimationFrame(tick) : 0
    if (!raf) ctx.clearRect(0, 0, width, height)
  }

  function destroy() {
    cancelAnimationFrame(raf)
    raf = 0
    particles = []
  }

  resize()
  return { burst, rain, resize, destroy }
}

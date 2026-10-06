import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Sem barra no final, senão a og:image vira "//og-image.png"
  const siteUrl = (env.VITE_SITE_URL || '').replace(/\/+$/, '')

  if (mode === 'production' && !siteUrl) {
    console.warn(
      '\n⚠ VITE_SITE_URL não definida: a prévia no WhatsApp não vai mostrar a foto.\n' +
        '  No Cloudflare: Settings → Build → Variables and secrets.\n',
    )
  }

  return {
    plugins: [
      react(),
      {
        name: 'site-url',
        transformIndexHtml: (html) => html.replaceAll('%VITE_SITE_URL%', siteUrl),
      },
    ],
  }
})

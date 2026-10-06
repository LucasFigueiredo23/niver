# Celina's Day 🎂

Microsite de aniversário da Celina Pacheco. React + Vite, CSS puro com design tokens, sem bibliotecas de animação: confete em canvas, beat original em Web Audio e todo o conteúdo num arquivo só.

## Rodar no seu computador

Precisa do Node.js 18 ou mais novo.

```bash
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente `http://localhost:5173`). Para testar no celular na mesma rede Wi-Fi: `npm run dev -- --host` e abra o IP mostrado.

## Onde mexer

| Quero... | Arquivo |
| --- | --- |
| Trocar qualquer texto, recado, estatística | `src/data/celina.js` |
| Trocar cores, fontes, espaçamentos | `src/styles/tokens.css` |
| Mexer no beat | `src/lib/audio/birthdayTrack.js` |

### Fotos

Coloque 5 fotos em `public/fotos/` com estes nomes:

- `celina-1.jpg`: credencial do hero
- `celina-avatar.jpg`: círculo do Instagram (quadrada, só o rosto)
- `celina-2.jpg`: capa do single no player (ganha efeito duotone roxo/verde)
- `celina-3.jpg`: card de MVP
- `celina-4.jpg`: seção "But seriously…"

Vertical (4:5 ou 3:4), por volta de 1200 px de largura. Enquanto a foto não existir, aparece um placeholder `[ FOTO DA CELINA ]`. Outro nome ou formato? Troque o caminho em `photos` no `celina.js`.

### Faça um pedido

Antes do Instagram tem um bolo com 3 velas: cada toque apaga uma e, quando a última apaga, sai a chuva de confete. Texto e quantidade de velas ficam em `wish` no `celina.js`.

### Áudio

Por padrão o player toca um beat trap original gerado ao vivo no navegador, com a melodia tradicional de parabéns (domínio público). Nada toca sem clique.

Para usar um áudio seu: coloque o arquivo em `public/audio/` e, em `celina.js`, troque `audioSrc: null` por `audioSrc: '/audio/seu-arquivo.mp3'`. O equalizador continua funcionando. Use só áudio que você tem direito de usar (gravação própria, trilha livre ou licenciada); música comercial pode derrubar o site.

No iPhone, o som do Web Audio não sai com o modo silencioso ligado. O site avisa isso durante a reprodução.

## Publicar (Vercel, grátis)

1. Suba a pasta para um repositório no GitHub.
2. Em vercel.com, "Add New → Project", importe o repositório. Ele detecta Vite sozinho.
3. Depois do primeiro deploy, copie a URL final, cole em `.env` (`VITE_SITE_URL=https://...`, sem barra no final), faça commit e push. É isso que faz a prévia com imagem aparecer quando o link é mandado no WhatsApp.

Netlify também funciona: comando de build `npm run build`, pasta `dist`.

Para gerar os arquivos estáticos manualmente: `npm run build` (saída em `dist/`).

## Easter eggs

- Clicar 3 vezes seguidas no **333** do hero liga o modo secreto (acentos invertidos). Mais 3 cliques desligam.
- Digitar **celina** em qualquer lugar da página (fora de campos de texto): ACE!

## Acessibilidade e desempenho

- Respeita `prefers-reduced-motion`: sem intro, sem confete, sem parallax, sem cursor personalizado.
- Cursor personalizado e parallax só em desktop com mouse.
- Modais com `<dialog>` nativo (foco preso, Esc fecha), estados de foco visíveis, HTML semântico.
- Confete com limite de partículas (menor no celular) e loop que desliga sozinho.

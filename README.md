# Celina, 20 anos 🎂

Microsite dos 20 anos da Celina Pacheco. React + Vite, CSS puro com design tokens, sem bibliotecas de animação: confete em canvas, beat original em Web Audio e todo o conteúdo num arquivo só.

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
- `celina-4.jpg`: seção "Mas falando sério…"

Vertical (4:5 ou 3:4), por volta de 1200 px de largura. Enquanto a foto não existir, aparece um placeholder `[ FOTO DA CELINA ]`. Outro nome ou formato? Troque o caminho em `photos` no `celina.js`.

### Faz um pedido

Antes do Instagram tem um bolo com 3 velas: cada toque apaga uma e, quando a última apaga, sai a chuva de confete. Texto e quantidade de velas ficam em `wish` no `celina.js`.

### Áudio

Por padrão o player toca um beat trap original gerado ao vivo no navegador, com a melodia tradicional de parabéns (domínio público). Nada toca sem clique.

Para usar um áudio seu: coloque o arquivo em `public/audio/` e, em `celina.js`, troque `audioSrc: null` por `audioSrc: '/audio/seu-arquivo.mp3'`. O equalizador continua funcionando. Use só áudio que você tem direito de usar (gravação própria, trilha livre ou licenciada); música comercial pode derrubar o site.

No iPhone, o som do Web Audio não sai com o modo silencioso ligado. O site avisa isso durante a reprodução.

## Publicar (Cloudflare, grátis)

O projeto já vem configurado para o Cloudflare Workers (`wrangler.jsonc`): o Vite gera a pasta `dist/` e o Cloudflare serve esses arquivos.

1. Em dash.cloudflare.com, vá em **Workers & Pages → Create → Import a repository** e escolha o repositório `niver` no GitHub.
2. Confira os campos:
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
3. Clique em **Deploy**. O site fica em `https://niver.<sua-conta>.workers.dev` (ou ligue um domínio seu em **Settings → Domains & Routes**).
4. Para a prévia com foto no WhatsApp: em **Settings → Build → Variables and secrets**, crie `VITE_SITE_URL` com a URL final (sem barra no final) e faça um novo deploy. Essa variável entra no momento do build.

Depois disso, cada `git push` na `main` publica sozinho.

Pelo terminal, sem GitHub: `npx wrangler login` uma vez e depois `npm run deploy`.

Para gerar os arquivos estáticos manualmente: `npm run build` (saída em `dist/`).

## Easter eggs

- Clicar 3 vezes seguidas no **333** do hero liga o modo secreto (acentos invertidos). Mais 3 cliques desligam.
- Digitar **celina** em qualquer lugar da página (fora de campos de texto): ACE!

## Acessibilidade e desempenho

- Respeita `prefers-reduced-motion`: sem intro, sem confete, sem parallax, sem cursor personalizado.
- Cursor personalizado e parallax só em desktop com mouse.
- Modais com `<dialog>` nativo (foco preso, Esc fecha), estados de foco visíveis, HTML semântico.
- Confete com limite de partículas (menor no celular) e loop que desliga sozinho.

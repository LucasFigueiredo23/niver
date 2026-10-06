/* ==========================================================================
   TODO O CONTEÚDO DO SITE MORA AQUI.
   Trocar texto, foto ou recado = editar só este arquivo.
   ========================================================================== */

export const celina = {
  firstName: 'Celina',
  author: 'Lucas', // quem fez o presente — aparece na surpresa, no player e no rodapé
  fullName: 'Celina Pacheco',
  instagram: {
    handle: 'celina_pacheco777',
    url: 'https://www.instagram.com/celina_pacheco777/',
  },
}

/* Fotos ---------------------------------------------------------------------
   Coloque os arquivos em /public/fotos/ com estes nomes.
   Enquanto um arquivo não existir, aparece um placeholder "[ FOTO DA CELINA ]". */
export const photos = {
  hero: { src: '/fotos/celina-1.jpg', alt: 'Celina Pacheco' },
  cover: { src: '/fotos/celina-2.jpg', alt: 'Celina Pacheco na capa do single' },
  mvp: { src: '/fotos/celina-3.jpg', alt: 'Celina Pacheco no card de MVP' },
  closing: { src: '/fotos/celina-4.jpg', alt: 'Celina Pacheco' },
  avatar: { src: '/fotos/celina-avatar.jpg', alt: 'Celina Pacheco' },
}

export const hero = {
  subtitle: ['A mais inteligente da quadra.', 'A melhor voz fora dela.'],
  tags: [
    { icon: 'volleyball', label: 'Volleyball' },
    { icon: 'mic', label: 'Voice' },
    { icon: 'bolt', label: '333 energy' },
    { icon: 'bulb', label: 'Genius' },
  ],
  passLabel: 'All access',
  passNumber: 'Nº 777',
}

/* Mensagem do botão "Tenho uma surpresa" — personalize à vontade. */
export const surprise = {
  title: 'Ok, a surpresa.',
  paragraphs: [
    'Este site não existia até eu decidir que um parabéns no story era pouco pra você.',
    'Cada número, cada piada e cada linha de código aqui foi pensada pra te arrancar pelo menos um sorriso.',
    'Se funcionou, missão cumprida. Se ainda não, desce até o player e aperta o play.',
  ],
  signature: 'Lucas',
}

export const identity = {
  title: 'More than a player.',
  intro: 'Resumir a Celina em uma palavra não dá. Em cinco, quase.',
  traits: [
    { icon: 'volleyball', label: 'The athlete', line: 'Na quadra, competitividade não é opcional.' },
    { icon: 'mic', label: 'The voice', line: 'Se tem microfone por perto, provavelmente ela já está cantando.' },
    { icon: 'bulb', label: 'The mind', line: 'Inteligência em outro nível. Sem esforço aparente, o que é ainda pior.' },
    { icon: 'headphones', label: 'The fan', line: 'Fã nível hard de Matuê. Não tente discutir: você vai perder.' },
    { icon: 'bolt', label: 'The energy', line: 'Difícil explicar. Fácil perceber.' },
  ],
}

/* Player --------------------------------------------------------------------
   audioSrc: null  → toca o beat original gerado no navegador (Web Audio).
   audioSrc: '/audio/parabens.mp3' → toca o seu arquivo (só use áudio que você
   tem direito de usar: gravação própria, trilha livre/licenciada). */
export const track = {
  title: "Celina's tracklist",
  songTitle: 'Happy Birthday',
  songVersion: "Celina's Version",
  artist: 'feat. Todo Mundo Que Ama Ela',
  audioSrc: null,
  credit: 'Prod. Lucas. Beat original gerado ao vivo no seu navegador; melodia tradicional de parabéns, domínio público.',
  tracklist: [
    { title: 'Intro (Ace)', time: '1:07' },
    { title: 'Afinação Perfeita', time: '3:14' },
    { title: 'Bloqueio de Bad Vibe', time: '2:25' },
    { title: '777 (Interlude)', time: '0:33' },
    { title: "Happy Birthday (Celina's Version)", playable: true },
  ],
}

export const matchPoint = {
  title: 'Match point',
  subtitle: 'Algumas estatísticas que simplesmente não podem ser ignoradas.',
  stats: [
    { label: 'Attack', value: 100, note: 'Bloqueia qualquer bad vibe.' },
    { label: 'Intelligence', value: 100, note: 'A mente mais braba da quadra.' },
    { label: 'Vocals', value: 100, note: 'Afinação de estrela.' },
    { label: 'Beauty', value: Infinity, note: 'Não existe métrica para isso.' },
    { label: 'Energy', value: 999, note: 'Bateria aparentemente infinita.' },
  ],
  mvp: {
    badge: 'MVP',
    rating: 99,
    position: 'Main character',
    stats: [
      { label: 'INT', value: '100' },
      { label: 'VOZ', value: '100' },
      { label: 'STYLE', value: '100' },
      { label: 'ENERGY', value: '999' },
    ],
    signature: 'No debate.',
  },
  scoreboard: {
    label: 'Set final',
    home: { name: 'Celina', score: 25 },
    away: { name: 'Bad vibes', score: 0 },
    result: 'Game over.',
    footnote: 'A quadra tem 18 metros. A presença da Celina ocupa bem mais.',
  },
}

export const seriously = {
  title: 'But seriously…',
  lines: [
    'Hoje não é só sobre mais um ano.',
    'É sobre celebrar tudo aquilo que faz você ser você.',
    'Seu talento, sua inteligência, sua energia, suas loucuras, sua voz, sua paixão pelo vôlei e todas as pessoas que têm sorte de ter você por perto.',
  ],
}

/* Momento "faça um pedido": velas que ela apaga com toques. */
export const wish = {
  title: 'Make a wish.',
  text: 'Celina, essa parte é sua. Pensa no pedido e apaga as três velas.',
  candles: 3,
  done: 'Pedido feito. Agora é segredo.',
  relight: 'Acender de novo',
}

export const sayHi = {
  title: 'Go say hi.',
  text: 'A protagonista provavelmente está esperando você no Instagram.',
}

export const finale = {
  title: 'Happy birthday, Celina.',
  text: 'Que esse novo capítulo seja tão incrível quanto você.',
  cta: 'Celebrate again',
}

export const footer = {
  line: 'Made with chaos, code & carinho by Lucas.',
  copyright: "Celina's Day",
}

/* ==========================================================================
   TODO O CONTEÚDO DO SITE MORA AQUI.
   Trocar texto, foto ou recado = editar só este arquivo.
   ========================================================================== */

export const celina = {
  firstName: 'Celina',
  age: 20,
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
  ageLine: '20 anos',
  subtitle: ['A mais inteligente da quadra.', 'A melhor voz fora dela.'],
  tags: [
    { icon: 'volleyball', label: 'Vôlei' },
    { icon: 'mic', label: 'Voz' },
    { icon: 'bolt', label: 'Energia 333' },
    { icon: 'bulb', label: 'Gênia' },
  ],
  passLabel: 'Acesso total',
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
  title: 'Mais que uma jogadora.',
  intro: 'Resumir a Celina em uma palavra não dá. Em cinco, quase.',
  traits: [
    { icon: 'volleyball', label: 'A atleta', line: 'Na quadra, competitividade não é opcional.' },
    { icon: 'mic', label: 'A voz', line: 'Se tem microfone por perto, provavelmente ela já está cantando.' },
    { icon: 'bulb', label: 'A mente', line: 'Inteligência em outro nível. Sem esforço aparente, o que é ainda pior.' },
    { icon: 'headphones', label: 'A fã', line: 'Fã nível hard de Matuê. Não tente discutir: você vai perder.' },
    { icon: 'bolt', label: 'A energia', line: 'Difícil explicar. Fácil perceber.' },
  ],
}

/* Player --------------------------------------------------------------------
   audioSrc: null  → toca o beat original gerado no navegador (Web Audio).
   audioSrc: '/audio/parabens.mp3' → toca o seu arquivo (só use áudio que você
   tem direito de usar: gravação própria, trilha livre/licenciada). */
export const track = {
  title: 'Tracklist da Celina',
  songTitle: 'Parabéns',
  songVersion: 'Versão da Celina',
  artist: 'feat. Todo Mundo Que Ama Ela',
  audioSrc: null,
  credit: 'Prod. Lucas. Beat original gerado ao vivo no seu navegador; melodia tradicional de parabéns, domínio público.',
  tracklist: [
    { title: 'Intro (Ace)', time: '1:07' },
    { title: 'Afinação Perfeita', time: '3:14' },
    { title: 'Bloqueio de Bad Vibe', time: '2:25' },
    { title: '777 (Interlúdio)', time: '0:33' },
    { title: 'Parabéns (Versão da Celina)', playable: true },
  ],
}

export const matchPoint = {
  title: 'Match point',
  subtitle: 'Algumas estatísticas que simplesmente não podem ser ignoradas.',
  stats: [
    { label: 'Ataque', value: 100, note: 'Bloqueia qualquer bad vibe.' },
    { label: 'Inteligência', value: 100, note: 'A mente mais braba da quadra.' },
    { label: 'Voz', value: 100, note: 'Afinação de estrela.' },
    { label: 'Beleza', value: Infinity, note: 'Não existe métrica para isso.' },
    { label: 'Energia', value: 999, note: 'Bateria aparentemente infinita.' },
  ],
  mvp: {
    badge: 'MVP',
    rating: 99,
    position: 'Protagonista',
    stats: [
      { label: 'INT', value: '100' },
      { label: 'VOZ', value: '100' },
      { label: 'ESTILO', value: '100' },
      { label: 'ENERGIA', value: '999' },
    ],
    signature: 'Sem discussão.',
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
  title: 'Mas falando sério…',
  lines: [
    'Hoje não é só sobre fazer 20 anos.',
    'É sobre celebrar tudo aquilo que faz você ser você.',
    'Seu talento, sua inteligência, sua energia, suas loucuras, sua voz, sua paixão pelo vôlei e todas as pessoas que têm sorte de ter você por perto.',
  ],
}

/* Momento "faça um pedido": velas que ela apaga com toques. */
export const wish = {
  title: 'Faz um pedido.',
  text: 'Celina, essa parte é sua. 20 anos, um pedido: pensa nele e apaga as três velas.',
  candles: 3,
  done: 'Pedido feito. Agora é segredo.',
  relight: 'Acender de novo',
}

export const sayHi = {
  title: 'Vai lá dar um oi.',
  text: 'A protagonista provavelmente está esperando você no Instagram.',
}

export const finale = {
  title: 'Parabéns, Celina.',
  text: 'Que os 20 sejam tão incríveis quanto você.',
  cta: 'Comemorar de novo',
}

export const footer = {
  line: 'Feito com caos, código e carinho por Lucas.',
  copyright: 'Celina, 20 anos',
}

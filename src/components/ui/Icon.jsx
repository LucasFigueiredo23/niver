/* Ícones em SVG inline (traço 1.75, estilo único) — sem biblioteca extra. */

const PATHS = {
  volleyball: (
    <>
      <circle cx="12" cy="12" r="9.25" />
      <path d="M12 2.75c2.6 3.1 3.3 7.2 1.9 10.6" />
      <path d="M3.4 15.6c3.5.4 7.4-.9 10.5-3.6" />
      <path d="M20.6 15.9c-2.4-2.9-6.2-4.4-9.9-3.9" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="2.5" width="6" height="12" rx="3" />
      <path d="M18.5 10.5v.5a6.5 6.5 0 0 1-13 0v-.5" />
      <path d="M12 17.5v4" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 18h6" />
      <path d="M10 21.5h4" />
      <path d="M12 2.5a6.5 6.5 0 0 0-3.8 11.8c.5.4.8 1 .8 1.7v.5h6V16c0-.7.3-1.3.8-1.7A6.5 6.5 0 0 0 12 2.5Z" />
    </>
  ),
  bolt: <path d="M13 2.5 4 13.5h7.5l-1 8 9-11H12l1-8Z" />,
  headphones: (
    <path d="M3.5 18v-5.5a8.5 8.5 0 0 1 17 0V18M3.5 14H6a1.5 1.5 0 0 1 1.5 1.5v3A1.5 1.5 0 0 1 6 20H5a1.5 1.5 0 0 1-1.5-1.5V14Zm17 0H18a1.5 1.5 0 0 0-1.5 1.5v3A1.5 1.5 0 0 0 18 20h1a1.5 1.5 0 0 0 1.5-1.5V14Z" />
  ),
  gift: (
    <>
      <rect x="3" y="8" width="18" height="4.5" rx="1" />
      <path d="M12 8v13.5" />
      <path d="M19 12.5V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6.5" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5" />
    </>
  ),
  play: <path d="M8 5.2v13.6a1 1 0 0 0 1.5.86l11-6.8a1 1 0 0 0 0-1.72l-11-6.8A1 1 0 0 0 8 5.2Z" fill="currentColor" stroke="none" />,
  pause: (
    <g fill="currentColor" stroke="none">
      <rect x="6" y="4.5" width="4" height="15" rx="1.2" />
      <rect x="14" y="4.5" width="4" height="15" rx="1.2" />
    </g>
  ),
  restart: (
    <>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.8-6.3L3.5 8.2" />
      <path d="M3.5 3.5v4.7h4.7" />
    </>
  ),
  instagram: (
    <>
      <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="5.25" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.4" cy="6.6" r="1.05" fill="currentColor" stroke="none" />
    </>
  ),
  arrow: (
    <>
      <path d="M4.5 12h15" />
      <path d="m13.5 6 6 6-6 6" />
    </>
  ),
  arrowUpRight: (
    <>
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </>
  ),
  soundOn: (
    <>
      <path d="M11 5 6.5 9H3.5v6h3L11 19V5Z" />
      <path d="M15.5 9a4.5 4.5 0 0 1 0 6" />
      <path d="M18.5 6a8.5 8.5 0 0 1 0 12" />
    </>
  ),
  soundOff: (
    <>
      <path d="M11 5 6.5 9H3.5v6h3L11 19V5Z" />
      <path d="m16 9.5 5 5" />
      <path d="m21 9.5-5 5" />
    </>
  ),
  close: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5" />
    </>
  ),
  check: <path d="M20 6.5 9.5 17 4 11.5" />,
}

export function Icon({ name, size = 20, className = '' }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  )
}

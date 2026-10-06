/* Quadra de vôlei vista de cima, nas proporções oficiais (18 m × 9 m). */
export function CourtLines({ className = '' }) {
  return (
    <svg className={className} viewBox="-12 -12 204 114" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" focusable="false">
      <rect x="0" y="0" width="180" height="90" vectorEffect="non-scaling-stroke" />
      <line x1="90" y1="-6" x2="90" y2="96" vectorEffect="non-scaling-stroke" />
      <line x1="60" y1="0" x2="60" y2="90" vectorEffect="non-scaling-stroke" />
      <line x1="120" y1="0" x2="120" y2="90" vectorEffect="non-scaling-stroke" />
      <rect x="-9" y="-9" width="198" height="108" strokeDasharray="2 4" opacity="0.5" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

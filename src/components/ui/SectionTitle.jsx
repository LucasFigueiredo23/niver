/* Cabeçalho padrão de seção: título grande + texto de apoio opcional. */
export function SectionTitle({ id, title, children, className = '' }) {
  return (
    <header className={`section-head ${className}`}>
      <h2 id={id} className="title-xl">
        {title}
      </h2>
      {children && <p className="lede">{children}</p>}
    </header>
  )
}

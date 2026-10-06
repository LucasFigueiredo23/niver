import { useState } from 'react'

/* Mostra a foto; se o arquivo ainda não existir, mostra um placeholder
   identificado com o nome do arquivo esperado. */
export function Photo({ src, alt, className = '', eager = false }) {
  const [missing, setMissing] = useState(!src)
  const fileName = src?.split('/').pop()

  return (
    <figure className={`photo ${className}`}>
      {missing ? (
        <div className="photo__placeholder" role="img" aria-label={`Espaço reservado para foto (${fileName})`}>
          <span>[ FOTO DA CELINA ]</span>
          <small>{fileName}</small>
        </div>
      ) : (
        <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setMissing(true)} />
      )}
    </figure>
  )
}

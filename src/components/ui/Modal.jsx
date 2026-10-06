import { useEffect, useId, useRef } from 'react'
import { Icon } from './Icon'

/* Modal com <dialog> nativo: foco preso, Esc fecha e leitor de tela entende. */
export function Modal({ open, onClose, title, children }) {
  const ref = useRef(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    const root = document.documentElement
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
    root.classList.toggle('modal-open', open)
    return () => root.classList.remove('modal-open')
  }, [open])

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="modal__panel">
        <button type="button" className="modal__close" onClick={onClose} aria-label="Fechar">
          <Icon name="close" />
        </button>
        <h2 id={titleId} className="modal__title">
          {title}
        </h2>
        {children}
      </div>
    </dialog>
  )
}

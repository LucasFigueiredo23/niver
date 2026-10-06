import { useRef } from 'react'
import { Icon } from './Icon'

/* Botão único do site. `as="a"` vira link com a mesma aparência.
   `magnetic` faz o botão seguir levemente o mouse (só desktop). */
export function Button({ as: Tag = 'button', variant = 'primary', icon, iconStart, magnetic = false, className = '', children, ...props }) {
  const ref = useRef(null)

  const setOffset = (x, y) => {
    ref.current?.style.setProperty('--tx', `${x}px`)
    ref.current?.style.setProperty('--ty', `${y}px`)
  }

  const magneticHandlers = magnetic
    ? {
        onPointerMove: (event) => {
          if (event.pointerType !== 'mouse') return
          const rect = ref.current.getBoundingClientRect()
          setOffset(((event.clientX - rect.left) / rect.width - 0.5) * 12, ((event.clientY - rect.top) / rect.height - 0.5) * 10)
        },
        onPointerLeave: () => setOffset(0, 0),
      }
    : {}

  const classes = ['btn', `btn--${variant}`, className].filter(Boolean).join(' ')
  const typeProp = Tag === 'button' ? { type: 'button' } : {}

  return (
    <Tag ref={ref} className={classes} {...typeProp} {...magneticHandlers} {...props}>
      {iconStart && <Icon name={iconStart} />}
      <span className="btn__label">{children}</span>
      {icon && <Icon name={icon} />}
    </Tag>
  )
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Estilos globais primeiro: o CSS de cada componente vem depois e pode sobrescrever.
import './styles/tokens.css'
import './styles/global.css'
import './styles/ui.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

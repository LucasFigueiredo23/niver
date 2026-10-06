import { footer } from '../data/celina'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>{footer.line}</p>
        <p>
          © {footer.copyright} {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}

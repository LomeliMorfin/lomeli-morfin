import Image from 'next/image'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Nosotros',  href: '/nosotros'  },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Clientes',  href: '/clientes'  },
  { label: 'Alianzas',  href: '/alianzas'  },
  { label: 'Cobertura', href: '/cobertura' },
  { label: 'Contacto',  href: '/contacto'  },
]

const SERVICIOS_LINKS = [
  'Fianzas de Fidelidad',
  'Fianzas Judiciales',
  'Fianzas Administrativas',
  'Fianzas de Crédito',
]

export default function Footer() {
  return (
    <footer id="footer">
      <div className="footer-inner">
        <div className="footer-grid">

          {/* Columna 1 — Logo + descripción */}
          <div className="footer-col footer-brand">
            <Link href="/" className="footer-logo-link">
              <Image src="/logos/lm/LM-Nav.svg" alt="Lomeli Morfin" width={160} height={40} className="footer-logo-img" />
            </Link>
            <p className="footer-desc">
              Organización especializada en Asesoría, Consultoría e Intermediación
              de Fianzas con Cédula de Autorización de la CNSF (SHCP) desde 1981.
            </p>
            <p className="footer-since">Consultores en Fianzas desde 1981</p>
          </div>

          {/* Columna 2 — Navegación */}
          <div className="footer-col">
            <p className="footer-col-title">Navegación</p>
            <ul className="footer-nav-list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="footer-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3 — Servicios */}
          <div className="footer-col">
            <p className="footer-col-title">Servicios</p>
            <ul className="footer-nav-list">
              {SERVICIOS_LINKS.map(s => (
                <li key={s}>
                  <Link href="/servicios" className="footer-link">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4 — Contacto */}
          <div className="footer-col">
            <p className="footer-col-title">Contacto</p>
            <ul className="footer-contact-list">
              <li>
                <span className="footer-contact-label">Teléfono</span>
                <a href="tel:+525555251003" className="footer-link" style={{ display: 'block' }}>+52 55 5525 1003</a>
                <a href="tel:+525619131913" className="footer-link" style={{ display: 'block' }}>+52 56 1913 1913</a>
              </li>
              <li>
                <span className="footer-contact-label">Correo</span>
                <a href="mailto:contacto@lomelimorfin.com" className="footer-link">
                  contacto@lomelimorfin.com
                </a>
              </li>
              <li>
                <span className="footer-contact-label">Oficinas</span>
                <span className="footer-contact-text">Ciudad de México, México</span>
              </li>
              <li>
                <span className="footer-contact-label">Cobertura</span>
                <span className="footer-contact-text">Presencia Nacional e Internacional</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Línea inferior */}
        <div className="footer-bottom">
          <p className="footer-legal">
            © {new Date().getFullYear()} Lomeli Morfin Consultores en Fianzas. Todos los derechos reservados.
          </p>
          <p className="footer-legal">
            Cédula de Autorización CNSF · SHCP
          </p>
        </div>
      </div>
    </footer>
  )
}

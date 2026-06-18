'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const NAV_ITEMS = [
  { num: '01', label: 'Nosotros',  href: '/nosotros' },
  { num: '02', label: 'Servicios', href: '/servicios' },
  { num: '03', label: 'Clientes',  href: '/clientes' },
  { num: '04', label: 'Alianzas',  href: '/alianzas' },
  { num: '05', label: 'Cobertura', href: '/cobertura' },
  { num: '06', label: 'Contacto',  href: '/contacto' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () =>
      navRef.current?.classList.toggle('scrolled', window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function closeMenu() { setMenuOpen(false) }

  return (
    <nav ref={navRef} id="navbar" className={menuOpen ? 'menu-open' : ''}>
      <Link href="/" className="nav-logo" onClick={closeMenu}>
        <Image src="/logos/lm/LM-Nav.png" alt="Lomeli Morfin" width={160} height={40} className="nav-logo-img" />
      </Link>

      {/* Desktop nav */}
      <ul className="nav-list">
        {NAV_ITEMS.map(({ num, label, href }) => (
          <li key={num}>
            <Link href={href} className="nav-item nav-link">
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/contacto" className="btn-cta">
        Solicitar cotización
      </Link>

      {/* Hamburger button — visible only on mobile */}
      <button
        className={`nav-hamburger${menuOpen ? ' is-open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="nav-mobile-menu">
          <ul className="nav-mobile-list">
            {NAV_ITEMS.map(({ num, label, href }) => (
              <li key={num}>
                <Link href={href} className="nav-mobile-link" onClick={closeMenu}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contacto" className="btn-cta nav-mobile-cta" onClick={closeMenu}>
            Solicitar cotización
          </Link>
        </div>
      )}
    </nav>
  )
}

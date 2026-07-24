'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { VIEWPORT, overlineWrap, goldLine, overlineText } from './animations'
import { ScrollReveal } from './ScrollReveal'
import { useSwipe } from './useSwipe'

const SECTORES = [
  {
    num: '01',
    nombre: 'Energía',
    desc: 'Proyectos energéticos, PEMEX, ASA y el Sector Eléctrico Nacional. Fianzas administrativas de anticipo, cumplimiento y buena calidad.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    num: '02',
    nombre: 'Construcción',
    desc: 'Contratos de obra, licitaciones gubernamentales y cumplimiento de proyectos de infraestructura pública y privada a Nivel Nacional.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    num: '03',
    nombre: 'Logística y Transporte',
    desc: 'Distribución, rutas concesionadas y operadores de transporte terrestre. Fianzas de crédito para suministro y compra-venta.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    num: '04',
    nombre: 'Tecnología Industrial',
    desc: 'Instrumentación, automatización y gestión de procesos industriales. Fianzas de fidelidad y administrativas para el sector tech.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
  {
    num: '05',
    nombre: 'Telecomunicaciones',
    desc: 'Infraestructura de red, operadores de telecomunicaciones y proyectos TI de cobertura Nacional e Internacional.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M1.42 9a16 16 0 0121.16 0" /><path d="M5 12.55a11 11 0 0114.08 0" />
        <path d="M8.53 16.11a6 6 0 016.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" />
      </svg>
    ),
  },
  {
    num: '06',
    nombre: 'Manufactura',
    desc: 'Planta industrial, cadena de suministro y operaciones de exportación. Cobertura integral para el Sector Manufacturero Mexicano.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
]

/** Distancia circular más corta entre la carta i y la activa */
function offsetFor(i: number, active: number, n: number) {
  let d = i - active
  if (d > n / 2) d -= n
  if (d < -n / 2) d += n
  return d
}

export default function ClientesSectores() {
  const [active, setActive] = useState(0)
  const n = SECTORES.length

  const prev = () => setActive(a => (a - 1 + n) % n)
  const next = () => setActive(a => (a + 1) % n)
  const swipe = useSwipe(next, prev)

  return (
    <section id="clientes-sectores">
      <div className="cs-container">

        <motion.div
          className="overline-wrap"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={overlineWrap}
        >
          <motion.div className="gold-line" variants={goldLine} style={{ height: 1, background: '#c8a020' }} />
          <motion.span className="overline-text" variants={overlineText}>Sectores que respaldamos</motion.span>
        </motion.div>

        <ScrollReveal y={50}>
          <h2 className="section-h2 cs-h2">Presencia en Sectores Clave<br />de la Economía Mexicana</h2>
        </ScrollReveal>

        {/* Carrusel 3D */}
        <div className="csc-stage" role="group" aria-roledescription="carrusel" aria-label="Sectores industriales" {...swipe}>
          {SECTORES.map((s, i) => {
            const off = offsetFor(i, active, n)
            const abs = Math.abs(off)
            const visible = abs <= 2

            return (
              <motion.div
                key={s.num}
                className={`csc-card${off === 0 ? ' csc-card--active' : ''}`}
                style={{ zIndex: 10 - abs, pointerEvents: visible ? 'auto' : 'none' }}
                animate={{
                  x: `${off * 58}%`,
                  rotateY: off * -16,
                  scale: off === 0 ? 1 : Math.max(0.84 - (abs - 1) * 0.08, 0.6),
                  opacity: visible ? 1 : 0,
                  '--csc-dim': off === 0 ? 0 : abs === 1 ? 0.45 : 0.72,
                }}
                transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={() => { if (off > 0) next(); else if (off < 0) prev() }}
                aria-hidden={off !== 0}
              >
                <span className="csc-num">{s.num}</span>
                <div className="csc-icon">{s.icon}</div>
                <h3 className="csc-name">{s.nombre}</h3>
                <p className="csc-desc">{s.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Controles */}
        <div className="csc-controls">
          <button className="csc-arrow" onClick={prev} aria-label="Sector anterior">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </button>

          <span className="csc-counter" aria-live="polite">
            <span className="csc-counter-current">{SECTORES[active].num}</span>
            <span className="csc-counter-sep">/</span>
            <span className="csc-counter-total">06</span>
          </span>

          <button className="csc-arrow" onClick={next} aria-label="Sector siguiente">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  )
}
